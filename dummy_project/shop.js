/* ============================================================
   NILE — shop.js
   Individual vendor shop profile logic + generative art engine
   ============================================================ */

/* ---- Shared Vendor Data (mirrors script.js) ------------- */
const SHOP_VENDORS = [
  {
    id: 1,
    name: "Sana's Ceramics",
    category: "craft",
    location: "Mumbai, MH",
    description: "Hand-thrown stoneware vessels and tableware inspired by coastal forms and wabi-sabi aesthetics.",
    rating: "4.9",
    followers: 843,
    badge: "Featured",
    emoji: ["🏺","🫙","🍶","🪴"],
    colors: ["#d4c4b0","#b8a898","#e8ddd0","#c4b4a0"],
    avatar: "SC",
    artStyle: "organic",
    items: 38,
    years: 3,
    tags: ["Ceramics","Stoneware","Handmade","Tableware","Coastal","Wabi-sabi","Sustainable"],
    about: [
      "Sana started throwing clay in a tiny Bandra studio in 2021, drawn to the meditative rhythm of the wheel and the unpredictability of wood-fire glazes. Every piece she makes carries the texture of the sea — imperfect, salt-worn, and quietly beautiful.",
      "Her work is inspired by the Japanese philosophy of wabi-sabi: finding beauty in imperfection and impermanence. No two pieces are identical. She sources her stoneware clay from potters in Rajasthan and fires each batch in a small kiln she built by hand.",
      "Sana ships carefully packed orders across India. Custom commissions — sets for restaurants, wedding gifts, housewarming collections — are always welcome. She replies to every message personally."
    ],
    details: [
      ["Location", "Mumbai, Maharashtra"],
      ["Founded", "2021"],
      ["Shipping", "Pan-India · 5–8 days"],
      ["Returns", "Accepted within 7 days"],
      ["Materials", "Stoneware, earthenware"],
      ["Payment", "UPI, cards, bank transfer"]
    ],
    products: [
      { name: "Tide Bowl — Large", price: "₹1,850", available: true, emoji: "🏺" },
      { name: "Shore Mug Set (2)", price: "₹1,200", available: true, emoji: "☕" },
      { name: "Salt Cellar", price: "₹650", available: true, emoji: "🫙" },
      { name: "Driftwood Plate", price: "₹2,100", available: false, emoji: "🍽️" },
      { name: "Pebble Vase", price: "₹1,450", available: true, emoji: "🪴" },
      { name: "Sake Set (5pc)", price: "₹3,200", available: true, emoji: "🍶" }
    ],
    reviews: [
      { name: "Divya R.", initials: "DR", stars: 5, date: "May 2026", text: "The tide bowl arrived perfectly packed. It's even more beautiful in person — the glaze has this incredible depth that photos don't capture. Will definitely order again." },
      { name: "Rohan M.", initials: "RM", stars: 5, date: "April 2026", text: "Ordered a custom set for my restaurant. Sana was incredibly responsive and the pieces arrived before schedule. Guests keep asking about them." },
      { name: "Preeti S.", initials: "PS", stars: 5, date: "March 2026", text: "Gifted the shore mug set to my mother. She cried. That tells you everything." },
      { name: "Aakash T.", initials: "AT", stars: 4, date: "February 2026", text: "Beautiful work. The pebble vase is stunning. Took a week longer than expected but absolutely worth it." },
      { name: "Nisha K.", initials: "NK", stars: 5, date: "January 2026", text: "Sana's ceramics are the most thoughtful things in my home. Each piece feels like it was made specifically for you." }
    ],
    ratingBreakdown: [0, 0, 0, 1, 4]
  },
  {
    id: 2,
    name: "Raji's Print Studio",
    category: "art",
    location: "Chennai, TN",
    description: "Original giclée prints and risograph posters. Limited runs, each piece signed and numbered.",
    rating: "5.0",
    followers: 1204,
    badge: "New",
    avatar: "RP",
    artStyle: "geometric",
    items: 54,
    years: 2,
    emoji: ["🖼️","🎨","🖌️","✏️"],
    colors: ["#e8e0d8","#d0c8c0","#f0ece8","#c8c0b8"],
    tags: ["Prints","Risograph","Giclée","Limited Edition","Poster Art","Illustration","Minimalist"],
    about: [
      "Raji Krishnamurthy spent eight years as a type designer before she bought her first risograph machine and never looked back. Her prints live at the intersection of typography, geometry, and the visual rhythms of South Indian temple architecture.",
      "Every edition at Raji's Print Studio is limited to 30 copies. Each is hand-signed, numbered, and printed on 300gsm archival cotton stock. She oversees every pull herself in a studio she shares with two other Chennai-based artists.",
      "Her work has been featured in design publications across Asia and Europe. She ships internationally and offers custom print commissions for brands and private collectors."
    ],
    details: [
      ["Location", "Chennai, Tamil Nadu"],
      ["Founded", "2023"],
      ["Shipping", "India & International"],
      ["Edition size", "30 copies per run"],
      ["Stock", "300gsm archival cotton"],
      ["Signed", "Yes, every piece"]
    ],
    products: [
      { name: "Kolam No. 7 — A2", price: "₹2,400", available: true, emoji: "🖼️" },
      { name: "Grid Studies Print Set", price: "₹3,800", available: true, emoji: "📐" },
      { name: "Temple Rhythm Poster", price: "₹1,900", available: false, emoji: "🏛️" },
      { name: "Ink & Form — A3", price: "₹1,600", available: true, emoji: "✒️" },
      { name: "Monsoon Shapes", price: "₹2,200", available: true, emoji: "🌧️" },
      { name: "Type Specimen Print", price: "₹2,800", available: true, emoji: "🔤" }
    ],
    reviews: [
      { name: "Arjun V.", initials: "AV", stars: 5, date: "June 2026", text: "The Kolam No.7 print is extraordinary. The registration on the risograph is flawless. Raji knows exactly what she's doing." },
      { name: "Fatima L.", initials: "FL", stars: 5, date: "May 2026", text: "Ordered the Grid Studies set from London. Arrived in perfect condition. The paper quality is exceptional." },
      { name: "Kiran B.", initials: "KB", stars: 5, date: "April 2026", text: "I've bought three prints now. Each one is better than the last. The limited editions sell out fast — follow the shop." },
      { name: "Meena S.", initials: "MS", stars: 5, date: "March 2026", text: "Raji responded to my custom inquiry within hours and delivered something beyond what I imagined. A true professional." }
    ],
    ratingBreakdown: [0, 0, 0, 0, 4]
  },
  {
    id: 3,
    name: "Noor Textiles",
    category: "fashion",
    location: "Jaipur, RJ",
    description: "Block-printed kurtas and dupattas using natural dyes and handloom cotton sourced from local weavers.",
    rating: "4.8",
    followers: 2190,
    badge: "Top Seller",
    avatar: "NT",
    artStyle: "pattern",
    items: 112,
    years: 5,
    emoji: ["👗","🧣","👘","🪡"],
    colors: ["#e0d4c8","#c8bdb0","#ece0d4","#d4c8bc"],
    tags: ["Block Print","Natural Dye","Handloom","Cotton","Kurta","Dupatta","Sustainable Fashion"],
    about: [
      "Noor Textiles was founded by Noor Fatima in 2021 in the textile heartland of Jaipur. She works directly with block-printing artisans whose families have carried this craft for four generations, ensuring fair wages and long-term creative partnerships.",
      "Every fabric is dyed using plant-based natural dyes — indigo, madder, henna, and turmeric — and printed by hand using carved teak blocks. The process is slow, deliberate, and deeply connected to the land.",
      "Noor believes that slow fashion is the only fashion. She produces limited seasonal collections and never repeats a design. Buying from Noor Textiles means owning something genuinely unrepeatable."
    ],
    details: [
      ["Location", "Jaipur, Rajasthan"],
      ["Founded", "2021"],
      ["Shipping", "Pan-India · 3–6 days"],
      ["Dyes", "Natural plant-based only"],
      ["Fabric", "Handloom cotton & silk"],
      ["Production", "Artisan block-print"]
    ],
    products: [
      { name: "Indigo Kurta — S/M/L", price: "₹3,200", available: true, emoji: "👔" },
      { name: "Madder Dupatta", price: "₹1,800", available: true, emoji: "🧣" },
      { name: "Henna Coord Set", price: "₹5,400", available: true, emoji: "👗" },
      { name: "Block Print Table Runner", price: "₹1,200", available: false, emoji: "🪡" },
      { name: "Turmeric Kurta — XS/S", price: "₹3,000", available: true, emoji: "🌿" },
      { name: "Indigo & Madder Stole", price: "₹2,200", available: true, emoji: "🎀" }
    ],
    reviews: [
      { name: "Zara H.", initials: "ZH", stars: 5, date: "June 2026", text: "The indigo kurta is the most beautiful garment I own. The print is crisp and the fabric feels extraordinary." },
      { name: "Sunita P.", initials: "SP", stars: 5, date: "May 2026", text: "Ordered three times and every piece has been perfect. Noor is doing something truly important for Indian craft." },
      { name: "Rashida B.", initials: "RB", stars: 4, date: "April 2026", text: "Absolutely stunning quality. I wish the sizing guide was a bit more detailed, but the kurta itself is gorgeous." },
      { name: "Leila T.", initials: "LT", stars: 5, date: "March 2026", text: "Gifted a coord set to my sister. She wore it to a wedding and got more compliments than the bride." }
    ],
    ratingBreakdown: [0, 0, 0, 1, 3]
  },
  {
    id: 4,
    name: "The Candle Lab",
    category: "craft",
    location: "Bengaluru, KA",
    description: "Hand-poured soy wax candles in bespoke scents: petrichor, sandalwood mist, and coastal sea salt.",
    rating: "4.7",
    followers: 673,
    badge: null,
    avatar: "CL",
    artStyle: "fluid",
    items: 24,
    years: 2,
    emoji: ["🕯️","✨","🌙","🌿"],
    colors: ["#f0ece4","#e4dcd0","#f5f2ec","#dcd4c8"],
    tags: ["Candles","Soy Wax","Natural Scents","Home Fragrance","Handpoured","Aromatherapy"],
    about: [
      "The Candle Lab was born in a Bengaluru apartment kitchen in 2023. Founders Aryan and Priya started experimenting with soy wax blends and natural fragrance oils after being frustrated by synthetic-smelling mass-market candles.",
      "Every candle is hand-poured in small batches of 20. They work with perfumers to develop unique scent profiles: petrichor (the smell of rain on dry earth), coastal sea salt, sandalwood mist, and a rotating seasonal edition.",
      "All wicks are cotton, all wax is 100% soy, and packaging is recycled kraft. They offer refills for all jar sizes — just send back your empty and get 30% off your next pour."
    ],
    details: [
      ["Location", "Bengaluru, Karnataka"],
      ["Founded", "2023"],
      ["Burn time", "45–65 hours per candle"],
      ["Wax", "100% soy"],
      ["Wicks", "Lead-free cotton"],
      ["Refills", "Available — 30% off"]
    ],
    products: [
      { name: "Petrichor — 200g", price: "₹850", available: true, emoji: "🌧️" },
      { name: "Sandalwood Mist — 200g", price: "₹850", available: true, emoji: "🌿" },
      { name: "Coastal Sea Salt — 300g", price: "₹1,100", available: false, emoji: "🌊" },
      { name: "Trio Gift Set", price: "₹2,200", available: true, emoji: "🎁" },
      { name: "Moon Wax Melt Set", price: "₹650", available: true, emoji: "🌙" },
      { name: "Custom Scent Session", price: "₹3,500", available: true, emoji: "✨" }
    ],
    reviews: [
      { name: "Tanya M.", initials: "TM", stars: 5, date: "May 2026", text: "The petrichor candle is magic. I light it every time it rains and the whole apartment smells incredible." },
      { name: "Vikram S.", initials: "VS", stars: 5, date: "April 2026", text: "Ordered the trio set as a housewarming gift. The packaging alone made it look like a luxury purchase." },
      { name: "Ananya B.", initials: "AB", stars: 4, date: "March 2026", text: "Lovely candles. Burn time is excellent. The sandalwood mist is my favourite but I wish it came in a larger size." }
    ],
    ratingBreakdown: [0, 0, 0, 2, 1]
  },
  {
    id: 5,
    name: "Mira's Organic Skincare",
    category: "beauty",
    location: "Pune, MH",
    description: "Small-batch face oils, serums, and balms made with cold-pressed botanicals. No toxins, ever.",
    rating: "4.9",
    followers: 3410,
    badge: "Top Seller",
    avatar: "MO",
    artStyle: "botanical",
    items: 31,
    years: 4,
    emoji: ["🌸","🧴","🌿","💧"],
    colors: ["#e4dcd4","#d4ccc4","#ece4dc","#ccc4bc"],
    tags: ["Organic","Skincare","Cold-pressed","Botanical","Natural","Vegan","Face Oil","Serum"],
    about: [
      "Mira Deshpande trained as a biochemist before spending three years studying Ayurvedic formulation in Kerala. She launched Mira's Organic Skincare in 2022 with one product — a cold-pressed rosehip and bakuchiol face oil — and has quietly grown to 30+ SKUs without a single paid advertisement.",
      "Everything is made in small batches of 50 units. She sources ingredients from certified organic farms in Himachal Pradesh, Uttarakhand, and Kerala. No synthetic preservatives, no fragrance, no filler oils.",
      "Mira tests every batch on herself and a small group of repeat customers before releasing it. She believes skincare should be transparent — every ingredient is listed with its source on the product page."
    ],
    details: [
      ["Location", "Pune, Maharashtra"],
      ["Founded", "2022"],
      ["Certifications", "USDA Organic, Vegan"],
      ["Batch size", "50 units max"],
      ["Preservatives", "None — natural only"],
      ["Shelf life", "12–18 months"]
    ],
    products: [
      { name: "Rosehip & Bakuchiol Oil", price: "₹1,650", available: true, emoji: "🌹" },
      { name: "Niacinamide Serum 10%", price: "₹1,200", available: true, emoji: "💧" },
      { name: "Shea & Calendula Balm", price: "₹850", available: true, emoji: "🌸" },
      { name: "Vitamin C Glow Serum", price: "₹1,800", available: false, emoji: "✨" },
      { name: "Hydrating Toner Mist", price: "₹950", available: true, emoji: "🌿" },
      { name: "Full Routine Kit", price: "₹4,200", available: true, emoji: "🧴" }
    ],
    reviews: [
      { name: "Priya K.", initials: "PK", stars: 5, date: "June 2026", text: "The rosehip oil has completely transformed my skin. I was sceptical but three months in and I've stopped wearing foundation." },
      { name: "Shreya N.", initials: "SN", stars: 5, date: "May 2026", text: "Mira replied to my skin concern message with a personalised routine. The level of care is unlike anything from a big brand." },
      { name: "Asha T.", initials: "AT", stars: 5, date: "April 2026", text: "I've been using the niacinamide serum for six weeks. My hyperpigmentation has visibly reduced. Genuinely impressed." },
      { name: "Ritu V.", initials: "RV", stars: 4, date: "March 2026", text: "The balm is beautiful but I wish the packaging had a pump. Texture and scent are perfect though." },
      { name: "Deepa M.", initials: "DM", stars: 5, date: "February 2026", text: "Clean ingredients, visible results, and a founder who actually knows what she's talking about. This is the standard." }
    ],
    ratingBreakdown: [0, 0, 0, 1, 4]
  },
  {
    id: 6,
    name: "Bake Street",
    category: "food",
    location: "Hyderabad, TS",
    description: "Artisan sourdough, kouign-amann, and seasonal tarts. Every item baked fresh to order.",
    rating: "4.8",
    followers: 987,
    badge: null,
    avatar: "BS",
    artStyle: "warm",
    items: 18,
    years: 3,
    emoji: ["🍞","🥐","🧁","🍰"],
    colors: ["#ece0cc","#d8cabb","#f0e8d8","#ccc0aa"],
    tags: ["Sourdough","Artisan Bakery","Kouign-amann","Seasonal","Fresh Baked","Pastry","Made to Order"],
    about: [
      "Bake Street is run by Khalid and Sunaina from a residential kitchen in Banjara Hills. Khalid trained under a pastry chef in Paris for two years; Sunaina handles the sourdough program, running a starter she's kept alive since 2019.",
      "Everything is baked fresh to order — there's no pre-made inventory. Orders placed by Wednesday are delivered Friday–Saturday within Hyderabad. They take only 40 orders per week to maintain quality.",
      "Their kouign-amann won a local food publication's 'Best of Hyderabad' award in 2025. They are frequently sold out. Following the shop is the best way to catch the next batch."
    ],
    details: [
      ["Location", "Hyderabad, Telangana"],
      ["Founded", "2023"],
      ["Order window", "Wednesday close"],
      ["Delivery", "Friday–Saturday, HYD only"],
      ["Max orders", "40 per week"],
      ["Allergens", "Contains gluten, dairy, eggs"]
    ],
    products: [
      { name: "Country Sourdough Loaf", price: "₹420", available: true, emoji: "🍞" },
      { name: "Kouign-amann (6pc)", price: "₹680", available: true, emoji: "🥐" },
      { name: "Seasonal Tart (slice)", price: "₹280", available: true, emoji: "🍰" },
      { name: "Focaccia — Rosemary", price: "₹380", available: false, emoji: "🫓" },
      { name: "Croissant Dozen", price: "₹960", available: true, emoji: "🥐" },
      { name: "Celebration Cake (8\")", price: "₹2,200", available: true, emoji: "🎂" }
    ],
    reviews: [
      { name: "Rahul A.", initials: "RA", stars: 5, date: "June 2026", text: "The kouign-amann is the best thing I've eaten in Hyderabad. Buttery, caramelised, absolutely perfect. I order every week." },
      { name: "Shalini V.", initials: "SV", stars: 5, date: "May 2026", text: "Ordered a celebration cake for my daughter's birthday. It was stunning and tasted even better than it looked." },
      { name: "Karthik N.", initials: "KN", stars: 4, date: "April 2026", text: "The sourdough is excellent. Good crust, good crumb. I just wish they delivered more days of the week." },
      { name: "Meera P.", initials: "MP", stars: 5, date: "March 2026", text: "Khalid remembered my dietary preference from a previous order without me mentioning it. That's the kind of detail that keeps me coming back." }
    ],
    ratingBreakdown: [0, 0, 0, 1, 3]
  },
  {
    id: 7,
    name: "Arvind Press",
    category: "art",
    location: "Delhi, DL",
    description: "Vintage-inspired letterpress cards, art books, and zines. Printed on archival cotton stock.",
    rating: "4.6",
    followers: 521,
    badge: "New",
    avatar: "AP",
    artStyle: "typographic",
    items: 43,
    years: 1,
    emoji: ["📖","📚","🗞️","✒️"],
    colors: ["#dcd8d4","#ccc8c4","#e4e0dc","#c4c0bc"],
    tags: ["Letterpress","Zines","Art Books","Cards","Print","Archival","Typography","Stationery"],
    about: [
      "Arvind Mehta spent fifteen years as an editor before acquiring a 1960s Heidelberg platen press from a closing print shop in Okhla. He taught himself letterpress printing from YouTube videos, old manuals, and a lot of ruined paper.",
      "Arvind Press produces greeting cards, art zines, and limited-run art books using the Heidelberg and a newer Risograph. Everything is printed on 300gsm cotton stock — the kind of paper that makes people stop and touch it.",
      "The shop launched in early 2025 and has already developed a cult following among Delhi's design and literary communities. Each zine edition is 50 copies. Each card set is 100."
    ],
    details: [
      ["Location", "Delhi, NCR"],
      ["Founded", "2025"],
      ["Press", "1960s Heidelberg Platen"],
      ["Stock", "300gsm archival cotton"],
      ["Zine editions", "50 copies"],
      ["Shipping", "Pan-India · 4–7 days"]
    ],
    products: [
      { name: "City Zine Vol. 1", price: "₹380", available: true, emoji: "📖" },
      { name: "Letterpress Card Set (6)", price: "₹720", available: true, emoji: "✉️" },
      { name: "Type Specimen Book", price: "₹1,400", available: true, emoji: "📚" },
      { name: "Delhi Grid Poster", price: "₹950", available: false, emoji: "🗺️" },
      { name: "Annual Desk Calendar", price: "₹580", available: true, emoji: "📅" },
      { name: "Bespoke Wedding Suite", price: "₹8,000", available: true, emoji: "💌" }
    ],
    reviews: [
      { name: "Nandita S.", initials: "NS", stars: 5, date: "May 2026", text: "The letterpress card set is the most beautiful thing in my stationery collection. The impression on the paper is extraordinary." },
      { name: "Rohit G.", initials: "RG", stars: 5, date: "April 2026", text: "City Zine Vol. 1 is a collector's item. Beautifully written and even more beautifully printed. Arvind is doing something special." },
      { name: "Priya W.", initials: "PW", stars: 4, date: "March 2026", text: "Good quality, lovely concept. I wish they had more zine titles. Already waiting for Vol. 2." }
    ],
    ratingBreakdown: [0, 0, 0, 2, 1]
  },
  {
    id: 8,
    name: "Leela's Loom",
    category: "fashion",
    location: "Varanasi, UP",
    description: "Handwoven Banarasi silk stoles and table runners, woven on traditional pit looms by third-generation weavers.",
    rating: "5.0",
    followers: 4120,
    badge: "Featured",
    avatar: "LL",
    artStyle: "weave",
    items: 67,
    years: 6,
    emoji: ["🧵","🎀","🪢","💎"],
    colors: ["#e8e0d0","#d8d0c0","#f0e8d8","#d0c8b8"],
    tags: ["Banarasi","Handwoven","Silk","Stole","Traditional","Heritage","Pit Loom","Table Runner"],
    about: [
      "Leela Singh grew up watching her grandfather weave on a pit loom in their ancestral home in Varanasi. After studying textile design in Ahmedabad, she returned to establish Leela's Loom — a direct bridge between master weavers and customers who care about provenance.",
      "She works with seven weaver families, all third or fourth generation, ensuring fair wages and credit. Each piece carries a small card with the name of the artisan who wove it. Leela believes the maker's name belongs on the work.",
      "Leela's Loom was the first Varanasi-based handloom studio to go plastic-free in packaging. They use recycled paper, organic cotton muslin dust bags, and soy-based inks on all printed materials."
    ],
    details: [
      ["Location", "Varanasi, Uttar Pradesh"],
      ["Founded", "2020"],
      ["Technique", "Pit loom, hand-throw"],
      ["Fabric", "Pure Banarasi silk"],
      ["Weaver credit", "Included with every piece"],
      ["Shipping", "Pan-India & International"]
    ],
    products: [
      { name: "Brocade Silk Stole — Ivory", price: "₹4,800", available: true, emoji: "🧣" },
      { name: "Gold Zari Table Runner", price: "₹6,200", available: true, emoji: "✨" },
      { name: "Shikargah Silk Dupatta", price: "₹7,500", available: false, emoji: "🎀" },
      { name: "Tanchoi Stole — Indigo", price: "₹5,400", available: true, emoji: "💙" },
      { name: "Wedding Gift Set", price: "₹12,000", available: true, emoji: "💎" },
      { name: "Cushion Cover — Silk", price: "₹2,800", available: true, emoji: "🪢" }
    ],
    reviews: [
      { name: "Kavita L.", initials: "KL", stars: 5, date: "June 2026", text: "The brocade stole is the most exquisite textile I have ever owned. I cried when I opened the packaging. The card with the weaver's name made it even more meaningful." },
      { name: "Anjali M.", initials: "AM", stars: 5, date: "May 2026", text: "Ordered the wedding gift set for my cousin. Leela personalised the note card. Every single person at the wedding asked where it was from." },
      { name: "Shobha R.", initials: "SR", stars: 5, date: "April 2026", text: "I've purchased from Leela's Loom three times. The consistency is remarkable. Every piece is perfect." },
      { name: "Prerna N.", initials: "PN", stars: 5, date: "March 2026", text: "The gold zari runner looks unbelievable on my dining table. It's a work of art. Five stars isn't enough." },
      { name: "Geeta H.", initials: "GH", stars: 5, date: "February 2026", text: "Heritage craftsmanship, thoughtful packaging, personal service. This is what Indian e-commerce should look like." }
    ],
    ratingBreakdown: [0, 0, 0, 0, 5]
  }
];

/* ================================================================
   GENERATIVE ART ENGINE
   Each vendor gets procedurally generated abstract artwork
   styled to their artStyle property
   ================================================================ */

const ART_STYLES = {
  organic:    generateOrganic,
  geometric:  generateGeometric,
  pattern:    generatePattern,
  fluid:      generateFluid,
  botanical:  generateBotanical,
  warm:       generateWarm,
  typographic:generateTypographic,
  weave:      generateWeave
};

/* Seeded random — deterministic per vendor+seed so art is consistent */
function seededRand(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function hsl(h, s, l, a = 1) {
  return a < 1 ? `hsla(${h},${s}%,${l}%,${a})` : `hsl(${h},${s}%,${l}%)`;
}

/* ---- Organic (Sana's Ceramics) -- blobs & wabi circles -- */
function generateOrganic(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#0a0a0a' : '#f5f0ea';
  const strokes = dark
    ? ['#3a3028','#504540','#6a6055','#282320']
    : ['#c8b8a8','#b0a090','#d8ccc0','#e8e0d8','#a09080'];

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;

  for (let i = 0; i < 12; i++) {
    const cx = r() * w, cy = r() * h;
    const rx = 30 + r() * 120, ry = 25 + r() * 100;
    const rot = r() * 360;
    const col = strokes[Math.floor(r() * strokes.length)];
    const op = 0.15 + r() * 0.55;
    shapes += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" 
      fill="${col}" opacity="${op.toFixed(2)}" 
      transform="rotate(${rot.toFixed(1)} ${cx} ${cy})"/>`;
  }
  // concentric rings
  for (let i = 0; i < 3; i++) {
    const cx = r() * w, cy = r() * h;
    for (let j = 3; j > 0; j--) {
      const col = strokes[Math.floor(r() * strokes.length)];
      shapes += `<circle cx="${cx}" cy="${cy}" r="${j * (20 + r()*30)}" 
        fill="none" stroke="${col}" stroke-width="${0.5 + r()*1.5}" opacity="${(0.1 + r()*0.3).toFixed(2)}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

/* ---- Geometric (Raji's Print Studio) -- grids & diagonals */
function generateGeometric(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#080808' : '#f0ede8';
  const cols = dark
    ? ['#2a2a2a','#3c3c3c','#1a1a1a','#4a4a4a']
    : ['#d8d4ce','#c8c4be','#e4e0da','#b8b4ae','#f0ece6'];

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;

  const cols_count = 6 + Math.floor(r() * 4);
  const cellW = w / cols_count;
  const rows_count = Math.floor(h / cellW);

  for (let row = 0; row < rows_count; row++) {
    for (let col = 0; col < cols_count; col++) {
      if (r() > 0.45) continue;
      const x = col * cellW, y = row * cellW;
      const fill = cols[Math.floor(r() * cols.length)];
      const op = (0.2 + r() * 0.7).toFixed(2);
      const type = Math.floor(r() * 3);
      if (type === 0) {
        shapes += `<rect x="${x}" y="${y}" width="${cellW}" height="${cellW}" fill="${fill}" opacity="${op}"/>`;
      } else if (type === 1) {
        shapes += `<circle cx="${x + cellW/2}" cy="${y + cellW/2}" r="${cellW/2}" fill="${fill}" opacity="${op}"/>`;
      } else {
        const pts = r() > 0.5
          ? `${x},${y+cellW} ${x+cellW},${y+cellW} ${x+cellW/2},${y}`
          : `${x},${y} ${x+cellW},${y} ${x+cellW/2},${y+cellW}`;
        shapes += `<polygon points="${pts}" fill="${fill}" opacity="${op}"/>`;
      }
    }
  }
  // diagonal lines overlay
  for (let i = 0; i < 5; i++) {
    const x1 = r()*w, y1 = r()*h, x2 = r()*w, y2 = r()*h;
    const col = cols[Math.floor(r()*cols.length)];
    shapes += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
      stroke="${col}" stroke-width="${0.5+r()*1}" opacity="${(0.1+r()*0.2).toFixed(2)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

/* ---- Pattern (Noor Textiles) -- block-print tile patterns */
function generatePattern(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#0c0a08' : '#ede8e2';
  const ink = dark ? '#3a3228' : '#5a4838';
  const accent = dark ? '#2a2018' : '#8a7060';

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  const tileSize = 40 + Math.floor(r() * 30);

  for (let y = 0; y < h + tileSize; y += tileSize) {
    for (let x = 0; x < w + tileSize; x += tileSize) {
      const cx = x + tileSize / 2, cy = y + tileSize / 2;
      const s = tileSize;
      const op = (0.15 + r() * 0.5).toFixed(2);
      // rotating block motifs
      const motif = Math.floor(r() * 4);
      if (motif === 0) {
        shapes += `<circle cx="${cx}" cy="${cy}" r="${s*0.35}" fill="none" stroke="${ink}" stroke-width="1" opacity="${op}"/>
        <circle cx="${cx}" cy="${cy}" r="${s*0.15}" fill="${ink}" opacity="${op}"/>`;
      } else if (motif === 1) {
        shapes += `<rect x="${cx-s*0.3}" y="${cy-s*0.3}" width="${s*0.6}" height="${s*0.6}" 
          fill="none" stroke="${ink}" stroke-width="1" opacity="${op}"
          transform="rotate(45 ${cx} ${cy})"/>`;
      } else if (motif === 2) {
        for (let p = 0; p < 4; p++) {
          const a = (p/4)*Math.PI*2;
          shapes += `<line x1="${cx}" y1="${cy}" 
            x2="${cx+Math.cos(a)*s*0.38}" y2="${cy+Math.sin(a)*s*0.38}" 
            stroke="${ink}" stroke-width="1.2" opacity="${op}"/>`;
        }
        shapes += `<circle cx="${cx}" cy="${cy}" r="${s*0.08}" fill="${ink}" opacity="${op}"/>`;
      } else {
        shapes += `<polygon points="${cx},${cy-s*0.35} ${cx+s*0.3},${cy+s*0.2} ${cx-s*0.3},${cy+s*0.2}" 
          fill="${accent}" opacity="${(parseFloat(op)*0.6).toFixed(2)}"/>`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

/* ---- Fluid (The Candle Lab) -- flowing curves & gradients */
function generateFluid(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#050505' : '#f8f4ef';
  const tones = dark
    ? ['#1a1814','#282420','#1e1c18','#302c28']
    : ['#e8e0d0','#d8d0c0','#f0e8dc','#c8c0b0','#ece4d8'];

  let defs = '<defs>';
  for (let i = 0; i < 3; i++) {
    const id = `flg${seed}_${i}`;
    const c1 = tones[Math.floor(r()*tones.length)];
    const c2 = tones[Math.floor(r()*tones.length)];
    defs += `<linearGradient id="${id}" x1="${r()}" y1="${r()}" x2="${r()}" y2="${r()}" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>`;
  }
  defs += '</defs>';

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  for (let i = 0; i < 8; i++) {
    const x0=r()*w, y0=r()*h;
    const cx1=r()*w, cy1=r()*h;
    const cx2=r()*w, cy2=r()*h;
    const x1=r()*w, y1=r()*h;
    const cx3=r()*w, cy3=r()*h;
    const fillId = `flg${seed}_${Math.floor(r()*3)}`;
    const op = (0.12 + r()*0.45).toFixed(2);
    shapes += `<path d="M${x0},${y0} C${cx1},${cy1} ${cx2},${cy2} ${x1},${y1} C${cx3},${cy3} ${x0+r()*80-40},${y0+r()*80-40} Z"
      fill="url(#${fillId})" opacity="${op}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${defs}${shapes}</svg>`;
}

/* ---- Botanical (Mira's Skincare) -- leaf & petal forms --- */
function generateBotanical(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#060806' : '#f0ede8';
  const greens = dark
    ? ['#141c10','#1c2818','#101808']
    : ['#d8e0d0','#c8d8c0','#e0e8d8','#b8c8b0','#d0dcca'];

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;

  const drawLeaf = (cx, cy, len, rot, col, op) => {
    const rad = rot * Math.PI / 180;
    const tip = [cx + Math.cos(rad)*len, cy + Math.sin(rad)*len];
    const cp1 = [cx + Math.cos(rad-0.8)*len*0.6, cy + Math.sin(rad-0.8)*len*0.6];
    const cp2 = [cx + Math.cos(rad+0.8)*len*0.6, cy + Math.sin(rad+0.8)*len*0.6];
    return `<path d="M${cx},${cy} Q${cp1[0]},${cp1[1]} ${tip[0]},${tip[1]} Q${cp2[0]},${cp2[1]} ${cx},${cy}Z"
      fill="${col}" opacity="${op.toFixed(2)}"/>`;
  };

  for (let i = 0; i < 18; i++) {
    const cx = r()*w, cy = r()*h;
    const len = 30 + r()*100;
    const rot = r()*360;
    const col = greens[Math.floor(r()*greens.length)];
    const op = 0.1 + r()*0.5;
    shapes += drawLeaf(cx, cy, len, rot, col, op);
    // stem
    const rad = rot * Math.PI / 180;
    shapes += `<line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(rad)*len}" y2="${cy+Math.sin(rad)*len}"
      stroke="${col}" stroke-width="${0.5+r()}" opacity="${(op*0.5).toFixed(2)}"/>`;
  }
  // small flower dots
  for (let i = 0; i < 12; i++) {
    const cx = r()*w, cy = r()*h;
    const col = greens[Math.floor(r()*greens.length)];
    shapes += `<circle cx="${cx}" cy="${cy}" r="${2+r()*5}" fill="${col}" opacity="${(0.2+r()*0.4).toFixed(2)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

/* ---- Warm (Bake Street) -- curves, warm tones ----------- */
function generateWarm(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#0a0806' : '#f5ede0';
  const tones = dark
    ? ['#281e10','#342818','#1e1408','#3c2c1c']
    : ['#e8d8c0','#d8c8a8','#f0e4d0','#c8b890','#e0ceb0'];

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;

  for (let i = 0; i < 10; i++) {
    const cx = r()*w, cy = r()*h;
    const a = r()*Math.PI*2;
    const len = 80 + r()*200;
    const curve = r()*100 - 50;
    const col = tones[Math.floor(r()*tones.length)];
    const op = (0.1 + r()*0.45).toFixed(2);
    const ex = cx + Math.cos(a)*len;
    const ey = cy + Math.sin(a)*len;
    const cpx = (cx+ex)/2 + Math.cos(a+Math.PI/2)*curve;
    const cpy = (cy+ey)/2 + Math.sin(a+Math.PI/2)*curve;
    shapes += `<path d="M${cx},${cy} Q${cpx},${cpy} ${ex},${ey}" 
      fill="none" stroke="${col}" stroke-width="${2+r()*8}" opacity="${op}" stroke-linecap="round"/>`;
  }
  for (let i = 0; i < 6; i++) {
    const cx = r()*w, cy = r()*h;
    const rad = 20 + r()*80;
    const col = tones[Math.floor(r()*tones.length)];
    shapes += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${col}" opacity="${(0.05+r()*0.2).toFixed(2)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

/* ---- Typographic (Arvind Press) -- letterforms & rules -- */
function generateTypographic(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#080808' : '#f2f0ec';
  const ink = dark ? '#1e1e1e' : '#1a1a1a';
  const mid = dark ? '#141414' : '#aaa8a4';

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  // horizontal rules
  for (let i = 0; i < 8; i++) {
    const y = r()*h;
    const op = (0.04 + r()*0.12).toFixed(2);
    shapes += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${ink}" stroke-width="${r()*2+0.5}" opacity="${op}"/>`;
  }
  // large ghost letterforms
  const letters = ['N','I','L','E','A','B','C'];
  for (let i = 0; i < 4; i++) {
    const letter = letters[Math.floor(r()*letters.length)];
    const x = r()*w, y = r()*h;
    const size = 80 + r()*200;
    const op = (0.03 + r()*0.09).toFixed(2);
    shapes += `<text x="${x}" y="${y}" font-size="${size}" font-family="serif" font-weight="700"
      fill="${ink}" opacity="${op}" text-anchor="middle">${letter}</text>`;
  }
  // small type specimen lines
  for (let i = 0; i < 5; i++) {
    const y = 40 + r()*(h-80);
    const size = 8 + r()*14;
    const op = (0.06 + r()*0.15).toFixed(2);
    const chars = '■ □ ▪ ▫ ● ○ ◆ ◇'.split(' ');
    const sym = chars[Math.floor(r()*chars.length)];
    shapes += `<text x="${r()*w}" y="${y}" font-size="${size}" fill="${mid}" opacity="${op}" font-family="sans-serif">${sym}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

/* ---- Weave (Leela's Loom) -- interlaced threads ---------- */
function generateWeave(w, h, seed, dark = false) {
  const r = seededRand(seed);
  const bg = dark ? '#080706' : '#f0ebe2';
  const gold = dark ? ['#2a2010','#3a3020','#1e1808'] : ['#d4c898','#c4b888','#e0d4a8','#b8ac80'];
  const silk = dark ? ['#201818','#2c2020','#181010'] : ['#e0d4c8','#d0c4b8','#ece0d4'];

  let shapes = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  const spacing = 8 + Math.floor(r()*10);

  for (let x = 0; x < w; x += spacing) {
    const col = gold[Math.floor(r()*gold.length)];
    const op = (0.12 + r()*0.35).toFixed(2);
    shapes += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${col}" stroke-width="${0.5+r()*1.5}" opacity="${op}"/>`;
  }
  for (let y = 0; y < h; y += spacing) {
    const col = silk[Math.floor(r()*silk.length)];
    const op = (0.1 + r()*0.3).toFixed(2);
    shapes += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${col}" stroke-width="${0.5+r()*1.5}" opacity="${op}"/>`;
  }
  // brocade motifs scattered
  for (let i = 0; i < 6; i++) {
    const cx = r()*w, cy = r()*h;
    const size = 15 + r()*35;
    const col = gold[Math.floor(r()*gold.length)];
    const op = (0.1 + r()*0.35).toFixed(2);
    shapes += `<polygon points="${cx},${cy-size} ${cx+size*0.7},${cy} ${cx},${cy+size} ${cx-size*0.7},${cy}"
      fill="${col}" opacity="${op}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

/* ================================================================
   GALLERY ARTWORK TITLES
   ================================================================ */
const GALLERY_TITLES = {
  organic:     ["Tide Study I","Shore Form","Wabi Fragment","Erosion No.3","Coastal Memory","Vessel Study","Sea Salt","Drift"],
  geometric:   ["Kolam Grid","Temple Rhythm","Type Form I","Diagonal Study","Grid No.4","Form & Space","Interval","Structure"],
  pattern:     ["Indigo Block","Madder Repeat","Natural Print I","Field Pattern","Earth Tile","Block Study","Root Form","Surface"],
  fluid:       ["Petrichor","Mist Study","Sandalwood Drift","Pour No.2","Wax & Wick","Scent Map","Amber Flow","Resin"],
  botanical:   ["Rosehip I","Bakuchiol Leaf","Cold-press Study","Botanical No.3","Root & Stem","Petal Form","Distillate","Green"],
  warm:        ["First Proof","Starter","Caramel Study","Kouign Form","Crust & Crumb","Bake No.2","Butter Fold","Rise"],
  typographic: ["Heidelberg I","Lead Type","Rule Study","Impression","Cotton Proof","Press Form","Indent","Colophon"],
  weave:       ["Zari Thread","Warp Study","Brocade I","Shuttle Form","Pit Loom","Tanchoi","Silk & Gold","Interlace"]
};

function getGalleryPieces(vendor) {
  const titles = GALLERY_TITLES[vendor.artStyle] || GALLERY_TITLES.geometric;
  const subs = ["Original work","Limited edition","Hand finished","Archival quality","One of a kind","Studio work"];
  const heights = [280, 220, 320, 240, 300, 200, 360, 260];
  const fn = ART_STYLES[vendor.artStyle] || generateGeometric;
  const pieces = [];
  for (let i = 0; i < 8; i++) {
    const w = 400, h = heights[i % heights.length];
    const svg = fn(w, h, vendor.id * 1000 + i, false);
    pieces.push({
      svg,
      w, h,
      title: titles[i % titles.length],
      sub: subs[i % subs.length]
    });
  }
  return pieces;
}

/* Generate hero canvas artwork (dark mode) */
function drawHeroCanvas(canvas, vendor) {
  const fn = ART_STYLES[vendor.artStyle] || generateGeometric;
  const w = canvas.offsetWidth || 1200;
  const h = canvas.offsetHeight || 520;
  canvas.width = w;
  canvas.height = h;
  const svgStr = fn(w, h, vendor.id * 777, true);
  const img = new Image();
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

/* Generate about page canvas */
function drawAboutCanvas(canvas, vendor) {
  const fn = ART_STYLES[vendor.artStyle] || generateGeometric;
  const w = canvas.width || 600;
  const h = canvas.height || 300;
  const svgStr = fn(w, h, vendor.id * 333 + 99, false);
  const img = new Image();
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

/* ================================================================
   AVATAR MINI-ART
   ================================================================ */
function drawAvatarArt(canvas, vendor) {
  canvas.width = 96; canvas.height = 96;
  const fn = ART_STYLES[vendor.artStyle] || generateGeometric;
  const svgStr = fn(96, 96, vendor.id * 999, true);
  const img = new Image();
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 96, 96);
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

/* ================================================================
   PRODUCT CARD BACKGROUND ART
   ================================================================ */
function productBgSVG(vendor, idx) {
  const fn = ART_STYLES[vendor.artStyle] || generateGeometric;
  return fn(220, 180, vendor.id * 500 + idx, false);
}

/* ================================================================
   RELATED SHOP MINI BANNERS
   ================================================================ */
function relatedBannerSVG(vendor) {
  const fn = ART_STYLES[vendor.artStyle] || generateGeometric;
  return fn(300, 90, vendor.id * 222, false);
}

/* ================================================================
   PAGE RENDER
   ================================================================ */
let currentVendor = null;
let shopFollowing = false;

function getVendorId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || 1;
}

function renderShopPage(vendor) {
  currentVendor = vendor;
  document.title = `${vendor.name} — NILE`;

  // Nav
  document.getElementById('navShopName').textContent = vendor.name;

  // Hero canvas
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    requestAnimationFrame(() => drawHeroCanvas(heroCanvas, vendor));
  }

  // Avatar
  const avatarEl = document.getElementById('shopAvatar');
  if (avatarEl) {
    const aCanvas = document.createElement('canvas');
    avatarEl.appendChild(aCanvas);
    requestAnimationFrame(() => drawAvatarArt(aCanvas, vendor));
  }

  // Identity card
  document.getElementById('shopName').textContent = vendor.name;
  document.getElementById('shopMeta').textContent = `${vendor.location} · ${categoryLabel(vendor.category)}`;
  document.getElementById('shopDesc').textContent = vendor.description;

  if (vendor.badge) {
    const badgeEl = document.getElementById('shopBadge');
    badgeEl.textContent = vendor.badge;
    badgeEl.classList.remove('hidden');
  }

  document.getElementById('statFollowers').textContent = vendor.followers.toLocaleString();
  document.getElementById('statRating').textContent = `★ ${vendor.rating}`;
  document.getElementById('statItems').textContent = vendor.items;
  document.getElementById('statYears').textContent = vendor.years;

  // Gallery
  document.getElementById('galleryTitle').textContent = `${vendor.name} — Gallery`;
  document.getElementById('gallerySub').textContent =
    `Original artworks, process photography, and studio work from ${vendor.name}. Click any piece to view full size.`;

  renderGallery(vendor);

  // Products
  document.getElementById('productsTitle').textContent = `Shop from ${vendor.name}`;
  renderProducts(vendor);

  // About
  document.getElementById('aboutTitle').textContent = `About ${vendor.name}`;
  document.getElementById('aboutBody').innerHTML = vendor.about.map(p => `<p>${p}</p>`).join('');
  renderAboutDetails(vendor);
  renderAboutTags(vendor);

  // Reviews
  renderReviews(vendor);

  // Related
  renderRelated(vendor);

  // Msg modal name
  document.getElementById('msgShopName').textContent = vendor.name;

  // About canvas (render after short delay to ensure DOM is ready)
  setTimeout(() => {
    const aboutCanvas = document.getElementById('aboutCanvas');
    if (aboutCanvas) drawAboutCanvas(aboutCanvas, vendor);
  }, 100);
}

function categoryLabel(cat) {
  const map = { art:'Art & Print', fashion:'Fashion', food:'Food & Drink', craft:'Craft & Home', beauty:'Beauty' };
  return map[cat] || cat;
}

/* ---- Gallery ------------------------------------------- */
function renderGallery(vendor) {
  const grid = document.getElementById('artGallery');
  const pieces = getGalleryPieces(vendor);
  grid.innerHTML = pieces.map((p, i) => `
    <div class="art-piece fade-in" data-index="${i}">
      ${p.svg}
      <div class="art-piece__caption">
        <div class="art-piece__title">${p.title}</div>
        <div class="art-piece__sub">${p.sub}</div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.art-piece').forEach((el, i) => {
    el.addEventListener('click', () => openLightbox(pieces[i]));
  });
  observeFadeEls();
}

/* ---- Lightbox ------------------------------------------ */
function openLightbox(piece) {
  const box = document.getElementById('lightbox');
  document.getElementById('lightboxArt').innerHTML = piece.svg;
  document.getElementById('lightboxCaption').innerHTML =
    `<strong>${piece.title}</strong>${piece.sub}`;
  box.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Products ------------------------------------------ */
function renderProducts(vendor) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = vendor.products.map((p, i) => {
    const bgSVG = productBgSVG(vendor, i);
    const avail = p.available;
    return `
      <div class="product-card fade-in">
        <div class="product-card__img">
          ${bgSVG}
          <span class="product-emoji">${p.emoji}</span>
        </div>
        <div class="product-card__body">
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__price">${p.price}</div>
          <div class="product-card__availability ${avail ? 'in-stock' : ''}">
            ${avail ? '● In stock' : '○ Sold out'}
          </div>
          ${avail
            ? `<button class="product-card__cta" onclick="handleAddToCart('${p.name}')">Enquire →</button>`
            : `<button class="product-card__cta" style="background:#aaa;cursor:not-allowed" disabled>Sold out</button>`}
        </div>
      </div>
    `;
  }).join('');
  observeFadeEls();
}

function handleAddToCart(name) {
  showToast(`Enquiry sent for: ${name} ✦`);
}

/* ---- About Details ------------------------------------- */
function renderAboutDetails(vendor) {
  document.getElementById('aboutDetails').innerHTML = vendor.details.map(([label, val]) =>
    `<li><span>${label}</span><span>${val}</span></li>`
  ).join('');
}
function renderAboutTags(vendor) {
  document.getElementById('aboutTags').innerHTML = vendor.tags.map(t =>
    `<span class="about-tag">${t}</span>`
  ).join('');
}

/* ---- Reviews ------------------------------------------- */
function renderReviews(vendor) {
  const avg = vendor.rating;
  const total = vendor.reviews.length;

  document.getElementById('reviewsAvg').textContent = avg;
  document.getElementById('reviewsCount').textContent = `${total} reviews`;

  // Star display
  const filled = Math.round(parseFloat(avg));
  document.getElementById('reviewsStars').textContent = '★'.repeat(filled) + '☆'.repeat(5 - filled);

  // Rating bars
  const breakdown = vendor.ratingBreakdown; // [1★, 2★, 3★, 4★, 5★]
  const maxBar = Math.max(...breakdown, 1);
  document.getElementById('reviewsBars').innerHTML = breakdown.map((count, i) => {
    const pct = Math.round((count / maxBar) * 100);
    return `<div class="review-bar-row">
      <span>${5 - i}★</span>
      <div class="review-bar-track"><div class="review-bar-fill" style="width:${pct}%"></div></div>
      <span>${breakdown[4 - i]}</span>
    </div>`;
  }).reverse().join('');

  document.getElementById('reviewsList').innerHTML = vendor.reviews.map(rev => `
    <div class="review-item fade-in">
      <div class="review-item__header">
        <div class="review-avatar">${rev.initials}</div>
        <div>
          <div class="review-item__name">${rev.name}</div>
          <div class="review-item__stars">${'★'.repeat(rev.stars)}${'☆'.repeat(5 - rev.stars)}</div>
          <div class="review-item__date">${rev.date}</div>
        </div>
      </div>
      <p class="review-item__body">${rev.text}</p>
    </div>
  `).join('');
  observeFadeEls();
}

/* ---- Related Shops ------------------------------------- */
function renderRelated(vendor) {
  const others = SHOP_VENDORS.filter(v => v.id !== vendor.id && v.category === vendor.category)
    .concat(SHOP_VENDORS.filter(v => v.id !== vendor.id && v.category !== vendor.category))
    .slice(0, 4);

  document.getElementById('relatedGrid').innerHTML = others.map(v => `
    <a class="related-card" href="shop.html?id=${v.id}">
      <div class="related-card__banner">${relatedBannerSVG(v)}</div>
      <div class="related-card__body">
        <div class="related-card__name">${v.name}</div>
        <div class="related-card__meta">${v.location} · ★ ${v.rating} · ${v.followers.toLocaleString()} followers</div>
      </div>
    </a>
  `).join('');
}

/* ================================================================
   TABS
   ================================================================ */
function initTabs() {
  document.querySelectorAll('.shop-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.shop-section').forEach(s => s.classList.add('hidden'));
      tab.classList.add('active');
      const target = document.getElementById(`tab-${tab.dataset.tab}`);
      if (target) {
        target.classList.remove('hidden');
        observeFadeEls();
      }
    });
  });
}

/* ================================================================
   FOLLOW
   ================================================================ */
function initFollow() {
  const followBtn = document.getElementById('followBtn');
  const navFollowBtn = document.getElementById('navFollowBtn');

  function updateFollowUI() {
    if (!currentVendor) return;
    const label = shopFollowing ? '✓ Following' : '+ Follow shop';
    if (followBtn) {
      followBtn.textContent = label;
      followBtn.classList.toggle('following', shopFollowing);
    }
    if (navFollowBtn) {
      navFollowBtn.textContent = shopFollowing ? '✓ Following' : '+ Follow';
      navFollowBtn.classList.toggle('following', shopFollowing);
    }
    const stat = document.getElementById('statFollowers');
    if (stat && currentVendor) stat.textContent = currentVendor.followers.toLocaleString();
  }

  function toggleFollow() {
    if (!currentVendor) return;
    shopFollowing = !shopFollowing;
    currentVendor.followers += shopFollowing ? 1 : -1;
    updateFollowUI();
    showToast(shopFollowing
      ? `Now following ${currentVendor.name} ✦`
      : `Unfollowed ${currentVendor.name}`);
  }

  followBtn?.addEventListener('click', toggleFollow);
  navFollowBtn?.addEventListener('click', toggleFollow);
}

/* ================================================================
   MESSAGE MODAL
   ================================================================ */
function initMessageModal() {
  const overlay = document.getElementById('msgOverlay');
  const closeBtn = document.getElementById('msgClose');
  const sendBtn = document.getElementById('msgSend');
  const msgBtn = document.getElementById('messageBtn');

  msgBtn?.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  sendBtn?.addEventListener('click', () => {
    const name  = document.getElementById('msgName')?.value.trim();
    const email = document.getElementById('msgEmail')?.value.trim();
    const text  = document.getElementById('msgText')?.value.trim();
    if (!name)  { showToast('Please enter your name'); return; }
    if (!email || !email.includes('@')) { showToast('Please enter a valid email'); return; }
    if (!text)  { showToast('Please write a message'); return; }
    showToast(`Message sent to ${currentVendor?.name} ✦`);
    closeModal();
    document.getElementById('msgName').value = '';
    document.getElementById('msgEmail').value = '';
    document.getElementById('msgText').value = '';
  });
}

/* ================================================================
   SHARE
   ================================================================ */
function initShare() {
  const handler = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: currentVendor?.name, url }); } catch(e) {}
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
      showToast('Shop link copied to clipboard ✦');
    }
  };
  document.getElementById('shareBtn')?.addEventListener('click', handler);
  document.getElementById('shareIconBtn')?.addEventListener('click', handler);
}

/* ================================================================
   NAV SCROLL & HAMBURGER
   ================================================================ */
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
    });
  });
}

/* ================================================================
   LIGHTBOX INIT
   ================================================================ */
function initLightbox() {
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxBackdrop')?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ================================================================
   INTERSECTION OBSERVER — FADE-IN
   ================================================================ */
let fadeObserver;
function observeFadeEls() {
  if (fadeObserver) fadeObserver.disconnect();
  fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => fadeObserver.observe(el));
}

/* ================================================================
   TOAST
   ================================================================ */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const id = getVendorId();
  const vendor = SHOP_VENDORS.find(v => v.id === id) || SHOP_VENDORS[0];

  renderShopPage(vendor);
  initTabs();
  initFollow();
  initMessageModal();
  initShare();
  initNav();
  initLightbox();

  // Initial fade-in trigger
  setTimeout(observeFadeEls, 200);

  // Redraw hero canvas on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const heroCanvas = document.getElementById('heroCanvas');
      if (heroCanvas) drawHeroCanvas(heroCanvas, vendor);
    }, 200);
  });
});