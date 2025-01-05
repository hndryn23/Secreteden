document.addEventListener("DOMContentLoaded", function() {
    const transactionList = document.getElementById("transaction-list");

    const transactions = [
        { customer: "Alice Johnson", orderId: "ORD12345", date: "2025-01-01", amount: 150.00 },
        { customer: "Bob Smith", orderId: "ORD12346", date: "2025-01-02", amount: 75.50 },
        { customer: "Charlie Brown", orderId: "ORD12347", date: "2025-01-03", amount: 200.00 },
    ];

    function populateTransactions() {
        transactionList.innerHTML = "";
        transactions.forEach(tx => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${tx.customer}</td>
                <td>${tx.orderId}</td>
                <td>${tx.date}</td>
                <td>${tx.amount.toFixed(2)}</td>
            `;
            transactionList.appendChild(row);
        });
    }

    populateTransactions();
});
