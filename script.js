let users = JSON.parse(localStorage.getItem("users")) || [];

function renderTable() {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  users.forEach((u, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${u.name}</td><td>${u.phone}</td><td>${u.balance}</td>
                    <td><button onclick="editUser(${index})">編集</button></td>`;
    tbody.appendChild(tr);
  });
}

document.getElementById("showAddForm").addEventListener("click", () => {
  const form = document.getElementById("addForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const balance = Number(document.getElementById("balance").value);

  if (!name || !phone || isNaN(balance)) {
    alert("全て入力してください");
    return;
  }

  if (users.length >= 5) {
    alert("家族は最大5人までです");
    return;
  }

  users.push({ name, phone, balance });
  saveAndRender();
});

function editUser(index) {
  const u = users[index];
  const newName = prompt("名前を編集", u.name);
  if (newName === null) return;
  const newPhone = prompt("電話番号を編集", u.phone);
  if (newPhone === null) return;
  const newBalance = prompt("残高を編集", u.balance);
  if (newBalance === null || isNaN(Number(newBalance))) return;

  users[index] = { name: newName, phone: newPhone, balance: Number(newBalance) };
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("users", JSON.stringify(users));
  renderTable();
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("balance").value = "";
}

renderTable();