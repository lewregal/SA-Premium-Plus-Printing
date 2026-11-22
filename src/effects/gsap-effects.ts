// The GSAP effects, loaded lazily by src/effects/gsap-lazy.ts once the first [data-gsap] element nears the
// viewport. Every effect here fires once on scroll into view (ScrollTrigger, once: true), animates transform and
// opacity (plus the named paint only exceptions: the drawn stroke, the weight axis, the scrambled characters) and
// never touches the hero. Each component already renders its finished state in CSS for reduced motion and no JS;
// this module only adds the choreography when html.motion is set.
//
// Screen readers and the audit read the real sentence, which stays one text node in the component. GSAP animates
// an aria-hidden visual copy (SplitText with aria: 'none' on the copy, since the copy is already hidden), and when
// the timeline finishes the real text is shown again and the copy hidden, so later contrast checks measure real text.
//
// Kinds (the data-gsap value):
//   split-line   headline lines rise out of line masks, top line first            (SplitText lines, mask)
//   word-stagger words of a lede rise and fade in sequence                       (SplitText words)
//   weight-shift a variable font headline gains weight as it climbs the screen   (ScrollTrigger scrub on the wght axis)
//   scribble     a hand drawn SVG stroke draws itself under one phrase           (DrawSVG)
//   outlined     outlined headline lines fill with solid color, left to right    (clip-path on the solid copy; the morph)
//   scramble     characters settle from a scramble into the real word            (ScrambleText; bars, auto)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin);
// exposed so rigal-site-audit can list every tween and confirm none targets the hero
(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;

const EASE = 'power3.out';
const inHero = (el: Element) => !!el.closest('.hero, [data-hero]');
const already = (el: Element, ratio = 0.85) => el.getBoundingClientRect().top < innerHeight * ratio;

function swapDone(el: HTMLElement) {
  // the real text comes back, the animated copy goes away
  el.classList.add('is-done');
}

function splitLine(el: HTMLElement) {
  const copy = el.querySelector<HTMLElement>('.fx-anim');
  if (!copy) return;
  if (already(el)) return swapDone(el);
  el.classList.add('is-armed');
  const split = SplitText.create(copy, { type: 'lines', mask: 'lines', linesClass: 'line', aria: 'none', autoSplit: true,
    onSplit: (s) => gsap.from(s.lines, { yPercent: 112, opacity: 0, duration: 0.9, ease: EASE, stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }, onComplete: () => { swapDone(el); } }) });
  return split;
}

function wordStagger(el: HTMLElement) {
  const copy = el.querySelector<HTMLElement>('.fx-anim');
  if (!copy) return;
  if (already(el)) return swapDone(el);
  el.classList.add('is-armed');
  SplitText.create(copy, { type: 'words', wordsClass: 'w', aria: 'none', autoSplit: true,
    onSplit: (s) => gsap.from(s.words, { y: '0.45em', opacity: 0, duration: 0.6, ease: EASE, stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }, onComplete: () => swapDone(el) }) });
}

function weightShift(el: HTMLElement) {
  const live = el.querySelector<HTMLElement>('.fx-weight-live');
  if (!live) return;
  const from = Number(el.dataset.from || 300), to = Number(el.dataset.to || 800);
  const state = { w: from };
  gsap.to(state, { w: to, ease: 'none', onUpdate: () => el.style.setProperty('--w', String(Math.round(state.w))),
    scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 30%', scrub: 0.3 } });
}

function scribble(el: HTMLElement) {
  const path = el.querySelector('path');
  if (!path) return;
  if (already(el, 0.7)) return;
  gsap.from(path, { drawSVG: '0%', duration: 0.9, ease: 'power2.out', delay: 0.25,
    scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
}

function outlined(el: HTMLElement) {
  const fills = el.querySelectorAll<HTMLElement>('.ln-fill-in');
  if (!fills.length) return;
  if (already(el, 0.75)) return;
  gsap.set(fills, { clipPath: 'inset(0 100% 0 0)' });
  gsap.to(fills, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: EASE, stagger: 0.12, delay: 0.3,
    scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
}

function scramble(el: HTMLElement) {
  const copy = el.querySelector<HTMLElement>('.fx-anim');
  if (!copy) return;
  if (already(el, 0.75)) return swapDone(el);
  const text = copy.textContent || '';
  el.classList.add('is-armed');
  // the copy keeps the real text's width so the line never jumps while characters change
  copy.style.minWidth = `${copy.getBoundingClientRect().width}px`;
  gsap.to(copy, { duration: Math.min(1.6, 0.5 + text.length * 0.045), ease: 'none',
    scrambleText: { text, chars: el.dataset.chars || 'upperCase', revealDelay: 0.15, speed: 0.6, tweenLength: false },
    scrollTrigger: { trigger: el, start: 'top 85%', once: true }, onComplete: () => swapDone(el) });
}

const KINDS: Record<string, (el: HTMLElement) => void> = { 'split-line': splitLine, 'word-stagger': wordStagger, 'weight-shift': weightShift, scribble, outlined, scramble };

export function mount(targets: HTMLElement[]) {
  for (const el of targets) {
    if (inHero(el)) continue;   // the hero is CSS only, always
    const fn = KINDS[el.dataset.gsap || ''];
    if (fn) fn(el);
  }
  ScrollTrigger.refresh();
}
