/* ======================================================================
   EDIT YOUR PHOTOS + CAPTIONS HERE
   ----------------------------------------------------------------------
   1. Drop his pictures into the  images/  folder.
   2. Name them exactly:  photo-1.jpg, photo-2.jpg ... photo-6.jpg
      (or change the "src" below to whatever your file is called —
       .jpg / .png / .jpeg / .webp all work)
   3. Change the captions to your own inside jokes.
   If a photo is missing, the placeholder card shows up instead.
   ====================================================================== */
var PHOTOS = [
  { src: "images/photo-1.jpg", fallback: "images/placeholder-1.svg", caption: "Exhibit A: the face of infinite patience." },
  { src: "images/photo-2.jpg", fallback: "images/placeholder-2.svg", caption: "The day he realised I'm non-refundable." },
  { src: "images/photo-3.jpg", fallback: "images/placeholder-3.svg", caption: "Anna explaining why my plan is terrible. Again." },
  { src: "images/photo-4.jpg", fallback: "images/placeholder-4.svg", caption: "Us. Unhinged. Unbothered. Unmatched." },
  { src: "images/photo-5.jpg", fallback: "images/placeholder-5.svg", caption: "Proof that he laughs at my jokes. Under duress." },
  { src: "images/photo-6.jpg", fallback: "images/placeholder-6.svg", caption: "Brother by choice, stuck by fate. 🫶" }
];

(function () {
  "use strict";

  /* ---------- gallery ---------- */
  var grid = document.getElementById("gallery-grid");

  PHOTOS.forEach(function (photo) {
    var fig = document.createElement("figure");
    fig.className = "photo reveal";

    var img = document.createElement("img");
    img.loading = "lazy";
    img.alt = photo.caption;
    img.src = photo.src;
    img.addEventListener("error", function onError() {
      img.removeEventListener("error", onError);
      img.src = photo.fallback;
    });

    var cap = document.createElement("figcaption");
    cap.textContent = photo.caption;

    fig.appendChild(img);
    fig.appendChild(cap);
    grid.appendChild(fig);
  });

  /* ---------- honest translation toggle ---------- */
  var toggle = document.getElementById("cringe-toggle");
  toggle.addEventListener("click", function () {
    var on = document.body.classList.toggle("honest");
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "Hide Honest Translation 🙈" : "Turn on Honest Translation 🔊";
  });

  /* ---------- counting stats ---------- */
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (target === 0) { el.textContent = "0"; return; }
    var start = performance.now();
    var duration = 1200;
    function step(now) {
      var t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString();
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- scroll reveals ---------- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      if (entry.target.dataset.count !== undefined) countUp(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".quote-card, .photo, .quiz-card, .stat b")
    .forEach(function (el) {
      if (el.dataset.count === undefined) el.classList.add("reveal");
      observer.observe(el);
    });

  /* ---------- the rigged quiz ---------- */
  var finale = document.getElementById("finale");

  var quiz = new window.Quiz({
    arena: document.getElementById("answer-arena"),
    good: document.getElementById("answer-good"),
    bad: document.getElementById("answer-bad"),
    question: document.getElementById("quiz-question"),
    count: document.getElementById("quiz-count"),
    taunt: document.getElementById("taunt"),
    progressFill: document.getElementById("quiz-progress-fill"),
    onComplete: function (dodges) {
      finale.hidden = false;
      finale.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () {
        window.Party.celebrate();
      }, 650);
      if (dodges > 0) {
        document.getElementById("taunt").textContent =
          "You chased the wrong button " + dodges + " time" + (dodges === 1 ? "" : "s") +
          ". Noted. Permanently.";
      }
    }
  });

  document.getElementById("restart-quiz").addEventListener("click", function () {
    quiz.restart();
    document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("more-confetti").addEventListener("click", function () {
    window.Party.celebrate();
  });

  /* ---------- confetti on tap anywhere ---------- */
  document.addEventListener("click", function (e) {
    if (e.target.closest("button, a")) return;
    window.Party.burst(e.clientX, e.clientY);
  });

  /* ---------- a little welcome shower ---------- */
  window.setTimeout(function () {
    window.Party.rain(70);
    window.Party.balloons(5);
  }, 500);
})();
