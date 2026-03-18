// ── Email screen ───────────────────────────────────────────────────
import { showScreen } from "./navigation.js";
import { setError, clearError } from "./validation.js";

const emailInput = document.getElementById("email");
const emailWrap = document.getElementById("email-wrap");
const emailError = document.getElementById("email-error");

export function initEmailScreen() {
  document
    .getElementById("btn-email-next")
    .addEventListener("click", handleEmailNext);

  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleEmailNext();
  });

  emailInput.addEventListener("input", () => {
    clearError(emailWrap, emailError);
  });
}

function handleEmailNext() {
  const val = emailInput.value.trim();

  if (!val) {
    setError(emailWrap, emailError);
    emailInput.focus();
    return;
  }

  clearError(emailWrap, emailError);

  setTimeout(() => {
    populatePasswordScreen(val);
    showScreen("screen-password", "forward");
    setTimeout(() => document.getElementById("password").focus(), 50);
  }, 1500);
}

function populatePasswordScreen(email) {
  const name = email.split("@")[0];
  document.getElementById("display-name").textContent = name;
  document.getElementById("chip-email").textContent = email;
  document.getElementById("chip-avatar").textContent = name
    .charAt(0)
    .toUpperCase();
}
