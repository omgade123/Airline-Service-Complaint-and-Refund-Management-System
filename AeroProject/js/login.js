function loginHandler(event, type) {
  event.preventDefault();

  const email = document.getElementById(`${type}-email`).value;
  const password = document.getElementById(`${type}-password`).value;

  fetch("http://localhost:8181/api/users")
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        if ((type === "admin" && user.userType === "Administrator") || (type === "user" && user.userType === "User")) {
          
          sessionStorage.setItem("userEmail", user.email); 
          sessionStorage.setItem("userId", user.userID); 
          sessionStorage.setItem("userName", user.username);
          sessionStorage.setItem("userType", user.userType);
          sessionStorage.setItem("mobile", user.mobile);
          sessionStorage.setItem("password", user.password);

          if (user.userType === "Administrator") {
            window.location.href = "/AeroProject/Pages/Admin Pages/admin.html";
          } else if (user.userType === "User") {
            window.location.href = "/AeroProject/Pages/User Pages/user.html";
          }
        } else {
          showError(type, "Unauthorized access: incorrect user type.");
        }
      } else {
        showError(type, "Enter Correct Email and Password.");
      }
    })
    .catch(err => {
      console.error("Error fetching users:", err);
      showError(type, "Something went wrong. Please try again.");
    });

  return false;
}

function showError(type, message) {
  let errorDiv = document.getElementById(`${type}-error`);
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = `${type}-error`;
    errorDiv.className = "text-danger text-center mt-2";
    document.querySelector(`#${type}-login-form`).appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

// function getBasicAuth(){
//   const username = sessionStorage.getItem('userEmail');
//   const password = sessionStorage.getItem('password');
//   const basicAuth = btoa(`${username}:${password}`);
//   return `Basic ${basicAuth}`;
// }

// function getBasicAuth(){
//   const username = sessionStorage.getItem('userName');
//   const password = sessionStorage.getItem('password');
//   const basicAuth = btoa(`${username}:${password}`);
//   return `Basic ${basicAuth}`;
// }
