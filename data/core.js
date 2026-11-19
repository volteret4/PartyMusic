// Registro de escenas, grupos, movimientos y discos de Party Music de Rickey Vincent (los Lumpen, el Black Panther Party y el soul del black power). Cada fichero de capítulo (data/NN-*.js,
// escritos a mano leyendo el libro) llama a LUMPEN.chapter({...}) y LUMPEN.add([...], n).
// Los datos se fusionan por id: los arrays se unen y cada capítulo puede añadir
// discos, citas (refs) y una nota propia sobre una escena ya definida en otro.
window.LUMPEN = (function () {
  const genres = new Map();
  const chapters = [];

  const FAMILIES = {
    lumpen:    { name: 'Los Lumpen y la cultura del Partido', color: '#ef4444' },
    panteras:  { name: 'Black Panther Party: líderes, programas y represión', color: '#38bdf8' },
    poder:     { name: 'Black power, nacionalismo y otras organizaciones', color: '#a3e635' },
    derechos:  { name: 'Derechos civiles, gospel y canciones de libertad', color: '#facc15' },
    soul:      { name: 'Soul: Motown, Stax, Atlantic, Chicago', color: '#f472b6' },
    funk:      { name: 'James Brown, Sly y la revolución del ritmo', color: '#fb923c' },
    palabra:   { name: 'Black Arts, poesía, jazz libre y spoken word', color: '#c084fc' },
    protesta:  { name: 'La tradición de la canción protesta', color: '#2dd4bf' },
    legado:    { name: 'Legado: rap político y soul consciente', color: '#e5e7eb' },
    bahia:     { name: 'Oakland, Berkeley, San Francisco: la Bahía', color: '#94a3b8' },
  };

  const key = (t) => (t.a + '|' + t.t).toLowerCase();

  function mergeArr(a = [], b = [], k = (x) => (typeof x === 'string' ? x.toLowerCase() : JSON.stringify(x))) {
    const seen = new Set(a.map(k));
    const out = a.slice();
    for (const x of b) if (!seen.has(k(x))) { seen.add(k(x)); out.push(x); }
    return out;
  }

  // Anota en cada disco los capítulos que lo citan.
  function cite(tracks, t, ch) {
    const m = tracks.find((x) => key(x) === key(t));
    if (m && ch != null) m.chs = mergeArr(m.chs, [ch]);
  }

  function add(list, chapter) {
    for (const g of list) {
      let cur = genres.get(g.id);
      if (!cur) {
        cur = { id: g.id, aka: [], influences: [], artists: [], tracks: [], labels: [], refs: [], notes: [], chapters: [] };
        genres.set(g.id, cur);
      }
      for (const f of ['aka', 'influences', 'artists', 'labels']) cur[f] = mergeArr(cur[f], g[f]);
      cur.tracks = mergeArr(cur.tracks, (g.tracks || []).map((t) => ({ ...t })), key);
      for (const t of g.tracks || []) {
        if (t.ess) { const m = cur.tracks.find((x) => key(x) === key(t)); if (m) m.ess = 1; }
        cite(cur.tracks, t, chapter);
      }
      cur.refs = mergeArr(cur.refs, (g.refs || []).map((r) => ({ ch: chapter, ...r })), (r) => r.q);
      for (const f of ['name', 'family', 'start', 'end', 'place', 'desc']) if (g[f] != null && cur[f] == null) cur[f] = g[f];
      if (g.desc != null) cur.descCh = cur.descCh ?? chapter;
      if (g.note) cur.notes.push({ ch: chapter, text: g.note });
      if (chapter != null && !cur.chapters.includes(chapter)) cur.chapters.push(chapter);
    }
  }

  return {
    FAMILIES,
    chapters,
    genres,
    chapter(meta) { chapters.push(meta); },
    add,
  };
})();
