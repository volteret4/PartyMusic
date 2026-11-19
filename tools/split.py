#!/usr/bin/env python3
"""Texto por capítulos de Party Music: The Inside Story of the Black Panthers' Band and How Black Power
Transformed Soul Music (Rickey Vincent, Lawrence Hill Books, 2013).

Uso: python3 -I tools/split.py <dir_html> <dir_salida>

Lee directamente los HTML del ePub (text/partNNNN*.html), que traen la paginación impresa (anclas
<a id="page_N"></a>). Capítulo 1: el prólogo de Boots Riley y el prefacio; 2: la introducción; 3-10: los
capítulos 1-8 del libro; 11: la discografía de «Sources». Las cabeceras salen como «## …»; las fotos, sus
pies y las llamadas a nota se descartan. Escribe <dir>/NN.txt (un párrafo por línea, «[pág. N]» con la
página impresa en que empieza) y <dir>/book.json (párrafos {ch, sec, segs: [[pág, texto]]}, el formato de
tools/refs.py y de pdfpages.py --impresas; sec es la última cabecera de sección).
"""
import html
import json
import re
import sys
from pathlib import Path

FILES = {1: ['part0005', 'part0006_split_*'], 2: ['part0007_split_*']} | \
    {n + 2: [f'part{n + 7:04d}_split_*'] for n in range(1, 9)} | {11: ['part0017_split_001']}
BREAK = re.compile(r'<a id="page_([^"]+)"[^>]*>(?:</a>)?')
PARA = re.compile(r'<(p|h[1-6])\b([^>]*)>(.*?)</\1>', re.S)
SKIP = ('class="image', 'class="copyright')
START = {11: 359}  # la discografía empieza en la pág. 359, cuya ancla queda al final de part0017_split_000
# Las anclas page_00a-00p son el cuadernillo de fotos (al final de part0012): solo traen fotos y pies, que se descartan.


def clean(s):
    s = re.sub(r'<sup[^>]*>.*?</sup>', '', s, flags=re.S)
    s = re.sub(r'<br\s*/?>', ' ', s)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()


def page_of(t):
    return int(t) if t.isdigit() else t


def main(src, out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    paras = []
    for ch, names in FILES.items():
        page, sec, text = START.get(ch), None, []
        files = [fp for name in names for fp in sorted(Path(src).glob(f'{name}.html'))]
        for fp in files:
            doc = fp.read_text()
            body = doc[doc.index('<body'):]
            pos = 0
            for m in PARA.finditer(body):
                for b in BREAK.findall(body[pos:m.start()]):
                    page = page_of(b)
                pos = m.end()
                tag, attrs, inner = m.groups()
                parts = BREAK.split(inner)          # [texto, pág, texto, pág, …]
                segs, cur = [], page
                for i, part in enumerate(parts):
                    if i % 2:
                        cur = page_of(part)
                        continue
                    t = clean(part)
                    if t:
                        segs.append([cur, t])
                page = cur
                if not segs or any(k in attrs for k in SKIP):
                    continue
                line = ' '.join(t for _, t in segs)
                if tag != 'p':
                    if 'class="sec"' in attrs or 'fm-title' in attrs:
                        sec = line
                    text.append(f'## {line}')
                    continue
                paras.append({'ch': ch, 'sec': sec, 'segs': segs})
                text.append(f'[pág. {segs[0][0]}] {line}')
        (out / f'{ch:02d}.txt').write_text('\n\n'.join(text) + '\n')
        n = sum(len(t.split()) for p in paras if p['ch'] == ch for _, t in p['segs'])
        print(f'cap. {ch}: {n} palabras, págs. {next((p["segs"][0][0] for p in paras if p["ch"] == ch), "?")}–{page}')
    (out / 'book.json').write_text(json.dumps(paras, ensure_ascii=False))


if __name__ == '__main__':
    main(*sys.argv[1:])
