const dateInput = document.getElementById('date');
const paymentMethodInput = document.getElementById('paymentMethod');
const paymentForm = document.getElementById('paymentForm');
const emailInput = document.getElementById('email');

const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

const cardButton = document.getElementById('cardButton');
const paypalButton = document.getElementById('paypalButton');
const bankButton = document.getElementById('bankButton');
const cardSection = document.getElementById('cardSection');
const paypalSection = document.getElementById('paypalSection');
const bankSection = document.getElementById('bankSection');

function toggleSections(activeSection) {
  cardSection.classList.remove('active');
  paypalSection.classList.remove('active');
  bankSection.classList.remove('active');
  activeSection.classList.add('active');
}

function toggleButtons(activeButton) {
  cardButton.classList.remove('active');
  paypalButton.classList.remove('active');
  bankButton.classList.remove('active');
  activeButton.classList.add('active');
  paymentMethodInput.value = activeButton.dataset.method; // Set the payment method
}

cardButton.addEventListener('click', () => {
  toggleSections(cardSection);
  toggleButtons(cardButton);
});

paypalButton.addEventListener('click', () => {
  toggleSections(paypalSection);
  toggleButtons(paypalButton);
});

bankButton.addEventListener('click', () => {
  toggleSections(bankSection);
  toggleButtons(bankButton);
});

// Set default payment method
paymentMethodInput.value = "Card";

// Add confirmation email functionality
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission

  const email = emailInput.value;
  const paymentMethod = paymentMethodInput.value;

  // Simulate sending confirmation email
  alert(`Confirmation email sent to ${email} for payment method: ${paymentMethod}`);

  // After confirmation, proceed with form submission
  paymentForm.submit();
});
// Add input masking for card number, expiry date, and CVC
document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("cardNumber");
  const expiryInput = document.getElementById("expiry");
  const cvcInput = document.getElementById("cvc");

  // Card Number Formatting (e.g., 1234 5678 9012 3456)
  cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16); // Allow only digits and limit to 16
    e.target.value = value.replace(/(\d{4})/g, "$1 ").trim(); // Add a space after every 4 digits
  });

  // Expiry Formatting (e.g., MM / YY)
  expiryInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4); // Allow only digits and limit to 4
    if (value.length >= 3) {
      value = `${value.slice(0, 2)} / ${value.slice(2)}`; // Add " / " after the first 2 digits
    }
    e.target.value = value;
  });

  // CVC Formatting (e.g., 123)
  cvcInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").slice(0, 3); // Allow only digits and limit to 3
    e.target.value = value;
  });
});
// Cancel button functionality
document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = 'Subscription_option.html';
});


