// Lazy GSAP. GSAP (with ScrollTrigger, SplitText, DrawSVG and ScrambleText, all free since the Webflow
// acquisition) drives the choreographed effects below the hero. It is never part of the initial page load and
// never touches the hero: this module waits until the first element marked [data-gsap] comes within one viewport
// of the screen, then imports the bundle (src/effects/gsap-effects.ts, split by Astro into its own chunk) and
// hands it every marked element. Reduced motion or no JS: nothing loads; every effect already shows its finished
// state in CSS. Hero motion is CSS only (src/effects/Keyword.astro) and does not go through here.
const painted = () => new Promise<void>((resolve) => {
  const done = () => requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  try {
    if (performance.getEntriesByType('paint').some((e) => e.name === 'first-contentful-paint')) return done();
    const po = new PerformanceObserver((l) => { if (l.getEntries().some((e) => e.name === 'first-contentful-paint')) { po.disconnect(); done(); } });
    po.observe({ type: 'paint', buffered: true });
    setTimeout(done, 3000);
  } catch { done(); }
});

export function lazyGsap() {
  const html = document.documentElement;
  if (!html.classList.contains('motion')) return;
  const targets = [...document.querySelectorAll<HTMLElement>('[data-gsap]')];
  if (!targets.length) return;
  let loading = false;
  const load = async () => {
    if (loading) return;
    loading = true;
    io.disconnect();
    // the hero paints first, always: wait for first contentful paint, then two frames, before any script work
    await painted();
    const mod = await import('./gsap-effects');
    html.classList.add('gsap-ready');
    mod.mount(targets);
  };
  const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) load(); }, { rootMargin: '100% 0px 100% 0px' });
  targets.forEach((t) => io.observe(t));
}
