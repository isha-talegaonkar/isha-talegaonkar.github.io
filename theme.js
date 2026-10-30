(function () {
  const key = "portfolio-theme";
  const preference = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const dark = theme === "dark";
      button.textContent = dark ? "☀ Light mode" : "☾ Dark mode";
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("aria-pressed", String(dark));
    });
  }

  const stored = savedTheme();
  applyTheme(stored === "light" || stored === "dark" ? stored : preference.matches ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(key, next);
        } catch {
          // The toggle still works when browser storage is unavailable.
        }
        applyTheme(next);
      });
    });
    applyTheme(document.documentElement.dataset.theme);
  });

  preference.addEventListener("change", (event) => {
    if (!savedTheme()) applyTheme(event.matches ? "dark" : "light");
  });
})();
