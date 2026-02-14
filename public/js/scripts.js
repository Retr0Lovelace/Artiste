const cartBtn = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");
const articleMainBtn = document.querySelector(".article-btn");
const articleAddLinks = document.querySelectorAll(".article-add-to-cart");

// Gestion du panneau panier (seulement si les éléments existent sur la page)
function openPanier(e) {
  if (e) e.preventDefault();
  cartPanel.classList.add("active");
  overlay.classList.add("active");
}

if (cartPanel && overlay && closeCart) {
  if (cartBtn) {
    cartBtn.addEventListener("click", openPanier);
  }

  if (articleMainBtn) {
    articleMainBtn.addEventListener("click", openPanier);
  }

  if (articleAddLinks && articleAddLinks.length > 0) {
    articleAddLinks.forEach((link) => {
      link.addEventListener("click", openPanier);
    });
  }

  closeCart.addEventListener("click", closePanier);
  overlay.addEventListener("click", closePanier);
}

function closePanier() {
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
}

// Dégradé sur les headers avec .main-nav (blanc) et .main-nav-w (bleu) au scroll
const mainNavs = document.querySelectorAll(".main-nav");
const mainNavsW = document.querySelectorAll(".main-nav-w");

function updateNavGradients() {
  const scrolled = window.scrollY > 10;

  mainNavs.forEach((nav) => {
    if (scrolled) {
      nav.classList.add("has-gradient");
    } else {
      nav.classList.remove("has-gradient");
    }
  });

  mainNavsW.forEach((nav) => {
    if (scrolled) {
      nav.classList.add("has-gradient");
    } else {
      nav.classList.remove("has-gradient");
    }
  });
}

if (mainNavs.length > 0 || mainNavsW.length > 0) {
  window.addEventListener("scroll", updateNavGradients);
  updateNavGradients();
}

function resizeMasonryItem(item) {
  const grid = document.querySelector('.masonry');
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));

  const img = item.querySelector('img');
  const itemHeight = img.getBoundingClientRect().height;

  const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = `span ${rowSpan}`;
}

function resizeAllMasonryItems() {
  document.querySelectorAll('.item').forEach(item => resizeMasonryItem(item));
}

window.addEventListener('load', () => {
  resizeAllMasonryItems();

  // animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.item').forEach(item => observer.observe(item));
});

window.addEventListener('resize', resizeAllMasonryItems);

const imgoverlay = document.getElementById("image-overlay");
const overlayImg = document.getElementById("overlay-img");

/* ouvrir image */
document.addEventListener("click", (e) => {
  const img = e.target.closest(".item img");

  if (img) {
    overlayImg.src = img.src;
    imgoverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
});

/* fermer image */
imgoverlay.addEventListener("click", () => {
  imgoverlay.classList.remove("active");
  overlayImg.src = "";
  document.body.style.overflow = "";
});
