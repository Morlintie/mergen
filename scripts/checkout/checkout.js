import { checkoutData } from "../../data/checkout-data.js";
import {
  setShippingOne,
  setShippingTwo,
  setShippingThree,
  generateShipping,
  setShippingTitle,
} from "./shipping.js";
import { orderSummary } from "./calculation-checkout.js";
import { ordersData } from "../../data/orders-data.js";

export function allCheckoutJs() {
  let displaySummary = document.querySelector(".order-summary");
  let checkoutHeader = document.querySelector(".checkout-header-js");
  let html = "";

  generateHTML();
  displayHeader();

  document.querySelector(".payment-summary").innerHTML = orderSummary();

  function displayHeader() {
    let store = 0;
    checkoutData.forEach((product) => {
      store += product.quantity;
    });
    checkoutHeader.innerHTML = `${store} items`;
  }

  function generateHTML() {
    html = "";
    checkoutData.forEach((product) => {
      html += `  <div class="cart-item-container">
            ${setShippingTitle(product)}

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src=${product.image}
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">${(product.priceCents / 100).toFixed(
                  2
                )}</div>
                <div class="product-quantity product-quantity-js "
              >
                  <span> Quantity: <span class="quantity-label quantity-label-js  "
                  data-label-id = "${product.id}">${
        product.quantity
      }</span> </span>
                  <span class="update-quantity-link link-primary update-quantity-link-js "
                data-update-id = "${product.id}" >
                    Update
                  </span>
                  <input class="quantity-input  update-bar-js"
                  data-bar-id = "${product.id}"
                  type="text">
                  <span
                  data-save-id = "${product.id}"
                   class="save-quantity-link save-button-js link-primary">Save</span>
                  
                  <span class="delete-quantity-link link-primary delete-quantity-link-js" 
                  data-delete-id = "${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                 ${generateShipping(product)}
              </div>
            </div>
          </div>`;
    });
    displaySummary.innerHTML = html;
  }

  function deleteFunction() {
    document.querySelectorAll(".delete-quantity-link-js").forEach((button) => {
      button.addEventListener("click", () => {
        for (let i = 0; i < checkoutData.length; i++) {
          if (button.dataset.deleteId === checkoutData[i].id) {
            checkoutData.splice(i, 1);
          }
        }

        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

        generateHTML();
        deleteFunction();
        displayHeader();
        enableUpdate();
        updateCart();
        updateQuantity();
        allCheckoutJs();
      });
    });
  }

  deleteFunction();
  enableUpdate();
  updateCart();
  updateQuantity();
  setShippingOne();
  setShippingTwo();
  setShippingThree();

  function enableUpdate() {
    document.querySelectorAll(".update-quantity-link-js").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("update-quantity-button");
        document.querySelectorAll(".quantity-label-js").forEach((label) => {
          if (label.dataset.labelId === button.dataset.updateId) {
            label.classList.add("quantity-label-button");
          }
        });
        document.querySelectorAll(".update-bar-js").forEach((bar) => {
          if (bar.dataset.barId === button.dataset.updateId) {
            bar.classList.remove("quantity-input");
            bar.classList.add("update-bar");
          }
        });

        document.querySelectorAll(".save-button-js").forEach((save) => {
          if (save.dataset.saveId === button.dataset.updateId) {
            save.classList.remove("save-quantity-link");
            save.classList.add("save-button");
          }
        });
      });
    });
  }

  function updateCart() {
    document.querySelectorAll(".save-button-js").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".update-bar-js").forEach((bar) => {
          if (button.dataset.saveId === bar.dataset.barId) {
            checkoutData.forEach((product) => {
              if (bar.dataset.barId === product.id) {
                if (Number(bar.value) >= 0) {
                  product.quantity = Number(bar.value);
                } else {
                  alert("Product quantity cannot be negative");
                }
              }
            });
            bar.classList.remove("update-bar");
            bar.classList.add("quantity-input");
          }
        });
        button.classList.add("save-quantity-link");
        button.classList.remove("save-button");

        document
          .querySelectorAll(".update-quantity-link-js")
          .forEach((update) => {
            if (update.dataset.updateId === button.dataset.saveId) {
              update.classList.remove("update-quantity-button");
            }
          });

        document.querySelectorAll(".quantity-label-js").forEach((label) => {
          if (label.dataset.labelId === button.dataset.saveId) {
            label.classList.remove("quantity-label-button");
          }
        });
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
        generateHTML();
        deleteFunction();
        displayHeader();
        enableUpdate();
        updateCart();
        updateQuantity();
        allCheckoutJs();
      });
    });
  }

  function updateQuantity() {
    document.querySelectorAll(".update-bar-js").forEach((button) => {
      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          checkoutData.forEach((product) => {
            if (product.id === button.dataset.barId) {
              if (Number(button.value) >= 0) {
                product.quantity = Number(button.value);
              } else {
                alert("Product quantity cannot be negative");
              }
            }
          });

          button.classList.remove("update-bar");
          button.classList.add("quantity-input");
          document.querySelectorAll(".save-button-js").forEach((save) => {
            save.classList.add("save-quantity-link");
            save.classList.remove("save-button");
            document
              .querySelectorAll(".update-quantity-link-js")
              .forEach((update) => {
                if (update.dataset.updateId === button.dataset.saveId) {
                  update.classList.remove("update-quantity-button");
                }
              });

            document.querySelectorAll(".quantity-label-js").forEach((label) => {
              if (label.dataset.labelId === button.dataset.saveId) {
                label.classList.remove("quantity-label-button");
              }
            });
            localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
            generateHTML();
            deleteFunction();
            displayHeader();
            enableUpdate();
            updateCart();
            updateQuantity();
            allCheckoutJs();
          });
        }
      });
    });
  }
  document
    .querySelector(".place-order-button-js")
    .addEventListener("click", () => {
      window.location.href = "orders.html";
      checkoutData.forEach((order) => {
        ordersData.push({
          id: order.id,
          image: order.image,
          keywords: order.keywords,
          name: order.name,
          priceCents: order.priceCents,
          quantity: order.quantity,
          rating: order.rating,
          shipping: order.shipping,
          orderDay: dayjs().format("dddd, MMMM D"),
          arrivingDay: generateArrivingDay(order),
          orderId: crypto.randomUUID(),
        });
      });
      localStorage.setItem("ordersData", JSON.stringify(ordersData));
      checkoutData.splice(0, checkoutData.length);
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    });

  function generateArrivingDay(order) {
    let arrivingDay = dayjs()
      .add(order.shipping.shippingDay, "days")
      .format("dddd");
    if (arrivingDay === "Saturday") {
      arrivingDay = dayjs()
        .add(order.shipping.shippingDay + 2, "days")
        .format("dddd, MMMM D");
    } else if (arrivingDay === "Sunday") {
      arrivingDay = dayjs()
        .add(order.shipping.shippingDay + 1, "days")
        .format("dddd, MMMM D");
    } else {
      arrivingDay = dayjs()
        .add(order.shipping.shippingDay, "days")
        .format("dddd, MMMM D");
    }

    return arrivingDay;
  }
}

allCheckoutJs();
