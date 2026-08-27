export class Navigation {
  constructor(navSelector) {
    this.navContainer = document.querySelector(navSelector);

    this.links = this.navContainer
      ? [...this.navContainer.querySelectorAll('a[href^="#"]')]
      : [];

    this.sections = this.links
      .map((link) => {
        const sectionId = link.getAttribute("href");
        return document.querySelector(sectionId);
      })
      .filter(Boolean);

    this.observer = null;
  }

  init() {
    if (!this.navContainer || this.links.length === 0) return;

    this.bindLinkEvents();
    this.observeSections();
    this.setActiveByHash();
  }

  bindLinkEvents() {
    this.links.forEach((link) => {
      link.addEventListener("click", () => {
        const sectionId = link.getAttribute("href");
        this.setActive(sectionId);
      });
    });
  }

  observeSections() {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstSection, secondSection) =>
              secondSection.intersectionRatio - firstSection.intersectionRatio,
          );

        if (visibleSections.length === 0) return;

        const currentSection = visibleSections[0].target;
        this.setActive(`#${currentSection.id}`);
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    this.sections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  setActive(sectionId) {
    this.links.forEach((link) => {
      const isCurrentSection = link.getAttribute("href") === sectionId;

      link.classList.toggle("active", isCurrentSection);

      if (isCurrentSection) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  setActiveByHash() {
    const sectionExists = this.sections.some(
      (section) => `#${section.id}` === window.location.hash,
    );

    if (sectionExists) {
      this.setActive(window.location.hash);
      return;
    }

    const firstLink = this.links[0];

    if (firstLink) {
      this.setActive(firstLink.getAttribute("href"));
    }
  }
}
