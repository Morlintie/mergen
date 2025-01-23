export let products = JSON.parse(localStorage.getItem("products")) || [];
localStorage.setItem("products", JSON.stringify(products));

async function loadProducts() {
  let response = await fetch("https://supersimplebackend.dev/products");
  let loadedProducts = await response.json();

  products = loadedProducts.map((product) => {
    if (product.type === "clothing") {
      return new Clothing(product);
    } else if (product.type === "appliance") {
      return new Appliances(product);
    } else {
      return new Products(product);
    }
  });
  localStorage.setItem("products", JSON.stringify(products));
}

loadProducts();

class Products {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(products) {
    this.id = products.id;
    this.image = products.image;
    this.name = products.name;
    this.rating = products.rating;
    this.priceCents = products.priceCents;
    this.keywords = products.keywords;
  }
}

class Clothing extends Products {
  sizeChartLink;

  constructor(products) {
    super(products);
    this.sizeChartLink = products.sizeChartLink;
  }
}

class Appliances extends Products {
  applianceInstructionsLink;
  applianceWarrantyLink;

  constructor(product) {
    super(product);
    this.applianceInstructionsLink = product.applianceInstructionsLink;
    this.applianceWarrantyLink = product.applianceWarrantyLink;
  }
}
