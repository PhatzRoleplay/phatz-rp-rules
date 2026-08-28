const themeToggle =
  document.getElementById("themeToggle");


const savedTheme =
  localStorage.getItem("phatz-theme");


if (savedTheme === "light") {

  document.body.classList.add("light-mode");

  themeToggle.textContent =
    "Dark Mode";

}


themeToggle.addEventListener(
  "click",
  function () {

    document.body.classList.toggle(
      "light-mode"
    );


    if (
      document.body.classList.contains(
        "light-mode"
      )
    ) {

      localStorage.setItem(
        "phatz-theme",
        "light"
      );

      themeToggle.textContent =
        "Dark Mode";

    }

    else {

      localStorage.setItem(
        "phatz-theme",
        "dark"
      );

      themeToggle.textContent =
        "Light Mode";

    }

  }
);
