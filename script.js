let currentIndex = 0;

let products = [
  { name: "ColorVu Camera", image: "images/colorvu-image.png" },
  { name: "PTZ Camera", image: "images/HIKVISIONPTZ.png" },
  { name: "Dome Camera", image: "images/dome.jpg" },
  { name: "Power Supply", image: "images/615HryCWkL._AC_UF8941000_QL80_-1.jpg" }
];

let filteredProducts = [...products];

window.onload = function () {
  renderProducts(filteredProducts);
  updateSlider();
};
function renderProducts(list) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
      </div>
    `;
  });
}
function searchPage() {
  let input = document.getElementById("searchInput").value.toLowerCase().trim();

  // لو البحث فاضي → رجّع كل المنتجات
  if (input === "") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(input)
    );
  }

  currentIndex = 0;
  renderProducts(filteredProducts);
  updateSlider();
}

document.addEventListener("DOMContentLoaded", function () {
  let searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", function () {
    let value = this.value.toLowerCase().trim();

    if (value === "") {
      filteredProducts = [...products]; // يرجع الكل
    } else {
      filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(value)
      );
    }

    currentIndex = 0;
    renderProducts(filteredProducts);
    updateSlider();
  });
});
function updateSlider() {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => card.classList.remove("active"));

  if (cards[currentIndex]) {
    cards[currentIndex].classList.add("active");
  }
}

function nextSlide() {
  let cards = document.querySelectorAll(".card");

  currentIndex++;

  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  updateSlider();
}

function prevSlide() {
  let cards = document.querySelectorAll(".card");

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  }

  updateSlider();
}
document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchPage();
  }
});
function toggleMenu() {

  let menu = document.querySelector(".header-links");

  menu.classList.toggle("active");

}

/* قفل المنيو بعد الضغط على أي لينك */

document.querySelectorAll(".header-links a").forEach(link => {

  link.addEventListener("click", () => {

    document
      .querySelector(".header-links")
      .classList.remove("active");

  });

});