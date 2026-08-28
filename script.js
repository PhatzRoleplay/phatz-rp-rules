const body =
  document.body;

const themeToggle =
  document.getElementById("themeToggle");

const searchInput =
  document.getElementById("ruleSearch");

const clearSearch =
  document.getElementById("clearSearch");

const searchCount =
  document.getElementById("searchCount");

const noResults =
  document.getElementById("noResults");

const navLinks =
  document.querySelectorAll(".nav-link");

const sections =
  document.querySelectorAll(".section");

const ruleCards =
  document.querySelectorAll(".rule-card");

const ruleCategories =
  document.querySelectorAll(".rule-category");

const sidebar =
  document.getElementById("sidebar");

const menuButton =
  document.getElementById("menuButton");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");


/* THEME */

const savedTheme =
  localStorage.getItem("phatz-theme");


if (savedTheme === "light") {

  body.classList.add("light");

  themeToggle.checked = true;

}


themeToggle.addEventListener(
  "change",
  () => {

    body.classList.toggle(
      "light",
      themeToggle.checked
    );


    localStorage.setItem(
      "phatz-theme",
      themeToggle.checked
        ? "light"
        : "dark"
    );

  }
);


/* SEARCH */

function runSearch() {

  const query =
    searchInput.value
      .trim()
      .toLowerCase();


  clearSearch.style.display =
    query
      ? "block"
      : "none";


  let visibleCount = 0;


  ruleCards.forEach(
    card => {

      const text =
        (
          card.innerText +
          " " +
          (
            card.dataset.search ||
            ""
          )
        )
        .toLowerCase();


      const match =
        !query ||
        text.includes(query);


      card.classList.toggle(
        "hidden",
        !match
      );


      if (match) {
        visibleCount++;
      }

    }
  );


  ruleCategories.forEach(
    category => {

      const visibleCards =
        category.querySelectorAll(
          ".rule-card:not(.hidden)"
        );


      category.classList.toggle(
        "hidden",
        query &&
        visibleCards.length === 0
      );

    }
  );


  if (query) {

    searchCount.textContent =
      visibleCount === 1
        ? "1 matching rule"
        : `${visibleCount} matching rules`;

  }

  else {

    searchCount.textContent =
      "";

  }


  noResults.classList.toggle(
    "show",
    query &&
    visibleCount === 0
  );

}


searchInput.addEventListener(
  "input",
  runSearch
);


clearSearch.addEventListener(
  "click",
  () => {

    searchInput.value =
      "";

    runSearch();

    searchInput.focus();

  }
);


/* ACTIVE SIDEBAR SECTION */

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            const id =
              entry.target.id;


            navLinks.forEach(
              link => {

                link.classList.toggle(
                  "active",
                  link.getAttribute(
                    "href"
                  ) ===
                  `#${id}`
                );

              }
            );

          }

        }
      );

    },

    {
      rootMargin:
        "-25% 0px -65% 0px"
    }

  );


sections.forEach(
  section => {

    observer.observe(
      section
    );

  }
);


/* MOBILE SIDEBAR */

menuButton.addEventListener(
  "click",
  () => {

    sidebar.classList.add(
      "open"
    );

    sidebarOverlay.classList.add(
      "show"
    );

  }
);


sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);


navLinks.forEach(
  link => {

    link.addEventListener(
      "click",
      closeSidebar
    );

  }
);


function closeSidebar() {

  sidebar.classList.remove(
    "open"
  );

  sidebarOverlay.classList.remove(
    "show"
  );

}
