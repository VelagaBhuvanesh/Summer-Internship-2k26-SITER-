/* ============================================================
   NILE — Main Script
   ============================================================ */

/* ---- Vendor Data ---------------------------------------- */
const VENDORS = [
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
    colors: ["#d4c4b0","#b8a898","#e8ddd0","#c4b4a0"]
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
    emoji: ["🖼️","🎨","🖌️","✏️"],
    colors: ["#e8e0d8","#d0c8c0","#f0ece8","#c8c0b8"]
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
    emoji: ["👗","🧣","👘","🪡"],
    colors: ["#e0d4c8","#c8bdb0","#ece0d4","#d4c8bc"]
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
    emoji: ["🕯️","✨","🌙","🌿"],
    colors: ["#f0ece4","#e4dcd0","#f5f2ec","#dcd4c8"]
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
    emoji: ["🌸","🧴","🌿","💧"],
    colors: ["#e4dcd4","#d4ccc4","#ece4dc","#ccc4bc"]
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
    emoji: ["🍞","🥐","🧁","🍰"],
    colors: ["#ece0cc","#d8cabb","#f0e8d8","#ccc0aa"]
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
    emoji: ["📖","📚","🗞️","✒️"],
    colors: ["#dcd8d4","#ccc8c4","#e4e0dc","#c4c0bc"]
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
    emoji: ["🧵","🎀","🪢","💎"],
    colors: ["#e8e0d0","#d8d0c0","#f0e8d8","#d0c8b8"]
  }
];

let visibleCount = 6;
let currentFilter = "all";
let followedShops = new Set();

/* ---- Render Vendor Grid --------------------------------- */
function getFilteredVendors() {
  if (currentFilter === "all") return VENDORS;
  return VENDORS.filter(v => v.category === currentFilter);
}

function createVendorCard(vendor) {
  const isFollowing = followedShops.has(vendor.id);
  const [c1, c2, c3, c4] = vendor.colors;
  const [e1, e2, e3, e4] = vendor.emoji;

  return `
    <article class="vendor-card fade-in" data-id="${vendor.id}" onclick="window.location.href='shop.html?id=${vendor.id}'" style="cursor:pointer">
      <div class="vendor-card__gallery">
        <div class="vendor-card__gallery-img" style="background:${c1}"><span>${e1}</span></div>
        <div class="vendor-card__gallery-img" style="background:${c2}"><span>${e2}</span></div>
        <div class="vendor-card__gallery-img" style="background:${c3}"><span>${e3}</span></div>
        ${vendor.badge ? `<div class="vendor-card__badge">${vendor.badge}</div>` : ''}
      </div>
      <div class="vendor-card__body">
        <div class="vendor-card__header">
          <span class="vendor-card__name">${vendor.name}</span>
          <span class="vendor-card__rating">★ ${vendor.rating}</span>
        </div>
        <div class="vendor-card__meta">${vendor.location} · ${vendor.followers.toLocaleString()} followers</div>
        <p class="vendor-card__desc">${vendor.description}</p>
        <div class="vendor-card__footer">
          <span class="vendor-card__tag">${categoryLabel(vendor.category)}</span>
          <button class="vendor-card__follow ${isFollowing ? 'following' : ''}" data-id="${vendor.id}">
            ${isFollowing ? '✓ Following' : '+ Follow'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function categoryLabel(cat) {
  const map = {
    art: "Art & Print",
    fashion: "Fashion",
    food: "Food & Drink",
    craft: "Craft & Home",
    beauty: "Beauty"
  };
  return map[cat] || cat;
}

function renderVendors() {
  const grid = document.getElementById("vendorGrid");
  const filtered = getFilteredVendors();
  const toShow = filtered.slice(0, visibleCount);

  grid.innerHTML = toShow.map(createVendorCard).join("");

  // Observe new cards for fade-in
  observeFadeElements();

  // Load more visibility
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.style.display = filtered.length > visibleCount ? "inline-flex" : "none";
  }

  // Attach follow handlers
  document.querySelectorAll(".vendor-card__follow").forEach(btn => {
    btn.addEventListener("click", handleFollow);
  });
}

function handleFollow(e) {
  e.stopPropagation();
  const id = parseInt(e.currentTarget.dataset.id);
  const vendor = VENDORS.find(v => v.id === id);

  if (followedShops.has(id)) {
    followedShops.delete(id);
    vendor.followers -= 1;
    showToast(`Unfollowed ${vendor.name}`);
  } else {
    followedShops.add(id);
    vendor.followers += 1;
    showToast(`Now following ${vendor.name} ✦`);
  }
  renderVendors();
}

/* ---- Filter Buttons ------------------------------------- */
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      visibleCount = 6;
      renderVendors();
    });
  });
}

/* ---- Load More ----------------------------------------- */
function initLoadMore() {
  const btn = document.getElementById("loadMoreBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    visibleCount += 4;
    renderVendors();
    showToast("Loaded more vendors");
  });
}

/* ---- Nav Scroll Effect ---------------------------------- */
function initNav() {
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });
}

/* ---- Hamburger / Mobile Menu --------------------------- */
function initHamburger() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    // Animate bars
    const spans = btn.querySelectorAll("span");
    if (open) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  document.querySelectorAll(".mob-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.querySelectorAll("span").forEach(s => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    });
  });
}

/* ---- Modal --------------------------------------------- */
function initModal() {
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");
  const tabs = document.querySelectorAll(".modal__tab");

  function openModal() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.getElementById("loginBtn")?.addEventListener("click", () => {
    setTab("login");
    openModal();
  });
  document.getElementById("signupBtn")?.addEventListener("click", () => {
    setTab("signup");
    openModal();
  });
  document.getElementById("openShopBtn")?.addEventListener("click", () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  });

  closeBtn?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", e => { if (e.target === overlay) closeModal(); });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  function setTab(tab) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
    document.getElementById("signupPane").classList.toggle("hidden", tab !== "signup");
    document.getElementById("loginPane").classList.toggle("hidden", tab !== "login");
  }

  tabs.forEach(t => {
    t.addEventListener("click", () => setTab(t.dataset.tab));
  });
}

/* ---- Join Form ----------------------------------------- */
function initJoinForm() {
  const btn = document.getElementById("createShopBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const name  = document.getElementById("shopName")?.value.trim();
    const email = document.getElementById("shopEmail")?.value.trim();
    const cat   = document.getElementById("shopCategory")?.value;

    if (!name) { showToast("Please enter your shop name"); return; }
    if (!email || !email.includes("@")) { showToast("Please enter a valid email"); return; }
    if (!cat) { showToast("Please select a category"); return; }

    btn.textContent = "Opening your shop…";
    btn.disabled = true;

    setTimeout(() => {
      showToast(`🎉 Welcome to NILE, ${name}!`);
      btn.textContent = "✓ Shop created!";
      document.getElementById("shopName").value = "";
      document.getElementById("shopEmail").value = "";
      document.getElementById("shopCategory").value = "";
      setTimeout(() => {
        btn.textContent = "Create my shop →";
        btn.disabled = false;
      }, 3000);
    }, 1600);
  });
}

/* ---- Intersection Observer (fade-in) ------------------- */
let observer;
function observeFadeElements() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

function initFadeObserver() {
  // For static elements outside the grid
  document.querySelectorAll(".how__step, .testimonial, .join__text, .join__form-card").forEach(el => {
    el.classList.add("fade-in");
  });
  observeFadeElements();
}

/* ---- Toast ---------------------------------------------- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* ---- Smooth Anchor Nav ---------------------------------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ---- Init ---------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderVendors();
  initFilters();
  initLoadMore();
  initNav();
  initHamburger();
  initModal();
  initJoinForm();
  initFadeObserver();
  initSmoothAnchors();
});