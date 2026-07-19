/* ============================================================
   LuXTech Innovation — shared custom cursor + magnetic hover
   Same behaviour as the homepage's inline script. Requires GSAP
   and .cursor-dot/.cursor-ring elements in the DOM. Elements with
   [data-cursor] get the "hot" ring; elements with .magnetic also
   get pulled toward the pointer on hover.
   ============================================================ */
window.addEventListener('load', function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = !!window.gsap;
  if (reduce || !matchMedia('(pointer:fine)').matches || !hasGSAP) return;

  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  var xd = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power3' });
  var yd = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power3' });
  var xr = gsap.quickTo(ring, 'x', { duration: .35, ease: 'power3' });
  var yr = gsap.quickTo(ring, 'y', { duration: .35, ease: 'power3' });
  window.addEventListener('mousemove', function (e) {
    xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY);
  });

  document.querySelectorAll('a, button, [data-cursor], .magnetic').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('hot'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('hot'); });
  });

  document.querySelectorAll('.magnetic').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: .4, ease: 'power3' });
    });
    el.addEventListener('mouseleave', function () {
      gsap.to(el, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,0.4)' });
    });
  });
});
