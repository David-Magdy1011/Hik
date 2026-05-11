function toggleZoom(img) {
  img.classList.toggle("zoom");
}
function toggleMenu() {
  document.querySelector(".header-links").classList.toggle("show");
}
window.addEventListener("scroll", () => {
  document.querySelectorAll(".item").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
});
function searchPage() {

  let input = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  if(input.includes("product")) {

    document.getElementById("Product")
      .scrollIntoView({
        behavior: "smooth"
      });

  }

  else if(input.includes("contact")) {

    document.getElementById("Contact")
      .scrollIntoView({
        behavior: "smooth"
      });

  }

  else if(input.includes("home")) {

    document.getElementById("HOME")
      .scrollIntoView({
        behavior: "smooth"
      });

  }

  else {

    alert("Section not found");

  }
}

