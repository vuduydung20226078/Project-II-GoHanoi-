document.addEventListener("DOMContentLoaded", () => {
    // Dữ liệu mẫu (thay bằng API thực tế)
    const dashboardData = {
        totalBikes: 25,
        totalUsers: 100,
        totalOrders: 320,
        revenueToday: 1500000,
        pendingOrders: 5,
        ongoingOrders: 8,
        returnedOrders: 300,
        failedOrders: 7,
    };

    document.getElementById("total-bikes").textContent = dashboardData.totalBikes;
    document.getElementById("total-users").textContent = dashboardData.totalUsers;
    document.getElementById("total-orders").textContent = dashboardData.totalOrders;
    document.getElementById("revenue-today").textContent = dashboardData.revenueToday.toLocaleString() + " VNĐ";

    document.getElementById("pending-orders").textContent = dashboardData.pendingOrders;
    document.getElementById("ongoing-orders").textContent = dashboardData.ongoingOrders;
    document.getElementById("returned-orders").textContent = dashboardData.returnedOrders;
    document.getElementById("failed-orders").textContent = dashboardData.failedOrders;
});
