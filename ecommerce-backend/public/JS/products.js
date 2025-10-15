document.addEventListener("DOMContentLoaded", () => {
  fetch("/products")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("product-list");
      data.forEach(prod => {
        const div = document.createElement("div");
        div.innerText = `${prod.name} - ₹${prod.price}`;
        container.appendChild(div);
      });
    });
});

function addProduct() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;

  fetch("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, category, price })
  }).then(res => res.json())
    .then(() => alert("Product Added"));
}
