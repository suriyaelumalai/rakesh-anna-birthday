# Happy Birthday, Rakesh Anna 🎂

A one-page, fully static birthday site. No build step, no npm, no frameworks — just
`index.html`, some CSS and three small JS files. Perfect for GitHub Pages.

```
rakesh-anna-birthday/
├── index.html
├── css/style.css
├── js/confetti.js      ← confetti + balloon engine
├── js/quiz.js          ← the rigged quiz + the un-clickable button
├── js/main.js          ← PHOTO LIST + page wiring   ⭐ edit this
└── images/             ← PUT HIS PICTURES HERE      ⭐ edit this
```

---

## 📸 Where to upload his pictures

Put the image files inside the **`images/`** folder and name them exactly:

| File name             | Suggested picture                |
| --------------------- | -------------------------------- |
| `images/photo-1.jpg`  | a solo photo of Rakesh anna      |
| `images/photo-2.jpg`  | one of him laughing / candid     |
| `images/photo-3.jpg`  | him lecturing / serious face     |
| `images/photo-4.jpg`  | **you and him together**         |
| `images/photo-5.jpg`  | another one of you two           |
| `images/photo-6.jpg`  | the best / most emotional one    |

That's it — refresh the page and they appear. Until you add them, nice colourful
placeholder cards are shown instead (`images/placeholder-*.svg`), so the site never looks broken.

**Using `.png` / `.jpeg` / `.webp` instead?** Open [js/main.js](js/main.js) and change the
`src` values at the top:

```js
var PHOTOS = [
  { src: "images/rakesh-smiling.png", fallback: "images/placeholder-1.svg", caption: "Exhibit A: the face of infinite patience." },
  ...
];
```

The `caption` text under each photo is in that same list — swap in your own inside jokes.

> Tip: resize photos to roughly 1200px wide before uploading so the page loads fast.

---

## 🎮 Customising the fun stuff

- **Quiz questions** → top of [js/quiz.js](js/quiz.js) (`QUESTIONS`). Each entry has
  `q` (question), `good` (the clickable answer), `bad` (the button that runs away)
  and `after` (the smug line shown after he answers).
- **Taunts** while he chases the runaway button → `TAUNTS` in the same file.
- **Quotes / "honest translations"** → directly in [index.html](index.html) under the
  `#quotes` section.
- **Final birthday message** → the `#finale` section of [index.html](index.html).
- **Colours** → the `:root` variables at the top of [css/style.css](css/style.css).

---

## 🚀 Put it on GitHub Pages

1. Create a new repo on GitHub (e.g. `rakesh-anna-birthday`), **public**.
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Happy birthday anna"
   git branch -M main
   git remote add origin https://github.com/<your-username>/rakesh-anna-birthday.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **`main`**, folder: **`/ (root)`** → **Save**
4. Wait a minute, then open:
   `https://<your-username>.github.io/rakesh-anna-birthday/`

Send him the link. Watch him suffer. 🎉

### Preview locally first

```bash
cd rakesh-anna-birthday
python3 -m http.server 8080
```

then open http://localhost:8080

---

## Notes

- `.nojekyll` is included so GitHub Pages serves every file as-is.
- Respects `prefers-reduced-motion` — confetti and balloons stay calm for anyone who needs that.
- Works on phones: the runaway button also dodges taps.
