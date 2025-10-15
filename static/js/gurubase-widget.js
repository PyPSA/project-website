document.addEventListener("DOMContentLoaded", () => {
  const guruScript = document.createElement("script");
  guruScript.src = "https://widget.gurubase.io/widget.latest.min.js";
  guruScript.defer = true;
  guruScript.id = "guru-widget-id";

  const widgetSettings = {
    "data-widget-id": "tqTL5kS8poTJZDw1P9X1kHN9CNiDKIBgDG1dmMjRQBo",
    "data-text": "Ask AI",
    "data-margins": JSON.stringify({ bottom: "20px", right: "20px" }),
    "data-light-mode": "auto",
    "data-name": "PyPSA",
    "data-icon-url": "https://raw.githubusercontent.com/PyPSA/PyPSA/f4d8576a9261becfffbf296932fcb0c3c9361b63/docs/assets/logo/logo.svg",
    "data-bg-color": "#D10A49",
    "data-overlap-content": "true"
  };

  Object.entries(widgetSettings).forEach(([key, value]) => {
    guruScript.setAttribute(key, value);
  });

  document.body.appendChild(guruScript);
});
