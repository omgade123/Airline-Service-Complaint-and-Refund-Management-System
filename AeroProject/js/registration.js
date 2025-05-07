const apiUrl = "http://localhost:8181/api/users";
const form = document.getElementById("regForm");
const userTypeError = document.getElementById("userTypeError");

const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");

function validateUsername() {
  if (username.value.trim().length >= 5) {
    username.classList.add("is-valid");
    username.classList.remove("is-invalid");
    return true;
  } else {
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");
    return false;
  }
}

function validatePassword() {
  const passVal = password.value;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  if (passRegex.test(passVal)) {
    password.classList.add("is-valid");
    password.classList.remove("is-invalid");
    return true;
  } else {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
    return false;
  }
}

function validateEmail() {
  if (email.value && email.checkValidity()) {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
    return true;
  } else {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    return false;
  }
}

function validateMobile() {
  const mobileRegex = /^[789]\d{9}$/;
  if (mobileRegex.test(mobile.value.trim())) {
    mobile.classList.add("is-valid");
    mobile.classList.remove("is-invalid");
    return true;
  } else {
    mobile.classList.add("is-invalid");
    mobile.classList.remove("is-valid");
    return false;
  }
}

function validateUserType() {
  const userType = document.querySelector('input[name="usertype"]:checked');
  if (!userType) {
    userTypeError.classList.remove("d-none");
    return false;
  } else {
    userTypeError.classList.add("d-none");
    return true;
  }
}

username.addEventListener("blur", validateUsername);
password.addEventListener("blur", validatePassword);
email.addEventListener("blur", validateEmail);
mobile.addEventListener("blur", validateMobile);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateUsername() &&
    validatePassword() &&
    validateEmail()    &&
    validateMobile()   &&
    validateUserType();

  if (!isValid) return;

  const emailValue = email.value.trim().toLowerCase();
  const usernameValue = username.value.trim().toLowerCase();
  const mobileValue = mobile.value.trim(); 

  
  fetch(apiUrl)
    .then(res => res.json())
    .then(users => {
      const duplicateEmail = users.find(user => user.email.toLowerCase() === emailValue);
      const duplicateUsername = users.find(user => user.username.toLowerCase() === usernameValue);
      const duplicateMobile = users.find(user => user.mobile === mobileValue);

      if (duplicateUsername) {
        alert("Username is already used ,choose Different UserName");
        return;
      }
      if (duplicateEmail) {
        alert(" Email ID already registered. Please use a different email.");
        return;
      }
      if (duplicateMobile) {
        alert("Mobile Number Already Used.!!!");
        return;
      }
     // local json userid generation
      // let maxUserID = 0;
      // users.forEach(user => {
      //   if (user.userID > maxUserID) {
      //     maxUserID = user.userID;
      //   }
      // });
      // const nextUserID = maxUserID + 1;

      const userType = document.querySelector('input[name="usertype"]:checked').value;
      const user = {
       // userID: nextUserID,
        username: username.value.trim(),
        password: password.value.trim(),
        email: emailValue,
        mobile: mobile.value.trim(),
        userType: userType,
      };

      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
    })
    .then(response => {
      if (response && !response.ok) throw new Error("Failed to save user");

      if (response) {
       
        form.reset();
        document.querySelectorAll(".form-control").forEach(el => el.classList.remove("is-valid"));
        document.querySelectorAll(".form-check-input").forEach(el => el.checked = false);
        window.location.href =  "/AeroProject/Pages/Login and Registration/index.html";

      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert(" Something went wrong. Please try again.");
    });
});

function showSuccessMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("alert", "alert-success", "text-center");
  messageDiv.textContent = message;

  
  form.appendChild(messageDiv);

  
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}


function showErrorMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("alert", "alert-danger", "text-center");
  messageDiv.textContent = message;

  
  form.appendChild(messageDiv);

  
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}
