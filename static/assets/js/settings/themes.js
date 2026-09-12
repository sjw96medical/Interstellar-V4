const themes = document.getElementById("Themes");

if (!themes) {
} else if (localStorage.getItem("Classic") === "on") {
  document.body.style.backgroundColor = "#111";
  document.body.style.color = "#ffffff";
  document.body.style.setProperty("--bg-c", "#111");
  themes.value = "Classic";
} else if (localStorage.getItem("Ocean") === "on") {
  document.body.style.backgroundColor = "#162545";
  document.body.style.color = "#ffffff";
  document.body.style.setProperty("--bg-c", "#162545");
  themes.value = "Ocean";
} else if (localStorage.getItem("Midnight") === "on") {
  document.body.style.backgroundColor = "#000";
  document.body.style.color = "#ffffff";
  document.body.style.setProperty("--bg-c", "#000");
  themes.value = "Midnight";
} else if (localStorage.getItem("Nature") === "on") {
  themes.value = "Nature";
}

if (themes) themes.onchange = function () {
  if (this.value === "Classic") {
    window.clearNatureTheme();
    localStorage.setItem("Classic", "on");
    localStorage.setItem("Ocean", "off");
    localStorage.setItem("Midnight", "off");
    localStorage.setItem("Light", "off");
    localStorage.setItem("Nature", "off");
    document.body.style.backgroundColor = "#111";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#111");
  } else if (this.value === "Ocean") {
    window.clearNatureTheme();
    localStorage.setItem("Ocean", "on");
    localStorage.setItem("Classic", "off");
    localStorage.setItem("Midnight", "off");
    localStorage.setItem("Light", "off");
    localStorage.setItem("Nature", "off");
    document.body.style.backgroundColor = "#162545";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#162545");
  } else if (this.value === "Midnight") {
    window.clearNatureTheme();
    localStorage.setItem("Midnight", "on");
    localStorage.setItem("Classic", "off");
    localStorage.setItem("Ocean", "off");
    localStorage.setItem("Light", "off");
    localStorage.setItem("Nature", "off");
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#ffffff";
    document.body.style.setProperty("--bg-c", "#000");
  } else if (this.value === "Light") {
    window.clearNatureTheme();
    localStorage.setItem("Light", "on");
    localStorage.setItem("Midnight", "off");
    localStorage.setItem("Classic", "off");
    localStorage.setItem("Ocean", "off");
    localStorage.setItem("Nature", "off");
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000000";
    document.body.style.setProperty("--bg-c", "#fff");
  } else if (this.value === "Nature") {
    localStorage.setItem("Nature", "on");
    localStorage.setItem("Classic", "off");
    localStorage.setItem("Midnight", "off");
    localStorage.setItem("Ocean", "off");
    localStorage.setItem("Light", "off");
    window.applyNatureTheme();
  }
};
