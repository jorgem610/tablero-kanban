import { createTask, getTasks } from './api.js';
import { createTaskCard, updateColumnCounts } from './render.js';

document.addEventListener('components:loaded', () => {

  const overlay = document.getElementById('new-task-overlay');
  const openBtn = document.getElementById('new-task-btn');
  const closeBtn = document.getElementById('new-task-close-btn');
  const cancelBtn = document.getElementById('new-task-cancel-btn');

  function openModal() {
    overlay.hidden = false;
  }

  function closeModal() {
    overlay.hidden = true;
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  const priorityButtons = document.querySelectorAll('#new-task-form .priority-pill');
  const priorityInput = document.getElementById('new-task-priority-input');

  priorityButtons.forEach(button => {
    button.addEventListener('click', () => {
      priorityButtons.forEach(btn => btn.classList.remove('priority-active'));
      button.classList.add('priority-active');
      priorityInput.value = button.dataset.priority;
    });
  });

  const newTaskForm = document.getElementById('new-task-form');

  newTaskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newTask = {
      title: document.getElementById('new-task-title-input').value,
      description: document.getElementById('new-task-description-input').value,
      priority: priorityInput.value,
      dueDate: document.getElementById('new-task-duedate-input').value,
      status: 'todo'
    };

    const createdTask = await createTask(newTask);

    if (createdTask) {
      const card = createTaskCard(createdTask);
      document.getElementById('list-todo').appendChild(card);

      const allTasks = await getTasks();
      updateColumnCounts(allTasks);
      
      newTaskForm.reset();
      closeModal();
    }
  });

});