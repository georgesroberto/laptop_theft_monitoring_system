// File: //frontend/script.js
const API_BASE = "http://localhost:3000";

// Utility function to send POST requests
async function postData(endpoint, data) {
  console.log("Sending data to:", endpoint, data);
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json().then((json) => ({ ok: res.ok, data: json }));
}

// Utility function to show alerts
function showAlert(ok, successMsg, errorMsg) {
  alert(ok ? successMsg : `Error: ${errorMsg}`);
}

// ✅ Register User → /users/register
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { ok, data } = await postData("/users/register", {
      name,
      email,
      password,
    });
    showAlert(ok, "User Registered Successfully!", data.error);
    if (ok) e.target.reset();
  });

// ✅ Register Laptop → /laptops/register
document.getElementById("laptopForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  const serialNumber = document.getElementById("serialNumber").value;
  const model = document.getElementById("model").value;

  const { ok, data } = await postData("/laptops/register", {
    userId,
    serialNumber,
    model,
  });
  showAlert(ok, "Laptop Registered Successfully!", data.error);
  if (ok) e.target.reset();
});

// ✅ Report Theft → /theft/report
document.getElementById("theftForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const laptopId = document.getElementById("reportLaptopId").value;
  const location = document.getElementById("reportLocation").value;

  const { ok, data } = await postData("/theft/report", {
    laptopId,
    location,
  });
  showAlert(ok, "Theft Reported!", data.error);
  if (ok) e.target.reset();
});

// ✅ Admin: Resolve Report → PUT /theft/:id/resolve
document
  .getElementById("resolveReport")
  ?.addEventListener("click", async () => {
    const reportId = document.getElementById("adminReportId").value;
    if (!reportId) return alert("Enter a report ID");

    const res = await fetch(`${API_BASE}/theft/${reportId}/resolve`, {
      method: "PUT",
    });
    const data = await res.json();
    alert(data.message || data.error);
  });

// ✅ Admin: Delete Report → DELETE /theft/:id
document.getElementById("deleteReport")?.addEventListener("click", async () => {
  const reportId = document.getElementById("adminReportId").value;
  if (!reportId) return alert("Enter a report ID");

  const res = await fetch(`${API_BASE}/theft/${reportId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  alert(data.message || data.error);
});

// ✅ Load All Laptops → GET /laptops
document.getElementById("loadLaptops")?.addEventListener("click", async () => {
  const res = await fetch(`${API_BASE}/laptops`);
  const laptops = await res.json();
  const list = document.getElementById("laptopList");
  list.innerHTML = "";
  laptops.forEach((l) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${l.id}, Serial: ${l.serial_number}, Model: ${l.model}, Status: ${l.status}`;
    list.appendChild(li);
  });
});

// ✅ Search Laptop by Serial Number → GET /laptops/track/:serialNumber
document.getElementById("searchBtn")?.addEventListener("click", async () => {
  const serial = document.getElementById("searchSerial").value;
  const result = document.getElementById("searchResult");
  if (!serial) return alert("Enter serial number");

  const res = await fetch(`${API_BASE}/laptops/track/${serial}`);
  const data = await res.json();

  if (res.ok) {
    result.innerHTML = `
      <p><strong>Model:</strong> ${data.model}</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Owner ID:</strong> ${data.user_id}</p>
    `;
  } else {
    result.innerHTML = `<p style="color:red;">${data.error}</p>`;
  }
});
