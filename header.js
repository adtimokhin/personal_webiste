import gsap from "gsap";
// In this file we will animate the header of the website

// loading all interactive elements:
const header = document.getElementById("website-header");
const skyBgDiv = document.getElementById("sky-bg");
const sunImg = document.getElementById("sun");
const websiteNameDiv = document.getElementById("website-name");

// Setting initial attributes
// skyBgDiv.style.height = window.innerHeight + "px";

websiteNameDiv.addEventListener("mouseover", () => {
    websiteNameDiv.style.transition = "all 20s"
  websiteNameDiv.style.backgroundImage = "linear-gradient(#d1ffff, #000000)"
});
