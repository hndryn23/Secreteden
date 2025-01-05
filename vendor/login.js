// Display error messages from the server dynamically
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch('login.php', {
        method: 'POST',
        body: formData,
    });
    const result = await response.text();

    // Display result to the user
    document.querySelector('.login-box').innerHTML += `<p>${result}</p>`;
});
