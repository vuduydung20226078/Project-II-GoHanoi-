const places = [
    {
        name: "HỒ <br> GƯƠM",
        desc: "Biểu tượng trái tim của thủ đô Hà Nội ngàn năm văn hiến",
        sub: "Hồ Gươm<br>Hà Nội",
        bg: "url('/assets/locations/hoguom.jpg')"
    },
    {
        name: "VĂN <br> MIẾU",
        desc: "Biểu tượng tri thức, nơi vinh danh hiền tài đất Việt",
        sub: "Văn Miếu<br>Hà Nội",
        bg: "url('/assets/locations/vanmieu2.jpg')"
    },
    {
        name: "LĂNG <br> BÁC",
        desc: "Nơi an nghỉ của Chủ tịch Hồ Chí Minh vĩ đại",
        sub: "Lăng Bác<br>Hà Nội",
        bg: "url('/assets/locations/LangBac2.jpg')"
    },
    {
        name: "HỒ <br> TÂY",
        desc: "Không gian thoáng đãng, điểm đến lý tưởng lúc hoàng hôn",
        sub: "Hồ Tây<br>Hà Nội",
        bg: "url('/assets/locations/hotay.jpg')"
    },
    {
        name: "PHỐ <br> CỔ",
        desc: "Nơi lưu giữ nét đẹp truyền thống của người Hà Nội",
        sub: "Phố cổ<br>Hà Nội",
        bg: "url('/assets/locations/phoco.jpg')"
    }
];

let currentIndex = 0;

const hero = document.querySelector('.hero');
const placeName = document.getElementById('place-name');
const placeDesc = document.getElementById('place-desc');
const placeSub = document.getElementById('place-sub');
const placeIndex = document.getElementById('place-index');

function renderPlace(index) {
    const place = places[index];
    hero.style.backgroundImage = place.bg;
    placeName.innerHTML = place.name;
    placeDesc.textContent = place.desc;
    placeSub.innerHTML = place.sub;
    placeIndex.textContent = String(index + 1).padStart(2, '0');
}
let slideInterval;
function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % places.length;
        renderPlace(currentIndex);
    }, 7000);
}
document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + places.length) % places.length;
    renderPlace(currentIndex);
    startAutoSlide();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % places.length;
    renderPlace(currentIndex);
    startAutoSlide();
});

// Khởi tạo slide đầu tiên
renderPlace(currentIndex);
startAutoSlide();
// chuyển đánh giá (trải nghiệm)

let currentSlide= 0;
const testimonials = document.querySelectorAll('.testimonial');
const list = document.getElementById('testimonial-list');

function updateSlider() {
    const offset = -currentSlide * 100;
    list.style.transform = `translateX(${offset}%)`;
}

function nextTestimonial() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateSlider();
}

function prevTestimonial() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    updateSlider();
}
