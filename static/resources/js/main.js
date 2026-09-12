(() => {
  try {
    if (window.__interstellarMainLoaded) return;
    window.__interstellarMainLoaded = true;
  } catch (error) {
    // Keep initialization safe in restrictive browser environments.
  }
})();
