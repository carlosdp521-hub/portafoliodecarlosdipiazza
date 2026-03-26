async function loadGitHubProfile() {
  const mount = document.getElementById('githubProjects');
  const stats = document.getElementById('githubStats');
  const data = window.siteData?.github;
  if (!mount || !stats || !data) return;

  const username = data.username;
  const placeholder = !username || username === 'TU_USUARIO_GITHUB';

  function renderRepos(repos, isFallback = false) {
    mount.innerHTML = repos.map((repo) => `
      <article class="repo-card" data-reveal>
        <div class="repo-head">
          <span class="repo-badge">${isFallback ? 'Demo' : 'GitHub'}</span>
          <h3>${repo.name}</h3>
        </div>
        <p>${repo.description || 'Repositorio sin descripción pública.'}</p>
        <div class="repo-meta">
          <span>${repo.language || 'Sin lenguaje'}</span>
          <span>★ ${repo.stars ?? repo.stargazers_count ?? 0}</span>
          <span>⑂ ${repo.forks ?? repo.forks_count ?? 0}</span>
        </div>
        <a class="repo-link" ${repo.url && repo.url !== '#' ? `href="${repo.url}" target="_blank" rel="noopener"` : 'href="#"'}>${isFallback ? 'Listo para enlazar' : 'Abrir repositorio'}</a>
      </article>`).join('');
  }

  function renderStats(summary) {
    stats.innerHTML = `
      <article class="stat-card"><strong>${summary.repos}</strong><span>Repositorios</span></article>
      <article class="stat-card"><strong>${summary.stars}</strong><span>Stars totales</span></article>
      <article class="stat-card"><strong>${summary.forks}</strong><span>Forks totales</span></article>
      <article class="stat-card"><strong>${summary.languages}</strong><span>Lenguajes usados</span></article>
    `;
  }

  if (placeholder) {
    renderStats({ repos: data.fallback.length, stars: 0, forks: 0, languages: 3 });
    renderRepos(data.fallback, true);
    const note = document.getElementById('githubNote');
    if (note) note.textContent = 'Conexión preparada. Solo cambia TU_USUARIO_GITHUB en data/site-data.js para cargar tus repositorios reales.';
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('No fue posible obtener los repositorios.');
    const repos = await response.json();
    const featured = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url
      }));

    const summary = {
      repos: repos.filter((repo) => !repo.fork).length,
      stars: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
      forks: repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0),
      languages: new Set(repos.map((repo) => repo.language).filter(Boolean)).size
    };

    renderStats(summary);
    renderRepos(featured.length ? featured : data.fallback, !featured.length);
  } catch (error) {
    renderStats({ repos: data.fallback.length, stars: 0, forks: 0, languages: 3 });
    renderRepos(data.fallback, true);
    const note = document.getElementById('githubNote');
    if (note) note.textContent = 'No se pudo cargar GitHub en este momento. Se muestran proyectos de respaldo locales.';
  }
}

document.addEventListener('DOMContentLoaded', loadGitHubProfile);
