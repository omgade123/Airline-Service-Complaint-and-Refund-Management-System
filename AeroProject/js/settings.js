document.getElementById("updateProfileBtn").addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const username = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;

    
    if (username.length < 5) {
        
        return;
    }

    
    const phoneRegex = /^[789]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Wrong phone number: must start with 7, 8, or 9 and be exactly 10 digits.");
        return;
    }

    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{1,}$/;
    if (!passwordRegex.test(newPassword)) {
        alert("Password must contain at least one uppercase letter, one digit, and one special character.");
        return;
    }

    const res = await fetch("http://localhost:8181/api/users");
    const users = await res.json();

    const user = users.find(u => u.email === email);

    if (!user) {
        alert("User not found!");
        return;
    }

    if (user.userType !== "Administrator") {
        alert("Only administrators are allowed to update their password.");
        return;
    }

    if (user.password !== currentPassword) {
        alert("Current password is incorrect!");
        return;
    }

    const updatedAdmin = {
        ...user,
        password: newPassword || currentPassword
    };

    await fetch(`http://localhost:8181/api/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAdmin)
    });

    alert("Password updated successfully!");
});
