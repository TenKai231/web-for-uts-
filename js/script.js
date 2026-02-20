document.addEventListener("DOMContentLoaded", () => {
  // === 1. PRELOADER SYSTEM ===
  const preloader = document.getElementById("preloader");
  const modelEl = document.getElementById("fox-3d");
  let modelLoaded = false;
  let modelProgress = 0;
  const minShowMs = 1500;
  const startTime = Date.now();

  function hidePreloaderIfReady() {
    const elapsed = Date.now() - startTime;
    const wait = Math.max(0, minShowMs - elapsed);
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 1000);
      }
    }, wait);
  }

  // jika model ada, cek apakah file tersedia (quick HEAD) untuk membantu debugging
  async function checkModelAsset(src) {
    if (!src) return false;
    try {
      const res = await fetch(src, { method: "HEAD" });
      return res.ok;
    } catch (err) {
      return false;
    }
  }

  // overlay error kecil
  function showModelError(msg) {
    console.error(msg);
    const existing = document.getElementById("model-error");
    if (existing) return;
    const overlay = document.createElement("div");
    overlay.id = "model-error";
    overlay.style.position = "fixed";
    overlay.style.left = "50%";
    overlay.style.top = "12px";
    overlay.style.transform = "translateX(-50%)";
    overlay.style.background = "rgba(255,20,20,0.9)";
    overlay.style.color = "white";
    overlay.style.padding = "8px 12px";
    overlay.style.borderRadius = "8px";
    overlay.style.zIndex = "300";
    overlay.style.fontSize = "13px";
    overlay.innerText = `3D model error: ${msg}`;
    document.body.appendChild(overlay);
    // Hide preloader so user sees message
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    }
  }

  // NEW: fallback helper — ganti model-viewer dengan image jika model hilang/error
  function applyModelFallback() {
    const wrapper = document.getElementById("model-wrapper");
    if (!wrapper) return;
    // remove model-viewer if exists
    const existingModel = document.getElementById("fox-3d");
    if (existingModel && existingModel.parentNode) existingModel.parentNode.removeChild(existingModel);

    // create fallback image
    const img = document.createElement("img");
    img.src = "assets/image/fox_forrest.jpg";
    img.alt = "Fallback fox image";
    img.className = "w-full h-full object-cover";
    // clear wrapper and append image
    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    wrapper.appendChild(img);

    modelLoaded = true;
    modelProgress = 100;
    updateStatusBadge();
    hidePreloaderIfReady();
  }

  window.addEventListener("load", async () => {
    if (!modelEl) {
      hidePreloaderIfReady();
      return;
    }
    // jika model belum memicu event load, cek asset ketersediaan dulu
    const src = modelEl.getAttribute("src");
    const ok = await checkModelAsset(src);
    if (!ok) {
      // gunakan fallback image agar UI tidak broken
      console.warn(`3D model not found: ${src}. Applying image fallback.`);
      applyModelFallback();
    } else {
      if (modelLoaded) hidePreloaderIfReady();
      // jika belum loaded, tetap tunggu event 'load' dari model-viewer
    }
  });

  if (modelEl) {
    // progress (model-viewer mengirim detail.totalProgress)
    modelEl.addEventListener("progress", (ev) => {
      try {
        const p = ev?.detail?.totalProgress;
        if (typeof p === "number") {
          modelProgress = Math.round(p * 100);
          updateStatusBadge();
        }
      } catch (e) {
        // ignore
      }
    });

    modelEl.addEventListener("load", () => {
      modelLoaded = true;
      modelProgress = 100;
      hidePreloaderIfReady();
      updateStatusBadge();
    });

    modelEl.addEventListener("error", (ev) => {
      const src = modelEl.getAttribute("src");
      console.error(`Model load error for ${src}`, ev);
      // gunakan fallback agar halaman tetap berfungsi
      applyModelFallback();
      // tunjukkan log kecil (opsional)
      showModelError(`failed to load ${src}`);
      updateStatusBadge();
    });
  }

  // === DEBUG STATUS BADGE ===
  function createStatusBadge() {
    if (document.getElementById("status-badge")) return;
    const badge = document.createElement("div");
    badge.id = "status-badge";
    badge.style.position = "fixed";
    badge.style.left = "12px";
    badge.style.bottom = "12px";
    badge.style.padding = "8px 10px";
    badge.style.background = "rgba(0,0,0,0.6)";
    badge.style.color = "white";
    badge.style.fontSize = "12px";
    badge.style.borderRadius = "8px";
    badge.style.zIndex = "200";
    badge.style.backdropFilter = "blur(4px)";
    badge.style.pointerEvents = "none";
    badge.innerText = "status: initializing...";
    document.body.appendChild(badge);
  }

  function updateStatusBadge() {
    const badge = document.getElementById("status-badge");
    if (!badge) return;
    const stars = document.getElementById("star-container")?.children.length ?? 0;
    const snows = document.getElementById("snow-container")?.children.length ?? 0;
    const loaded = modelLoaded ? "model: ready" : `model: ${modelProgress}%`;
    badge.innerText = `stars: ${stars} · snow: ${snows} · ${loaded}`;
  }

  createStatusBadge();
  updateStatusBadge();
  setInterval(updateStatusBadge, 1000);

  // === 2. STAR SYSTEM (Bintang Berkelip) ===
  const starContainer = document.getElementById("star-container");
  const starCount = 50;

  if (starContainer) {
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 60 + "%";
      star.style.width = Math.random() * 2 + 1 + "px";
      star.style.height = star.style.width;
      star.style.animationDuration = Math.random() * 3 + 2 + "s";
      star.style.animationDelay = Math.random() * 2 + "s";
      starContainer.appendChild(star);
    }
  }

  // === 3. SNOW SYSTEM (Subtle/Halus) ===
  const snowContainer = document.getElementById("snow-container");
  const snowCount = 60;

  if (snowContainer) {
    for (let i = 0; i < snowCount; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflake.style.left = Math.random() * 100 + "vw";
      const size = Math.random() * 3 + 2 + "px";
      snowflake.style.width = size;
      snowflake.style.height = size;
      const duration = Math.random() * 10 + 5 + "s";
      snowflake.style.animationDuration = duration;
      snowflake.style.animationDelay = Math.random() * 5 + "s";
      snowContainer.appendChild(snowflake);
    }
  }

  // === SCROLL REVEAL SYSTEM ===
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
