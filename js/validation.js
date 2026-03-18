// ── Validation helpers ─────────────────────────────────────────────

export function setError(wrap, msg) {
  wrap.classList.add("error");
  msg.classList.add("visible");
}

export function clearError(wrap, msg) {
  wrap.classList.remove("error");
  msg.classList.remove("visible");
}
