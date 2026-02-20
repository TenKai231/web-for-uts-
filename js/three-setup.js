document.addEventListener("DOMContentLoaded", () => {
  const modelViewer = document.getElementById("fox-3d");

  if (modelViewer) {
    document.addEventListener("mousemove", (event) => {
      // Posisi Mouse
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      // Parallax Halus
      // Theta: Nengok Kiri-Kanan (-180 base)
      const theta = -180 + x * 20;

      // Phi: Nengok Atas-Bawah (80 base)
      const phi = 80 + y * 10;

      // Radius: 40% (Zoomed but not too close)
      modelViewer.cameraOrbit = `${theta}deg ${phi}deg 40%`;
    });
  }
});
