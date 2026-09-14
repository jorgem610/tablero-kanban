document.addEventListener('components:loaded', () => {
  console.log('SEARCH: evento recibido');

  const searchInput = document.getElementById('search-input');
  console.log('SEARCH: input encontrado?', searchInput);

  searchInput.addEventListener('input', () => {
    console.log('SEARCH: escribiendo...', searchInput.value);

    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.task-card');

    cards.forEach(card => {
      const title = card.querySelector('.task-card-title').textContent.toLowerCase();
      const matches = title.includes(query);

      card.hidden = !matches;
    });
  });

});