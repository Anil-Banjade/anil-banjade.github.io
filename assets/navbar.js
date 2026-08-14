(function () {
    const target = document.getElementById("navbar-placeholder");
    if (!target) return;
  
    fetch("/partials/navbar.html")
      .then((res) => res.text())
      .then((html) => {
        target.innerHTML = html;
        initNavbar();
      })
      .catch((err) => console.error("Failed to load navbar:", err));
  
    function initNavbar() {
      const hamburger = document.getElementById("hamburger");
      const drawer = document.getElementById("drawer");
      const overlay = document.getElementById("overlay");
  
      function openMenu() {
        drawer.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
      }
      function closeMenu() {
        drawer.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
  
      hamburger.addEventListener("click", () =>
        drawer.classList.contains("open") ? closeMenu() : openMenu()
      );
      overlay.addEventListener("click", closeMenu);
      document.querySelectorAll(".drawer-panel a").forEach((l) =>
        l.addEventListener("click", closeMenu)
      );
  
      // Pages with sections (index.html) can define this to drive
      // scroll-based active-link highlighting.
      if (typeof window.__setupActiveNav === "function") {
        window.__setupActiveNav();
      } else if (window.location.pathname.includes("/blogs/")) {
        // On a blog page: just mark "Blogs" as the active nav item.
        document.querySelectorAll(".menu a, .drawer-panel a").forEach((a) => {
          if (a.getAttribute("href").endsWith("#blog")) {
            a.classList.add("active");
          }
        });
      }
    }
  })();