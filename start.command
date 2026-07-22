#!/bin/bash
cd "$(dirname "$0")"
echo "Iniciando o servidor da VisionX..."
echo "Site:   http://localhost:8099"
echo "Painel: http://localhost:8099/admin"
echo "(Deixe esta janela aberta. Para parar: Ctrl+C ou feche a janela.)"
echo ""
node server.js
