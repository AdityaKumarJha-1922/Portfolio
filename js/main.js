/* ==========================================================================
   Aditya Kumar Jha — Portfolio Scripts
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ------------------------------------------------------------------
       Typed.js — dynamic text animation in the hero section
       ------------------------------------------------------------------ */
    if (typeof Typed !== "undefined") {
        new Typed("#dynamic-text", {
            strings: [
                "Unity VR Developer",
                "ML/DL Developer",
                "Data Scientist",
                "Web Developer"
            ],
            typeSpeed: 90,
            backSpeed: 50,
            loop: true,
            showCursor: true,
            cursorChar: "|",
        });
    }

    /* ------------------------------------------------------------------
       Mobile menu toggle
       ------------------------------------------------------------------ */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /* ------------------------------------------------------------------
       Smooth scrolling for anchor links
       ------------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }

            // Close mobile menu after clicking a link
            if (navLinks && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
            }
        });
    });

    /* ------------------------------------------------------------------
       Active navigation highlighting based on scroll position
       ------------------------------------------------------------------ */
    window.addEventListener("scroll", () => {
        let current = "";
        const sections = document.querySelectorAll("section");
        const allNavLinks = document.querySelectorAll(".nav-links a");

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        allNavLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    /* ------------------------------------------------------------------
       Portfolio horizontal scroll & auto-scroll
       ------------------------------------------------------------------ */
    const container = document.getElementById("projectsContainer");
    const scrollLeftBtn = document.getElementById("scrollLeft");
    const scrollRightBtn = document.getElementById("scrollRight");

    if (container && scrollLeftBtn && scrollRightBtn) {
        let autoScrollInterval;

        // Scroll right by one card width
        function scrollContainerRight() {
            container.scrollBy({ left: 370, behavior: "smooth" });

            // Loop back to start when reaching the end
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 50) {
                setTimeout(() => {
                    container.scrollTo({ left: 0, behavior: "smooth" });
                }, 500);
            }

            updateButtonStates();
        }

        // Scroll left by one card width
        function scrollContainerLeft() {
            container.scrollBy({ left: -370, behavior: "smooth" });
            updateButtonStates();
        }

        // Update disabled state of scroll buttons
        function updateButtonStates() {
            if (container.scrollLeft <= 10) {
                scrollLeftBtn.classList.add("disabled");
            } else {
                scrollLeftBtn.classList.remove("disabled");
            }

            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                scrollRightBtn.classList.add("disabled");
            } else {
                scrollRightBtn.classList.remove("disabled");
            }
        }

        // Auto-scroll every 6 seconds
        function startAutoScroll() {
            autoScrollInterval = setInterval(scrollContainerRight, 6000);
        }

        // Button click handlers
        scrollLeftBtn.addEventListener("click", function () {
            if (!this.classList.contains("disabled")) {
                scrollContainerLeft();
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }
        });

        scrollRightBtn.addEventListener("click", function () {
            if (!this.classList.contains("disabled")) {
                scrollContainerRight();
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }
        });

        // Pause auto-scroll on hover
        container.addEventListener("mouseenter", () => {
            clearInterval(autoScrollInterval);
        });

        container.addEventListener("mouseleave", () => {
            startAutoScroll();
        });

        // Update button states on manual scroll
        container.addEventListener("scroll", updateButtonStates);

        // Initialize
        updateButtonStates();
        startAutoScroll();
    }
});
