const API_CT = "http://localhost:8181/api/complaintTypes";
const API_USER = "http://localhost:8181/api/users";
const API_DEPT = "http://localhost:8181/api/complaints/departments/";

function loadDeptComplaints(DeptID) {
  Promise.all([
   
    fetch(`${API_DEPT}${DeptID}`),
    fetch(`${API_USER}`),
    fetch(`${API_CT}`)
  ])
  .then(responses => {
    
    const [complaintsRes, usersRes, complaintTypesRes] = responses;

   
    return Promise.all([
      complaintsRes.json(),
      usersRes.json(),
      complaintTypesRes.json()
    ]);
  })
  .then(data => {
    
    const [complaints, users, complaintTypes] = data;

    const tbody = document.getElementById("departmentComplaintTableBody");
    if (!tbody) {
      console.warn(" Table body element not found.");
      return;
    }

    tbody.innerHTML = "";

    complaints.forEach(c => {
      const user = users.find(u => u.userID === c.UserID)?.username || "Unknown";
      const type = complaintTypes.find(t => t.CTID === c.CTID)?.complaintType || "Unknown";
      
      const row = document.createElement('tr');
      row.innerHTML =  
        `<td>${c.CID}</td>
         <td>${user}</td>
         <td>${type}</td>
         <td>${c.Description}</td>
         <td>${c.DateFiled}</td>
         <td>${c.Status}</td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error loading department complaints:", error);
  });
}
