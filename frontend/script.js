const form = document.getElementById("leadForm");
const table = document.getElementById("leadTable");

const API_URL = "http://localhost:5000/api/leads";


async function loadLeads() {
  const res = await fetch(API_URL);
  const data = await res.json();

  table.innerHTML = "";

  data.forEach(lead => {
    const row = `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.source}</td>

        <td>
          <select onchange="updateStatus('${lead._id}', this.value)" class="status-select">
            <option ${lead.status === "new" ? "selected" : ""}>new</option>
            <option ${lead.status === "contacted" ? "selected" : ""}>contacted</option>
            <option ${lead.status === "converted" ? "selected" : ""}>converted</option>
          </select>
        </td>

        <td>${lead.notes}</td>

        <td>
          <button class="delete-btn" onclick="deleteLead('${lead._id}')">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newLead = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    source: document.getElementById("source").value,
    notes: document.getElementById("notes").value
  };

  if (!newLead.source) {
    alert("Please select a source");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLead)
  });

  form.reset();
  loadLeads();
});


async function updateStatus(id, status) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  loadLeads();
}


async function deleteLead(id) {
  if (confirm("Are you sure you want to delete this lead?")) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    loadLeads();
  }
}


loadLeads();