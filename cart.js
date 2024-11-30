let cart = [];

function addToCart(product, price) {
    const confirmation = confirm(`Do you want to add ${product} to your cart for $${price}?`);
    if (confirmation) {
        cart.push({ product, price });
        showAlert(`${product} has been added to your cart. Price: $${price}`, 'success');
        saveCart();
    } else {
        showAlert(`${product} was not added to your cart.`, 'error');
    }
}

function showAlert(message, type) {
    // Create alert box element
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    if (type === 'success') {
        alertBox.style.backgroundColor = '#4caf50'; // Green for success
    } else {
        alertBox.style.backgroundColor = '#f44336'; // Red for error
    }
    alertBox.innerText = message;

    // Append to body
    document.body.appendChild(alertBox);

    // Show alert
    setTimeout(() => {
        alertBox.classList.add('show');
    }, 100);

    // Hide alert after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 500);
    }, 3500);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'product';
        itemDiv.innerHTML = `<span>${item.product}</span><span>$${item.price}</span>`;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price;
    });

    cartTotal.innerText = `Total: $${total}`;
}

function checkout() {
    alert('Proceeding to checkout...');
    // Implement checkout logic here
}

document.addEventListener("DOMContentLoaded", function() {
    // Alert will be shown when the page loads and fades out after 2 seconds
    const loadingAlert = document.getElementById("loadingAlert");
    setTimeout(() => {
        loadingAlert.style.display = 'none';
    }, 5000); // Hides after 5 seconds (3 seconds fade out, 2 seconds delay)

    if (window.location.pathname.includes('cart.html')) {
        loadCart();
        displayCart();
    }
});
