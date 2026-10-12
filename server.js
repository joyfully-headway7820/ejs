const express = require('express');
const path = require('path');

const PORT = 3000;

const programs = [
  {
    title: 'Ночные наблюдения',
    text: 'Открытая площадка и три телескопа. Сеанс около часа, группа до двенадцати человек.',
  },
  {
    title: 'Дневные экскурсии',
    text: 'Разбор купола и солнечного телескопа. Формат подходит для школьных групп.',
  },
  {
    title: 'Астрофотография',
    text: 'Короткая практика: наведение, выдержка и разбор кадра прямо на площадке.',
  },
  {
    title: 'Лекторий',
    text: 'Открытая лекция раз в месяц. Тему объявляем за неделю на главной странице.',
  },
];

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
    page: 'home',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'О нас',
    page: 'about',
    programs,
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Контакты',
    page: 'contact',
    success: req.query.success === '1',
  });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log('Сообщение с формы:', { name, email, message });
  res.redirect('/contact?success=1');
});

app.get('/api/time', (req, res) => {
  const time = new Date().toLocaleString('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'medium',
  });

  res.json({ time });
});

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Страница не найдена',
    page: 'missing',
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
