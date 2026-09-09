import { updateTask, getTasks } from './api.js';
import { updateColumnCounts } from './render.js';

document.addEventListener('components:loaded', () => {
  console.log('DRAGDROP: evento recibido');

  const lists = document.querySelectorAll('.column-list');
  console.log('DRAGDROP: listas encontradas:', lists.length);

  lists.forEach(list => {
    new Sortable(list, {
      group: 'tasks',
      animation: 150,
      onEnd: async (event) => {
        const taskId = event.item.dataset.taskId;
        const newStatus = event.to.dataset.status;

        await updateTask(taskId, { status: newStatus });

        const allTasks = await getTasks();
        updateColumnCounts(allTasks);
      }
    });
  });

});