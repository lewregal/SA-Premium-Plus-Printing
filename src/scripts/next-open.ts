// Next open windows (ported from the Century Pest build). Fills any [data-next-open] box with up to three
// upcoming booking windows from /book/availability, each a link that opens /book with that time picked.
// Quietly leaves the box hidden if booking is off or the service is unreachable: the booking button still works.
let times: Promise<{ start: string; end: string }[]> | null = null;
const nextTimes = () =>
  (times ??= fetch('/book/availability', { headers: { accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : { slots: [] }))
    .then((d: { slots?: { start: string; end: string }[] }) => (d.slots ?? []).slice(0, 3))
    .catch(() => []));
const hour = (d: Date, tz: string) => d.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: d.getMinutes() ? '2-digit' : undefined }).toLowerCase();
const label = (iso: string, endIso: string, tz: string) => {
  const d = new Date(iso);
  const day = new Intl.DateTimeFormat('en-US', { timeZone: tz, dateStyle: 'short' });
  const now = Date.now();
  const name = day.format(d) === day.format(now) ? 'Today' : day.format(d) === day.format(now + 864e5) ? 'Tomorrow' : d.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' });
  return `${name}, ${hour(d, tz)} to ${hour(new Date(endIso), tz)}`;
};
export function showNextOpen(tz = 'America/Chicago') {
  const boxes = document.querySelectorAll<HTMLElement>('[data-next-open]');
  if (!boxes.length) return;
  nextTimes().then((list) => {
    if (!list.length) return;
    boxes.forEach((box) => {
      box.innerHTML = '<span class="next-open-label">Next open windows</span>';
      for (const t of list) {
        const a = document.createElement('a');
        a.href = `/book?start=${encodeURIComponent(t.start)}`;
        a.textContent = label(t.start, t.end, tz);
        box.appendChild(a);
      }
      box.hidden = false;
    });
  });
}
