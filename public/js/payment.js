

window.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(sessionStorage.getItem("bikes")) || [];
    renderCart(cartItems);
});
const token = localStorage.getItem('authToken');
let userInfo
// Giải mã token để lấy thông tin
if (token) {
    userInfo = decodeToken(token);
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
        <img src="${item.imageUrl}" alt="Ảnh xe đạp" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Hãng: ${item.brand}</p>
          <p>Loại: ${item.type}</p>
          <p>Giá thuê/h: ${item.price_per_hour.toLocaleString()} VNĐ</p>
          <p>Số lượng: ${item.quantity}</p>
        </div>
      `;
        cartContainer.appendChild(div);
        total += parseFloat(item.price_per_hour) * item.quantity;
    });

    subtotalElem.textContent = total.toLocaleString("vi-VN") + " VNĐ";
    totalElem.textContent = total.toLocaleString("vi-VN") + " VNĐ";
}
document.getElementById("rental-hours").addEventListener("input", (e) => {
    const rentalHours = parseInt(e.target.value, 10);
    const totalElem = document.getElementById("total");
    const subtotalElem = document.getElementById("subtotal");
    const cartItems = JSON.parse(sessionStorage.getItem("bikes")) || [];
    let total = 0;
    cartItems.forEach((item) => {
        total += parseFloat(item.price_per_hour) * item.quantity * rentalHours;
    });
    

    subtotalElem.textContent = total.toLocaleString("vi-VN") + " VNĐ";
    totalElem.textContent = total.toLocaleString("vi-VN") + " VNĐ";
});
let timeoutId
let paymentFormClosedEarly = false;
document.getElementById("btn-pay").addEventListener("click", async (e) => {
    e.preventDefault();
    handleSubmit();
});

async function handleSubmit() {
    
    const formInfo = document.querySelector('.checkout-form');
    const cartItems = JSON.parse(sessionStorage.getItem("bikes")) || [];
    if (cartItems.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
    }
    const userId = userInfo ? userInfo.id : null;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const receiveTime = document.getElementById("receive-time").value;
    const rentalHours = parseInt(document.getElementById("rental-hours").value, 10);
    const paymentMethod = formInfo.querySelector('input[name="payment_method"]:checked').value;
    const bikes = cartItems.map(item => {
        return {
            bike_id: item.bikeId,
            quantity: item.quantity,
            price_per_hour: item.price_per_hour,
            name: item.name,
            type: item.type,
            brand: item.brand,
        }
    });
    console.log(JSON.stringify({ userId, name, phone, bikes, paymentMethod, receiveTime, rentalHours }))
    try {
        const res = await fetch("http://localhost:3000/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, name, phone, bikes, paymentMethod, receiveTime, rentalHours }),
        });
        if (res.ok) {
            const data = await res.json();

            if (paymentMethod === "cod") {
                alert("Đặt hàng thành công. Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.");
                document.getElementById("cart-items").innerHTML = "";
                document.getElementById("subtotal").textContent = "0 VNĐ";
                document.getElementById("total").textContent = "0 VNĐ";
                document.getElementById("name").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("receive-time").value = "";
                document.getElementById("rental-hours").value = "1";
                const infoPaymentInvoice = {
                    orderId: data.order.id,
                    name: name,
                    phone: phone,
                    bikes: bikes,
                    totalPrice: data.order.total_price,
                    receiveTime: receiveTime,
                    rentalHours: rentalHours,
                    payment_status: "pending"
                }
                sessionStorage.setItem("infoPaymentInvoice", JSON.stringify(infoPaymentInvoice));
                setTimeout(() => {
                    window.open("/public/html/payment_invoice.html", "_blank");
                }, 500);
                sessionStorage.removeItem("bikes");
            } else {
                const orderCode = document.querySelector(".order-code");
                orderCode.textContent = `#ORDER:${data.order.id}`;
                document.querySelector('.payment-method').textContent = data.order.payment_method;

                document.querySelector('.payment-form').style.display = 'block';
                document.getElementById("overlay").style.display = "block";
                document.getElementById("body").style.overflow = "hidden";
                paymentFormClosedEarly = false;
                // Đặt timeout 30s
                timeoutId = setTimeout(async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/api/payments/webhook`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId: data.order.id, status: 'failed' }),
                        })
                        if (!response.ok) {
                            throw new Error(`Failed to update payment status: ${response.status}`);
                        }
                        const submidBtn = document.querySelector('.submit-btn');
                        submidBtn.disabled = true;
                        submidBtn.textContent = "Đã quá thời gian thanh toán";
                        submidBtn.style.backgroundColor = "#ccc";
                    } catch (error) {
                        console.error("Error updating payment status:", error);
                    }
                    timeoutId = null;
                }, 30000)
                const confirmPayBtn = document.getElementById("confirm-pay");
                const infoPaymentInvoice = {
                    orderId: data.order.id,
                    name: name,
                    phone: phone,
                    bikes: bikes,
                    totalPrice: data.order.total_price,
                    receiveTime: receiveTime,
                    rentalHours: rentalHours
                }
                confirmPayBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    handlePayment(infoPaymentInvoice);
                })

            }
        } else {
            throw new Error(`Failed to create order: ${res.status}`);
        }
    } catch (err) {
        console.error("Error placing order:", err);
    }
};
async function handlePayment(infoPaymentInvoice) {
    
    const orderId = parseInt(document.querySelector(".order-code").textContent.split(":")[1]);
    const status = "paid"; // Hoặc trạng thái thanh toán thực tế
    try {
        const res = await fetch("/api/payments/webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, status }),
        });
        if (res.ok) {
            alert("Thanh toán thành công");
            clearTimeout(timeoutId);
            document.querySelector('.payment-form').style.display = 'none';
            document.getElementById("overlay").style.display = "none";
            document.getElementById("body").style.overflow = "auto";
            document.getElementById("cart-items").innerHTML = "";
            document.getElementById("subtotal").textContent = "0 VNĐ";
            document.getElementById("total").textContent = "0 VNĐ";
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("receive-time").value = "";
            document.getElementById("rental-hours").value = "1";
            infoPaymentInvoice.payment_status = "paid";
            sessionStorage.setItem("infoPaymentInvoice", JSON.stringify(infoPaymentInvoice));
            window.open("/public/html/payment_invoice.html", "_blank");
            sessionStorage.removeItem("bikes");

        } else {
            throw new Error(`Failed to update payment status: ${res.status}`);
        }
    } catch (error) {
        console.error("Error handling payment:", error);
    }
}
let paymentFormTimeout;


function showPaymentForm() {
    document.querySelector('.payment-form').style.display = 'block';
    paymentFormClosedEarly = false;
    // Đặt timeout 30s
    paymentFormTimeout = setTimeout(() => {
        paymentFormTimeout = null;
        // Sau 30s, không cần xác nhận nữa
    }, 30000);
}

document.getElementById('close-payment-form').onclick = function () {
    if (timeoutId) {
        paymentFormClosedEarly = true;
        if (confirm("Bạn chưa hoàn tất thanh toán. Bạn có chắc muốn đóng form?")) {
            document.querySelector('.payment-form').style.display = 'none';
            document.querySelector('.submit-btn').disabled = false;
            document.querySelector('.submit-btn').textContent = "Xác nhận đã thanh toán";
            document.querySelector('.submit-btn').style.backgroundColor = "#4CAF50";
            document.getElementById("overlay").style.display = "none";
            document.getElementById("body").style.overflow = "auto";
            clearTimeout(paymentFormTimeout);
            paymentFormTimeout = null;
        }
    } else {
        document.querySelector('.payment-form').style.display = 'none';
        document.querySelector('.submit-btn').disabled = false;
        document.querySelector('.submit-btn').textContent = "Xác nhận đã thanh toán";
        document.querySelector('.submit-btn').style.backgroundColor = "#4CAF50";
        document.getElementById("overlay").style.display = "none";
        document.getElementById("body").style.overflow = "auto";
    }
};

