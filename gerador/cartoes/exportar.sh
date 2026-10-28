#!/bin/zsh
# PNGs dos cartões (montar.mjs) -> site/img/cartoes: nativo q92 para a página do produto, 512 sem perda para o leque 3D e OG 1200x630.
SAIDA=${1:?pasta com os PNG}
cd "$(dirname "$0")/../.."
mkdir -p site/img/cartoes/p site/img/og
for png in $SAIDA/*.png; do
  n=$(basename $png .png)
  nice cwebp -q 92 -m 6 "$png" -o site/img/cartoes/$n.webp >/dev/null 2>&1
  nice cwebp -lossless -z 9 -resize 512 512 "$png" -o site/img/cartoes/p/$n.webp >/dev/null 2>&1
  sips -Z 630 "$png" --out /tmp/vx-og-$n.png >/dev/null 2>&1
  alvo=$n; [ $n = advocacia ] && alvo=meuescritorio
  sips --padToHeightWidth 630 1200 --padColor 111111 /tmp/vx-og-$n.png --out site/img/og/$alvo.png >/dev/null 2>&1
  echo "$n ok"
done
