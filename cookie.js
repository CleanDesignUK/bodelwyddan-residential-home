/* Bodelwyddan Residential Care LTD Cookie Banner */
(function () {
  "use strict";

  var STORAGE_KEY = "bodelwyddan_cookie_consent";
  var COOKIE_POLICY_URL = "cookie-policy.html";

  function getSavedConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return null;
    }
  }

  function saveConsent(status) {
    var value = {
      status: status,
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      document.cookie = STORAGE_KEY + "=" + encodeURIComponent(status) + "; path=/; max-age=31536000; SameSite=Lax";
    }

    document.documentElement.classList.toggle("cookies-accepted", status === "accepted");
    document.documentElement.classList.toggle("cookies-declined", status === "declined");

    window.dispatchEvent(new CustomEvent("bodelwyddanCookieConsent", {
      detail: value
    }));
  }

  function removeBanner(banner) {
    banner.classList.add("is-hiding");
    setTimeout(function () {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 240);
  }

  function createBanner() {
    if (document.querySelector(".cookie-banner")) return;

    var banner = document.createElement("section");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.setAttribute("aria-live", "polite");

    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<div class="cookie-banner__content">' +
          '<p class="cookie-banner__text">🍪 We use cookies to improve your browsing experience, deliver personalised content, and analyse our traffic. By clicking “Accept All”, you consent to our use of cookies. See our <a href="' + COOKIE_POLICY_URL + '">Cookie Policy</a> for details.</p>' +
          '<div class="cookie-banner__actions">' +
            '<button class="cookie-banner__button cookie-banner__button--accept" type="button">Accept All 🍪</button>' +
            '<button class="cookie-banner__button cookie-banner__button--decline" type="button">Decline</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    var acceptButton = banner.querySelector(".cookie-banner__button--accept");
    var declineButton = banner.querySelector(".cookie-banner__button--decline");

    acceptButton.addEventListener("click", function () {
      saveConsent("accepted");
      removeBanner(banner);
    });

    declineButton.addEventListener("click", function () {
      saveConsent("declined");
      removeBanner(banner);
    });

    requestAnimationFrame(function () {
      banner.classList.add("is-visible");
    });
  }

  function initCookieBanner() {
    var saved = getSavedConsent();

    if (saved && saved.status) {
      document.documentElement.classList.toggle("cookies-accepted", saved.status === "accepted");
      document.documentElement.classList.toggle("cookies-declined", saved.status === "declined");
      return;
    }

    createBanner();
  }

  window.BodelwyddanCookieConsent = {
    get: getSavedConsent,
    reset: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {}
      createBanner();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCookieBanner);
  } else {
    initCookieBanner();
  }
})();
