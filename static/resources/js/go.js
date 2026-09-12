function go(value) {
  const safeValue = String(value || "").trim();
  if (window.recordPopularVisit) {
    window.recordPopularVisit(safeValue, window.popularItemName, window.popularItemCategory || "Game");
  }

  const goToProxy = () => {
    let url = safeValue;
    if (!isUrl(url)) url = "https://www.bing.com/search?q=" + encodeURIComponent(url);
    else if (!(url.startsWith("https://") || url.startsWith("http://")))
      url = "https://" + url;

    sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
    window.location.href = "/go";
  };

  if (!("serviceWorker" in navigator)) {
    goToProxy();
    return;
  }

  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })
    .then(() => goToProxy())
    .catch(() => goToProxy());
}

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}