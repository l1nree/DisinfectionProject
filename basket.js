export class Basket {
  constructor() {
    this.items = [];

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
    // Открытие корзины
    this.basketButton.addEventListener("click", () => {
      this.open();
    });

    // Закрытие корзины
    this.basketClose.addEventListener("click", () => {
      this.close();
    });

    // Закрытие при клике на затемненный фон
    this.basketOverlay.addEventListener("click", (event) => {
      if (event.target === this.basketOverlay) {
        this.close();
      }
    });

    // Закрытие по Escape
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.basketOverlay.classList.contains("active")
      ) {
        this.close();
      }
    });

    // Очистка корзины
    this.basketClear.addEventListener("click", () => {
      this.clear();
    });

    // Оформление заказа
    this.basketCheckout.addEventListener("click", () => {
      // Пока ничего не делаем
    });
  }

  add(product) {
    this.items.push(product);
    this.update();
  }

  clear() {
    this.items = [];
    this.update();
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

    if (this.items.length === 0) {
      this.basketItems.innerHTML = `
                <p class="basket-empty">
                    Ваша корзина пуста
                </p>
            `;

      return;
    }

    this.basketItems.innerHTML = this.items
      .map(
        (product) => `
                    <div class="basket-item">
                        <div>
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                        </div>
                    </div>
                `,
      )
      .join("");
  }
}
