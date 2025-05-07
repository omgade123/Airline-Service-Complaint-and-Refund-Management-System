 apiUrl = "http://localhost:8181/api/users";
 form = document.getElementById("userForm");


 username = document.getElementById("username");
 email = document.getElementById("email");
 password = document.getElementById("password");
 mobile = document.getElementById("mobile");
 userTypeSelect = document.getElementById("userType");
 submitBtn = document.getElementById("submitBtn");

 searchInput = document.createElement("input");
 allUsers = [];
 editId = null;
 sortDirection = 1;


searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search by Username");
searchInput.classList.add("form-control", "mb-3");
table  = document.querySelector(".table");
table.parentNode.insertBefore(searchInput, table);


searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm)
    );
    renderUsers(filtered);
});

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

function validateForm() {
    let isValid = true;

    if (!validateUsername()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validateMobile()) isValid = false;
    return isValid;
}


  username.addEventListener("blur", validateUsername);
  password.addEventListener("blur", validatePassword);
  email.addEventListener("blur", validateEmail);
  mobile.addEventListener("blur", validateMobile);
  
    function submitForm(event){
    event.preventDefault();
    if (!validateForm()) return;

    const user = {
        username: username.value.trim(),
        password: password.value.trim(),
        email: email.value.trim(),
        mobile: mobile.value.trim(),
        userType: userTypeSelect.value.trim()
    };

    if (editId) {
        fetch(`${apiUrl}/${editId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            fetchAndRenderUsers();
            form.reset();
            editId = null;
            submitBtn.textContent = "Add User";
            clearValidation();
        });
    } else {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            fetchAndRenderUsers();
            form.reset();
            clearValidation();
        });
    }
}
form.addEventListener("submit", submitForm);

function clearValidation() {
    [username,password, email, mobile, userTypeSelect].forEach(input =>
        input.classList.remove("is-valid", "is-invalid")
    );
}


function fetchAndRenderUsers() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            allUsers = data;
            renderUsers(data);
        });
}

function renderUsers(users) {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.userID}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>${user.userType}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-id="${user.userID}">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${user.userID}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
`
        ;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            loadUserForEdit(id);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            deleteUser(id);
        });
    });
}


document.querySelector("th:nth-child(5)").style.cursor = "pointer";
document.querySelector("th:nth-child(5)").addEventListener("click", () => {
    const sorted = [...allUsers].sort((a, b) =>
        a.userType.localeCompare(b.userType) * sortDirection
    );
    sortDirection *= -1;
    renderUsers(sorted);
});


function loadUserForEdit(id) {
    fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(data => {
            username.value = data.username;
            password.value = data.password;
            email.value = data.email;
            mobile.value = data.mobile;
            userTypeSelect.value = data.userType;
            editId = id;
            submitBtn.textContent = "Update User";
        });
}


function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        }).then(() => fetchAndRenderUsers());
    }
}

fetchAndRenderUsers();
