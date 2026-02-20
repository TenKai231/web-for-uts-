document.addEventListener("DOMContentLoaded", () => {
  const modelViewer = document.getElementById("fox-3d");
  const modelWrapper = document.getElementById("model-wrapper");

  if (!modelViewer || !modelWrapper) return;

  let ticking = false;

  function handlePointerMove(event) {
    // Hanya jika user berada di area model (touch/hover)
    if (!modelWrapper.matches(":hover") && event.pointerType !== "touch") return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = modelWrapper.getBoundingClientRect();
      // gunakan posisi relatif ke wrapper untuk lebih konsisten
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const theta = -180 + x * 40; // sedikit lebih responsif
      const phi = 80 + y * 20;
      try {
        modelViewer.cameraOrbit = `${theta}deg ${phi}deg 40%`;
      } catch (e) {
        // silent fail jika model-viewer belum mendukung
        console.warn("Failed to set cameraOrbit", e);
      }
      ticking = false;
    });
  }

  modelWrapper.addEventListener("pointermove", handlePointerMove, { passive: true });

  // fallback: jika model tidak load dalam 8s tunjukkan pesan
  let didLoad = false;
  modelViewer.addEventListener && modelViewer.addEventListener("load", () => (didLoad = true));
  setTimeout(() => {
    if (!didLoad) {
      console.warn("Model did not report load within 8s. cek console/network.");
    }
  }, 8000);
});
