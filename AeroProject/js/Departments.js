apiUrl = "http://localhost:8181/api/departments";
departmentForm = document.getElementById("departmentForm");

departmentName = document.getElementById("departmentName");
departmentContact = document.getElementById("departmentContact");
submitEditBtn = document.getElementById("submitEditBtn");
cancelEditBtn = document.getElementById("cancelEditBtn");

searchInput = document.createElement("input");
 allDepartments = [];
  editId = null;

searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search by Department Name");
searchInput.classList.add("form-control", "mb-3");
table = document.querySelector(".table");
table.parentNode.insertBefore(searchInput, table);

searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.toLowerCase();
    filtered = allDepartments.filter(department =>
        department.Name.toLowerCase().includes(searchTerm)
    );
    renderDepartments(filtered);
});

function validateDepartmentName() {
    if (departmentName.value.trim().length >= 3) {
        departmentName.classList.add("is-valid");
        departmentName.classList.remove("is-invalid");
        return true;
    } else {
        departmentName.classList.add("is-invalid");
        departmentName.classList.remove("is-valid");
        return false;
    }
}

function validateDepartmentContact() {
    // Using the checkValidity() method for email validation
    if (departmentContact.value && departmentContact.checkValidity()) {
        departmentContact.classList.add("is-valid");
        departmentContact.classList.remove("is-invalid");
        return true;
    } else {
        departmentContact.classList.add("is-invalid");
        departmentContact.classList.remove("is-valid");
        return false;
    }
}


function validateForm() {
    let isValid = true;
    if (!validateDepartmentName()) isValid = false;
    if (!validateDepartmentContact()) isValid = false;
    return isValid;
}

departmentName.addEventListener("blur", validateDepartmentName);
departmentContact.addEventListener("blur", validateDepartmentContact);

function submitForm(event) {
    event.preventDefault();
    if (!validateForm()) return;

    department = {
        Name: departmentName.value.trim(),
        Contact: departmentContact.value.trim(),
    };

    if (editId) {
        fetch(`${apiUrl}/${editId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(department)
        }).then(() => {
            fetchAndRenderDepartments();
            departmentForm.reset();
            editId = null;
            submitEditBtn.textContent = "Add Department";
            clearValidation();
        });
    } else {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(department)
        }).then(() => {
            fetchAndRenderDepartments();
            departmentForm.reset();
            clearValidation();
        });
    }
}

departmentForm.addEventListener("submit", submitForm);

function clearValidation() {
    [departmentName, departmentContact].forEach(input =>
        input.classList.remove("is-valid", "is-invalid")
    );
}

function fetchAndRenderDepartments() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            allDepartments = data;
            renderDepartments(data);
        });
}

function renderDepartments(departments) {
    tbody = document.getElementById("departmentTableBody");
    tbody.innerHTML = "";

    departments.forEach(department => {
        row = document.createElement("tr");
        row.innerHTML = `
            <td>${department.DeptID}</td>
            <td>${department.Name}</td>
            <td>${department.Contact}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-id="${department.DeptID}">
                    <i class="bi bi-pencil-square"></i>
                </button>
               <!-- <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${department.id}">
                    <i class="bi bi-trash"></i>
                </button> -->
            </td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            id = btn.getAttribute("data-id");
            loadDepartmentForEdit(id);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            id = btn.getAttribute("data-id");
            deleteDepartment(id);
        });
    });
}

function loadDepartmentForEdit(id) {
    fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(data => {
            departmentName.value = data.Name;
            departmentContact.value = data.Contact;
            editId = id;
            submitEditBtn.textContent = "Update Department";
        });
}

function deleteDepartment(id) {
    if (confirm("Are you sure you want to delete this department?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        }).then(() => fetchAndRenderDepartments());
    }
}

fetchAndRenderDepartments();
