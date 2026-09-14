import { updateTask, getTasks } from './api.js';
import { updateColumnCounts } from './render.js';

document.addEventListener('components:loaded', () => {

  const board = document.querySelector('.board');

  board.addEventListener('click', async (event) => {

    const moveBtn = event.target.closest('.task-card-move-btn');
    if (moveBtn) {
      const menu = moveBtn.nextElementSibling;
      menu.hidden = !menu.hidden;
      return;
    }

    const option = event.target.closest('.task-card-move-option');
    if (option) {
      const card = event.target.closest('.task-card');
      const taskId = card.dataset.taskId;
      const newStatus = option.dataset.status;

      await updateTask(taskId, { status: newStatus });

      const targetList = document.getElementById(`list-${newStatus}`);
      targetList.appendChild(card);

      const menu = option.closest('.task-card-move-menu');
      menu.hidden = true;

      const allTasks = await getTasks();
      updateColumnCounts(allTasks);
      return;
    }

  });

});