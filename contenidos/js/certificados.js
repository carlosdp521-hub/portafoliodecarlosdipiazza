const filterButtons = document.querySelectorAll('.filters button');
const badges = document.querySelectorAll('.badge-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    badges.forEach(badge => {
      badge.style.display =
        filter === 'all' || badge.dataset.type === filter
          ? 'block'
          : 'none';
    });
  });
});
// Mostrar todas las insignias al cargar la página
window.addEventListener('load', () => {
    filterButtons[0].click();