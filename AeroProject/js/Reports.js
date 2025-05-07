function populateTable(tableId, complaints, complaintTypes, departmentName) {
  const tableBody = document.getElementById(tableId);
  if (!tableBody) {
    console.error(`Table body not found for: ${tableId}`);
    return;
  }

  console.log(`\nPopulating table for: ${departmentName}`);
  console.log(`Complaints received: ${complaints.length}`);

  const grouped = {};

  complaints.forEach(complaint => {
    const ct = complaint.CTID;

    if (!grouped[ct]) {
      grouped[ct] = { pending: 0, resolved: 0 };
    }

    const status = complaint.Status ? complaint.Status.toLowerCase() : '';

    if (status === 'pending') {
      grouped[ct].pending++;
    } else if (status === 'resolved') {
      grouped[ct].resolved++;
    }
  });

  Object.entries(grouped).forEach(([ctid, { pending, resolved }]) => {
    const row = document.createElement('tr');

    const complaintType = complaintTypes.find(type => type.CTID == ctid);
    const complaintTypeName = complaintType ? complaintType.complaintType : `Unknown (CTID: ${ctid})`;

    const complaintTypeCell = document.createElement('td');
    complaintTypeCell.textContent = complaintTypeName;

    const pendingCell = document.createElement('td');
    pendingCell.textContent = pending;

    const resolvedCell = document.createElement('td');
    resolvedCell.textContent = resolved;

    row.appendChild(complaintTypeCell);
    row.appendChild(pendingCell);
    row.appendChild(resolvedCell);

    tableBody.appendChild(row);
  });

  if (Object.keys(grouped).length === 0) {
    const row = document.createElement('tr');
    const noDataCell = document.createElement('td');
    noDataCell.textContent = "No complaints found";
    noDataCell.colSpan = 3;
    row.appendChild(noDataCell);
    tableBody.appendChild(row);
  }
}

fetch('http://localhost:8181/api/complaints')
      .then(response => response.json())
      .then(complaints => {
        Promise.all([
          fetch('http://localhost:8181/api/departments').then(response => response.json()),
          fetch('http://localhost:8181/api/complaintTypes').then(response => response.json())
        ])
          .then(([departments, complaintTypes]) => {
            departments.forEach(department => {
              const departmentComplaints = complaints.filter(
                complaint => complaint.DeptID === department.DeptID
              );

              const departmentName = department.Name;
              const tableId = departmentName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-table';

              console.log(`---\nDepartment: ${departmentName}`);
              console.log(`Table ID: ${tableId}`);
              console.log(`Matching complaints: ${departmentComplaints.length}`);

              populateTable(tableId, departmentComplaints, complaintTypes, departmentName);
            });
          })
          .catch(error => console.error('Error fetching department or complaint type data:', error));
      })
      .catch(error => console.error('Error fetching complaints data:', error));