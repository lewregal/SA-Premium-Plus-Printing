// Shared trigger for every effect. Adds .is-in once when the element scrolls into view, only when the
// visitor allows motion (html.motion is set in Base.astro). Without motion the finished state is already showing.
export function inview(selector: string, threshold = 0.35) {
  if (!document.documentElement.classList.contains('motion')) return;
  const els = document.querySelectorAll<HTMLElement>(selector);
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      (e.target as HTMLElement).classList.add('is-in');
      io.unobserve(e.target);
    }
  }, { threshold, rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
}
