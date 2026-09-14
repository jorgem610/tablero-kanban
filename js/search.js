document.addEventListener('components:loaded', () => {

  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.task-card');

    cards.forEach(card => {
      const title = card.querySelector('.task-card-title').textContent.toLowerCase();
      const matches = title.includes(query);

      card.hidden = !matches;
    });
  });

  // Para movil
  const searchIcon = document.querySelector('.app-header__search-icon');
  const headerSearch = document.getElementById('header-search');
  const closeBtn = document.getElementById('search-close-btn');
  

  headerSearch.addEventListener('click', () => {
    const isCloseBtn = event.target.closest('.search-close-btn');
    if (isCloseBtn) return;

    if (!headerSearch.classList.contains('search-active')) {
      headerSearch.classList.add('search-active');
      searchInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    console.log('Se hizo clic en cerrar búsqueda');
    headerSearch.classList.remove('search-active');
  });

});