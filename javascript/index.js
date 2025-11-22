// Script . js - Interactivité basique
document.addEventListener("DOMContentLoaded", function () {
  // Menu mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
      const isExpanded = menuToggle.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });
  }

  // Fermer le menu en cliquant sur un lien
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // ANIMATIONS AU SCROLL
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les éléments à animer
  const elementsToAnimate = document.querySelectorAll(
    ".skill-card, .project-card, .service-card"
  );

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });

  // Gestion du formulaire de contact
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Alerte de confirmation
      const formMessage = contactForm.querySelector(".form-message");

      formMessage.textContent = "Envoi en cours...";
      formMessage.className = "form-message";

      setTimeout(() => {
        formMessage.textContent =
          "Merci pour votre message ! Je vous répondrai rapidement.";
        formMessage.classList.add("success");
        contactForm.reset();
      }, 1000);
    });
  }

  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
