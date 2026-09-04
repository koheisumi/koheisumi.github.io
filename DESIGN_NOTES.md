# KOHEI SUMI website — V17 layout draft (2026-09-04)

## Today’s layout decisions

- TOP: desktop split-screen. Large white field on the left, vertical HERO image rail on the right.
- HERO: four portrait crops cross-fade quietly (7.2 sec / 1.6 sec fade). No arrows or dots.
- HERO images are real crops only. No stretch, outpainting, or generative fill.
- Brand: KOHEI SUMI in a thin high-contrast serif stack; navigation remains sans-serif.
- Navigation: compact hamburger menu. CONTACT opens `mailto:kousmith@gmail.com` directly.
- Header: quietly hides while scrolling down and returns when scrolling up.
- Language: EN is default. EN / JP toggle persists the visitor’s choice in localStorage.
- ABOUT: one continuous vertical page — PROFILE → STATEMENT → CV.
- ABOUT: a narrow, full-viewport photo band stays on the right on desktop (`position: sticky`). Current image is a pure crop from `P.03.jpeg`.
- ABOUT identity: KOHEI SUMI / 住 康平 / Artist appears once at the beginning; the CV no longer repeats the name block.
- Public CV: detailed reading-group / small-event entries are not individually listed. They are summarized at the end as “Other Activities”. Keep the detailed MASTER CV separately.
- WORKS: image-led four-column grid on desktop; current images are a layout draft.
- PROJECTS: text-led list, visually distinct from WORKS.
- Mobile: no split-screen; HERO becomes a full-width vertical visual block. ABOUT photo band becomes a separate image block above the text.

## GitHub Pages

This ZIP intentionally does **not** include `CNAME`. Keep the existing `CNAME` file already in the repository.
Old `biography.html`, `statement.html`, and `cv.html` are retained as redirects to anchors inside the unified `about.html`.
