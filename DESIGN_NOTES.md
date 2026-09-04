# KOHEI SUMI website — V18 layout draft (2026-09-04)

## Updated layout decisions

- TOP desktop split-screen is reversed from V17: portrait HERO image rail on the **left (38%)**, white information field on the **right (62%)**.
- KOHEI SUMI sits at the top of the white field and uses **Times New Roman** (brand only).
- EN and JP are now two independent controls rather than a single swapping toggle. EN remains the default.
- Hamburger and language controls sit on the upper-right white field for maximum legibility.
- HERO: four real portrait crops cross-fade quietly (7.2 sec / 1.6 sec fade). No arrows or dots.
- HERO images remain crop-only assets: no stretch, outpainting, or generative fill.
- Navigation: compact hamburger menu. CONTACT opens `mailto:kousmith@gmail.com` directly.
- Header hides while scrolling down and returns when scrolling up.
- ABOUT remains one continuous vertical page — PROFILE → STATEMENT → CV.
- ABOUT photo band remains on the right in this draft; this was not changed in V18.
- Public CV keeps small reading groups / art events summarized under “Other Activities”; detailed MASTER CV stays separate.
- WORKS remains image-led; PROJECTS remains text-led.
- Mobile keeps a single-column layout; the split-screen is desktop-only.

## GitHub Pages

This ZIP intentionally does **not** include `CNAME`. Keep the existing `CNAME` file already in the repository.
Old `biography.html`, `statement.html`, and `cv.html` remain redirects to anchors inside the unified `about.html`.
