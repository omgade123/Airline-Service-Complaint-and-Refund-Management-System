document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    fetchComplaintsz(); 
});

function loadTab(tabName) {
    if (tabName === 'AllComplaints') {
        fetchComplaintsz(); 
    }
}

function fetchComplaintsz() {
    console.log('Fetching complaints...');
    fetch('http://localhost:8181/api/complaints')
    .then(res => res.json())
    .then(complaints => {
        fetchUsersAndTypes(complaints);
    })
    .catch(error => {
        console.error('Error fetching complaints:', error);
    });
}

function fetchUsersAndTypes(complaints) {
    fetch('http://localhost:8181/api/users')
    .then(usersRes => usersRes.json())
    .then(users => {
        fetch('http://localhost:8181/api/complaintTypes')
        .then(typesRes => typesRes.json())
        .then(complaintTypes => {
            renderComplaintTable(complaints, users, complaintTypes);
        })
        .catch(error => {
            console.error('Error fetching complaint types:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
}

function renderComplaintTable(complaints, users, complaintTypes) {
    const tbody = document.getElementById('complaintTableBody');
    if (!tbody) {
        console.warn('Table body not found');
        return;
    }

    tbody.innerHTML = '';

    complaints.forEach(complaint => {
        const user = users.find(u => u.userID === complaint.UserID);
        const userName = user && user.username ? user.username : 'Unknown';
        const complaintType = complaintTypes.find(ct => ct.CTID=== complaint.CTID);
        const complaintTypeName = complaintType ? complaintType.complaintType : 'Unknown';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.CID}</td>
            <td>${userName}</td>
            <td>${complaint.DeptID}</td>
            <td>${complaintTypeName}</td>
            <td>${complaint.Description}</td>
            <td>${complaint.DateFiled}</td>
            <td>
                <select class="form-select status-dropdown" data-id="${complaint.CID}">
                    <option value="Pending" ${complaint.Status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${complaint.Status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Resolved" ${complaint.Status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                </select>
            </td>
        `;
        tbody.appendChild(row);
    });

    addStatusChangeListeners();
    console.log('Complaints loaded');
}

function addStatusChangeListeners() {
    document.querySelectorAll('.status-dropdown').forEach(select => {
    select.addEventListener('change', function (event) {
     const complaintId = event.target.getAttribute('data-id');
     const newStatus = event.target.value;

    fetch(`http://localhost:8181/api/complaints/${complaintId}`, {
     method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ Status: newStatus })
            })
            .then(updateResponse => {
                if (updateResponse.ok) {
                    alert(`Complaint ${complaintId} status updated to "${newStatus}"`);
                } else {
                updateResponse.text().then(text => {
                console.error('Failed to update status:', text);
                 alert('Failed to update complaint status');
                });
                }
            })
            .catch(error => {
            console.error('Error updating complaint:', error);
            alert('Network or server error while updating complaint');
            });
        });
    });
}
