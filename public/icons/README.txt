PWA Icons Required
==================

Files needed in this directory:
  - icon-192x192.png  (192x192 pixels)
  - icon-512x512.png  (512x512 pixels)

How to generate them from favicon.svg:
  Option 1 — Online tool (easiest):
    1. Go to https://realfavicongenerator.net/
    2. Upload public/favicon.svg
    3. Download and place the PNGs here

  Option 2 — Inkscape (command line):
    inkscape --export-type=png --export-width=192 --export-filename=icon-192x192.png public/favicon.svg
    inkscape --export-type=png --export-width=512 --export-filename=icon-512x512.png public/favicon.svg

  Option 3 — ImageMagick:
    magick convert -background "#1a1f2e" -resize 192x192 public/favicon.svg public/icons/icon-192x192.png
    magick convert -background "#1a1f2e" -resize 512x512 public/favicon.svg public/icons/icon-512x512.png

Design spec:
  Background color: #1a1f2e (deep navy)
  Accent / icon color: #c9a84c (warm gold)
  Corner radius: rounded (use maskable safe zone — keep icon within center 80%)
