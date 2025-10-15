$(document).ready(function () {
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });
});

$(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productContainer = this.closest('.best-p1');
        const productName = productContainer.dataset.name;
        const productPrice = parseFloat(productContainer.dataset.price);
        const productImage = productContainer.querySelector('img').src;

        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    });
});

// ✅ Contact form submission (to your local backend)

document.querySelector('#contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const contactData = {
        name: name,
        email: email,
        message: message
    };

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
        document.querySelector('#contactForm').reset(); // Reset form after successful submission
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an issue sending your message. Please try again later.');
    });
});







// $(document).ready(function () {
//     $("a").on("click", function (event) {
//         if (this.hash !== "") {
//             event.preventDefault();

//             var hash = this.hash;
//             $("html, body").animate(
//                 {
//                     scrollTop: $(hash).offset().top,
//                 },
//                 800,
//                 function () {
//                     window.location.hash = hash;
//                 }
//             );
//         }
//     });
// });

// $(".menu-items a").click(function () {
//     $("#checkbox").prop("checked", false);
// });

// // Add to cart functionality
// document.querySelectorAll('.add-to-cart-btn').forEach(button => {
//     button.addEventListener('click', function(e) {
//         e.preventDefault();
        
//         // Find the product container
//         const productContainer = this.closest('.best-p1');
        
//         // Extract product details
//         const productName = productContainer.dataset.name;
//         const productPrice = parseFloat(productContainer.dataset.price);
//         const productImage = productContainer.querySelector('img').src;
        
//         // Create product object
//         const product = {
//             name: productName,
//             price: productPrice,
//             image: productImage,
//             quantity: 1
//         };
        
//         // Retrieve existing cart or initialize
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
//         // Check if product already exists in cart
//         const existingItem = cart.find(item => item.name === product.name);
//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//             cart.push(product);
//         }
        
//         // Save back to localStorage
//         localStorage.setItem('cart', JSON.stringify(cart));
        
//         // Redirect to cart page
//         window.location.href = 'cart.html';
//     });
// });

// // Contact form submission
// document.querySelector('form').addEventListener('submit', function(e) {
//     e.preventDefault();

//     // Get form values
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;

//     // Prepare data to send to the backend
//     const contactData = {
//         name: name,
//         email: email,
//         message: message
//     };

//     // Send data using Fetch API
//     fetch('https://your-backend-api-endpoint.com/contact', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(contactData),
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert('Message sent successfully!');
//         // Optionally, reset the form or redirect user
//         document.querySelector('form').reset();
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('There was an issue sending your message. Please try again later.');
//     });
// });




// $(document).ready(function () {
//     $("a").on("click", function (event) {
//         if (this.hash !== "") {
//             event.preventDefault();

//             var hash = this.hash;
//             $("html, body").animate(
//                 {
//                     scrollTop: $(hash).offset().top,
//                 },
//                 800,
//                 function () {
//                     window.location.hash = hash;
//                 }
//             );
//         }
//     });
// });

// $(".menu-items a").click(function () {
//     $("#checkbox").prop("checked", false);
// });
// // Add to cart functionality
// document.querySelectorAll('.add-to-cart-btn').forEach(button => {
//     button.addEventListener('click', function(e) {
//         e.preventDefault();
        
//         // Find the product container
//         const productContainer = this.closest('.best-p1');
        
//         // Extract product details
//         const productName = productContainer.dataset.name;
//         const productPrice = parseFloat(productContainer.dataset.price);
//         const productImage = productContainer.querySelector('img').src;
        
//         // Create product object
//         const product = {
//             name: productName,
//             price: productPrice,
//             image: productImage,
//             quantity: 1
//         };
        
//         // Retrieve existing cart or initialize
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
//         // Check if product already exists in cart
//         const existingItem = cart.find(item => item.name === product.name);
//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//             cart.push(product);
//         }
        
//         // Save back to localStorage
//         localStorage.setItem('cart', JSON.stringify(cart));
        
//         // Redirect to cart page
//         window.location.href = 'cart.html';
//     });
// });