// // Function to open the popup
// function openPopup() {
//   document.getElementById("loginPopup").style.display = "flex";
// }

// // Function to close the popup
// function closePopup() {
//   document.getElementById("loginPopup").style.display = "none";
// }

// // Show the popup when the page loads
// window.onload = function() {
//   openPopup();
// // };

// // Handle form submission
// document.getElementById("loginForm").onsubmit = function(event) {
//   event.preventDefault(); // Prevent form submission

//   var role = document.getElementById("role").value;

//   // Redirect based on selected role
//   if (role === "guest") {
//     window.location.href = "guest_dashboard.html";
//   } else if (role === "user") {
//     window.location.href = "user_dashboard.html";
//   } else if (role === "admin") {
//     window.location.href = "admin_dashboard.html";
//   } else if (role === "seller") {
//     window.location.href = "seller_dashboard.html";
//   }
// };
