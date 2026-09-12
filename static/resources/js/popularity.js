(() => {
  const visitsKey = "interstellarPopularVisits";
  const enabledKey = "interstellarPopularEnabled";
  const fallbackItem = {
    name: "Bing",
    url: "https://bing.com",
    category: "App",
    icon: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBeRogmRf1xieDJbrjYvc.hUvqidNQtgZY7VtoCuVM31yHuXAFled7S57y0AM6xx1XMCHawJ_zIRORv7SCOGYUFs-&format=source"
  };

  function readVisits() {
    try {
      return JSON.parse(localStorage.getItem(visitsKey)) || {};
    } catch (error) {
      return {};
    }
  }

  window.recordPopularVisit = function (url, name, category, icon) {
    if (!url) return;
    const visits = readVisits();
    const key = String(url);
    const current = visits[key] || {};
    visits[key] = {
      name: name || current.name || new URL(key, window.location.origin).hostname,
      url: key,
      category: category || current.category || "Site",
      icon: icon || current.icon || "",
      count: (current.count || 0) + 1
    };
    localStorage.setItem(visitsKey, JSON.stringify(visits));
    fetch("/api/popular", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visits[key]),
      keepalive: true
    }).catch(() => {});
  };

  window.getMostPopularItem = async function () {
    try {
      const response = await fetch("/api/popular", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        if (data.item) return data.item;
      }
    } catch (error) {
      // Use the browser cache when the API is unavailable.
    }
    const items = Object.values(readVisits());
    return items.sort((left, right) => right.count - left.count)[0] || fallbackItem;
  };

  window.isPopularEnabled = function () {
    return localStorage.getItem(enabledKey) !== "false";
  };

  window.setPopularEnabled = function (enabled) {
    localStorage.setItem(enabledKey, String(enabled));
  };

  window.renderMostPopular = async function (container) {
    if (!container || !isPopularEnabled()) {
      if (container) container.hidden = true;
      return;
    }

    const item = await getMostPopularItem();
    container.hidden = false;
    container.innerHTML = `
      <p class="popular-kicker">Most Popular</p>
      <h2>${item.name}</h2>
      <p class="popular-meta">${item.category} ${item.count ? `&middot; ${item.count} visit${item.count === 1 ? "" : "s"}` : ""}</p>
      <button type="button" class="popular-open">Open</button>
    `;
    container.querySelector(".popular-open").addEventListener("click", () => {
      window.popularItemName = item.name;
      window.popularItemCategory = item.category;
      const openItem = item.category.toLowerCase() === "app" ? window.visit : window.go;
      openItem(item.url);
    });
  };
})();
