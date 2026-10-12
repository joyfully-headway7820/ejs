const bookButton = document.querySelector('[data-book]');
const timeButton = document.querySelector('[data-time]');
const timeOutput = document.querySelector('[data-time-output]');

if (bookButton)
  bookButton.addEventListener('click', () => {
    const booked = bookButton.dataset.state === 'booked';

    bookButton.dataset.state = booked ? 'idle' : 'booked';
    bookButton.textContent = booked
      ? 'Записаться на наблюдение'
      : 'Вы в списке на сегодня';
  });

if (timeButton && timeOutput)
  timeButton.addEventListener('click', () => {
    timeOutput.textContent = 'Запрашиваю время…';

    fetch('/api/time')
      .then((response) => {
        if (!response.ok)
          throw new Error('time');

        return response.json();
      })
      .then(({ time }) => {
        timeOutput.textContent = time;
      })
      .catch(() => {
        timeOutput.textContent = 'Не удалось получить время сервера';
      });
  });
