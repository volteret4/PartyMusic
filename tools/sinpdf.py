#!/usr/bin/env python3
"""Genera data/pages.js y data/mentions.js sin PDF, desde las páginas impresas de book.json.

Uso: python3 -I tools/sinpdf.py build/chapters/book.json

En pepecono no hay pdftotext ni ebook-convert, así que tools/pdfpages.py no puede generar el
PDF ni leerlo. Este script reutiliza sus funciones (mentions, artist_mentions…) tomando como
«páginas» las páginas impresas de la edición impresa que trae el ePub. Cada
entrada lleva `null` en el lugar de la página del PDF: la web muestra la página impresa sin enlace.
"""
import importlib.util
import json
import subprocess
import sys
from pathlib import Path

here = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('pdfpages', here / 'pdfpages.py')
pp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pp)

book = json.loads(Path(sys.argv[1]).read_text())
labels, texts = [], {}
for item in book:
    for page, text in item['segs']:
        if page not in texts:
            labels.append(page)
            texts[page] = []
        texts[page].append(text)
raw = ['\n'.join(texts[p]) for p in labels]
lab = lambda p: int(p) if str(p).isdigit() else p

dump = json.loads(subprocess.run(['node', '-e', pp.DUMP], capture_output=True, text=True, check=True).stdout)
wordpages = [[pp.words(pg) for pg in raw]]
quotedpages = [[pp.quoted(pg) for pg in raw]]
found = pp.mentions(dump['tracks'], wordpages, quotedpages)
pages = {k: [[1, None, lab(labels[i - 1])] for b, i in v] for k, v in found.items()}
out = Path('data')
(out / 'pages.js').write_text('// Generado por tools/sinpdf.py — no editar a mano.\n'
                              f"window.{dump['ns']}_PAGES = {json.dumps(pages, ensure_ascii=False, separators=(',', ':'))};\n")
print(f"{len(pages)} de {len(dump['tracks'])} discos con páginas")
artists = sorted({t['a'] for t in dump['tracks']})
ment = pp.artist_mentions(artists, [raw], lambda i, before: lab(labels[i]))
ment = {a: [[1, None, pr, frag] for _, _, pr, frag in v] for a, v in ment.items()}
(out / 'mentions.js').write_text('// Generado por tools/sinpdf.py — no editar a mano.\n'
                                 f"window.{dump['ns']}_MENTIONS = {json.dumps(ment, ensure_ascii=False, separators=(',', ':'))};\n")
print(f"{len(ment)} de {len(artists)} artistas con menciones ({sum(map(len, ment.values()))} pasajes)")
