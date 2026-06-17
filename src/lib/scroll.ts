const CONTENT_SCROLL_OFFSET = 88;

export function scrollToContentStart(target?: HTMLElement | null) {
  window.requestAnimationFrame(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const top = target
      ? target.getBoundingClientRect().top + window.scrollY - CONTENT_SCROLL_OFFSET
      : 0;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
}
