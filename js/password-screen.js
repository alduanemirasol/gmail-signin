// ── Password screen ────────────────────────────────────────────────
import { showScreen } from "./navigation.js";
import { setError, clearError } from "./validation.js";

const pwInput = document.getElementById("password");
const pwWrap = document.getElementById("pw-wrap");
const pwError = document.getElementById("pw-error");
const showToggle = document.getElementById("show-pw-toggle");

export function initPasswordScreen() {
  document
    .getElementById("btn-pw-next")
    .addEventListener("click", handlePwNext);

  pwInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handlePwNext();
  });

  pwInput.addEventListener("input", () => {
    clearError(pwWrap, pwError);
  });

  showToggle.addEventListener("change", () => {
    pwInput.type = showToggle.checked ? "text" : "password";
  });

  document.getElementById("user-chip").addEventListener("click", goBack);
}

function handlePwNext() {
  if (!pwInput.value) {
    setError(pwWrap, pwError);
    pwInput.focus();
    return;
  }

  clearError(pwWrap, pwError);
  window.location.href = "https://accounts.google.com/signin";
}

function goBack() {
  pwInput.value = "";
  clearError(pwWrap, pwError);
  showScreen("screen-email", "back");
  setTimeout(() => document.getElementById("email").focus(), 50);
}
