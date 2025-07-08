async function fetchCart() {
    try {
        const res = await fetch("http://localhost:3000/api/cart/1"); // user_id = 1
        const data = await res.json();
        renderCart(data);
    } catch (err) {
        console.error("Error fetching cart:", err);
    }
}

function renderCart(cartItems) {
    const cartContainer = document.getElementById("cart-items");
    const subtotalElem = document.getElementById("subtotal");
    const totalElem = document.getElementById("total");

    let total = 0;

    cartItems.forEach((item) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
        <img src="${item.Bike.image_url}" alt="${item.Bike.name}">
        <div class="cart-item-details">
          <h4>${item.Bike.name}</h4>
          <p>Hãng: ${item.Bike.Brand.name}</p>
          <p>Loại: ${item.Bike.type}</p>
          <p>Giá thuê/h: ${item.Bike.price_per_hour.toLocaleString()} VNĐ</p>
          <p>Số lượng: ${item.quantity}</p>
        </div>
      `;
        cartContainer.appendChild(div);
        total += parseFloat(item.Bike.price_per_hour) * item.quantity;
    });

    subtotalElem.textContent = total.toLocaleString("vi-VN") + " VNĐ";
    totalElem.textContent = total.toLocaleString("vi-VN") + " VNĐ";
}

document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    try {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, address }),
        });
        if (res.ok) {
            alert("✅ Thanh toán thành công!");
            window.location.href = "/html/products.html"; // Redirect về trang sản phẩm
        } else {
            alert("❌ Có lỗi xảy ra khi thanh toán!");
        }
    } catch (err) {
        console.error("Error placing order:", err);
    }
});

fetchCart();
  