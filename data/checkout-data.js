import { products } from "./products.js";
export let checkoutData =
  JSON.parse(localStorage.getItem("checkoutData")) || [];
localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

export function saveCheckoutData(button, selectValue) {
  let indicator = "";
  checkoutData.forEach((care) => {
    if (care.id === button.dataset.productId) {
      indicator = "contain";
      care.quantity = care.quantity + selectValue;
    }
  });

  if (indicator === "contain") {
  } else {
    products.forEach((value) => {
      if (value.id === button.dataset.productId) {
        checkoutData.push({
          name: value.name,
          quantity: selectValue,
          id: value.id,
          priceCents: value.priceCents,
          image: value.image,
          rating: value.rating,
          keywords: value.keywords,
          shipping: {
            shippingDay: 7,
            shippingId: "1",
            shippingCost: 0,
          },
        });
      }
    });
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  }
}
