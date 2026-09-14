import { getTasks, updateTask } from './api.js';

document.addEventListener('components:loaded', () => {

  const board = document.querySelector('.board');
  const overlay = document.getElementById('task-edit-overlay');
  const form = document.getElementById('task-edit-form');
  const closeBtn = document.getElementById('task-edit-close-btn');
  const cancelBtn = document.getElementById('edit-task-cancel-btn');

  const priorityButtons = document.querySelectorAll('#task-edit-form .priority-pill');
  const priorityInput = document.getElementById('edit-task-priority-input');

  function openEditModal(task) {
    document.getElementById('edit-task-id-input').value = task.id;
    document.getElementById('edit-task-title-input').value = task.title;
    document.getElementById('edit-task-description-input').value = task.description;
    document.getElementById('edit-task-duedate-input').value = task.dueDate;

    priorityInput.value = task.priority;
    priorityButtons.forEach(btn => {
      btn.classList.toggle('priority-active', btn.dataset.priority === task.priority);
    });

    overlay.hidden = false;
  }

  function closeEditModal() {
    overlay.hidden = true;
  }

  board.addEventListener('click', async (event) => {
    const editBtn = event.target.closest('.task-card-edit-btn');
    if (!editBtn) return;

    const card = event.target.closest('.task-card');
    const taskId = card.dataset.taskId;

    const allTasks = await getTasks();
    const task = allTasks.find(t => String(t.id) === taskId);

    if (task) {
      openEditModal(task);
    }
  });

  priorityButtons.forEach(button => {
    button.addEventListener('click', () => {
      priorityButtons.forEach(btn => btn.classList.remove('priority-active'));
      button.classList.add('priority-active');
      priorityInput.value = button.dataset.priority;
    });
  });

  closeBtn.addEventListener('click', closeEditModal);
  cancelBtn.addEventListener('click', closeEditModal);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const taskId = document.getElementById('edit-task-id-input').value;

    const updates = {
      title: document.getElementById('edit-task-title-input').value,
      description: document.getElementById('edit-task-description-input').value
    };

    const updatedTask = await updateTask(taskId, updates);

    if (updatedTask) {
      closeEditModal();
      location.reload();
    }
  });

});