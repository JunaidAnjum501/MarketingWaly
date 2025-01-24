// Show and hide dropdown menu on click
document.addEventListener("alpine:init", () => {
  Alpine.data("dropdown", () => ({
    isOpen: false,
    slideOpen: false,
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
  }));
});
// SLider code
let currentSlide = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;

function showSlide(index) {
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.getElementById("next").addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

document.getElementById("prev").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

setInterval(() => {
  showSlide(currentSlide + 1);
}, 7000); // Change slide every 3 seconds

// Testmonial
const slider = document.getElementById("testimonial-slider");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let cardWidth = slider.children[0].offsetWidth + 48; // Card width + margin
let currentIndex = 1; // Start from the first cloned card

// Clone the first and last slides for seamless looping
const firstSlide = slider.children[0].cloneNode(true);
const lastSlide = slider.children[slider.children.length - 1].cloneNode(true);
slider.appendChild(firstSlide);
slider.insertBefore(lastSlide, slider.children[0]);

// Adjust slider's starting position
slider.style.transform = `translateX(-${cardWidth}px)`;

// Event listeners
nextBtn.addEventListener("click", () => {
  currentIndex++;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

  // Loop back to the start
  if (currentIndex >= slider.children.length - 1) {
    setTimeout(() => {
      slider.style.transition = "none";
      currentIndex = 1;
      slider.style.transform = `translateX(-${cardWidth}px)`;
    }, 500);
  }
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

  // Loop back to the end
  if (currentIndex <= 0) {
    setTimeout(() => {
      slider.style.transition = "none";
      currentIndex = slider.children.length - 2;
      slider.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
    }, 500);
  }
});

// Update card width dynamically on window resize
window.addEventListener("resize", () => {
  cardWidth = slider.children[0].offsetWidth + 48;
  slider.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
});
// JavaScript to animate counters and display numbers as "k"
function animateCounter(id, start, end, duration, suffix = "") {
  const element = document.getElementById(id);
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.innerText =
      value >= 1000
        ? `${Math.floor(value / 1000)}k${suffix}`
        : `${value}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// Animate counters on page load
document.addEventListener("DOMContentLoaded", () => {
  animateCounter("counter1", 0, 841000, 2000, "+");
  animateCounter("counter2", 0, 620000, 2000, "+");
  animateCounter("counter3", 0, 100, 2000, "%");
});
