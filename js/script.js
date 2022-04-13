// Global Variable
let checkBackgroundOption = true;
let sliderImages;

// Check If There Custom Color In LocalStorage
if (localStorage.getItem("main-color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("main-color")
  );
  document.querySelectorAll(".colors-list > .color").forEach((c) => {
    c.classList.remove("active");
    if (c.dataset.color === localStorage.getItem("main-color")) {
      c.classList.add("active");
    }
  });
}

// Check If There Specific Random Backgrounds Option In LocalStorage
if (localStorage.getItem("random-backgrounds")) {
  if (localStorage.getItem("random-backgrounds") === "no") {
    checkBackgroundOption = false;
  }
  checkRandomOption(checkBackgroundOption);
  document.querySelectorAll(".random-bg > .option").forEach((op) => {
    op.classList.remove("active");
    if (op.dataset.option === localStorage.getItem("random-backgrounds")) {
      op.classList.add("active");
    }
  });
}

// Check if Bullets Has A New Change in his State
let bulletHolder = document.querySelector(".nav-bullets");
if (localStorage.getItem("bullets-state")) {
  bulletHolder.style.display = localStorage.getItem("bullets-state");

  document.querySelectorAll(".hide-bul > .option").forEach((op) => {
    op.classList.remove("active");
    if (localStorage.getItem("bullets-state") === op.dataset.value) {
      op.classList.add("active");
    }
  });
}

// Mobile Toggler
let toggle = document.querySelector(".hamburger");
let mobileMenu = document.querySelector(".links");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  toggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  setting.classList.remove("active");
  gear.classList.remove("active");
});

mobileMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("active")) {
    if ((e.target !== mobileMenu) & (e.target !== toggle)) {
      toggle.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  }
});

// Open And Close Setting Window
let setting = document.querySelector(".setting");
let gear = setting.querySelector(".set-icon");

gear.addEventListener("click", () => {
  setting.classList.toggle("active");
  gear.classList.toggle("active");
});

// Change Main Color Of Design
let colors = document.querySelectorAll(".color");

colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    replaceActiveClass(colors, e.target);

    // Reset main-color On root Element
    document.documentElement.style.setProperty(
      "--main-color",
      color.dataset.color
    );

    localStorage.setItem("main-color", color.dataset.color);
  });
});

// Toggle Random Backgrounds Option On click
let randomOp = document.querySelectorAll(".random-bg > .option");

randomOp.forEach((op) => {
  op.addEventListener("click", (e) => {
    replaceActiveClass(randomOp, e.target);

    if (e.target.dataset.option === "no") {
      clearInterval(sliderImages);
    } else {
      checkBackgroundOption = true;
      checkRandomOption(checkBackgroundOption);
    }

    localStorage.setItem("random-backgrounds", e.target.dataset.option);
  });
});

// Toggle Hide Bullets Option On click
let bulletsOp = document.querySelectorAll(".hide-bul > .option");

bulletsOp.forEach((op) => {
  op.addEventListener("click", (e) => {
    replaceActiveClass(bulletsOp, e.target);

    bulletHolder.style.display = e.target.dataset.value;

    localStorage.setItem("bullets-state", e.target.dataset.value);
  });
});

// Reset All Setting
document.querySelector(".setting .reset-btn").addEventListener("click", () => {
  localStorage.removeItem("bullets-state");
  localStorage.removeItem("random-backgrounds");
  localStorage.removeItem("main-color");

  location.reload();
});

// Change Landing Image Randomly
let landing = document.querySelector(".landing");
let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function checkRandomOption(check) {
  if (check) {
    sliderImages = setInterval(function () {
      let rand = Math.floor(Math.random() * imgs.length);
      landing.style.backgroundImage = `url(../imgs/${imgs[rand]})`;
    }, 6000);
  }
}

let skill = document.querySelector("#skills");

let progress = document.querySelectorAll("[data-width]");
// Scroll Event
window.addEventListener("scroll", () => {
  let sillsOffSetTop = skill.offsetTop;
  let skillHeight = skill.scrollHeight;
  let windowOuterHeight = window.innerHeight;
  let scrollY = window.scrollY;

  if (scrollY >= sillsOffSetTop + skillHeight - windowOuterHeight) {
    progress.forEach((item) => {
      item.style.width = `${item.dataset.width}%`;
    });
  }

  // Remove Active From Setting
  setting.classList.remove("active");
  gear.classList.remove("active");

  // Remove Active From Mobile Menu
  toggle.classList.remove("active");
  mobileMenu.classList.remove("active");
});

// Create Popup

let images = document.querySelectorAll("#gallery img");

images.forEach((img) => {
  img.addEventListener("click", function () {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");
    popupImage.className = "popup-image";
    popupImage.setAttribute("src", this.src);

    popupBox.append(popupImage);

    // Add Element To Body
    document.body.append(overlay);
    document.body.append(popupBox);

    if (this.getAttribute("alt")) {
      let popupTitle = document.createElement("h3");
      popupTitle.className = "popup-title";
      popupTitle.append(document.createTextNode(this.alt));

      popupBox.prepend(popupTitle);
    }

    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn fa-solid fa-xmark";
    popupBox.append(closeBtn);
  });
});

document.addEventListener("click", (e) => {
  // console.log(e.target.classList.contains("popup-overlay"));
  if (e.target.classList.contains("popup-overlay")) {
    e.target.nextElementSibling.remove();
    e.target.remove();
  }
  if (e.target.classList.contains("close-btn")) {
    e.target.parentElement.previousElementSibling.remove();
    e.target.parentElement.remove();
  }
});

function replaceActiveClass(list, item) {
  list.forEach((item) => item.classList.remove("active"));
  item.classList.add("active");
}

// Scroll To Sections if Nav Links Clicked
let links = document.querySelectorAll(".links li a");

// Bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollInto(list) {
  list.forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(item.dataset.section).scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    });
  });
}
scrollInto(links);
scrollInto(bullets);

// Get Year For Footer
document.querySelector(".footer .year").innerHTML = new Date().getFullYear();
