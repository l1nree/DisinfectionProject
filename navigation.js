export class Navigation {
  constructor(navSelector) {
    this.navContainer = document.querySelector(navSelector);
    this.links = this.navContainer
      ? this.navContainer.querySelectorAll("a")
      : [];
  }

  init() {
    if (!this.navContainer) return;

    this.links.forEach((link) => {
      link.addEventListener("click", () => {
        this.setActive(link);
      });
    });
  }

  setActive(clickedLink) {
    this.links.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  }
}
