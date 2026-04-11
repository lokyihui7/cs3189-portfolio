const nav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");
const navLinks = [...document.querySelectorAll("#mainNav a")];
const sections = [...document.querySelectorAll("main section[id]")];

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((section) => revealObserver.observe(section));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
);

sections.forEach((section) => activeObserver.observe(section));

const galleries = [...document.querySelectorAll("[data-draggable-gallery]")];

galleries.forEach((gallery) => {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  gallery.addEventListener("pointerdown", (event) => {
    isDown = true;
    startX = event.clientX;
    startScroll = gallery.scrollLeft;
    gallery.classList.add("dragging");
    gallery.setPointerCapture(event.pointerId);
  });

  gallery.addEventListener("pointermove", (event) => {
    if (!isDown) return;
    const dx = event.clientX - startX;
    gallery.scrollLeft = startScroll - dx;
  });

  const stopDrag = () => {
    isDown = false;
    gallery.classList.remove("dragging");
  };

  gallery.addEventListener("pointerup", stopDrag);
  gallery.addEventListener("pointercancel", stopDrag);
  gallery.addEventListener("pointerleave", stopDrag);
});
