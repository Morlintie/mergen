import { checkoutData, saveCheckoutData } from "../data/checkout-data.js";
import { products } from "../data/products.js";

let productsGrid = document.querySelector(".products-grid");
let html = "";
products.forEach((value) => {
  html += `  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${value.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${value.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              value.rating.count
            }</div>
          </div>

          <div class="product-price">${(value.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class ="select-button-js"
            data-select-id = "${value.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer">
          
         ${
           value.sizeChartLink === "images/clothing-size-chart.png"
             ? `<a href="images/clothing-size-chart.png">size chart</a>`
             : ""
         }
          
          </div>

          <div class="added-to-cart added-to-cart-js" data-added-id = "${
            value.id
          }">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button add-to-cart-button-js button-primary"
          data-product-id = "${value.id}">Add to Cart</button>
        </div>`;
});

productsGrid.innerHTML = html;
let DisplayCart = 0;
checkoutData.forEach((value) => {
  DisplayCart += value.quantity;
});
let cartQuantity = document.querySelector(".cart-quantity");
cartQuantity.innerHTML = DisplayCart;
let cartSum = 0;
let selectValue = 0;

function displayAdded(button) {
  document.querySelectorAll(".added-to-cart-js").forEach((add) => {
    if (add.dataset.addedId === button.dataset.productId) {
      add.classList.add("visible-added");
      setTimeout(() => {
        add.classList.remove("visible-added");
      }, 2000);
    }
  });
}

function getItemFromBar(button) {
  document.querySelectorAll(".select-button-js").forEach((select) => {
    if (button.dataset.productId === select.dataset.selectId) {
      selectValue += Number(select.value);
    }
  });
}

function displayCart() {
  checkoutData.forEach((product) => {
    cartSum += product.quantity;
  });
  cartQuantity.innerHTML = `${cartSum}`;
}
document.querySelectorAll(".add-to-cart-button-js").forEach((button) => {
  button.addEventListener("click", () => {
    cartSum = 0;
    selectValue = 0;

    clearTimeout();
    displayAdded(button);
    getItemFromBar(button);
    saveCheckoutData(button, selectValue);
    displayCart();
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  });
});
