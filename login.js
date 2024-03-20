
document.getElementById("loginForm").addEventListener("submit", function(event) {
    var userType = document.getElementById("userType").value;
    if (userType === "user" || userType === "admin") {
        window.location.href = "add.html"; // Replace with your add page URL
        event.preventDefault(); // Prevent default form submission
    }
});