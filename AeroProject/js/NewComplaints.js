

fetch("http://localhost:8181/api/complaintTypes")
        .then(res => res.json())
        .then(complaintTypes => {
            const complaintTypeDropdown = document.getElementById("complaintType");
            complaintTypeDropdown.innerHTML = '<option value="" disabled selected hidden>Select Complaint Type</option>';
            complaintTypes.forEach(type => {
                const option = document.createElement("option");
                option.value = type.CTID; 
                option.textContent = type.complaintType;
                complaintTypeDropdown.appendChild(option);
            });
        })
        .catch(err => {
            console.error("Error loading complaint types:", err);
            alert("Failed to load complaint types.");
        });

    fetch("http://localhost:8181/api/departments")
        .then(res => res.json())
        .then(departments => {
            const departmentDropdown = document.getElementById("department");
            departmentDropdown.innerHTML = '<option value="" disabled selected hidden>Select Department</option>';
            departments.forEach(department => {
                const option = document.createElement("option");
                option.value = department.DeptID; 
                option.textContent = department.Name;
                departmentDropdown.appendChild(option);
            });
        })
        .catch(err => {
            console.error("Error loading departments:", err);
            alert("Failed to load departments.");
        });

    
    document.getElementById("complaintForm").addEventListener("submit", submitComplaint);



function submitComplaint(event) {
    event.preventDefault();

    const email = sessionStorage.getItem("userEmail"); 

    
    fetch("http://localhost:8181/api/users")
        .then(res => res.json())
        .then(users => {

            fetch("http://localhost:8181/api/complaints")
            .then(res => res.json())
            .then(complaints => {
                let maxComplaintID = 0;
                complaints.forEach(comp => {
                    if (comp.CID > maxComplaintID) {
                        maxComplaintID = comp.CID;
                    }
                });
                let newComplaintID = maxComplaintID + 1;

            const user = users.find(u => u.email === email);
            if (user) {
                const CTID = document.getElementById("complaintType").value;
                const DeptID = document.getElementById("department").value;
                
                
                
                
                const complaintData = {
                    // CID: newComplaintID,
                    UserID: user.userID,
                    DeptID: DeptID,
                    CTID: Number(CTID),
                    Description: document.getElementById("description").value,
                    DateFiled: document.getElementById("dateFiled").value,
                    Status: "Pending" 
                };

                
                fetch("http://localhost:8181/api/complaints", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(complaintData)
                })
                    .then(res => res.json())
                    .then(response => {
                        console.log("Complaint submitted successfully:", response);
                        alert("Your complaint has been submitted!");
                        document.getElementById("complaintForm").reset();
                        document.getElementById("complaintType").selectedIndex = 0;
                        document.getElementById("department").selectedIndex = 0;
                    })
                    .catch(err => {
                        console.error("Error submitting complaint:", err);
                        alert("Something went wrong. Please try again.");
                    });
            } else {
                console.error("User not found.");
                alert("User data not found.");
            }
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            alert("Something went wrong. Please try again.");
        });
}
)}