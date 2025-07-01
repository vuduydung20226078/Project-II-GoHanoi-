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
                    <button type="button" class="add-to-cart">
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