// script.js

// Function to parse currency string to float
function parseCurrency(currencyStr) {
    if (typeof currencyStr === 'string') {
        return parseFloat(currencyStr.replace('$', ''));
    }
    return parseFloat(currencyStr);
}

// Function to format float to currency string
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// Function to recalculate and update cart totals
function recalculateTotals() {
    console.log('Recalculating totals...');
    let subtotal = 0;
    const productRows = document.querySelectorAll('table tbody tr');

    productRows.forEach(row => {
        const priceElement = row.querySelector('.price');
        const quantityInput = row.querySelector('.quantity-input');
        const itemTotalElement = row.querySelector('.item-total');

        if (priceElement && quantityInput && itemTotalElement) {
            const price = parseCurrency(priceElement.dataset.price); // Get price from data attribute
            const quantity = parseInt(quantityInput.value, 10);

            if (!isNaN(price) && !isNaN(quantity) && quantity >= 0) {
                const itemTotal = price * quantity;
                itemTotalElement.textContent = formatCurrency(itemTotal);
                subtotal += itemTotal;
            }
        }
    });

    const shippingElement = document.getElementById('shipping-amount');
    const shipping = shippingElement ? parseCurrency(shippingElement.textContent) : 0;

    const totalAmount = subtotal + shipping;

    const subtotalAmountElement = document.getElementById('subtotal-amount');
    if (subtotalAmountElement) {
        subtotalAmountElement.textContent = formatCurrency(subtotal);
    }
    const totalAmountElement = document.getElementById('total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = formatCurrency(totalAmount);
    }

    console.log(`Subtotal: ${formatCurrency(subtotal)}, Shipping: ${formatCurrency(shipping)}, Total: ${formatCurrency(totalAmount)}`);
}

// Function to update item quantity
function updateQuantity(productId, newQuantity) {
    console.log(`Updating quantity for product ${productId} to ${newQuantity}`);
    const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);

    if (quantityInput) {
        if (newQuantity < 0) { // Prevent negative quantities
            quantityInput.value = 0; // Or revert to old value, or set to 1
        }
        // If quantity is 0, some might prefer to remove the item or show a warning.
        // For now, it will just make the item total $0.00.
    }
    recalculateTotals(); // Recalculate after any quantity change attempt
}

// Function to remove item from cart
function removeItem(productId) {
    console.log(`Removing product ${productId} from cart`);
    const itemRow = document.getElementById(`product-row-${productId}`);
    if (itemRow) {
        itemRow.remove();
        recalculateTotals();
    } else {
        console.warn(`Could not find row for product ID: ${productId} to remove.`);
    }
}

// Function to initialize event listeners
function initializeCart() {
    console.log('Initializing cart...');

    // Event listeners for quantity input fields
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.dataset.productId;
            let newQuantity = parseInt(event.target.value, 10);

            if (isNaN(newQuantity) || newQuantity < 0) { // Ensure quantity is not NaN and not negative
                newQuantity = 0; // Default to 0 if invalid input
                event.target.value = newQuantity; // Update input field as well
            }
            updateQuantity(productId, newQuantity);
        });
        // Also listen to 'input' for more immediate feedback, though 'change' is fine for this scope
        input.addEventListener('input', (event) => {
             const productId = event.target.dataset.productId;
             // We can do a live update here or just rely on the 'change' event
             // For simplicity, the main logic is in 'change' but this can trigger visual feedback sooner
             let currentVal = parseInt(event.target.value, 10);
             if (isNaN(currentVal) || currentVal < 0) {
                 // Handle live typing of invalid values if necessary, e.g., prevent typing '-'
             } else {
                // Call a lightweight version of update if performance is an issue for 'input'
                // For now, just let 'change' handle the full recalculation
             }
        });
    });

    // Event listeners for remove buttons
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Traverse up to find the button if the icon is clicked, or use currentTarget
            const actualButton = event.target.closest('.remove-item-btn');
            const productId = actualButton.dataset.productId;
            removeItem(productId);
        });
    });

    // Initial calculation of totals based on HTML values
    recalculateTotals();
    console.log('Cart initialized.');
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeCart);
