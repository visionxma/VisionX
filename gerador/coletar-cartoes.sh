#!/bin/zsh
# Pega o cartão de cada produto na pasta da SESSÃO que o Codex imprimiu no log (nunca o arquivo mais novo), e gera .webp + miniatura + OG 1200x630.
LOGS=${1:?pasta dos logs}
cd "$(dirname "$0")/.."
for log in $LOGS/*.log; do
  slug=$(basename $log .log)
  sid=$(grep -o 'session id: [0-9a-f-]*' $log | head -1 | awk '{print $3}')
  [ -z "$sid" ] && { echo "$slug: sem session id"; continue; }
  png=$(ls -1 ~/.codex/generated_images/$sid/*.png 2>/dev/null | head -1)
  [ -z "$png" ] && { echo "$slug: sem imagem na sessão $sid"; continue; }
  alvo=$slug; [ $slug = advocacia ] && alvo=advocacia
  nice cwebp -q 92 -m 6 "$png" -o site/img/cartoes/$alvo.webp >/dev/null 2>&1
  nice cwebp -lossless -z 9 -resize 512 512 "$png" -o site/img/cartoes/p/$alvo.webp >/dev/null 2>&1
  sips -Z 630 "$png" --out /tmp/vx-og-$alvo.png >/dev/null 2>&1
  sips --padToHeightWidth 630 1200 --padColor 111111 /tmp/vx-og-$alvo.png --out site/img/og/$( [ $alvo = advocacia ] && echo meuescritorio || echo $alvo ).png >/dev/null 2>&1
  echo "$slug ok ($sid)"
done
