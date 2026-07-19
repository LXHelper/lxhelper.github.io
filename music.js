/* ============================================================
   LuXTech Innovation — shared background-music toggle
   Same behaviour as the homepage's inline music script. Expects
   a #bg-music <audio> element and a #music-btn <button> in the DOM.
   ============================================================ */
(function () {
  var btn = document.getElementById('music-btn');
  var audio = document.getElementById('bg-music');
  if (!btn || !audio) return;
  audio.volume = 0.5;

  function tryPlay() {
    audio.play().catch(function () {
      document.addEventListener('click', function onFirst() {
        audio.play();
        document.removeEventListener('click', onFirst);
      }, { once: true });
    });
  }

  window.addEventListener('load', tryPlay);

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      btn.classList.remove('muted');
      btn.setAttribute('aria-label', 'Mute music');
    } else {
      audio.pause();
      btn.classList.add('muted');
      btn.setAttribute('aria-label', 'Play music');
    }
  });

  audio.addEventListener('pause', function () { btn.classList.add('muted'); });
  audio.addEventListener('play', function () { btn.classList.remove('muted'); });
})();
