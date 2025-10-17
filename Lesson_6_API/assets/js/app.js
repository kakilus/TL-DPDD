
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('pokemonGrid');
  const detail = document.getElementById('pokemonDetail');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (grid) {
    let offset = 0;
    const limit = 12;

    async function fetchList() {
      grid.innerHTML = 'Loading...';
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const data = await res.json();
      renderList(data.results);
      prevBtn.disabled = offset === 0;
    }

    function renderList(list) {
      grid.innerHTML = '';
      list.forEach(p => {
        const id = p.url.replace(/\/+$/, '').split('/').pop();
        
        const sprite = (p.name === 'lickitung')
          ? 'assets/img/pokemon-pokemon.gif'
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        const card = document.createElement('a');
        card.className = 'viewBox';
        card.href = `pokemon.php?name=${encodeURIComponent(p.name)}`;
        card.innerHTML = `
          <div class="card-inner">
            <img class="card-sprite" src="${sprite}" alt="${p.name} sprite" loading="lazy" />
            <div class="card-title">${p.name}</div>
          </div>
        `;

        const img = card.querySelector('img');
        img.addEventListener('error', () => { img.style.display = 'none'; });

        grid.appendChild(card);
      });
    }

    prevBtn?.addEventListener('click', () => { offset = Math.max(0, offset - limit); fetchList(); });
    nextBtn?.addEventListener('click', () => { offset = offset + limit; fetchList(); });

    fetchList();
  }

  if (detail) {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    if (!name) { detail.textContent = 'No Pokémon specified.'; return; }

    async function fetchPokemon(n) {
      detail.innerHTML = 'Loading…';
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(n)}`);
        if (!res.ok) throw new Error('Not found');
        const p = await res.json();
        renderPokemon(p);
      } catch (e) {
        detail.textContent = 'Pokémon not found.';
      }
    }

    function renderPokemon(p) {
      
      const imageSrc = (p.name === 'lickitung') ? 'assets/img/pokemon-pokemon.gif' : (p.sprites.front_default || '');
      detail.innerHTML = `
        <div class="detail-card">
          <h2>${p.name}</h2>
          <img src="${imageSrc}" alt="${p.name}">
          <p>Height: ${p.height} | Weight: ${p.weight}</p>
          <p>Types: ${p.types.map(t => t.type.name).join(', ')}</p>
          <p>Abilities: ${p.abilities.map(a => a.ability.name).join(', ')}</p>
          <p><a href="list.php" class="btn">Back to list</a></p>
        </div>
      `;
    }

    fetchPokemon(name);
  }
});
