<div align="center">

# `~/yogesh` — Portfolio

A terminal-inspired developer portfolio for **Yogesh Govari** — Software Developer · Full-Stack · AI/ML.

</div>

## Features
- Dark "terminal / IDE" look: electric blue, cyan & violet, code-rain background, scanlines, HUD-style cards and a VS Code-like status bar
- Animated **object-detection HUD** inspired by the Visual Assist project
- Typed role line, animated counters, scroll reveals, scroll-spy navigation
- Dark / light theme toggle (remembered in the browser)
- Downloadable resume (`assets/Yogesh-Govari-Resume.pdf`)
- Responsive, keyboard-accessible, honours `prefers-reduced-motion`

## Structure
```
index.html        all page content
css/style.css     design tokens, components, themes, responsive rules
js/main.js        theme, nav, animations, code rain
assets/           favicon and resume PDF
```

## Run locally
No build step — open `index.html`, or:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy
Hosted with **GitHub Pages** from the `main` branch (root folder).
