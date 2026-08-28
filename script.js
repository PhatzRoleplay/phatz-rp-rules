const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("ruleSearch");
const clearSearch = document.getElementById("clearSearch");
const searchCount = document.getElementById("searchCount");
const noResults = document.getElementById("noResults");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const ruleGroups = document.querySelectorAll(".rule-group");
const ruleCategories = document.querySelectorAll(".rule-category");
const subrules = document.querySelectorAll(".subrule");
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const sidebarOverlay = document.getElementById("sidebarOverlay");

/* THEME */

const savedTheme = localStorage.getItem("phatz-theme");

if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  body.classList.toggle("light", themeToggle.checked);

  localStorage.setItem(
    "phatz-theme",
    themeToggle.checked ? "light" : "dark"
  );
});

/* SEARCH */

function runSearch() {
  const query = searchInput.value.trim().toLowerCase();

  clearSearch.style.display = query ? "block" : "none";

  let visibleGroups = 0;
  let visibleSubrules = 0;

  ruleGroups.forEach(group => {
    const groupText = (
      group.innerText +
      " " +
      (group.dataset.search || "")
    ).toLowerCase();

    let groupHasMatch = false;

    const details = group.querySelectorAll(".subrule");

    details.forEach(detail => {
      const detailText = detail.innerText.toLowerCase();

      const match =
        !query ||
        detailText.includes(query) ||
        groupText.includes(query);

      detail.style.display = match ? "" : "none";

      if (match) {
        groupHasMatch = true;

        if (query) {
          detail.open = true;
        }

        visibleSubrules++;
      } else {
        detail.open = false;
      }
    });

    group.classList.toggle(
      "hidden",
      query && !groupHasMatch
    );

    if (groupHasMatch || !query) {
      visibleGroups++;
    }
  });

  ruleCategories.forEach(category => {
    const visible = category.querySelectorAll(
      ".rule-group:not(.hidden)"
    );

    category.classList.toggle(
      "hidden",
      query && visible.length === 0
    );
  });

  if (query) {
    searchCount.textContent =
      `${visibleSubrules} matching section${visibleSubrules === 1 ? "" : "s"}`;
  } else {
    searchCount.textContent = "";

    subrules.forEach(detail => {
      detail.style.display = "";
      detail.open = false;
    });
  }

  noResults.classList.toggle(
    "show",
    query && visibleGroups === 0
  );
}

searchInput.addEventListener("input", runSearch);

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  runSearch();
  searchInput.focus();
});

/* ACTIVE SIDEBAR SECTION */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-25% 0px -65% 0px"
  }
);

sections.forEach(section => {
  observer.observe(section);
});

/* MOBILE SIDEBAR */

menuButton.addEventListener("click", () => {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("show");
});

sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);

navLinks.forEach(link => {
  link.addEventListener(
    "click",
    closeSidebar
  );
});

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("show");
}
