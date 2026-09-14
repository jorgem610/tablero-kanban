import { deleteTask, getTasks } from './api.js';
import { updateColumnCounts } from './render.js';

document.addEventListener('components:loaded', () => {

  const board = document.querySelector('.board');

  board.addEventListener('click', async (event) => {
    const deleteBtn = event.target.closest('.task-card-delete-btn');
    if (!deleteBtn) return;

    const card = event.target.closest('.task-card');
    const taskId = card.dataset.taskId;

    const confirmed = confirm('¿Seguro que quieres eliminar esta tarea?');
    if (!confirmed) return;

    const success = await deleteTask(taskId);

    if (success) {
      card.remove();

      const allTasks = await getTasks();
      updateColumnCounts(allTasks);
    }
  });

});