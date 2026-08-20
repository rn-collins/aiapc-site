if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // The website remains usable when installation or offline support is unavailable.
    });
  });
}
