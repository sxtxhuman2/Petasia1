const cardsEl = document.querySelector('#cards');
const template = document.querySelector('#cardTemplate');
const marketFilter = document.querySelector('#marketFilter');
const tierFilter = document.querySelector('#tierFilter');
const categoryFilter = document.querySelector('#categoryFilter');
const searchInput = document.querySelector('#searchInput');
const meta = document.querySelector('#meta');

const stateKey = 'petasia-v1';
let items = [];
let userState = JSON.parse(localStorage.getItem(stateKey) || '{}');

const categorySet = new Set();

fetch('./data/vendors.json')
  .then(r => r.json())
  .then(data => {
    items = data;
    items.forEach(i => categorySet.add(i.category));
    [...categorySet].sort().forEach(c => {
      const op = document.createElement('option');
      op.value = c;
      op.textContent = c;
      categoryFilter.appendChild(op);
    });
    render();
  });

[marketFilter, tierFilter, categoryFilter, searchInput].forEach(el => el.addEventListener('input', render));

function render() {
  const market = marketFilter.value;
  const tier = tierFilter.value;
  const cat = categoryFilter.value;
  const q = searchInput.value.trim().toLowerCase();

  const filtered = items.filter(i => {
    const okMarket = market === 'all' || i.marketFocus === market;
    const okTier = tier === 'all' || i.tier === tier;
    const okCat = cat === 'all' || i.category === cat;
    const okQ = !q || `${i.vendor} ${i.product}`.toLowerCase().includes(q);
    return okMarket && okTier && okCat && okQ;
  });

  meta.textContent = `총 ${items.length}개 중 ${filtered.length}개 표시 | 선택 ${Object.values(userState).filter(v => v?.pick).length}개`;
  cardsEl.innerHTML = '';

  filtered.forEach(item => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector('.vendor').textContent = item.vendor;
    node.querySelector('.tier').textContent = tierLabel(item.tier);
    node.querySelector('.product').textContent = item.product;
    node.querySelector('.tags').textContent = `카테고리: ${item.category}`;
    node.querySelector('.platform').textContent = `플랫폼: ${item.platform}`;
    node.querySelector('.market').textContent = `시장: ${item.marketFocus}`;

    const scoreEl = node.querySelector('.score');
    const pickEl = node.querySelector('.pick');
    const saved = userState[item.id] || {};
    if (saved.score) scoreEl.value = saved.score;
    if (saved.pick) pickEl.checked = true;

    scoreEl.addEventListener('change', () => save(item.id, { ...userState[item.id], score: Number(scoreEl.value || 0) }));
    pickEl.addEventListener('change', () => {
      save(item.id, { ...userState[item.id], pick: pickEl.checked });
      render();
    });

    cardsEl.appendChild(node);
  });
}

function tierLabel(t) {
  return t === 'Premium' ? '프리미엄' : t === 'Mid' ? '중가' : '저가';
}

function save(id, value) {
  userState[id] = value;
  localStorage.setItem(stateKey, JSON.stringify(userState));
}
