// Utility: fetch with timeout
async function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// Evolution renderer
async function fetchAndRenderEvolution(pokemonName, currentName) {
  const evoBox = document.getElementById('evolutionBox');
  if (!evoBox) return;
  evoBox.innerHTML = 'Loading evolution...';

  try {
    const pokeRes = await fetchWithTimeout(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName.toLowerCase())}`);
    if (!pokeRes.ok) throw new Error('Pokémon fetch failed: ' + pokeRes.status);
    const pokeData = await pokeRes.json();

    const speciesUrl = pokeData.species?.url;
    if (!speciesUrl) throw new Error('Species URL not found');
    const speciesRes = await fetchWithTimeout(speciesUrl);
    if (!speciesRes.ok) throw new Error('Species fetch failed: ' + speciesRes.status);
    const speciesData = await speciesRes.json();

    const evoChainUrl = speciesData.evolution_chain?.url;
    if (!evoChainUrl) {
      evoBox.innerHTML = '<p>No evolution data available.</p>';
      return;
    }

    const evoRes = await fetchWithTimeout(evoChainUrl);
    if (!evoRes.ok) throw new Error('Evolution chain fetch failed: ' + evoRes.status);
    const evoData = await evoRes.json();

    const paths = [];
    (function traverse(node, path) {
      path.push(node.species.name);
      if (!node.evolves_to || node.evolves_to.length === 0) {
        paths.push([...path]);
      } else {
        node.evolves_to.forEach(child => traverse(child, path));
      }
      path.pop();
    })(evoData.chain, []);

    if (!paths.length) {
      evoBox.innerHTML = '<p>No evolution paths found.</p>';
      return;
    }

    const uniq = [...new Set(paths.flat())];
    const spriteFetches = uniq.map(async (name) => {
      const lower = name.toLowerCase();

      // Special local gifs
      if (lower === 'lickitung') return { name, src: 'assets/img/pokemon-pokemon.gif' };
      if (lower === 'arceus') return { name, src: 'assets/img/ali-your-a-nice-guy.gif' };
      if (lower === 'pikachu') return { name, src: 'assets/img/pika.gif' };
      if (lower === 'snorlax') return { name, src: 'assets/img/snorlax.gif' };
      if (lower === 'landorus') return { name, src: 'assets/img/landorus.gif' };

      try {
        const res = await fetchWithTimeout(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(lower)}`);
        if (!res.ok) return { name, src: '' };
        const data = await res.json();
        return { name, src: data.sprites?.front_default || '' };
      } catch {
        return { name, src: '' };
      }
    });

    const settled = await Promise.allSettled(spriteFetches);
    const spriteMap = {};
    settled.forEach(r => {
      if (r.status === 'fulfilled') spriteMap[r.value.name] = r.value.src;
    });

    const currentLower = (currentName || '').toLowerCase();
    const html = paths.map(path => {
      const nodes = path.map(name => {
        const isCurrent = name.toLowerCase() === currentLower;
        const sprite = spriteMap[name] || '';
        return `
          <a class="evo-node${isCurrent ? ' current' : ''}" href="pokemon.php?name=${encodeURIComponent(name)}">
            <div>
              <img src="${sprite}" alt="${name}" />
              <div>${name}</div>
            </div>
          </a>
        `;
      }).join(`<div class="arrow">→</div>`);
      return `<div class="evo-path">${nodes}</div>`;
    }).join('');

    evoBox.innerHTML = `<h3>Evolution</h3>${html}`;

  } catch (err) {
    console.error('fetchAndRenderEvolution error:', err);
    evoBox.innerHTML = '<p>Failed to load evolution data.</p>';
  }
}

// Pokémon detail renderer
async function fetchPokemonDetail(pokemonName) {
  const detailBox = document.getElementById('pokemonDetail');
  if (!detailBox) return;
  detailBox.innerHTML = 'Loading Pokémon details...';

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName.toLowerCase())}`);
    if (!res.ok) throw new Error('Failed to fetch Pokémon');
    const data = await res.json();

    const lower = data.name.toLowerCase();
    let sprite = data.sprites?.front_default || '';

    // Override sprite for special cases
    if (lower === 'lickitung') sprite = 'assets/img/pokemon-pokemon.gif';
    if (lower === 'arceus') sprite = 'assets/img/ali-your-a-nice-guy.gif';
    if (lower === 'pikachu') sprite = 'assets/img/pika.gif';
    if (lower === 'snorlax') sprite = 'assets/img/snorlax.gif';
    if (lower === 'landorus') sprite = 'assets/img/landorus.gif';

    const html = `
      <div class="detail-card">
        <img src="${sprite}" alt="${data.name}" />
        <h2 style="text-transform:capitalize">${data.name}</h2>
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
      </div>
    `;
    detailBox.innerHTML = html;
  } catch (err) {
    console.error('fetchPokemonDetail error:', err);
    detailBox.innerHTML = '<p>Failed to load Pokémon details.</p>';
  }
}

// Pokémon list renderer
let offset = 0;
const limit = 20;

async function fetchPokemonList() {
  const grid = document.getElementById('pokemonGrid');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!grid) return;

  grid.innerHTML = 'Loading...';
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();

    const items = await Promise.all(data.results.map(async (item) => {
      const res = await fetch(item.url);
      const poke = await res.json();
      return `
        <a class="viewBox" href="pokemon.php?name=${poke.name}">
          <div class="card-inner">
            <img class="card-sprite" src="${poke.sprites?.front_default || ''}" alt="${poke.name}" />
            <div class="card-title">${poke.name}</div>
          </div>
        </a>
      `;
    }));

    grid.innerHTML = items.join('');
    prevBtn.disabled = offset === 0;
    nextBtn.disabled = !data.next;
  } catch (err) {
    console.error('fetchPokemonList error:', err);
    grid.innerHTML = '<p>Failed to load Pokémon list.</p>';
  }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');

  // Detail page
  if (document.getElementById('pokemonDetail')) {
    if (name) {
      fetchPokemonDetail(name);
      fetchAndRenderEvolution(name, name);
    }
  }

  // List page
  if (document.getElementById('pokemonGrid')) {
    fetchPokemonList();

    document.getElementById('prevBtn')?.addEventListener('click', () => {
      offset = Math.max(0, offset - limit);
      fetchPokemonList();
    });

    document.getElementById('nextBtn')?.addEventListener('click', () => {
      offset += limit;
      fetchPokemonList();
    });
  }
});
