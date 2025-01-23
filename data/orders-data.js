export let ordersData = JSON.parse(localStorage.getItem("ordersData")) || [];
localStorage.setItem("ordersData", JSON.stringify(ordersData));
