// ── Screen navigation ──────────────────────────────────────────────
const DURATION = 300; // must match CSS animation duration (ms)

/**
 * Transition to a new screen with a horizontal slide.
 * @param {string} toId      - ID of the screen to show
 * @param {'forward'|'back'} direction
 */
export function showScreen(toId, direction = "forward") {
  const screens = document.querySelectorAll(".screen");
  const toEl = document.getElementById(toId);
  const fromEl = [...screens].find((s) => s.classList.contains("active"));

  // Nothing to animate if it's already active
  if (fromEl === toEl) return;

  const outClass =
    direction === "forward" ? "slide-out-left" : "slide-out-right";
  const inClass = direction === "forward" ? "slide-in-right" : "slide-in-left";

  // Animate the outgoing screen
  if (fromEl) {
    fromEl.classList.remove("active");
    fromEl.classList.add(outClass);

    // Clean up after animation completes
    fromEl.addEventListener(
      "animationend",
      () => {
        fromEl.classList.remove(outClass);
        fromEl.style.display = "none";
      },
      { once: true },
    );
  }

  // Animate the incoming screen
  toEl.style.display = ""; // let CSS show it via the animation class
  toEl.classList.add(inClass);

  toEl.addEventListener(
    "animationend",
    () => {
      toEl.classList.remove(inClass);
      toEl.classList.add("active");
    },
    { once: true },
  );
}
