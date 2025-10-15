document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role") || "Guest";
  document.getElementById("roleInfo").innerText = "Logged in as: " + role;
});

function logout() {
  localStorage.clear();
}
