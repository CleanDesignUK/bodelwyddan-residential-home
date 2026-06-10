(function () {
  "use strict";

  const setActiveNav = () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const linkPage = href.split("#")[0];
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  };

  const setCurrentYear = () => {
    document.querySelectorAll("[data-current-year]").forEach((item) => {
      item.textContent = new Date().getFullYear();
    });
  };

  const handleHeaderScroll = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const handleBackToTop = () => {
    const button = document.querySelector(".back-to-top");
    if (!button) return;

    button.classList.toggle("is-visible", window.scrollY > 450);
  };

  const initBackToTop = () => {
    const button = document.querySelector(".back-to-top");
    if (!button) return;

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const initWeb3Forms = () => {
    document.querySelectorAll("form[data-web3forms]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector("button[type='submit']");
        const originalButtonText = submitButton ? submitButton.innerHTML : "";
        const accessKey = form.querySelector("input[name='access_key']")?.value?.trim();

        if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
          Swal.fire({
            icon: "warning",
            title: "Web3Forms key needed",
            text: "Please add the Web3Forms access key before going live.",
            confirmButtonColor: "#2F6B2F"
          });
          return;
        }

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerHTML = "Sending...";
        }

        const formData = new FormData(form);

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          });

          const result = await response.json();

          console.log("Web3Forms response:", result);

          if (response.ok && result.success) {
            Swal.fire({
              icon: "success",
              title: "Thank you",
              text: "Your enquiry has been sent. We will get back to you as soon as possible.",
              confirmButtonColor: "#2F6B2F"
            });

            form.reset();
          } else {
            throw new Error(result.message || "Form submission failed");
          }
        } catch (error) {
          console.error("Web3Forms error:", error);

          Swal.fire({
            icon: "error",
            title: "Message not sent",
            text: error.message || "Please call 01407 811289 or email bodelwyddan1@btconnect.com.",
            confirmButtonColor: "#2F6B2F"
          });
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
          }
        }
      });
    });
  };

  const initMobileCardArrows = () => {
    document.querySelectorAll(".mobile-card-scroll").forEach((scroller) => {
      if (scroller.dataset.arrowReady === "true") return;
      scroller.dataset.arrowReady = "true";

      const controls = document.createElement("div");
      controls.className = "mobile-scroll-controls";
      controls.setAttribute("aria-label", "Card navigation");

      controls.innerHTML = `
        <button class="scroll-arrow" type="button" aria-label="Previous card" data-scroll-prev>
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="scroll-arrow" type="button" aria-label="Next card" data-scroll-next>
          <i class="bi bi-chevron-right"></i>
        </button>
      `;

      scroller.parentNode.insertBefore(controls, scroller);

      const scrollByCard = (direction) => {
        const firstCard = scroller.querySelector(":scope > *");
        const amount = firstCard
          ? firstCard.getBoundingClientRect().width + 14
          : scroller.clientWidth * 0.82;

        scroller.scrollBy({
          left: amount * direction,
          behavior: "smooth"
        });
      };

      controls.querySelector("[data-scroll-prev]").addEventListener("click", () => {
        scrollByCard(-1);
      });

      controls.querySelector("[data-scroll-next]").addEventListener("click", () => {
        scrollByCard(1);
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    setCurrentYear();
    initBackToTop();
    initWeb3Forms();
    initMobileCardArrows();
    handleHeaderScroll();
    handleBackToTop();
  });

  window.addEventListener(
    "scroll",
    () => {
      handleHeaderScroll();
      handleBackToTop();
    },
    { passive: true }
  );
})();