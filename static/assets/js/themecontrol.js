document.addEventListener("DOMContentLoaded", function (event) {
  const themes = document.getElementById("Themes");
  const natureImages = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

  function setParticlesVisible(visible) {
    document.querySelectorAll("canvas.particles-js-canvas-el").forEach((element) => {
      element.style.display = visible ? "" : "none";
    });
  }

  window.applyNatureTheme = function () {
    const image = natureImages[Math.floor(Math.random() * natureImages.length)];
    document.body.style.backgroundColor = "#111";
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)), url("/images/${image}")`;
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#111");
    const particlesContainer = document.getElementById("particles-js");
    if (particlesContainer) particlesContainer.style.background = "transparent";
    setParticlesVisible(false);
    if (themes) themes.value = "Nature";
  };

  window.clearNatureTheme = function () {
    document.body.style.backgroundImage = "";
    const particlesContainer = document.getElementById("particles-js");
    if (particlesContainer) particlesContainer.style.background = "";
    setParticlesVisible(true);
  };

  if (localStorage.getItem("Nature") === "on") {
    window.applyNatureTheme();
  } else if (localStorage.getItem("Classic") === "on") {
    window.clearNatureTheme();
    document.body.style.backgroundColor = "#111";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#111");
    if (themes) themes.value = "Classic";
  } else if (localStorage.getItem("Ocean") === "on") {
    window.clearNatureTheme();
    document.body.style.backgroundColor = "#162545";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#162545");
    if (themes) themes.value = "Ocean";
  } else if (localStorage.getItem("Midnight") === "on") {
    window.clearNatureTheme();
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#000");
    if (themes) themes.value = "Midnight";
  } else if (localStorage.getItem("Light") === "on") {
    window.clearNatureTheme();
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    document.body.style.setProperty("--bg-c", "#fff");
    if (themes) themes.value = "Light";
  }
});
