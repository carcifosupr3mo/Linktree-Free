#!/usr/bin/env bash
# Opzionale: ridimensiona e comprime le foto prima di caricarle (richiede ImageMagick).
# Uso: scripts/optimize-images.sh foto.jpg [altra.png ...]
# Output: assets/img/products/<nome>.webp (max 1600px sul lato lungo, qualità 82)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/img/products
command -v convert >/dev/null || { echo "ImageMagick non trovato"; exit 1; }
for f in "$@"; do
  out="assets/img/products/$(basename "${f%.*}").webp"
  convert "$f" -auto-orient -strip -resize '1600x1600>' -quality 82 "$out"
  echo "✔ $out ($(du -h "$out" | cut -f1))"
done
