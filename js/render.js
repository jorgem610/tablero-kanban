import { getTasks, getComments } from './api.js';

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
  const commentsCount = task.commentsCount || 0;
  const commentsCountEl = cardElement.querySelector('.task-card-comments-count');
  if (commentsCount > 0) {
    commentsCountEl.textContent = commentsCount;
    commentsCountEl.hidden = false;
  }
  return cardElement;
}

async function renderTasks() {
    const tasks = await getTasks();
    
    for (const task of tasks) {
      const comments = await getComments(task.id);
      task.commentsCount = comments.length;
    }
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

  const tabs = document.querySelectorAll('.board-tab');
  tabs.forEach(tab => {
    const status = tab.dataset.status;
    const countEl = tab.querySelector('.board-tab-count');
    countEl.textContent = counts[status];
  });
}

document.addEventListener('components:loaded', () => {
  renderTasks();
});