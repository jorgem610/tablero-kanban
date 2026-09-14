import { getComments, createComment } from './api.js';

document.addEventListener('components:loaded', () => {

  const board = document.querySelector('.board');
  const overlay = document.getElementById('task-comments-overlay');
  const closeBtn = document.getElementById('task-comments-close-btn');
  const commentsList = document.getElementById('comments-list');
  const commentsEmpty = document.getElementById('comments-empty');
  const taskIdInput = document.getElementById('comments-task-id-input');
  const commentForm = document.getElementById('comment-form');

  function createCommentItem(comment) {
    const template = document.getElementById('comment-template');
    const item = template.content.cloneNode(true);

    const li = item.querySelector('.comment');
    li.querySelector('.comment-author').textContent = comment.author;
    li.querySelector('.comment-date').textContent = comment.createdAt;
    li.querySelector('.comment-text').textContent = comment.text;

    return li;
  }

  async function loadComments(taskId) {
    commentsList.innerHTML = '';

    const comments = await getComments(taskId);

    if (comments.length === 0) {
      commentsEmpty.hidden = false;
    } else {
      commentsEmpty.hidden = true;
      comments.forEach(comment => {
        const item = createCommentItem(comment);
        commentsList.appendChild(item);
      });
    }
  }

  function closeCommentsModal() {
    overlay.hidden = true;
  }

  board.addEventListener('click', async (event) => {
    const commentsBtn = event.target.closest('.task-card-comments-btn');
    if (!commentsBtn) return;

    const card = event.target.closest('.task-card');
    const taskId = card.dataset.taskId;

    taskIdInput.value = taskId;
    await loadComments(taskId);
    overlay.hidden = false;
  });

  closeBtn.addEventListener('click', closeCommentsModal);

  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const commentInput = document.getElementById('comment-input');
    const taskId = taskIdInput.value;

    const newComment = {
        taskId: taskId,
        author: 'Jorge',
        text: commentInput.value,
        createdAt: new Date().toISOString()
    };

    const createdComment = await createComment(newComment);

    if (createdComment) {
        const item = createCommentItem(createdComment);
        commentsList.appendChild(item);
        commentsEmpty.hidden = true;
        commentForm.reset();

        const card = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
        const countEl = card.querySelector('.task-card-comments-count');
        const currentCount = commentsList.children.length;
        countEl.textContent = currentCount;
        countEl.hidden = false;
    }
  });

});