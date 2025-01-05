// DOM Elements
const modal = document.getElementById("paymentModal");
const successModal = document.getElementById("successModal");
const basicDetailsModal = document.getElementById("basicDetailsModal");
const premiumCloseButton = document.querySelector("#closeButton");
const cancelBtn = document.querySelector(".cancel");
const subscribeButtons = document.querySelectorAll(".subscribe-button");
const detailsButton = document.querySelector(".details-button");
const paymentMethods = document.querySelectorAll(".payment-method");
const paymentDetails = document.querySelector(".payment-details");
const proceedButton = document.querySelector(".save");

console.log("JavaScript is working");

// Open Payment Modal
subscribeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modal.style.display = "block";
        clearModalInputs(); // Reset the form when the modal is opened
    });
});

// Open Details Modal
if (detailsButton) {
    detailsButton.addEventListener("click", () => {
        basicDetailsModal.style.display = "block";
    });
}

// Close Details Modal
document.querySelector("#basicDetailsModal .close").addEventListener("click", () => {
    basicDetailsModal.style.display = "none";
});

// Close Payment Modal on X button
premiumCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
    clearModalInputs(); // Reset the form on close
});

// Close Payment Modal on Cancel
cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    clearModalInputs(); // Reset the form on cancel
});

// Close Modals When Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        clearModalInputs(); // Reset form
    }
    if (event.target === basicDetailsModal) {
        basicDetailsModal.style.display = "none";
    }
});

// Update Payment Details Dynamically Based on Selected Method
paymentMethods.forEach((method) => {
    method.addEventListener("click", () => {
        paymentMethods.forEach((m) => m.classList.remove("active"));
        method.classList.add("active");

        switch (method.textContent.trim()) {
            case "Card":
                setCardPaymentDetails();
                break;
            case "PayPal":
                setPayPalPaymentDetails();
                break;
            case "Online bank":
                setOnlineBankPaymentDetails();
                break;
        }
    });
});

// Set Card Payment Details
function setCardPaymentDetails() {
    paymentDetails.innerHTML = `
        <label for="card-number">Card Number</label>
        <input type="text" id="card-number" placeholder="1234 1234 1234 1234" maxlength="19">
        <span class="error-message" id="card-error"></span>
        
        <label for="expiry">Expiry</label>
        <input type="text" id="expiry" placeholder="MM / YY" maxlength="">
        <span class="error-message" id="expiry-error"></span>
        
        <label for="cvc">CVC</label>
        <input type="text" id="cvc" placeholder="CVC" maxlength="3">
        <span class="error-message" id="cvc-error"></span>
    `;

    // Add event listeners for formatting
   const expiryInput = document.getElementById("expiry");

expiryInput.addEventListener("input", () => {
    let value = expiryInput.value.replace(/[^0-9]/g, ""); // Remove all non-numeric characters

    // Automatically insert the " / " between the month and year part
    if (value.length >= 2) {
        value = value.slice(0, 2) + " / " + value.slice(2, 4); // Format as MM / YY
    }

    // Update the value in the input field
    expiryInput.value = value;
});


    const cardInput = document.getElementById("card-number");
    cardInput.addEventListener("input", () => {
        const value = cardInput.value.replace(/\D/g, ""); // Remove non-numeric characters
        cardInput.value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Insert space every 4 digits
    });
    
}

// Set PayPal Payment Details
function setPayPalPaymentDetails() {
    paymentDetails.innerHTML = `
        <label for="paypal-email">PayPal Email</label>
        <input type="email" id="paypal-email" placeholder="yourname@example.com">
        <span class="error-message" id="paypal-error"></span>
    `;
}

// Set Online Bank Payment Details
function setOnlineBankPaymentDetails() {
    paymentDetails.innerHTML = `
        <label for="bank-name">Bank Name</label>
        <select id="bank-name">
            <option value="">Select your bank</option>
            <option value="maybank">Maybank</option>
            <option value="cimb">CIMB</option>
            <option value="public-bank">Public Bank</option>
            <option value="rhb">RHB</option>
            <option value="hsbc">HSBC</option>
            <option value="ocbc">OCBC</option>
        </select>
        <span class="error-message" id="bank-error"></span>
    `;
}

// Validate Form on Proceed
proceedButton.addEventListener("click", (event) => {
    event.preventDefault();
    const activeMethod = document.querySelector(".payment-method.active").textContent.trim();
    let isValid = true;

    switch (activeMethod) {
        case "Card":
            isValid = validateCardPayment();
            break;
        case "PayPal":
            isValid = validatePayPalPayment();
            break;
        case "Online bank":
            isValid = validateOnlineBankPayment();
            break;
    }

    if (isValid) {
        // Close the payment modal
        modal.style.display = "none";
        clearModalInputs(); // Clear inputs and reset

        // Show success popup
        const successModal = document.getElementById("successModal");
        successModal.style.display = "block";

        // Redirect after 3 seconds
        setTimeout(() => {
            successModal.style.display = "none"; // Hide success popup
            window.location.href = "Admin.html"; // Replace 'success.html' with your target page
        }, 3000); // 3 seconds delay
    } else {
        alert("Please correct the errors in the form before proceeding.");
    }
});

// Card Payment Validation
function validateCardPayment() {
    let isValid = true;

    const cardNumber = document.getElementById("card-number");
    const cardError = document.getElementById("card-error");
    if (!/^\d{16}$/.test(cardNumber.value.replace(/\s+/g, ""))) {
        cardError.textContent = "Enter a valid 16-digit card number.";
        cardError.classList.add("active");
        isValid = false;
    } else {
        cardError.textContent = "";
        cardError.classList.remove("active");
    }

    const expiry = document.getElementById("expiry");
    const expiryError = document.getElementById("expiry-error");
    if (!/^(0[1-9]|1[0-2]) \/ \d{2}$/.test(expiry.value)) {
        expiryError.textContent = "Enter expiry in MM / YY format.";
        expiryError.classList.add("active");
        isValid = false;
    } else {
        expiryError.textContent = "";
        expiryError.classList.remove("active");
    }

    const cvc = document.getElementById("cvc");
    const cvcError = document.getElementById("cvc-error");
    if (!/^\d{3,3}$/.test(cvc.value)) {
        cvcError.textContent = "CVC must be 3 or 4 digits.";
        cvcError.classList.add("active");
        isValid = false;
    } else {
        cvcError.textContent = "";
        cvcError.classList.remove("active");
    }

    return isValid;
}

// Validation for PayPal and Online Bank Remain Same...
function validatePayPalPayment() {
    const paypalEmail = document.getElementById("paypal-email");
    const paypalError = document.getElementById("paypal-error");
    let isValid = true;

    // Simple regex for email validation
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(paypalEmail.value)) {
        paypalError.textContent = "Enter a valid PayPal email address.";
        paypalError.classList.add("active");
        isValid = false;
    } else {
        paypalError.textContent = "";
        paypalError.classList.remove("active");
    }

    return isValid;
}
function validateOnlineBankPayment() {
    const bankSelect = document.getElementById("bank-name");
    const bankError = document.getElementById("bank-error");
    let isValid = true;

    if (!bankSelect.value) {
        bankError.textContent = "Please select a bank.";
        bankError.classList.add("active");
        isValid = false;
    } else {
        bankError.textContent = "";
        bankError.classList.remove("active");
    }

    return isValid;
}


// Clear Modal
function clearModalInputs() {
    const inputs = modal.querySelectorAll("input, select");
    const errorMessages = modal.querySelectorAll(".error-message");

    inputs.forEach((input) => {
        input.value = "";
        input.classList.remove("input-error");
    });

    errorMessages.forEach((error) => {
        error.textContent = "";
        error.classList.remove("active");
    });

    setCardPaymentDetails(); // Default to card payment
    paymentMethods.forEach((method) => method.classList.remove("active"));
    paymentMethods[0].classList.add("active");
}
