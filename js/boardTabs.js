document.addEventListener('components:loaded', () => {

  const tabs = document.querySelectorAll('.board-tab');
  const columns = document.querySelectorAll('.column');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const status = tab.dataset.status;

      tabs.forEach(t => t.classList.remove('board-tab-active'));
      tab.classList.add('board-tab-active');

      columns.forEach(column => {
        column.classList.toggle('column-active', column.dataset.status === status);
      });
    });
  });

});