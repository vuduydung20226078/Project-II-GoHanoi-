// Function to decode JWT token (không cần key để giải mã)

// Lấy token từ localStorage
const token = localStorage.getItem('authToken');
let userInfo
// Giải mã token để lấy thông tin
if (token) {
    userInfo = decodeToken(token);
}
async function fetchCart() {
    try {
        const res = await fetch(`http://localhost:3000/api/cart/${userInfo.id}`); // Sử dụng user id từ token
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data); // Kiểm tra dữ liệu trả về
        const countItem = document.getElementById("cart-count-bicycle");
        countItem.textContent = data.length; // Cập nhật số lượng mục trong giỏ hàng
        renderCart(data);
    } catch (err) {
        console.error("Error fetching cart:", err);
    }
}
// Function to render cart items
function renderCart(cartItems) {
    
    const tableBodyCart = document.getElementById("table-body-cart");
    tableBodyCart.innerHTML = ''; // Xoá nội dung cũ
    cartItems.forEach(item => {
        const row = document.createElement("tr");
        row.id = `cart-item-${item.id}-${item.Bike.id}`; // Thêm id cho mỗi hàng
        row.className = "cart-item" // Thêm id cho mỗi hàng
        const price = parseInt(item.Bike.price_per_hour, 10);
        row.innerHTML = `
            <td><img class="picture-bicycle-inCart" src="${item.Bike.image_url}" alt="Ảnh xe đạp}"></td>
            <td>${item.Bike.name}</td>
            <td>${item.Bike.type}</td>
            <td>${item.Bike.Brand.name}</td>
            <td>${price} VNĐ</td>
            <td>${item.quantity}</td>
            <td>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Xoá</button>
                <button class="pick-btn" onclick="pickBike(${item.id})">Chọn</button>
            </td>
        `;
        tableBodyCart.appendChild(row);
    });
}
// Hàm xóa một mục khỏi giỏ hàng
async function removeFromCart(itemId) {
    try {
        const response = await fetch(`http://localhost:3000/api/cart/by-cart/${itemId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.getElementById(`cart-item-${itemId}`).remove(); // Xoá hàng khỏi bảng
            const countItem = document.getElementById("cart-count-bicycle");
            countItem.textContent = parseInt(countItem.textContent) - 1; // Cập nhật số lượng mục trong giỏ hàng
            alert('Đã xoá khỏi giỏ hàng');
        } else {
            alert('Xoá khỏi giỏ hàng thất bại');
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}
// Hàm xóa tất cả các mục trong giỏ hàng
async function deleteAllInCart() {
    try {
        const response = await fetch(`http://localhost:3000/api/cart/by-user/${userInfo.id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.getElementById("table-body-cart").innerHTML = ''; // Xoá tất cả hàng trong bảng
            document.getElementById("cart-count-bicycle").textContent = '0'; // Cập nhật số lượng mục trong giỏ hàng
            alert('Đã xoá tất cả khỏi giỏ hàng');
        } else {
            alert('Xoá tất cả khỏi giỏ hàng thất bại');
        }
    } catch (error) {
        console.error('Error deleting all from cart:', error);
    }
}
// Hàm chọn xe đạp trong giỏ hàng
function pickBike(itemId) {
    const row = document.getElementById(`cart-item-${itemId}`);
    if (row) {
        row.classList.toggle('selected'); // Thêm hoặc xoá class 'selected' để đánh dấu đã chọn
        const pickBtn = row.querySelector('.pick-btn');
        pickBtn.textContent = pickBtn.textContent === 'Chọn' ? 'Bỏ chọn' : 'Chọn'; // Thay đổi văn bản nút
    }
}
//function
function pickAllElementInCart(button) {
    const tableBodyCart = document.getElementById("table-body-cart");
    const rows = tableBodyCart.querySelectorAll("tr.cart-item");
    rows.forEach(row => {
        row.classList.toggle('selected'); // Thêm class 'selected' để đánh dấu đã chọn
        const pickBtn = row.querySelector('.pick-btn');
        pickBtn.textContent = pickBtn.textContent === 'Chọn' ? 'Bỏ chọn' : 'Chọn'; // Thay đổi văn bản nút
        button.textContent = button.textContent === 'Chọn tất cả' ? 'Bỏ chọn tất cả' : 'Chọn tất cả'; // Thay đổi văn bản nút "Chọn tất cả" thành "Bỏ chọn tất cả"
    });
}
//hàm fetchBikes sẽ lấy dữ liệu từ API và hiển thị danh sách xe đạp
async function fetchBikes() {
    try {
        const res = await fetch('http://localhost:3000/api/bikes');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const list = document.getElementById('list-bicycle');
        list.innerHTML = '';
        data.bikes.forEach(bike => {
            const item = `
                <li>
                    <div class="bicycle-top">
                        <a href="#" class="bicycle-picture">
                            <img src="${bike.image_url}" alt="Ảnh xe đạp}">
                        </a>
                        <div id="category">Xe ${bike.type}</div>
                    </div>
                    <div class="bicycle-info">
                        <h3 class="bicycle-info-name">${bike.name}</h3>
                        <p class="brand">Hãng: ${bike.Brand.name}</p>
                        <p>Tình trạng: Mới 95%</p>
                        <p>Giá thuê: ${bike.price_per_hour} VNĐ/h</p>
                        <p>Đã thuê: 12</p>
                        <p>Còn lại: 5</p>
                    </div>
                    <button type="button" class="add-to-cart" onclick="addToCart(${bike.id})">
                        <ion-icon name="cart" class="cart"></ion-icon>
                    Thêm Vào Giỏ
                    </button>

                </li>
                
            `
            list.innerHTML += item;
        });
    } catch (error) {
        console.error('Failed to fetch bikes:', error);
    }
}
// Gọi hàm khi trang được tải
window.onload = function() {
    fetchBikes();
    fetchCart(); 
};
document.getElementById("cart-icon").addEventListener("click", (e) => {
    e.preventDefault();
    fetchCart();
})
// đóng/mở cart

const closeCartBtn = document.getElementById("close-cart");
const inCart = document.getElementById("in-cart");
const iconCart = document.getElementById("cart-icon");
const titleCart = document.getElementById("title-cart");
iconCart.addEventListener("click", (e) => {
    e.preventDefault();
    inCart.classList.add("active");
    titleCart.classList.add("active");
    document.getElementById("overlay").classList.add("active");
    body.classList.add("no-scroll");
})
closeCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inCart.classList.remove("active");
    titleCart.classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
    body.classList.remove("no-scroll");
});

// Hàm thêm xe đạp vào giỏ hàng
async function addToCart(bikeId) {
    const cartItem = {
        userId: userInfo.id, // Sử dụng userId từ thông tin người dùng đã đăng nhập
        bikeId: bikeId
    };
    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });
        if (response.ok) {
            alert('Thêm vào giỏ hàng thành công');
            data = await response.json();
            if(data.quantity === 1){
                document.getElementById("cart-count-bicycle").textContent = parseInt(document.getElementById("cart-count-bicycle").textContent) + 1; // Cập nhật số lượng mục trong giỏ hàng
            }

        } else {
            alert('Thêm vào giỏ hàng thất bại');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}
// Hàm xử lý thanh toán
const buttonPayment = document.getElementById("payment-btn");
buttonPayment.addEventListener("click", async (e) => {
    e.preventDefault();
    const selectedItems = document.querySelectorAll(".cart-item.selected");
    console.log(selectedItems);
    if (selectedItems.length === 0) {
        alert("Vui lòng chọn ít nhất một xe đạp để thuê.");
        return;
    }

    const bikes = Array.from(selectedItems).map(row => {
        const cartId = row.id.split('-')[2]; 
        const bikeId = row.id.split('-')[3]; // Lấy bikeId từ id của hàng
        const quantity = parseInt(row.querySelector('td:nth-child(6)').textContent, 10); // Lấy số lượng từ cột thứ 6
        const imageUrl = row.querySelector('.picture-bicycle-inCart').src; // Lấy URL hình ảnh
        const name = row.querySelector('td:nth-child(2)').textContent; // Lấy tên xe đạp
        const type = row.querySelector('td:nth-child(3)').textContent; // Lấy loại xe đạp từ cột thứ 3
        console.log(name)
        const brand = row.querySelector('td:nth-child(4)').textContent; // Lấy tên hãng từ cột thứ 4
        const price_per_hour = parseInt(row.querySelector('td:nth-child(5)').textContent.replace(/ VNĐ/g, ''), 10); // Lấy giá từ cột thứ 5 và chuyển đổi sang số nguyên
        return { cartId, bikeId, quantity, imageUrl, name, type, brand, price_per_hour};
    });
    sessionStorage.setItem("bikes", JSON.stringify(bikes)); // Lưu thông tin xe đạp đã chọn vào sessionStorage
    window.location.href = "http://localhost:3000/html/payment.html"; // Chuyển hướng đến trang thanh toán
});