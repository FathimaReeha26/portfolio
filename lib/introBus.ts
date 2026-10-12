/* Tiny bus coordinating the intro screen with the hero animation.
   The intro dispatches "folio:ready" when it finishes (or immediately
   when skipped); the hero listens. A flag covers listeners that attach
   after the event already fired. */

const EVENT = "folio:ready";

let ready = false;

export function markIntroReady() {
  if (ready) return;
  ready = true;
  window.dispatchEvent(new Event(EVENT));
}

/* Async variant: call this — not markIntroReady — from inside GSAP
   timeline callbacks. GSAP executes those callbacks with the
   timeline's matchMedia context active, so a synchronous dispatch
   would stamp every listener-created tween with that context, and a
   later matchMedia revert would wipe them out. Deferring escapes the
   context entirely. */
export function markIntroReadyAsync() {
  window.setTimeout(markIntroReady, 0);
}

export function onIntroReady(callback: () => void): () => void {
  if (ready) {
    const id = window.setTimeout(callback, 0);
    return () => window.clearTimeout(id);
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}

export function isIntroReady() {
  return ready;
}
