import { Navigation } from "./navigation.js";
import { Basket } from "./basket.js";

document.addEventListener("DOMContentLoaded", () => {
  // Навигация
  const siteNavigation = new Navigation(".nav-links");
  siteNavigation.init();

  // Корзина
  const basket = new Basket();
  basket.init();

  // Товары
  const productsGrid = document.querySelector(".products-grid");

  if (productsGrid) {
    productsGrid.addEventListener("click", (event) => {
      const button = event.target.closest(".buy-btn");

      if (!button) return;

      const productId = button.dataset.product;

      const products = {
        home: {
          name: "Дезинфекция жилого помещения",
          description: "Дезинфекция квартир и домов.",
        },

        office: {
          name: "Дезинфекция офиса",
          description: "Профессиональная обработка коммерческих помещений.",
        },

        roaches: {
          name: "Обработка от тараканов",
          description: "Эффективная дезинсекция помещения.",
        },
      };

      const product = products[productId];

      if (!product) return;

      basket.add(product);
    });
  }
});
