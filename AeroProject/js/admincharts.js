 API_URL = "http://localhost:8181/api/complaints";
 USERS_URL = "http://localhost:8181/api/users";
 DEPTS_URL = "http://localhost:8181/api/departments";

// Fetch data from API
async function fetchData(url) {
  try {
     res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Group data by key
function groupBy(data, key) {
  return data.reduce((acc, curr) => {
    acc[curr[key]] = (acc[curr[key]] || 0) + 1;
    return acc;
  }, {});
}

// Generate colors for charts
function generateColors(count) {
  return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`);
}

// Initialize charts only if elements exist
 complaintChart, typeChart;

function initializeCharts() {
   complaintChartCtx = document.getElementById('complaintChart');
  if (complaintChartCtx) {
    complaintChart = new Chart(complaintChartCtx, {
      type: 'bar',
      data: {
        labels: ['Pending', 'In Progress', 'Resolved'],
        datasets: [{
          label: 'Number of Complaints',
          backgroundColor: ['Red', 'Orange', 'Green']
        }]
      },
      options: {
        responsive: true,
        plugins: { 
          legend: { display: true },
          title: { display: false }
        },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });
  }

   ctxPie = document.getElementById('typeChart');
  if (ctxPie) {
    typeChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Complaint Types',
          backgroundColor: [],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 20, padding: 15 } },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed}`;
              }
            }
          }
        }
      }
    });
  }
}

// Update complaint counts and charts
async function updateComplaintCountsAndCharts() {
   loadingElement = document.getElementById('loading');
   errorElement = document.getElementById('error-message');
   summaryCards = document.getElementById('summary-cards');
   charts = document.getElementById('charts');

  if (loadingElement) loadingElement.classList.remove('d-none');
  if (errorElement) errorElement.classList.add('d-none');
  if (summaryCards) summaryCards.classList.add('d-none');
  if (charts) charts.classList.add('d-none');

  try {
     [complaints, users, departments] = await Promise.all([
      fetchData(API_URL),
      fetchData(USERS_URL),
      fetchData(DEPTS_URL)
    ]);

    if (!complaints.length || !users.length) {
      throw new Error("No complaints or users data available");
    }

    // Update summary cards (all complaints for admin)
     total = complaints.length;
     pending = complaints.filter(c => c.Status === "Pending").length;
     inProgress = complaints.filter(c => c.Status === "In Progress").length;
     resolved = complaints.filter(c => c.Status === "Resolved").length;

     totalEl = document.getElementById("total-complaints");
     pendingEl = document.getElementById("pending-complaints");
     inProgressEl = document.getElementById("inprogress-complaints");
     resolvedEl = document.getElementById("resolved-complaints");

    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;
    if (inProgressEl) inProgressEl.textContent = inProgress;
    if (resolvedEl) resolvedEl.textContent = resolved;

    // Update bar chart (complaint status)
    if (complaintChart) {
       statusCounts = groupBy(complaints, "Status");
      complaintChart.data.datasets[0].data = [
        statusCounts["Pending"] || 0,
        statusCounts["In Progress"] || 0,
        statusCounts["Resolved"] || 0
      ];
      complaintChart.update();
    }

    // Update pie chart (complaint types)
     complaintTypes = await fetchData("http://localhost:8181/api/complaintTypes");
    if (!complaintTypes.length) {
      throw new Error("No complaint types data available");
    }
    
    if (typeChart) {
       typeCounts = groupBy(complaints, "CTID");
       typeLabels = complaintTypes.map(ct => ct.complaintType.split('(')[0].trim());
       typeData = complaintTypes.map(ct => typeCounts[ct.CTID] || 0);

      typeChart.data.labels = typeLabels;
      typeChart.data.datasets[0].data = typeData;
      typeChart.data.datasets[0].backgroundColor = generateColors(typeData.length);
      typeChart.update();
    }

    // Show content
    if (summaryCards) summaryCards.classList.remove('d-none');
    if (charts) charts.classList.remove('d-none');
    if (loadingElement) loadingElement.classList.add('d-none');

  } catch (err) {
    console.error("Failed to update complaint counts and charts:", err);
    if (errorElement) {
      errorElement.textContent = `Error: ${err.message}`;
      errorElement.classList.remove('d-none');
    }
    if (loadingElement) loadingElement.classList.add('d-none');
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", async function () {
  initializeCharts();
  
   userEmail = sessionStorage.getItem("userEmail");
   errorElement = document.getElementById('error-message');
  
  if (!userEmail) {
    console.warn("User email not found.");
    if (errorElement) {
      errorElement.textContent = "Please log in to access the dashboard.";
      errorElement.classList.remove('d-none');
    }
    return;
  }

  try {
     users = await fetchData(USERS_URL);
    if (!users || !Array.isArray(users)) {
      throw new Error("Invalid users data: users array is missing or not an array.");
    }

    // Verify admin access
     user = users.find(u => u.email === userEmail && u.userType === "Administrator");
    if (user) {
      updateComplaintCountsAndCharts();
    } else {
      throw new Error("Access denied: Administrator privileges required.");
    }
  } catch (err) {
    console.warn(err.message);
    if (errorElement) {
      errorElement.textContent = err.message;
      errorElement.classList.remove('d-none');
    }
  }
});
