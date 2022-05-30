const preventSubmit = (() => {
  const submitButtons = document.querySelectorAll('button[type="submit"]');

  if (!submitButtons) return;

  submitButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
})();

