
email = sessionStorage.getItem("userEmail");

fetch("http://localhost:8181/api/users")
    .then(res => res.json())
    .then(users => {
     const user = users.find(u => u.email === email);
    if (!user) {
     alert("User not found.");
    return;}
  const userID = user.userID;
  fetch(`http://localhost:8181/api/complaints/users/${userID}`)

    .then(res => res.json())
    .then(complaints => {
    if (complaints.length === 0) {
     document.getElementById("complaintsTable").innerHTML = `
    <tr><td colspan="5" class="text-center text-muted">No complaints found.</td></tr>`;
     return;} 
    Promise.all([
 fetch("http://localhost:8181/api/complaintTypes").then(res => res.json()),
   fetch("http://localhost:8181/api/departments").then(res => res.json())
 ])
    .then(([types, departments]) => {
     const tbody = document.getElementById("complaintsTable");
    tbody.innerHTML = "";

   complaints.forEach(complaint => {
     const type = types.find(t => t.complaintType === complaint.CTID || t.CTID == complaint.CTID);
    const dept = departments.find(d => d.DeptID == complaint.DeptID || d.id == complaint.DeptID);

     const row = document.createElement("tr");
    row.innerHTML = `
                <td>${complaint.CID}</td>
                <td>${type ? type.complaintType : "N/A"}</td>
                <td>${dept ? dept.Name : "N/A"}</td>
                <td>${complaint.DateFiled}</td>
                <td>${complaint.Status}</td>`;
                 tbody.appendChild(row); });
     });
 })
            .catch(err => {
                console.error("Error loading complaints:", err);
                alert("Error loading complaints.");
  });

    })
    .catch(err => {
        console.error("Error fetching users:", err);
        alert("Error fetching user data.");
    });
