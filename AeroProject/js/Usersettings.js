function userSettings() {
    const userEmail = sessionStorage.getItem("userEmail");
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");
    const mobile = sessionStorage.getItem("mobile");

    console.log("Session Storage Data:", { userEmail, userId, userName, mobile });

    
    if (!userEmail || !userId) {
        console.error("No user email or ID found in sessionStorage");
        alert("Session expired or no user logged in.");
        window.location.href = "/AeroProject/Pages/Login/login.html";
        return;
    }

    
    document.getElementById("username").value = userName || "Not set";
    document.getElementById("email").value = userEmail || "Not set";
    document.getElementById("mobile").value = mobile || "Not set";

    console.log("Fields populated:", {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value
    });

    const form = document.getElementById("settings-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const oldPassword = document.getElementById("old-password").value;
            const newPassword = document.getElementById("new-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            const errorMessage = document.getElementById("error-message");

            console.log("Form submitted with:", { oldPassword, newPassword, confirmPassword });

            
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                errorMessage.textContent = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.";
                return;
            }

            if (newPassword !== confirmPassword) {
                errorMessage.textContent = "New passwords do not match.";
                return;
            }

            if (oldPassword === "" || newPassword === "") {
                errorMessage.textContent = "Please fill in all password fields.";
                return;
            }

            
            fetch("http://localhost:8181/api/users")
                .then(res => {
                    if (!res.ok) throw new Error("Network response was not ok");
                    return res.json();
                })
                .then(users => {
                    const user = users.find(u => u.email === userEmail && u.userID === Number(userId));
                    if (!user) {
                        errorMessage.textContent = "User not found.";
                        return;
                    }

                    if (user.password !== oldPassword) {
                        errorMessage.textContent = "Old password is incorrect.";
                        return;
                    }

                    
                    const updatedUser = { ...user, password: newPassword };
                    fetch(`http://localhost:8181/api/users/${userId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedUser)
                    })
                    .then(res => {
                        if (!res.ok) throw new Error("Failed to update user");
                        return res.json();
                    })
                    .then(() => {
                        sessionStorage.setItem("userPassword", newPassword);
                        alert("Password updated successfully!");
                        form.reset();
                        errorMessage.textContent = "";
                    })
                    .catch(err => {
                        console.error("Error updating password:", err);
                        errorMessage.textContent = "Error updating password. Please try again.";
                    });
                })
                .catch(err => {
                    console.error("Error fetching users:", err);
                    errorMessage.textContent = "Error fetching user data. Please try again.";
                });
        });
    } else {
        console.error("Settings form not found in DOM");
    }
};

userSettings();