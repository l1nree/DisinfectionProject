export class Products {
  constructor({ containerSelector, onAddToCart }) {
    this.container = document.querySelector(containerSelector);
    this.onAddToCart = onAddToCart;

    this.items = [
      {
        id: "home",
        name: "Дезинфекция жилого помещения",
        price: 2500,
        description: "Дезинфекция квартир и домов.",
        image: null,
        imageAlt: "Заглушка: дезинфекция жилого помещения",
        inCart: false,
      },
      {
        id: "office",
        name: "Дезинфекция офиса",
        price: 5000,
        description: "Профессиональная обработка коммерческих помещений.",
        image: null,
        imageAlt: "Заглушка: дезинфекция офиса",
        inCart: false,
      },
      {
        id: "roaches",
        name: "Обработка от тараканов",
        price: 3000,
        description: "Эффективная дезинсекция помещения.",
        image: null,
        imageAlt: "Заглушка: обработка от тараканов",
        inCart: false,
      },
    ];
  }

  init() {
    if (!this.container) return;

    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.container.addEventListener("click", (event) => {
      const button = event.target.closest("[data-product-id]");

      if (!button || button.disabled) return;

      const product = this.getById(button.dataset.productId);

      if (!product || product.inCart) return;

      this.onAddToCart(product);
      this.setInCart(product.id, true);
    });
  }

  getById(productId) {
    return this.items.find((product) => product.id === productId);
  }

  setInCart(productId, inCart) {
    const product = this.getById(productId);

    if (!product) return;

    product.inCart = inCart;
    this.render();
  }

  clearCartState() {
    this.items.forEach((product) => {
      product.inCart = false;
    });

    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.replaceChildren();

    const fragment = document.createDocumentFragment();

    this.items.forEach((product) => {
      fragment.append(this.createCard(product));
    });

    this.container.append(fragment);
  }

  createCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = this.createImage(product);
    const title = document.createElement("h3");
    const price = document.createElement("p");
    const description = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = product.name;

    price.className = "product-price";
    price.textContent = `от ${this.formatPrice(product.price)}`;

    description.textContent = product.description;

    button.className = "buy-btn";
    button.type = "button";
    button.dataset.productId = product.id;
    button.disabled = product.inCart;
    button.textContent = product.inCart
      ? "Добавлено в корзину"
      : "Добавить в корзину";

    card.append(image, title, price, description, button);

    return card;
  }

  createImage(product) {
    if (product.image) {
      const image = document.createElement("img");

      image.className = "product-image";
      image.src = product.image;
      image.alt = product.imageAlt;

      return image;
    }

    const placeholder = document.createElement("div");

    placeholder.className = "placeholder-img";
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", product.imageAlt);
    placeholder.textContent = "Фотография услуги появится позже";

    return placeholder;
  }

  formatPrice(price) {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  }
}
