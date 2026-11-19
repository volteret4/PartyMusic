LUMPEN.chapter({ n: 11, title: 'Discography', label: 'Discografía' });
// ★ = los discos de la discografía del libro (pp. 359-361), con el artista y el título de los capítulos para que se fusionen.
LUMPEN.add([
  { id: 'lumpen', note: 'La discografía del libro cierra con el sencillo de 1970 (Black Panther Party Productions) y la grabación en directo del Merritt College, fechada el 10 de noviembre de 1970, que se conserva en la colección Huey P. Newton de la Universidad de Stanford.',
    labels: ['Black Panther Party Productions', 'Huey P. Newton Collection (Stanford)'],
    tracks: [
      { a: 'The Lumpen', t: 'Free Bobby Now', y: 1970, ess: 1 },
      { a: 'The Lumpen', t: 'No More', y: 1970, ess: 1 },
      { a: 'The Lumpen', t: 'Live at Merritt College', y: 1970, ess: 1 },
    ],
    refs: [
      { q: 'The Lumpen. “Live,” recording from Merrit College, Oakland, CA. Taped November 10, 1970; from Huey P. Newton collection, Stanford University, Palo Alto, CA.' },
    ] },
  { id: 'james-brown', tracks: [
    { a: 'James Brown', t: 'Sex Machine', y: 1970, ess: 1 },
    { a: 'James Brown', t: 'Revolution of the Mind: Live at the Apollo, Volume III', y: 1971, ess: 1 },
    { a: 'James Brown', t: 'CD of JB II', y: 1987, ess: 1 },
    { a: 'James Brown', t: 'Star Time', y: 1991, ess: 1 },
  ] },
  { id: 'elaine-brown-discos', tracks: [
    { a: 'Elaine Brown', t: 'Seize the Time', y: 1969, ess: 1 },
    { a: 'Elaine Brown', t: 'Elaine Brown', y: 1973, ess: 1 },
  ] },
  { id: 'chicago-soul', tracks: [
    { a: 'The Chi-Lites', t: '(For God’s Sake) Give More Power to the People', y: 1971, ess: 1 },
  ] },
  { id: 'sam-cooke', tracks: [
    { a: 'Sam Cooke', t: 'The Wonderful World of Sam Cooke', y: 1987, ess: 1 },
  ] },
  { id: 'dylan', tracks: [
    { a: 'Bob Dylan', t: 'Masterpieces', y: 1978, ess: 1 },
  ] },
  { id: 'aretha', tracks: [
    { a: 'Aretha Franklin', t: 'Soul Sister', y: 1966, ess: 1 },
    { a: 'Aretha Franklin', t: '30 Greatest Hits', y: 1985, ess: 1 },
  ] },
  { id: 'protesta-hoy', note: 'La discografía añade Never Forget: A Journey of Revelations (2007), el disco de spoken word y hip-hop de Cornel West.',
    artists: ['Cornel West'],
    tracks: [
      { a: 'Michael Franti & Spearhead', t: 'Yell Fire!', y: 2006, ess: 1 },
      { a: 'Goapele', t: 'Change It All', y: 2005, ess: 1 },
      { a: 'Cornel West', t: 'Never Forget: A Journey of Revelations', y: 2007, ess: 1 },
    ] },
  { id: 'marvin-gaye', tracks: [
    { a: 'Marvin Gaye', t: 'The Very Best of Marvin Gaye', y: 1994, ess: 1 },
  ] },
  { id: 'last-poets', tracks: [
    { a: 'The Last Poets', t: 'The Last Poets', y: 1970, ess: 1 },
    { a: 'The Last Poets', t: 'Right On!', y: 1971, ess: 1 },
  ] },
  { id: 'rock-panteras', tracks: [
    { a: 'John Lennon', t: 'John Lennon/Plastic Ono Band', y: 1970, ess: 1 },
    { a: 'John Lennon & Yoko Ono', t: 'Some Time in New York City', y: 1972, ess: 1 },
  ] },
  { id: 'curtis-mayfield', tracks: [
    { a: 'Curtis Mayfield', t: 'People Get Ready: The Curtis Mayfield Story', y: 1996, ess: 1 },
  ] },
  { id: 'soul-progresivo', tracks: [
    { a: 'Eugene McDaniels', t: 'Headless Heroes of the Apocalypse', y: 1971, ess: 1 },
  ] },
  { id: 'robeson', tracks: [
    { a: 'Paul Robeson', t: 'Ballad for Americans and Great Songs of Faith, Love and Patriotism', y: 1989, ess: 1 },
    { a: 'Paul Robeson', t: 'The Peace Arch Concerts', y: 1998, ess: 1 },
  ] },
  { id: 'gil-scott-heron', tracks: [
    { a: 'Gil Scott-Heron', t: 'Small Talk at 125th and Lenox', y: 1970, ess: 1 },
    { a: 'Gil Scott-Heron', t: 'The Revolution Will Not Be Televised', y: 1974, ess: 1 },
  ] },
  { id: 'nina-simone', tracks: [
    { a: 'Nina Simone', t: 'Anthology', y: 2003, ess: 1 },
  ] },
  { id: 'sly', tracks: [
    { a: 'Sly and the Family Stone', t: 'The Essential Sly & the Family Stone', y: 2002, ess: 1 },
  ] },
  { id: 'temptations', tracks: [
    { a: 'The Temptations', t: 'The Temptations in a Mellow Mood', y: 1967, ess: 1 },
    { a: 'The Temptations', t: 'My Girl: The Very Best of the Temptations', y: 2002, ess: 1 },
  ] },
  { id: 'motown', tracks: [
    { a: 'Various Artists', t: 'Motown Classics Gold', y: 2005, ess: 1 },
  ] },
  { id: 'watts-prophets', name: 'The Watts Prophets', family: 'palabra', start: 1967, end: 1971, place: 'Los Ángeles (Watts)',
    desc: 'El libro solo los cita en la discografía: Things Gonna Get Greater recoge las grabaciones de 1969-1971 de este trío de poetas de Watts (Richard Dedeaux, Amde Hamilton y Otis O’Solomon), surgido del Watts Writers Workshop tras los disturbios de 1965 y, como los Last Poets en Harlem, precursor del rap político.',
    artists: ['Richard Dedeaux', 'Amde Hamilton', 'Otis O’Solomon'],
    labels: ['Watts Writers Workshop'],
    tracks: [
      { a: 'The Watts Prophets', t: 'Things Gonna Get Greater: The Watts Prophets 1969–1971', y: 2005, ess: 1 },
    ],
    influences: ['black-arts', 'last-poets'],
    refs: [
      { q: 'Watts Prophets. Things Gonna Get Greater: The Watts Prophets 1969–1971, CD Water 157 (2005).' },
    ] },
], 11);
