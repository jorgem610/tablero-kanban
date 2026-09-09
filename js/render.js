import { getTasks } from './api.js';

export function createTaskCard(task) {
  const template = document.getElementById('task-card-template');
  const card = template.content.cloneNode(true);

  const cardElement = card.querySelector('.task-card');

  cardElement.querySelector('.task-card-title').textContent = task.title;
  cardElement.querySelector('.task-card-description').textContent = task.description;
  cardElement.querySelector('.task-card-priority-badge').textContent = task.priority;
  cardElement.querySelector('.task-card-due').textContent = task.dueDate;

  const priorityBar = cardElement.querySelector('.task-card-priority');
  priorityBar.classList.add(`task-card-priority-${task.priority.toLowerCase()}`);
  cardElement.dataset.taskId = task.id;
  return cardElement;
}

async function renderTasks() {
    const tasks = await getTasks();
    
    const lists = {
        todo: document.getElementById('list-todo'),
        doing: document.getElementById('list-doing'),
        done: document.getElementById('list-done')
    };

    tasks.forEach(task => {
        const card = createTaskCard(task);
        const targetList = lists[task.status];
        targetList.appendChild(card);
    })

    updateColumnCounts(tasks);
}

export function updateColumnCounts(tasks) {
  const counts = { todo: 0, doing: 0, done: 0 };

  tasks.forEach(task => {
    counts[task.status]++;
  });

  document.getElementById('count-todo').textContent = counts.todo;
  document.getElementById('count-doing').textContent = counts.doing;
  document.getElementById('count-done').textContent = counts.done;
}

document.addEventListener('components:loaded', () => {
  renderTasks();
});