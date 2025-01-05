const prefilledData = {
    username: "username",
    password: "abc123",
    address: "longkang",
    contact: "0123456789"
  };

  
  function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = document.getElementById("toggle-password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Show";
    }
}
  
  
 
  window.onload = function () {
    document.getElementById("username").value = prefilledData.username;
    document.getElementById("password").value = prefilledData.password;
    document.getElementById("address").value = prefilledData.address;
    document.getElementById("contact").value = prefilledData.contact;
  };

  function validatePassword(password) {

    const errors = [];
  
    if (password.length < 6 || password.length > 8) {
        errors.push("Password must be 6–8 characters long.");
      }
      if (!/[A-Z]/.test(password)) {
       errors.push("Password must contain at least ONE uppercase letter.");
      }
      if (!/\d/.test(password)) {
        errors.push("Password must contain at least ONE numeric digit.");
      }
      if (!/[@$!%*?&]/.test(password)) {
        errors.push("Password must contain at least ONE special character (@, $, !, %, *, ?, &).");
      }
      if (/\s/.test(password)) {
        errors.push("Password must not contain spaces.");
      }
    return errors;
  }
  

  const form = document.getElementById("edit-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      alert("Please make sure your password is as follows:\n\n" + passwordErrors.join("\n"));
      return;
    }
  


    if (!username || !password || !address || !contact) {
      alert("Please fill in the required fields!");
      return;
    }
  

    alert("Changes saved successfully!");
    console.log({ username, password, address, contact });
  });
  

  const cancelBtn = document.getElementById("cancelBtn");
  cancelBtn.addEventListener("click", function () {

    form.reset();
    document.getElementById("username").value = prefilledData.username;
    document.getElementById("password").value = prefilledData.password;
    document.getElementById("address").value = prefilledData.address;
    document.getElementById("contact").value = prefilledData.contact;
  });

