#!/bin/sh
# pptx を PDF に変換（LibreOffice）。Meiryo の無い環境では fonts.conf で日本語フォントに置き換える
# 使い方: ./to_pdf.sh deck.pptx   （同じディレクトリに deck.pdf を出力）
# SOFFICE 環境変数で soffice コマンドを差し替え可能
set -e
here=$(cd "$(dirname "$0")" && pwd)
FONTCONFIG_FILE="$here/fonts.conf" ${SOFFICE:-soffice} --headless --convert-to pdf --outdir "$(dirname "$1")" "$1"
