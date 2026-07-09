const content = window.ARCHIE_SITE_CONTENT || {};

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

function renderLessons() {
  const target = document.getElementById('lessonCards');
  if (!target || !content.lessons) return;

  target.innerHTML = content.lessons.map((lesson) => `
    <article class="lesson-card reveal" data-icon="${lesson.icon}">
      <span class="pill">${lesson.tag}</span>
      <h3>${lesson.title}</h3>
      <p>${lesson.description}</p>
      <a class="card-link" href="#interact">${lesson.linkLabel} →</a>
    </article>
  `).join('');
}

function renderUpdates() {
  const target = document.getElementById('updatesGrid');
  if (!target || !content.updates) return;

  target.innerHTML = content.updates.map((update) => `
    <article class="update-card reveal">
      <span class="pill">${update.date}</span>
      <h3>${update.title}</h3>
      <p>${update.text}</p>
    </article>
  `).join('');
}

function setupLabButtons() {
  const buttons = document.querySelectorAll('[data-lab]');
  const display = document.getElementById('labDisplay');
  if (!display || !buttons.length) return;

  buttons.forEach((button, index) => {
    if (index === 0) button.classList.add('active');
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const lab = content.labs?.[button.dataset.lab];
      if (!lab) return;
      display.innerHTML = `<h3>${lab.title}</h3><p>${lab.body}</p>`;
    });
  });
}

const questionStorageKey = 'archie-kuya-questions';

function getQuestions() {
  const saved = JSON.parse(localStorage.getItem(questionStorageKey) || '[]');
  return saved.length ? saved : (content.starterQuestions || []);
}

function saveQuestions(questions) {
  localStorage.setItem(questionStorageKey, JSON.stringify(questions));
}

function renderQuestions() {
  const list = document.getElementById('questionList');
  if (!list) return;
  const questions = getQuestions();
  list.innerHTML = questions.map((item) => `
    <article class="question-item">
      <strong>${escapeHtml(item.name)}</strong>
      <p>${escapeHtml(item.question)}</p>
    </article>
  `).join('');
}

function setupQuestionForm() {
  const form = document.getElementById('questionForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('visitorName');
    const questionInput = document.getElementById('visitorQuestion');
    const name = nameInput.value.trim();
    const question = questionInput.value.trim();
    if (!name || !question) return;

    const questions = getQuestions();
    questions.unshift({ name, question });
    saveQuestions(questions.slice(0, 12));
    renderQuestions();
    form.reset();
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function setupRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((item) => observer.observe(item));
}

function animateStats() {
  const stats = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count || 0);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 34));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = current;
      }, 28);
      observer.unobserve(element);
    });
  }, { threshold: 0.6 });
  stats.forEach((stat) => observer.observe(stat));
}

document.getElementById('year').textContent = new Date().getFullYear();
renderLessons();
renderUpdates();
setupLabButtons();
renderQuestions();
setupQuestionForm();
setupRevealAnimations();
animateStats();
