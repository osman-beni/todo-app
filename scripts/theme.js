function themeManager() {
  return {
    theme: "light",

    initTheme() {
      const stored = localStorage.getItem("theme");

      if (stored) {
        this.theme = stored;
      } else {
        this.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }

      document.documentElement.setAttribute("data-theme", this.theme);
    },

    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", this.theme);
      localStorage.setItem("theme", this.theme);
    },
  };
}
