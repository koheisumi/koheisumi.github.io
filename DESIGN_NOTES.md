# V21 design notes — 2026-09-04

- TOP returns to **white field on the left / vertical slideshow on the right**.
- HERO slideshow has exactly three images: temple installation, volcanic rock, and mountain forest. Domestic Jealousy text and Red Spike are excluded from the HERO.
- HERO images are treated as completed crops; CSS does not crop them again. The mountain image is a literal center crop from the original photograph, with no generative fill or stretching.
- Slideshow interval: 12 seconds, quiet crossfade.
- Brand `KOHEI SUMI`: CSS font stack begins with **貂明朝 / Ten Mincho**. No font file is bundled.
- On TOP, EN / JP and hamburger sit in white over the upper-right of the image.
- Hamburger opens a small white dropdown directly beneath the control; there is no full-screen overlay.
- ABOUT is one scrolling page: PROFILE → STATEMENT → CURRICULUM VITAE. The duplicate large KOHEI SUMI identity block inside ABOUT has been removed.
- Curriculum Vitae is fully synchronized from the revised bilingual CV working document dated 2026-09-04.
- `cv.html`, `biography.html`, and `statement.html` remain compatibility redirects.
- Existing GitHub `CNAME` must be preserved; it is not included in this ZIP.
