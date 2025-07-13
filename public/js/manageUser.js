document.addEventListener("DOMContentLoaded", () => {
    let users = [
        { id: "U101", name: "Nguyễn Văn A", phone: "0912345678", totalOrders: 5, status: "Active" },
        { id: "U102", name: "Trần Thị B", phone: "0987654321", totalOrders: 2, status: "Inactive" },
        { id: "U103", name: "Lê Văn C", phone: "0934567890", totalOrders: 8, status: "Active" },
    ];
    let editingUserId = null;

    const table = document.getElementById("users-table");
    const userModal = document.getElementById("userModal");
    const closeModal = document.getElementById("closeModal");
    const userForm = document.getElementById("userForm");
    const userName = document.getElementById("userName");
    const userPhone = document.getElementById("userPhone");
    const userStatus = document.getElementById("userStatus");
    const searchInput = document.getElementById("searchInput");

    function renderUsers(filteredUsers = users) {
        table.innerHTML = "";
        filteredUsers.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.totalOrders}</td>
        <td>${user.status}</td>
        <td>
          <button class="action-btn edit-btn" data-id="${user.id}">Edit</button>
          <button class="action-btn delete-btn" data-id="${user.id}">Delete</button>
        </td>
      `;
            table.appendChild(row);
        });
    }

    // Search function
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.trim().toLowerCase();
        const filteredUsers = users.filter(user =>
            user.id.toLowerCase().includes(keyword) ||
            user.name.toLowerCase().includes(keyword)
        );
        renderUsers(filteredUsers);
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        userModal.style.display = "none";
    });

    // Save user (edit only)
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = userName.value;
        const phone = userPhone.value;
        const status = userStatus.value;

        users = users.map(user =>
            user.id === editingUserId ? { ...user, name, phone, status } : user
        );

        renderUsers();
        userModal.style.display = "none";
    });

    // Edit & Delete actions
    table.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const userId = e.target.dataset.id;
            const user = users.find(u => u.id === userId);
            editingUserId = userId;
            userName.value = user.name;
            userPhone.value = user.phone;
            userStatus.value = user.status;
            userModal.style.display = "block";
        }

        if (e.target.classList.contains("delete-btn")) {
            const userId = e.target.dataset.id;
            const user = users.find(u => u.id === userId);

            const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}" không?`);
            if (confirmDelete) {
                users = users.filter(u => u.id !== userId);
                renderUsers();
            }
        }
    });

    // Initial render
    renderUsers();
});
