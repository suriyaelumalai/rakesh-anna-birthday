/* Tiny dependency-free confetti + balloon engine. */
(function (global) {
  "use strict";

  var canvas = document.getElementById("confetti-canvas");
  var ctx = canvas.getContext("2d");
  var pieces = [];
  var running = false;
  var COLORS = ["#ff5d9e", "#8c5bff", "#ffd36e", "#4ee6c3", "#ffffff", "#37b4ff"];
  var reduced = global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    var dpr = global.devicePixelRatio || 1;
    canvas.width = global.innerWidth * dpr;
    canvas.height = global.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function spawn(count, originX, originY) {
    var w = global.innerWidth;
    var h = global.innerHeight;
    for (var i = 0; i < count; i++) {
      pieces.push({
        x: originX === undefined ? rand(0, w) : originX + rand(-40, 40),
        y: originY === undefined ? rand(-h * 0.4, -10) : originY + rand(-20, 20),
        w: rand(6, 12),
        h: rand(8, 16),
        vx: rand(-1.6, 1.6),
        vy: rand(1.8, 5.2),
        spin: rand(-0.22, 0.22),
        angle: rand(0, Math.PI * 2),
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: rand(140, 320)
      });
    }
    start();
  }

  function tick() {
    ctx.clearRect(0, 0, global.innerWidth, global.innerHeight);
    for (var i = pieces.length - 1; i >= 0; i--) {
      var p = pieces[i];
      p.vy += 0.045;
      p.vx *= 0.995;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      p.life--;

      if (p.life <= 0 || p.y > global.innerHeight + 60) {
        pieces.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.angle)));
      ctx.restore();
    }

    if (pieces.length) {
      global.requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, global.innerWidth, global.innerHeight);
    }
  }

  function start() {
    if (running) return;
    running = true;
    global.requestAnimationFrame(tick);
  }

  var balloonLayer = document.getElementById("balloon-layer");

  function balloons(count) {
    if (reduced) return;
    for (var i = 0; i < count; i++) {
      (function (index) {
        global.setTimeout(function () {
          var b = document.createElement("div");
          var color = COLORS[(Math.random() * COLORS.length) | 0];
          var duration = rand(9, 16);
          b.className = "balloon";
          b.style.left = rand(2, 94) + "vw";
          b.style.background =
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,.75), " + color + " 60%)";
          b.style.animationDuration = duration + "s";
          b.style.setProperty("--spin", rand(-25, 25) + "deg");
          b.style.scale = rand(0.6, 1.3);
          balloonLayer.appendChild(b);
          global.setTimeout(function () {
            b.remove();
          }, duration * 1000 + 200);
        }, index * rand(120, 420));
      })(i);
    }
  }

  function celebrate() {
    if (reduced) return;
    spawn(140);
    balloons(14);
    global.setTimeout(function () { spawn(90, global.innerWidth * 0.2, global.innerHeight * 0.6); }, 450);
    global.setTimeout(function () { spawn(90, global.innerWidth * 0.8, global.innerHeight * 0.6); }, 900);
  }

  resize();
  global.addEventListener("resize", resize);

  global.Party = {
    burst: function (x, y) { if (!reduced) spawn(45, x, y); },
    rain: function (n) { if (!reduced) spawn(n || 120); },
    balloons: balloons,
    celebrate: celebrate
  };
})(window);
