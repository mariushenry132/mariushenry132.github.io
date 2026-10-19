"use strict";

document.querySelectorAll("[data-copy-email]").forEach(function (control) {
  const label = control.querySelector("span");
  const originalLabel = label.textContent;
  let resetTimer;

  async function copyEmail() {
    const email = control.getAttribute("data-copy-email");
    clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = "Email copied! 👽";
    } catch (error) {
      // Allow manual copying when clipboard access is unavailable or denied.
      label.textContent = originalLabel;
      window.prompt("Copy this email address:", email);
    }
    resetTimer = setTimeout(function () {
      label.textContent = originalLabel;
    }, 2000);
  }

  control.addEventListener("click", copyEmail);
  control.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyEmail();
    }
  });
});
