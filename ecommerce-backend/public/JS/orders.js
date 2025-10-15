document.addEventListener("DOMContentLoaded", () => {
  fetch("/orders")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("orders-list");
      data.forEach(order => {
        const div = document.createElement("div");
        div.innerText = `Order #${order._id} - ${order.status}`;
        container.appendChild(div);
      });
    });
});
