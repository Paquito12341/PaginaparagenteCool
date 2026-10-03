const filterButtons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.activity-card');
const status = document.querySelector('#filter-status');

const labels = { all: 'todas las actividades', concert: 'los conciertos', workshop: 'los talleres' };

function updateFilter(filter) {
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  cards.forEach((card) => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });

  ['saturday', 'sunday'].forEach((day) => {
    const visible = document.querySelectorAll(`.activity-card[data-day="${day}"]:not([hidden])`).length;
    const count = document.querySelector(`[data-day-count="${day}"]`);
    const empty = document.querySelector(`[data-empty="${day}"]`);
    count.textContent = `${visible} ${visible === 1 ? 'actividad' : 'actividades'}`;
    empty.hidden = visible !== 0;
  });

  status.textContent = `Mostrando ${labels[filter]}`;
}

filterButtons.forEach((button) => button.addEventListener('click', () => updateFilter(button.dataset.filter)));

document.querySelectorAll('.details-button').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
    button.firstChild.textContent = expanded ? 'Ver detalles ' : 'Ocultar detalles ';
  });
});
