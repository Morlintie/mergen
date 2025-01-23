import { checkoutData } from "../../data/checkout-data.js";

export function orderSummary() {
  let totalItems = 0;
  let totalProductCost = 0;
  let totalShippingCost = 0;
  checkoutData.forEach((product) => {
    totalItems += product.quantity;
    totalProductCost += product.quantity * product.priceCents;
    totalShippingCost += product.shipping.shippingCost;
  });
  let totalBeforeTax = totalProductCost + totalShippingCost;
  let estimatedTax = (totalBeforeTax * 1) / 10;
  let totalCost = totalBeforeTax + estimatedTax;

  let html = `   <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">${(
              Math.round(totalProductCost) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${(
              Math.round(totalShippingCost) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${(
              Math.round(totalBeforeTax) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${(
              Math.round(estimatedTax) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${(
              Math.round(totalCost) / 100
            ).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary place-order-button-js">
            Place your order
          </button> `;

  return html;
}
