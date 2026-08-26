import { Navigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Инициализация навигации
  const siteNavigation = new Navigation(".nav-links");
  siteNavigation.init();

  // Обработка продуктов перенесена в main.js согласно ограничению структуры
  const productsGrid = document.querySelector(".products-grid");
  if (productsGrid) {
    productsGrid.addEventListener("click", (event) => {
      if (event.target.classList.contains("buy-btn")) {
        const productId = event.target.dataset.product;
        console.log(`[Action] Подготовка покупки. Товар ID: ${productId}`);
      }
    });
  }
});
