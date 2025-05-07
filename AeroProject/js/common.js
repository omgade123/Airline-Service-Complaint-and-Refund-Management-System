
function logout() {
    console.log("Logging out...");
    sessionStorage.clear(); 
    console.log("Session Storage after logout:", sessionStorage);
    window.location.href = "AeroProject/Pages/Login and Registration/index.html"; 
}