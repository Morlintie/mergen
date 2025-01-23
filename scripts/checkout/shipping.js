import { checkoutData } from "../../data/checkout-data.js";
import { allCheckoutJs } from "./checkout.js";

export function generateShipping(product) {
  let today = dayjs();
  let addSeven = today.add(7, "days").format("dddd, MMMM D");
  let addThree = today.add(3, "days").format("dddd, MMMM D");
  let addNone = today.format("dddd, MMMM D");

  if (dayjs().format("dddd") === "Saturday") {
    addSeven = today.add(9, "days").format("dddd, MMMM D");
    addNone = today.add(2, "days").format("dddd, MMMM D");
  }

  if (dayjs().format("dddd") === "Sunday") {
    addSeven = today.add(8, "days").format("dddd, MMMM D");
    addNone = today.add(1, "days").format("dddd, MMMM D");
  }

  if (dayjs().format("dddd") === "Wednesday") {
    addThree = today.add(5, "days").format("dddd, MMMM D");
  }

  if (dayjs().format("dddd") === "Thursday") {
    addThree = today.add(4, "days").format("dddd, MMMM D");
  }

  let html = "";

  html = `<div class="delivery-options-title">
    Choose a delivery option:
  </div>
  <div class="delivery-option">
    <input
      type="radio"
     ${product.shipping.shippingId === "1" ? "checked" : ""}
      class="delivery-option-input shipping-button-one"
      data-button-one-id = "${product.id}"
      name="${product.id}"
    />
    <div>
      <div class="delivery-option-date">${addSeven}</div>
      <div class="delivery-option-price">FREE Shipping</div>
    </div>
  </div>
  <div class="delivery-option">
    <input
      type="radio"
       ${product.shipping.shippingId === "2" ? "checked" : ""}
      class="delivery-option-input shipping-button-two"
      data-button-two-id = "${product.id}"
      name="${product.id}"
    />
    <div>
      <div class="delivery-option-date">${addThree}</div>
      <div class="delivery-option-price">$4.99 - Shipping</div>
    </div>
  </div>
  <div class="delivery-option">
    <input
      type="radio"
       ${product.shipping.shippingId === "3" ? "checked" : ""}
      class="delivery-option-input shipping-button-three"
      data-button-three-id = "${product.id}"
      name="${product.id}"
    />
    <div>
      <div class="delivery-option-date">${addNone}</div>
      <div class="delivery-option-price">$9.99 - Shipping</div>
    </div>
  </div>`;
  return html;
}

export function setShippingOne() {
  document.querySelectorAll(".shipping-button-one").forEach((buttonOne) => {
    buttonOne.addEventListener("click", () => {
      checkoutData.forEach((shippingItem) => {
        if (buttonOne.dataset.buttonOneId === shippingItem.id) {
          shippingItem.shipping.shippingId = "1";
          shippingItem.shipping.shippingDay = 7;
          shippingItem.shipping.shippingCost = 0;
        }
      });
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

      allCheckoutJs();
    });
  });
}

export function setShippingTwo() {
  document.querySelectorAll(".shipping-button-two").forEach((buttonTwo) => {
    buttonTwo.addEventListener("click", () => {
      checkoutData.forEach((shippingItem) => {
        if (shippingItem.id === buttonTwo.dataset.buttonTwoId) {
          shippingItem.shipping.shippingId = "2";
          shippingItem.shipping.shippingDay = 3;
          shippingItem.shipping.shippingCost = 499;
        }
      });
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

      allCheckoutJs();
    });
  });
}

export function setShippingThree() {
  document.querySelectorAll(".shipping-button-three").forEach((buttonThree) => {
    buttonThree.addEventListener("click", () => {
      checkoutData.forEach((shippingItem) => {
        if (shippingItem.id === buttonThree.dataset.buttonThreeId) {
          shippingItem.shipping.shippingId = "3";
          shippingItem.shipping.shippingDay = 0;
          shippingItem.shipping.shippingCost = 999;
        }
      });
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

      allCheckoutJs();
    });
  });
}

export function setShippingTitle(product) {
  let today = dayjs();
  let deliveryDay = today
    .add(product.shipping.shippingDay, "days")
    .format("dddd");
  if (deliveryDay === "Saturday") {
    deliveryDay = today
      .add(product.shipping.shippingDay + 2, "days")
      .format("dddd, MMMM D");
  } else if (deliveryDay === "Sunday") {
    deliveryDay = today
      .add(product.shipping.shippingDay + 1, "days")
      .format("dddd, MMMM D");
  } else {
    deliveryDay = today
      .add(product.shipping.shippingDay, "days")
      .format("dddd, MMMM D");
  }

  let html = `  <div 
  data-delivery-id = "${product.id}"
  class="delivery-date">Delivery date: ${deliveryDay}</div>`;

  return html;
}
