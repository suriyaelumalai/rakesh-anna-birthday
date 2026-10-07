/* The rigged quiz. Edit QUESTIONS to add your own inside jokes. */
(function (global) {
  "use strict";

  var QUESTIONS = [
    {
      q: "What should you do when I fire you?",
      good: "Leave me alone 🚪",
      bad: "Pester me non stop 📞",
      after: "Correct. Obviously. The other button was never real."
    },
    {
      q: "I texted you a 400-word paragraph at 2:04 AM. Your move?",
      good: "Go back to sleep 😴",
      bad: "Stay up and read all 400 words 📖",
      after: "Correct answer. Your sleep matters more than my 2 AM nonsense. It'll still be there at 9 AM."
    },
    {
      q: "How many more years are you contractually tolerating me?",
      good: "Forever, no takebacks ♾️",
      bad: "Until next Tuesday 📅",
      after: "Signed, sealed, legally binding. Thank you for your service."
    },
    {
      q: "I made a questionable life decision. Again. React:",
      good: "Stand by me anyway 🧱",
      bad: "Finally give up on me 🙃",
      after: "No matter what I do, what I do not do — you stick strong. Told you."
    },
    {
      q: "Will I ever remember your birthday?",
      good: "No, I'll always forget 😜",
      bad: "Yes, every single year 📆",
      after: "Correct. I will always forget your birthday. This website is an apology in advance."
    },
    {
      q: "Honest rating of this website?",
      good: "10/10, framing it 🖼️",
      bad: "Mildly concerning 😬",
      after: "Wonderful review, anna. Your taste is impeccable."
    }
  ];

  var TAUNTS = [
    "Nope.",
    "Try again, anna. 🙂",
    "That button has commitment issues.",
    "It's not you, it's the button. (It's you.)",
    "Still faster than you, I see.",
    "Giving up is also an option. Just saying.",
    "Mouse skills: under review. 📋",
    "This is embarrassing for both of us.",
    "Bro. The green one. GREEN.",
    "I built this button with your stubbornness. Good luck."
  ];

  function Quiz(opts) {
    this.index = 0;
    this.dodges = 0;
    this.locked = false;
    this.lastDodge = 0;
    this.el = opts;
    this.bindRunaway();
    this.render();
  }

  Quiz.prototype.render = function () {
    var item = QUESTIONS[this.index];
    this.locked = false;
    this.el.count.textContent = "Question " + (this.index + 1) + " of " + QUESTIONS.length;
    this.el.question.textContent = item.q;
    this.el.good.textContent = item.good;
    this.el.bad.textContent = item.bad;
    this.el.taunt.textContent = "";
    this.el.progressFill.style.width = (this.index / QUESTIONS.length) * 100 + "%";
    this.el.good.style.left = "50%";
    this.el.good.style.top = "28%";
    this.el.bad.style.left = "50%";
    this.el.bad.style.top = "68%";
    this.el.bad.style.rotate = "0deg";
  };

  Quiz.prototype.next = function () {
    if (this.locked || this.index >= QUESTIONS.length) return;
    this.locked = true;

    var item = QUESTIONS[this.index];
    this.el.taunt.textContent = item.after;
    this.index++;
    this.el.progressFill.style.width = (this.index / QUESTIONS.length) * 100 + "%";

    var self = this;
    global.setTimeout(function () {
      if (self.index >= QUESTIONS.length) {
        self.el.onComplete(self.dodges);
      } else {
        self.render();
      }
    }, 1100);
  };

  Quiz.prototype.restart = function () {
    this.index = 0;
    this.dodges = 0;
    this.render();
  };

  Quiz.prototype.dodge = function () {
    // One teleport per ~250ms, otherwise a single mouse sweep racks up dozens.
    var now = Date.now();
    if (now - this.lastDodge < 250) return;
    this.lastDodge = now;

    var arena = this.el.arena;
    var btn = this.el.bad;
    var arenaBox = arena.getBoundingClientRect();
    var btnBox = btn.getBoundingClientRect();

    var padX = (btnBox.width / 2 / arenaBox.width) * 100 + 3;
    var padY = (btnBox.height / 2 / arenaBox.height) * 100 + 6;

    var left = Math.random() * (100 - padX * 2) + padX;
    var top = Math.random() * (100 - padY * 2) + padY;

    btn.style.left = left + "%";
    btn.style.top = top + "%";
    btn.style.rotate = (Math.random() * 30 - 15).toFixed(1) + "deg";

    this.dodges++;
    this.el.taunt.textContent = TAUNTS[Math.min(this.dodges - 1, TAUNTS.length - 1)];
  };

  Quiz.prototype.bindRunaway = function () {
    var self = this;
    var btn = this.el.bad;

    ["mouseenter", "mouseover", "focus"].forEach(function (evt) {
      btn.addEventListener(evt, function () { self.dodge(); });
    });

    // Mobile: run away before the tap can land.
    btn.addEventListener("touchstart", function (e) {
      e.preventDefault();
      self.dodge();
    }, { passive: false });

    // Last line of defence — keyboard/assistive clicks also fail, comically.
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      self.dodge();
      self.el.taunt.textContent = "Nice try. The button is union protected. 🛡️";
    });

    this.el.good.addEventListener("click", function (e) {
      if (self.locked) return;
      if (global.Party) {
        global.Party.burst(e.clientX || global.innerWidth / 2, e.clientY || global.innerHeight / 2);
      }
      self.next();
    });
  };

  global.Quiz = Quiz;
})(window);
