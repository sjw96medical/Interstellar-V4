const form = document.querySelector("form");
const input = document.querySelector("input");

if (form && input) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      }

      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.bing.com/search?q=" + encodeURIComponent(url);
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "https://" + url;

      if (window.recordPopularVisit) window.recordPopularVisit(url, "", "Site");
      sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "go";
    } catch (error) {
      console.error("Proxy navigation failed", error);
      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.bing.com/search?q=" + encodeURIComponent(url);
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "https://" + url;
      if (window.recordPopularVisit) window.recordPopularVisit(url, "", "Site");
      sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "go";
    }
  });
}

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}

