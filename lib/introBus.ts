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
