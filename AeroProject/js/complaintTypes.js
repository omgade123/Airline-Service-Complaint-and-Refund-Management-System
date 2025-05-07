apiUrl = "http://localhost:8181/api/complaintTypes";

form = document.getElementById("complaintTypeForm");
complaintTypeInput = document.getElementById("complaintType");
severitySelect = document.getElementById("severity");
submitBtn = document.getElementById("submitBtn");

function getBasicAuth(){
    const username = sessionStorage.getItem('userName');
    const password = sessionStorage.getItem('password');
    const basicAuth = btoa(`${username}:${password}`);
    return `Basic ${basicAuth}`;
  }
  

editId = null;
allComplaint = [];

searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search by Complaint ID");
searchInput.classList.add("form-control", "mb-3");

table = document.querySelector(".table");
table.parentNode.insertBefore(searchInput, table);

searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.toLowerCase();
    filtered = allComplaint.filter(comp =>
        comp.CTID.toString().toLowerCase().includes(searchTerm) // Filter using CTID as a string
    );
    renderComplaints(filtered);
});

complaintTypeInput.addEventListener("blur", () => {
    if (complaintTypeInput.value.trim().length < 5) {
        complaintTypeInput.classList.add("is-invalid");
        complaintTypeInput.classList.remove("is-valid");
    } else {
        complaintTypeInput.classList.remove("is-invalid");
        complaintTypeInput.classList.add("is-valid");
    }
});

function validateForm() {
    isValid = true;
    if (complaintTypeInput.value.trim().length < 5) {
        complaintTypeInput.classList.add("is-invalid");
        complaintTypeInput.classList.remove("is-valid");
        isValid = false;
    } else {
        complaintTypeInput.classList.remove("is-invalid");
        complaintTypeInput.classList.add("is-valid");
    }
    return isValid;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    submitBtn.disabled = true;

    complaint = {
        complaintType: complaintTypeInput.value.trim(),
        severity: severitySelect.value.trim()
    };

   
 

    request = editId
        ? fetch(`${apiUrl}/${editId}`, {
              method: "PUT",
              
              headers: { "Content-Type": "application/json",
                         'Authorization': getBasicAuth(),

               },
              body: JSON.stringify(complaint)
          })
        : fetch(apiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json", 
                'Authorization': getBasicAuth(), },
              body: JSON.stringify(complaint)
          });

    request
        .then(() => fetchAndRenderComplaints())
        .then(() => {
            form.reset();
            clearValidation();
            submitBtn.textContent = "Add Complaint Type";
            editId = null;
        })
        .finally(() => {
            submitBtn.disabled = false;
        });
});

function clearValidation() {
    complaintTypeInput.classList.remove("is-valid", "is-invalid");
    severitySelect.classList.remove("is-valid", "is-invalid");
}

async function fetchAndRenderComplaints() {
    const res = await fetch("http://localhost:8181/api/complaintTypes", {
        method: 'GET',
        headers: {
                'Authorization': getBasicAuth(),
                'Content-Type': 'application/json'
            }
    });
    const data = await res.json();
    allComplaint = data;
    renderComplaints(data);
}

function renderComplaints(complaintTypes) {
    tbody = document.getElementById("complaintTableBody");
    tbody.innerHTML = "";

    complaintTypes.forEach(comp => {
        row = document.createElement("tr");
        row.innerHTML = `
            <td>${comp.CTID}</td> <!-- Use CTID here -->
            <td>${comp.complaintType}</td>
            <td>${comp.severity}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-id="${comp.CTID}">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${comp.CTID}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const CTID = btn.getAttribute("data-id"); // Use CTID here
            loadComplaintForEdit(CTID);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const CTID = btn.getAttribute("data-id"); // Use CTID here
            deleteComplaint(CTID);
        });
    });
}

 sortDirection = 1;
document.querySelector("th:nth-child(3)").style.cursor = "pointer";
document.querySelector("th:nth-child(3)").addEventListener("click", () => {
    sorted = [...allComplaint].sort((a, b) =>
        a.severity.localeCompare(b.severity) * sortDirection
    );
    sortDirection *= -1;
    renderComplaints(sorted);
});

function loadComplaintForEdit(CTID) {
    fetch(`${apiUrl}/${CTID}`)
        .then(res => res.json())
        .then(data => {
            complaintTypeInput.value = data.complaintType;
            severitySelect.value = data.severity;
            editId = CTID; // Set the editId to CTID
            submitBtn.textContent = "Update Complaint Type";
        });
}

function deleteComplaint(CTID) {
    if (confirm("Are you sure you want to delete this complaint?")) {
        submitBtn.disabled = true;
        fetch(`${apiUrl}/${CTID}`, {
            method: "DELETE"
        })
            .then(() => fetchAndRenderComplaints())
            .finally(() => {
                submitBtn.disabled = false;
            });
    }
}

fetchAndRenderComplaints();
