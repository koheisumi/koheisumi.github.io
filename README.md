# Kohei Sumi website V20

V20 fixes the menu overlay stacking bug and preserves the authored 3:5 HERO crops without any second CSS crop.

- Keep the existing GitHub `CNAME` file. It is intentionally not included in this ZIP.
- Desktop HOME HERO uses a fixed 3:5 viewport ratio (`width = 60svh`, `height = 100svh`).
- HERO images use `object-fit: contain`, never `cover`.
