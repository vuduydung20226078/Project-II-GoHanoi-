// Function to decode JWT token (không cần key để giải mã)
function decodeToken(token) {
    const payload = token.split('.')[1]; // Lấy phần payload của token
    const decoded = JSON.parse(atob(payload)); // Giải mã base64 và chuyển sang JSON
    return decoded;
}

// Lấy token từ localStorage
const token = localStorage.getItem('authToken');
let userInfo
// Giải mã token để lấy thông tin
if (token) {
    userInfo = decodeToken(token);
    console.log(userInfo.id); // Sử dụng user id
    console.log(userInfo.username); // Sử dụng username
}

//hàm fetchBikes sẽ lấy dữ liệu từ API và hiển thị danh sách xe đạp
// Hàm này sẽ được gọi khi trang được tải
async function fetchBikes() {
    try {
        const res = await fetch('http://localhost:3000/api/bikes');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data.bikes)
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
window.onload = fetchBikes;

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

// Thêm sản phẩm vào giỏ hàng
const infoUser = JSON.parse(sessionStorage.getItem("infoUser"));
if (!infoUser) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
   
}
async function addToCart(bikeId) {
    const userId = JSON.parse(sessionStorage.getItem("infoUser")).userId;
    const cartItem = {
        userId: userInfo.id, // Sử dụng userId từ thông tin người dùng đã đăng nhập
        bikeId: bikeId
    };
    console.log(cartItem);
    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });
        if (response.ok) {
            alert('Đã thêm vào giỏ hàng');

        } else {
            alert('Thêm vào giỏ hàng thất bại');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}