// QUE: make the image scale down and move horizontally as the user scrolls using GSAP and ScrollTrigger, and Lenis for smooth scrolling
//IMP: prereq: gsap, ScrollTrigger, lenis
// Initialize Lenis
const lenis = new Lenis(); 

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf); // Call raf recursively
}

requestAnimationFrame(raf); // Start the raf loop

// Debounce raf to reduce the frequency of updates
let lastTime = 0;
const fpsInterval = 50; // Adjust this value to control the update frequency

function debouncedRaf(time) {
  if (time - lastTime > fpsInterval) {
    raf(time);
    lastTime = time;
  }
  requestAnimationFrame(debouncedRaf);
}

requestAnimationFrame(debouncedRaf);

document.querySelectorAll(".elem").forEach(elem => {
  let image = elem.querySelector("img");
  let tl = gsap.timeline();

  let xTransform = gsap.utils.random(-100, 100);

  tl
    .set(image, {
      transformOrigin: `${xTransform < 0 ? 0 : '100%'}`,
    }, "start")
    .to(image, {
      scale: 0,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    }, "start")
    .to(elem, {
      xPercent: xTransform,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom", // Corrected typo here
        end: "bottom top",
        scrub: true,
      }
    }, "start")
});
