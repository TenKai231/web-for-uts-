document.addEventListener("DOMContentLoaded", () => {
  // === 1. PRELOADER SYSTEM ===
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    // Hilangkan preloader setelah semua aset (termasuk 3D) siap
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1000);
    }, 1500); // Minimal tampil 1.5 detik biar keren
  });

  // === 2. STAR SYSTEM (Bintang Berkelip) ===
  const starContainer = document.getElementById("star-container");
  const starCount = 50;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 60 + "%"; // Cuma di 60% layar atas
    star.style.width = Math.random() * 2 + 1 + "px"; // 1-3px
    star.style.height = star.style.width;
    star.style.animationDuration = Math.random() * 3 + 2 + "s"; // 2-5s
    star.style.animationDelay = Math.random() * 2 + "s";
    starContainer.appendChild(star);
  }

  // === 3. SNOW SYSTEM (Subtle/Halus) ===
  const snowContainer = document.getElementById("snow-container");
  const snowCount = 60; // Jangan kebanyakan biar gak pusing

  for (let i = 0; i < snowCount; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    snowflake.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 3 + 2 + "px"; // Lebih kecil (2-5px)
    snowflake.style.width = size;
    snowflake.style.height = size;

    const duration = Math.random() * 10 + 5 + "s"; // Lebih lambat (calm)
    snowflake.style.animationDuration = duration;
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    snowContainer.appendChild(snowflake);
  }
});
// ... kode salju, bintang, preloader di atas ...

// === SCROLL REVEAL SYSTEM ===
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Opsional: Stop observe kalau sudah muncul sekali (biar gak ngulang2)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // Animasi jalan pas 15% elemen sudah masuk layar
  },
);

revealElements.forEach((el) => revealObserver.observe(el));
