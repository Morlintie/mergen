import { ordersData } from "../data/orders-data.js";
import { checkoutData } from "../data/checkout-data.js";
import { parameterData } from "../data/tracking-data.js";

function generateOrders() {
  let storeHTML = "";
  let dayArray = [];

  ordersData.forEach((order) => {
    let indicator = "";
    let sum = 0;
    let sumBeforeTax = 0;
    let estimatedTax = 0;
    let displayCost = 0;
    ordersData.forEach((value) => {
      if (value.orderDay === order.orderDay) {
        sumBeforeTax +=
          value.priceCents * value.quantity + value.shipping.shippingCost;
        estimatedTax = sumBeforeTax / 10;
        sum = sumBeforeTax + estimatedTax;
      }
      displayCost = (Math.round(sum) / 100).toFixed(2);
    });

    dayArray.forEach((day) => {
      if (day.orderDay === order.orderDay) {
        day.page += ` <div class="product-image-container">
              <img src=${order.image} />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${order.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${order.arrivingDay}</div>
              <div class="product-quantity">Quantity: ${order.quantity}</div>
              <button class="buy-again-button button-primary buy-again-button-js "  data-order-button-id = "${order.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.orderId}">
                <button data-track-id ="${order.orderId}" 
                class="track-package-button button-secondary track-package-button-js"
                data-track-id = "">
                  Track package
                </button>
              </a>
            </div>`;
        indicator = "yes";
      }
    });
    if (indicator !== "yes") {
      storeHTML += `<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderDay}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${displayCost}
                 
                 
              
              </div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div data-grid-id = "${order.orderDay}" class="order-details-grid order-details-grid-js">
          
          </div>
        </div>`;
      dayArray.push({
        page: ` <div class="product-image-container">
              <img
                src=${order.image}
              />
            </div>

            <div class="product-details">
              <div class="product-name">${order.name}</div>
              <div class="product-delivery-date">Arriving on: ${order.arrivingDay}</div>
              <div class="product-quantity">Quantity: ${order.quantity}</div>
              <button class="buy-again-button button-primary buy-again-button-js
              " data-order-button-id = "${order.id}"
             >
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.orderId}">
                <button data-track-id = "${order.orderId}"
                class="track-package-button button-secondary track-package-button-js">
                  Track package
                </button>
              </a>
            </div>`,
        orderDay: order.orderDay,
      });
    }
  });

  document.querySelector(".orders-grid-js").innerHTML = storeHTML;

  dayArray.forEach((day) => {
    document.querySelectorAll(".order-details-grid-js").forEach((grid) => {
      if (day.orderDay === grid.dataset.gridId) {
        grid.innerHTML = day.page;
      }
    });
  });

  let cartQuantity = document.querySelector(".cart-quantity-js");
  let cartSum = 0;
  function countOrders() {
    cartSum = 0;
    checkoutData.forEach((order) => {
      cartSum += order.quantity;
    });
    cartQuantity.innerHTML = `${cartSum}`;
  }

  countOrders();

  document.querySelectorAll(".buy-again-button-js").forEach((button) => {
    button.addEventListener("click", () => {
      ordersData.forEach((order) => {
        let indicator = "";
        if (order.id === button.dataset.orderButtonId) {
          checkoutData.forEach((value) => {
            if (value.id === order.id) {
              indicator = "yes";
            }
          });
          if (indicator !== "yes") {
            checkoutData.push({
              id: order.id,
              image: order.image,
              keywords: order.keywords,
              name: order.name,
              priceCents: order.priceCents,
              quantity: order.quantity,
              rating: order.rating,
              shipping: order.shipping,
            });
          }
        }
      });
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      window.location.href = "checkout.html";
      generateOrders();
    });
  });

  document.querySelectorAll(".track-package-button-js").forEach((button) => {
    button.addEventListener("click", () => {
      ordersData.forEach((order) => {
        let indicator = "";
        if (order.orderId === button.dataset.trackId) {
          parameterData.forEach((param) => {
            if (param.orderId === order.orderId) {
              indicator = "yes";
            }
          });
          if (indicator !== "yes") {
            parameterData.push({
              arrivingDay: order.arrivingDay,
              id: order.id,
              image: order.image,
              keywords: order.keywords,
              name: order.name,
              orderDay: order.orderDay,
              orderId: order.orderId,
              priceCents: order.priceCents,
              quantity: order.quantity,
              rating: order.rating,
              shipping: order.shipping,
            });
          }
        }
      });
      localStorage.setItem("parameterData", JSON.stringify(parameterData));
    });
  });
}

generateOrders();
