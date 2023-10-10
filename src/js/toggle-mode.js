const toggleMode = document.querySelector("#toggle-mode");
const html = document.querySelector("html");
let darkMode = true;

toggleMode.addEventListener("click", (event) => {
  html.classList.toggle("dark");

  const themeSelect = darkMode ? "Light" : "Dark";

  event.currentTarget.querySelector(
    "span"
  ).textContent = `Active ${themeSelect} mode`;

  event.currentTarget.querySelector("p").textContent = themeSelect

  darkMode = !darkMode;
});
