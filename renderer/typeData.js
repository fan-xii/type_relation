const TYPE_DATA = [
  { id: 'normal',    name: '普通', color: '#A8A878', icon: 'icons/普通.png' },
  { id: 'grass',     name: '草',   color: '#78C850', icon: 'icons/草.png' },
  { id: 'fire',      name: '火',   color: '#F08030', icon: 'icons/火.png' },
  { id: 'water',     name: '水',   color: '#6890F0', icon: 'icons/水.png' },
  { id: 'psychic',   name: '光',   color: '#F85888', icon: 'icons/光.png' },
  { id: 'ground',    name: '地',   color: '#E0C068', icon: 'icons/地.png' },
  { id: 'ice',       name: '冰',   color: '#98D8D8', icon: 'icons/冰.png' },
  { id: 'dragon',    name: '龙',   color: '#7038F8', icon: 'icons/龙.png' },
  { id: 'electric',  name: '电',   color: '#F8D030', icon: 'icons/电.png' },
  { id: 'poison',    name: '毒',   color: '#A040A0', icon: 'icons/毒.png' },
  { id: 'bug',       name: '虫',   color: '#A8B820', icon: 'icons/虫.png' },
  { id: 'fighting',  name: '武',   color: '#C03028', icon: 'icons/武.png' },
  { id: 'flying',    name: '翼',   color: '#A890F0', icon: 'icons/翼.png' },
  { id: 'fairy',     name: '萌',   color: '#EE99AC', icon: 'icons/萌.png' },
  { id: 'ghost',     name: '幽',   color: '#705898', icon: 'icons/幽.png' },
  { id: 'dark',      name: '恶',   color: '#705848', icon: 'icons/恶.png' },
  { id: 'steel',     name: '机械', color: '#B8B8D0', icon: 'icons/机械.png' },
  { id: 'illusion',  name: '幻',   color: '#9D7BBA', icon: 'icons/幻.png' }
];

const TYPE_IDS = TYPE_DATA.map(t => t.id);

const TYPE_CHART = {};
TYPE_IDS.forEach(id => { TYPE_CHART[id] = {}; });

function setRelation(attacker, defender, multiplier) {
  TYPE_CHART[attacker][defender] = multiplier;
}

TYPE_IDS.forEach(a => TYPE_IDS.forEach(d => { setRelation(a, d, 1); }));

setRelation('normal', 'ground', 0.5);
setRelation('normal', 'ghost', 0.5);
setRelation('normal', 'steel', 0.5);
setRelation('grass', 'fire', 0.5);
setRelation('grass', 'water', 2);
setRelation('grass', 'psychic', 2);
setRelation('grass', 'ground', 2);
setRelation('grass', 'dragon', 0.5);
setRelation('grass', 'poison', 0.5);
setRelation('grass', 'bug', 0.5);
setRelation('grass', 'flying', 0.5);
setRelation('grass', 'steel', 0.5);
setRelation('fire', 'grass', 2);
setRelation('fire', 'water', 0.5);
setRelation('fire', 'ground', 0.5);
setRelation('fire', 'ice', 2);
setRelation('fire', 'dragon', 0.5);
setRelation('fire', 'bug', 2);
setRelation('fire', 'steel', 2);
setRelation('water', 'grass', 0.5);
setRelation('water', 'fire', 2);
setRelation('water', 'ground', 2);
setRelation('water', 'ice', 0.5);
setRelation('water', 'dragon', 0.5);
setRelation('water', 'steel', 2);
setRelation('psychic', 'grass', 0.5);
setRelation('psychic', 'ice', 0.5);
setRelation('psychic', 'ghost', 2);
setRelation('psychic', 'dark', 2);
setRelation('ground', 'grass', 0.5);
setRelation('ground', 'fire', 2);
setRelation('ground', 'ice', 2);
setRelation('ground', 'electric', 2);
setRelation('ground', 'poison', 2);
setRelation('ground', 'fighting', 0.5);
setRelation('ice', 'grass', 2);
setRelation('ice', 'fire', 0.5);
setRelation('ice', 'ground', 2);
setRelation('ice', 'ice', 0.5);
setRelation('ice', 'dragon', 2);
setRelation('ice', 'flying', 2);
setRelation('ice', 'steel', 0.5);
setRelation('dragon', 'dragon', 2);
setRelation('dragon', 'steel', 0.5);
setRelation('electric', 'grass', 0.5);
setRelation('electric', 'water', 2);
setRelation('electric', 'ground', 0.5);
setRelation('electric', 'dragon', 0.5);
setRelation('electric', 'electric', 0.5);
setRelation('electric', 'flying', 2);
setRelation('poison', 'grass', 2);
setRelation('poison', 'ground', 0.5);
setRelation('poison', 'poison', 0.5);
setRelation('poison', 'fairy', 2);
setRelation('poison', 'ghost', 0.5);
setRelation('poison', 'steel', 0.5);
setRelation('bug', 'grass', 2);
setRelation('bug', 'fire', 0.5);
setRelation('bug', 'poison', 0.5);
setRelation('bug', 'fighting', 0.5);
setRelation('bug', 'flying', 0.5);
setRelation('bug', 'fairy', 0.5);
setRelation('bug', 'ghost', 0.5);
setRelation('bug', 'dark', 2);
setRelation('bug', 'steel', 0.5);
setRelation('bug', 'illusion', 2);
setRelation('fighting', 'normal', 2);
setRelation('fighting', 'ground', 2);
setRelation('fighting', 'ice', 2);
setRelation('fighting', 'poison', 0.5);
setRelation('fighting', 'bug', 0.5);
setRelation('fighting', 'flying', 0.5);
setRelation('fighting', 'fairy', 0.5);
setRelation('fighting', 'ghost', 0.5);
setRelation('fighting', 'dark', 2);
setRelation('fighting', 'steel', 2);
setRelation('fighting', 'illusion', 0.5);
setRelation('flying', 'grass', 2);
setRelation('flying', 'ground', 0.5);
setRelation('flying', 'dragon', 0.5);
setRelation('flying', 'electric', 0.5);
setRelation('flying', 'bug', 2);
setRelation('flying', 'fighting', 2);
setRelation('flying', 'steel', 0.5);
setRelation('fairy', 'fire', 0.5);
setRelation('fairy', 'dragon', 2);
setRelation('fairy', 'poison', 0.5);
setRelation('fairy', 'fighting', 2);
setRelation('fairy', 'dark', 2);
setRelation('fairy', 'steel', 0.5);
setRelation('ghost', 'normal', 0.5);
setRelation('ghost', 'psychic', 2);
setRelation('ghost', 'ghost', 2);
setRelation('ghost', 'dark', 0.5);
setRelation('ghost', 'illusion', 2);
setRelation('dark', 'psychic', 0.5);
setRelation('dark', 'poison', 2);
setRelation('dark', 'fighting', 0.5);
setRelation('dark', 'fairy', 2);
setRelation('dark', 'ghost', 2);
setRelation('dark', 'dark', 0.5);
setRelation('steel', 'fire', 0.5);
setRelation('steel', 'water', 0.5);
setRelation('steel', 'ground', 2);
setRelation('steel', 'ice', 2);
setRelation('steel', 'electric', 0.5);
setRelation('steel', 'fairy', 2);
setRelation('steel', 'steel', 0.5);
setRelation('illusion', 'psychic', 0.5);
setRelation('illusion', 'poison', 2);
setRelation('illusion', 'fighting', 2);
setRelation('illusion', 'steel', 0.5);
setRelation('illusion', 'illusion', 0.5);

function getRelation(attackerId, defenderId) {
  if (!TYPE_CHART[attackerId] || TYPE_CHART[attackerId][defenderId] === undefined) {
    return 1;
  }
  return TYPE_CHART[attackerId][defenderId];
}

function getTypeById(id) {
  return TYPE_DATA.find(t => t.id === id) || null;
}

function getTypeByName(name) {
  return TYPE_DATA.find(t => t.name === name) || null;
}