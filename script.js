// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Навигация по сайту
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Функция для активации текущей секции в навигации
    function activateNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Плавная прокрутка при клике на навигационные ссылки
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Закрываем мобильное меню, если оно открыто
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');

        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Данные для списков книг с обложками
    const booksData = {
        current: [
            {
                title: "Мастер и Маргарита",
                author: "Михаил Булгаков",
                status: "current",
                cover: "https://cdn.litres.ru/pub/c/cover_415/67552434.webp"
            },
            {
                title: "Сто лет одиночества",
                author: "Габриэль Гарсиа Маркес",
                status: "current",
                cover: "https://cdn.litres.ru/pub/c/cover_415/12160248.webp"
            },
            {
                title: "Три товарища",
                author: "Эрих Мария Ремарк",
                status: "current",
                cover: "https://cdn.litres.ru/pub/c/cover_415/5957151.webp"
            }
        ],
        planned: [
            {
                title: "1984",
                author: "Джордж Оруэлл",
                status: "planned",
                cover: "https://cdn.litres.ru/pub/c/cover_415/63422937.webp"
            },
            {
                title: "Тень горы",
                author: "Грегори Дэвид Робертс",
                status: "planned",
                cover: "https://cdn.litres.ru/pub/c/cover_415/17043406.webp"
            },
            {
                title: "Маленькая жизнь",
                author: "Ханья Янагихара",
                status: "planned",
                cover: "https://cdn.litres.ru/pub/c/cover_415/22858571.webp"
            },
            {
                title: "Атлант расправил плечи",
                author: "Айн Рэнд",
                status: "planned",
                cover: "https://cdn.litres.ru/pub/c/cover_415/69502621.webp"
            }
        ],
        finished: [
            {
                title: "Преступление и наказание",
                author: "Федор Достоевский",
                status: "finished",
                cover: "https://cdn.litres.ru/pub/c/cover_415/70340302.webp"
            },
            {
                title: "Война и мир",
                author: "Лев Толстой",
                status: "finished",
                cover: "https://cdn.litres.ru/pub/c/cover_415/173653.webp"
            },
            {
                title: "Гордость и предубеждение",
                author: "Джейн Остин",
                status: "finished",
                cover: "https://cdn.litres.ru/pub/c/cover_415/173425.webp"
            },
            {
                title: "Убить пересмешника",
                author: "Харпер Ли",
                status: "finished",
                cover: "https://cdn.litres.ru/pub/c/cover_415/7279497.webp"
            },
            {
                title: "Великий Гэтсби",
                author: "Фрэнсис Скотт Фицджеральд",
                status: "finished",
                cover: "https://cdn.litres.ru/pub/c/cover_415/63690006.webp"
            }
        ]
    };

    // Функция для отображения книг
    function displayBooks(category) {
        const booksGrid = document.querySelector('.books-grid');
        booksGrid.innerHTML = '';

        booksData[category].forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';

            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${book.cover}" 
                         alt="${book.title} - ${book.author}" 
                         loading="lazy"
                         onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjUwIDMyMCIgZmlsbD0iIzhkNmU2MyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIzMjAiIGZpbGw9IiM4ZDZlNjMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk9idMO6bGthIGtuaWdpPC90ZXh0Pjwvc3ZnPg=='">
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <span class="book-status status-${book.status}">
                        ${book.status === 'current' ? 'Читаем сейчас' :
                    book.status === 'planned' ? 'Запланировано' : 'Прочитано'}
                    </span>
                </div>
            `;

            booksGrid.appendChild(bookCard);
        });
    }

    // Переключение вкладок книг
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Убираем активный класс у всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            // Получаем категорию из data-атрибута
            const category = this.getAttribute('data-category');

            // Отображаем книги выбранной категории
            displayBooks(category);
        });
    });

    // Инициализация отображения книг (по умолчанию "Текущее чтение")
    displayBooks('current');

    // Функция для загрузки дополнительных обсуждений
    const loadMoreBtn = document.getElementById('loadMoreDiscussions');

    loadMoreBtn.addEventListener('click', function () {
        // В реальном приложении здесь был бы запрос к серверу
        // Для демо просто показываем сообщение
        this.textContent = 'Больше обсуждений пока нет';
        this.disabled = true;
        this.style.opacity = '0.7';

        // Через 3 секунды возвращаем исходное состояние
        setTimeout(() => {
            this.textContent = 'Загрузить больше обсуждений';
            this.disabled = false;
            this.style.opacity = '1';
        }, 3000);
    });

    // Календарь встреч
    const currentMonthElement = document.getElementById('currentMonth');
    const calendarGrid = document.getElementById('calendarGrid');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Массив с названиями месяцев
    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    // Даты, в которые есть встречи (для демонстрации)
    const meetingDates = [
        new Date(currentYear, currentMonth, 15),
        new Date(currentYear, currentMonth, 28),
        new Date(currentYear, currentMonth + 1, 10)
    ];

    // Функция для генерации календаря
    function generateCalendar(year, month) {
        // Устанавливаем заголовок месяца
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;

        // Очищаем сетку календаря
        calendarGrid.innerHTML = '';

        // Добавляем заголовки дней недели
        const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Первый день месяца
        const firstDay = new Date(year, month, 1);
        // Последний день месяца
        const lastDay = new Date(year, month + 1, 0);
        // День недели первого дня месяца (0 - воскресенье, 1 - понедельник и т.д.)
        const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        // Количество дней в месяце
        const daysInMonth = lastDay.getDate();

        // Добавляем пустые ячейки для дней предыдущего месяца
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-date empty';
            calendarGrid.appendChild(emptyCell);
        }

        // Добавляем ячейки для дней текущего месяца
        const today = new Date();

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.textContent = day;

            // Проверяем, является ли этот день сегодняшним
            if (date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()) {
                dateElement.classList.add('active');
            }

            // Проверяем, есть ли встреча в этот день
            const hasMeeting = meetingDates.some(meetingDate =>
                meetingDate.getDate() === day &&
                meetingDate.getMonth() === month &&
                meetingDate.getFullYear() === year
            );

            if (hasMeeting) {
                dateElement.classList.add('has-meeting');
            }

            // Добавляем обработчик клика на дату
            dateElement.addEventListener('click', function () {
                // Убираем активный класс у всех дат
                document.querySelectorAll('.calendar-date').forEach(el => {
                    el.classList.remove('active');
                });

                // Добавляем активный класс выбранной дате
                this.classList.add('active');

                // В реальном приложении здесь можно показать детали встречи
                if (this.classList.contains('has-meeting')) {
                    alert(`На ${day} ${monthNames[month]} запланирована встреча книжного клуба!`);
                }
            });

            calendarGrid.appendChild(dateElement);
        }
    }

    // Инициализация календаря
    generateCalendar(currentYear, currentMonth);

    // Переключение месяцев
    prevMonthBtn.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });

    nextMonthBtn.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });

    // Активация навигации при прокрутке
    window.addEventListener('scroll', activateNavLink);

    // Инициализация при загрузке
    activateNavLink();

    // Добавляем обработку нажатия на обложки книг для демонстрации
    document.addEventListener('click', function (e) {
        if (e.target.closest('.book-cover img') || e.target.closest('.book-cover')) {
            const bookCard = e.target.closest('.book-card');
            if (bookCard) {
                const title = bookCard.querySelector('.book-title').textContent;
                const author = bookCard.querySelector('.book-author').textContent;
                alert(`Выбрана книга: "${title}"\nАвтор: ${author}`);
            }
        }
    });
});