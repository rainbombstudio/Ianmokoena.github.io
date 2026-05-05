const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".primary-menu a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-35% 0px -50% 0px",
    threshold: [0.15, 0.35, 0.65],
  }
);

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy || "";

    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Copied";
      button.classList.add("is-copied");
      window.setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("is-copied");
      }, 1600);
    } catch {
      button.textContent = "Select";
    }
  });
});
