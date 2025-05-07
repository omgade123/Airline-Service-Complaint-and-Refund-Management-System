API_URL = "http://localhost:8181/api/complaints";
USERS_URL = "http://localhost:8181/api/users";
DEPTS_URL = "http://localhost:8181/api/departments";



async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

function groupBy(data, key) {
    return data.reduce((acc, curr) => {
        acc[curr[key]] = (acc[curr[key]] || 0) + 1;
        return acc;
    }, {});
}

function getUserEmail() {
    return sessionStorage.getItem("userEmail");
}

function generateColors(count) {
    return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`);
}

async function renderCharts() {
    const [complaints, users, Departments] = await Promise.all([
        fetchData(API_URL),
        fetchData(USERS_URL),
        fetchData(DEPTS_URL)
    ]);

    const userEmail = getUserEmail();
    if (!complaints.length || !userEmail) return;

    
    const userMap = Object.fromEntries(users.map(u => [u.userID, u.email]));
    const deptMap = Object.fromEntries(Departments.map(d => [d.DeptID, d.Name])); 

    
    const userComplaints = complaints.filter(c => userMap[c.UserID] === userEmail);

    const noDataEl = document.getElementById("noDataMessage");

    if (!userComplaints.length) {
        if (noDataEl) noDataEl.style.display = "block";
        return;
    } else {
        if (noDataEl) noDataEl.style.display = "none";
    }

    
    const deptCounts = groupBy(userComplaints, "DeptID"); 
    const deptLabels = Object.keys(deptCounts).map(id => {
        const deptName = deptMap[id];
        return deptName ? deptName : `Unknown Dept ${id}`; 
    });
    const deptData = Object.values(deptCounts);

    
    const statusCounts = groupBy(userComplaints, "Status");
    const statusLabels = Object.keys(statusCounts); 
    const statusData = Object.values(statusCounts);



    
    const typeCtx = document.getElementById("typeChart").getContext("2d");
    typeChart = new Chart(typeCtx, {
        type: "pie",
        data: {
            labels: deptLabels,
            datasets: [{
                data: deptData,
                backgroundColor: generateColors(deptData.length),
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });

    
    const statusCtx = document.getElementById("statusChart").getContext("2d");
    statusChart = new Chart(statusCtx, {
        type: "pie",
        data: {
            labels: statusLabels,
            datasets: [{
                data: statusData,
                backgroundColor: generateColors(statusData.length),
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });

    
    const updateEl = document.getElementById("lastUpdated");
    if (updateEl) {
        updateEl.textContent = "Last updated: " + new Date().toLocaleTimeString();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    renderCharts();
    setInterval(renderCharts,10000);
});

async function updateComplaintCountsForUser(userEmail) {
    try {
        const [complaints, users] = await Promise.all([
            fetchData(API_URL),
            fetchData(USERS_URL)
        ]);

        
        const userMap = Object.fromEntries(users.map(u => [u.userID, u.email]));
        
        
        const userComplaints = complaints.filter(c => userMap[c.UserID] === userEmail);

        let total = userComplaints.length;
        let pending = userComplaints.filter(c => c.Status === "Pending").length;
        let inProgress = userComplaints.filter(c => c.Status === "In Progress").length;
        let resolved = userComplaints.filter(c => c.Status === "Resolved").length;

        document.getElementById("total-complaints").textContent = total;
        document.getElementById("pending-complaints").textContent = pending;
        document.getElementById("inprogress-complaints").textContent = inProgress;
        document.getElementById("resolved-complaints").textContent = resolved;
    } catch (err) {
        console.error("Failed to update complaint counts:", err);
    }
}

window.updateComplaintCountsForUser = updateComplaintCountsForUser;

document.addEventListener("DOMContentLoaded", function () {
    const userEmail = sessionStorage.getItem("userEmail"); 
    if (userEmail) {
        updateComplaintCountsForUser(userEmail);
    } else {
        console.warn("User email not found.");
    }
});
