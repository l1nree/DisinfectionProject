import { Basket } from "./basket.js";
import { Navigation } from "./navigation.js";
import { Products } from "./products.js";

document.addEventListener("DOMContentLoaded", () => {
  const siteNavigation = new Navigation(".nav-links");
  siteNavigation.init();

  let products;

  const basket = new Basket({
    onClear: () => {
      products.clearCartState();
    },
  });

  products = new Products({
    containerSelector: ".products-grid",
    onAddToCart: (product) => {
      basket.add(product);
    },
  });

  basket.init();
  products.init();
});
