export class Basket {
  constructor({ onClear } = {}) {
    this.items = [];
    this.onClear = onClear;

    this.basketButton = document.querySelector("#basketButton");
    this.basketOverlay = document.querySelector("#basketOverlay");
    this.basketClose = document.querySelector("#basketClose");
    this.basketItems = document.querySelector("#basketItems");
    this.basketClear = document.querySelector("#basketClear");
    this.basketCheckout = document.querySelector("#basketCheckout");
    this.basketCounter = document.querySelector("#basketCounter");
  }

  init() {
    if (!this.basketButton || !this.basketOverlay) return;

    this.bindEvents();
    this.update();
  }

  bindEvents() {
    this.basketButton.addEventListener("click", () => {
      this.open();
    });

    if (this.basketClose) {
      this.basketClose.addEventListener("click", () => {
        this.close();
      });
    }

    this.basketOverlay.addEventListener("click", (event) => {
      if (event.target === this.basketOverlay) {
        this.close();
      }
    });

    document.addEventListener("keydown", (event) => {
      const isOpen = this.basketOverlay.classList.contains("active");

      if (event.key === "Escape" && isOpen) {
        this.close();
      }
    });

    if (this.basketClear) {
      this.basketClear.addEventListener("click", () => {
        this.clear();
      });
    }

    if (this.basketCheckout) {
      this.basketCheckout.addEventListener("click", () => {
        // Логику оформления добавим на следующем этапе.
      });
    }
  }

  add(product) {
    const alreadyAdded = this.items.some((item) => item.id === product.id);

    if (alreadyAdded) return;

    this.items.push(product);
    this.update();
  }

  clear() {
    if (this.items.length === 0) return;

    this.items = [];
    this.update();

    if (this.onClear) {
      this.onClear();
    }
  }

  open() {
    this.basketOverlay.classList.add("active");
    document.body.classList.add("basket-open");
  }

  close() {
    this.basketOverlay.classList.remove("active");
    document.body.classList.remove("basket-open");
  }

  update() {
    this.updateCounter();
    this.renderItems();
  }

  updateCounter() {
    if (!this.basketCounter) return;

    this.basketCounter.textContent = this.items.length;
  }

  renderItems() {
    if (!this.basketItems) return;

    this.basketItems.replaceChildren();

    if (this.items.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "basket-empty";
      emptyMessage.textContent = "Ваша корзина пуста";

      this.basketItems.append(emptyMessage);
      return;
    }

    const fragment = document.createDocumentFragment();

    this.items.forEach((product) => {
      const item = document.createElement("div");
      item.className = "basket-item";

      const content = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = product.name;

      const description = document.createElement("p");
      description.textContent = product.description;

      content.append(title, description);
      item.append(content);
      fragment.append(item);
    });

    this.basketItems.append(fragment);
  }
}
