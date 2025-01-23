export let parameterData =
  JSON.parse(localStorage.getItem("parameterData")) || [];
localStorage.setItem("parameterData", JSON.stringify(parameterData));
