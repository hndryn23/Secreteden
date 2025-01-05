document.addEventListener("DOMContentLoaded", function() {
    const subscriptionList = document.getElementById("subscription-list");
    const addSubscriptionButton = document.getElementById("add-subscription");

    const subscriptions = [
        { id: 1, customer: "Alice Johnson", plan: "Premium", status: "Active" },
        { id: 2, customer: "Bob Smith", plan: "Standard", status: "Inactive" },
        { id: 3, customer: "Charlie Brown", plan: "Basic", status: "Active" },
    ];

    function populateSubscriptions() {
        subscriptionList.innerHTML = "";
        subscriptions.forEach(sub => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sub.id}</td>
                <td>${sub.customer}</td>
                <td>${sub.plan}</td>
                <td>${sub.status}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            subscriptionList.appendChild(row);
        });
    }

    function addSubscription() {
        const newId = subscriptions.length + 1;
        const newSubscription = {
            id: newId,
            customer: "New Customer",
            plan: "Basic",
            status: "Pending"
        };
        subscriptions.push(newSubscription);
        populateSubscriptions();
    }

    addSubscriptionButton.addEventListener("click", addSubscription);

    populateSubscriptions();
});
