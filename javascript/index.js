document.addEventListener("DOMContentLoaded", () => {
  /* 1. GESTION DU MENU MOBILE */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");

  if (menuToggle && nav) {
    // Ouvrir / Fermer
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.classList.toggle("active");
      nav.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });

    // Fermer au clic sur un lien
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* 2. ANIMATIONS AU SCROLL (INTERSECTION OBSERVER) */
  const observerOptions = {
    root: null,
    threshold: 0.1, // 10% de l'élément visible pour déclencher
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target); // On arrête d'observer une fois animé
      }
    });
  }, observerOptions);

  // On observe les sections et les cartes
  const elementsToAnimate = document.querySelectorAll(
    "section, .skill-card, .project-card, .service-card"
  );
  elementsToAnimate.forEach((el) => observer.observe(el));
});
