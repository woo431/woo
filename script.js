const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = new FormData(contactForm).get("name");
  formStatus.textContent = `${name}님, 메시지를 확인했습니다. 곧 답변드릴게요!`;
  contactForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
