let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    const noOfItems = document.querySelector('.noOfItems');
    const totalAmount = document.querySelector('.total');

    // Clear the previous cart items display
    cartItemsDiv.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    // Display each cart item
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <h3>${item.name}</h3>
            <div class="cart-detail">
                <div class="mid">
                    <button onclick="decrItem(${index})">-</button>
                    <p>${item.quantity}</p>
                    <button onclick="incrItem(${index})">+</button>
                </div>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="deleteItem(${index})" class="cart-product">🗑️</button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItem);

        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    // Update the UI with total items and total amount
    noOfItems.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function incrItem(index) {
    // Increase the quantity of the item
    cart[index].quantity += 1;
    updateCart();
}

function decrItem(index) {
    // Decrease the quantity of the item, but not below 1
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        updateCart();
    }
}

function deleteItem(index) {
    // Remove the item from the cart
    cart.splice(index, 1);
    updateCart();
}

document.querySelector('.buy-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Calculate the total price of the cart
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Your total is ₹${total.toFixed(2)}. Please login to continue.`);
    
    // Redirect to login or checkout
    window.location.href = "login.html"; // replace with your login or checkout page
});

function handleBuyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Calculate the total price of the cart
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Your total is ₹${total.toFixed(2)}. Please login to continue.`);
    
    // Redirect to login or checkout
    window.location.href = "login.html"; // change if needed
}

// Initialize the cart when the page loads
updateCart();

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    this.reset();
  })
  .catch(err => {
    console.error(err);
    alert('Error sending message.');
  });
});






// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function updateCart() {
//     const cartItemsDiv = document.querySelector('.cart-items');
//     const noOfItems = document.querySelector('.noOfItems');
//     const totalAmount = document.querySelector('.total');

//     cartItemsDiv.innerHTML = '';
//     let total = 0;
//     let itemCount = 0;

//     cart.forEach((item, index) => { // Added index to use in deleteItem
//         const cartItem = document.createElement('div');
//         cartItem.classList.add('cart-item');
//         cartItem.innerHTML = `
//             <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
//             <h3>${item.name}</h3>
//             <div class="cart-detail">
//                 <div class="mid">
//                     <button onclick="decrItem(${index})">-</button>
//                     <p>${item.quantity}</p>
//                     <button onclick="incrItem(${index})">+</button>
//                 </div>
//                 <p>$${(item.price * item.quantity).toFixed(2)}</p>
//                 <button onclick="deleteItem(${index})" class="cart-product">D</button>
//             </div>
//         `;
//         cartItemsDiv.appendChild(cartItem);
//         total += item.price * item.quantity;
//         itemCount += item.quantity;
//     });

//     noOfItems.textContent = `${itemCount} items`;
//     totalAmount.textContent = `$${total.toFixed(2)}`;
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// function getTotal() { // Removed cart parameter as it is global
//     let { totalItem, cartTotal } = cart.reduce(
//         (total, cartItem) => {
//             total.cartTotal += cartItem.price * cartItem.quantity;
//             total.totalItem += cartItem.quantity;
//             return total;
//         },
//         { totalItem: 0, cartTotal: 0 }
//     );
//     const totalItemsHTML = document.querySelector(".noOfItems");
//     totalItemsHTML.innerHTML = `${totalItem} items`;
//     const totalAmountHTML = document.querySelector(".total");
//     totalAmountHTML.innerHTML = `$${cartTotal.toFixed(2)}`;
// }

// function incrItem(index) {
//     if (cart[index]) {
//         cart[index].quantity += 1;
//     }
//     updateCart();
//     getTotal();
// }

// function decrItem(index) {
//     if (cart[index] && cart[index].quantity > 1) {
//         cart[index].quantity -= 1;
//     }
//     updateCart();
//     getTotal();
// }

// function deleteItem(index) {
//     cart.splice(index, 1);
//     updateCart();
//     getTotal();
// }

// updateCart();
// getTotal();





