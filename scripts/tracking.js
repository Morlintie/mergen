import { parameterData } from "../data/tracking-data.js";
import { checkoutData } from "../data/checkout-data.js";

let url = new URL(window.location.href);
let pageId = url.searchParams.get("orderId");
let html = "";
parameterData.forEach((param) => {
  if (param.orderId === pageId) {
    html = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">${param.arrivingDay}</div>

        <div class="product-info">
          ${param.name}
        </div>

        <div class="product-info">Quantity: ${param.quantity}</div>

        <img
          class="product-image"
          src=${param.image}
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    
    `;
  }
});

function sumCheckout() {
  let sum = 0;
  checkoutData.forEach((check) => {
    sum += check.quantity;
  });
  return sum;
}

document.querySelector(".order-tracking").innerHTML = html;

document.querySelector(".cart-quantity").innerHTML = sumCheckout();
