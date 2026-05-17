// 1. مصفوفة المنتجات الأساسية مع الأسعار
const products = [
  { id: 1, name: "ColorVu Camera", image: "images/colorvu-image.png", price: 500 },
  { id: 2, name: "PTZ Camera", image: "images/HIKVISIONPTZ.png", price: 1200 },
  { id: 3, name: "Dome Camera", image: "images/dome.jpg", price: 400 },
  { id: 4, name: "DVR", image: "images/Hikvision-iDS-7104HQHI-M1T-4ch-1080P-Mini-1U-H.265-AcuSense-DVR.jpg", price: 1500 },
  { id: 5, name: "RG59 Coaxial Video Cable", image: "images/61CzUpXiByL._SX522_.jpg", price: 150 },
  { id: 6, name: "Power Supply", image: "images/615HryCWkL._AC_UF8941000_QL80_-1.jpg", price: 250 },
  { id: 7, name: "DC Power Pigtail Male/Female ", image: "images/71Gf-6ZqZdL._AC_SX522_.jpg", price: 20 },
  { id: 8, name: "BNC Cable for Camera - Video Transmission", image: "images/4122d9Wgi3L._AC_SX679_.jpg", price: 35 },
  { id: 9, name: "Topiky Microphone for CCTV Camera", image: "images/51XGoqZHruL._AC_SX522_.jpg", price: 180 },
  { id: 10, name: "WD 1 TB Hard Disk Internal 3.5", image: "images/71MiDZhqfaL._AC_SX679_.jpg", price: 900 }
];

// مصفوفة السلة المحفوظة في المتصفح
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// متغير لتحديد أي حاوية منتجات نشطة حالياً بناءً على الصفحة
let currentActiveContainer = ""; 

// عند تحميل الصفحة
window.onload = function () {
  updateCartIcon(); // تحديث عداد السلة في الهيدر

  // التحقق من الصفحة الحالية لتحديد الحاوية النشطة للأسهم
  if (window.location.pathname.includes("products.html")) {
    currentActiveContainer = "products";
    renderProducts(products, "products");
  } else {
    currentActiveContainer = "searchResults";
  }
};

// دالة موحدة لعرض المنتجات
function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p class='no-results'>No results found</p>";
    return;
  }

  list.forEach((product) => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">Price: ${product.price} EGP</p>
        
        <div class="quantity-control">
          <button onclick="changeQtyInDOM(${product.id}, -1)">-</button>
          <span id="qty-${product.id}">0</span>
          <button onclick="changeQtyInDOM(${product.id}, 1)">+</button>
        </div>

        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart 🛒</button>
      </div>
    `;
  });
}

// دالة البحث المخصصة لصفحة الهوم
function searchPage() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultsContainer = document.getElementById("searchResults");

  if (!resultsContainer) return;

  if (input === "") {
    resultsContainer.innerHTML = "";
    return;
  }

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(input)
  );

  currentActiveContainer = "searchResults";
  renderProducts(filtered, "searchResults");
}

// 🛠️ الدالة المعدلة والمضمونة لتحريك السلايدر يميناً ويساراً بسلاسة حقيقية
function moveSlider(direction) {
  if (!currentActiveContainer) return;

  const container = document.getElementById(currentActiveContainer);
  if (!container) return;

  // تحديد مسافة التحرك عند كل ضغطة (عرض كارت واحد + المسافة بين الكروت)
  const scrollAmount = 245; 

  // تحريك الحاوية أفقياً بناءً على الاتجاه (1 لليمين، -1 لليسار)
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

// تغيير الكمية في الواجهة ويمنع السوالب
function changeQtyInDOM(id, step) {
  const qtySpan = document.getElementById(`qty-${id}`);
  if (!qtySpan) return;
  
  let currentQty = parseInt(qtySpan.innerText);
  currentQty += step;
  
  if (currentQty < 0) currentQty = 0; 
  qtySpan.innerText = currentQty;
}

// إضافة المنتج إلى السلة وحفظه
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const qtySpan = document.getElementById(`qty-${id}`);
  const quantity = qtySpan ? parseInt(qtySpan.innerText) : 0;

  if (quantity === 0) {
    alert("Please increase the quantity first! 🛒");
    return;
  }

  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ ...product, quantity: quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
  alert(`Added ${quantity} of ${product.name} to your cart!`);

  if (qtySpan) qtySpan.innerText = "0";
}

// تحديث عداد السلة في الهيدر
function updateCartIcon() {
  const cartCountElement = document.getElementById("cart-count");
  if (!cartCountElement) return;
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.innerText = totalItems;
}

// مراقبة زر Enter عند البحث
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchPage();
      }
    });
  }
});

// قائمة الموبايل التفاعلية
function toggleMenu() {
  const menu = document.querySelector(".header-links");
  if (menu) menu.classList.toggle("active");
}

document.querySelectorAll(".header-links a").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.querySelector(".header-links");
    if (menu) menu.classList.remove("active");
  });
});
