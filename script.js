

// ------------------------------------------------SLIDER HEADER 


// Инициализация текущего слайда
let currentSlide = 1;
// Функция для переключения на предыдущий слайд
function prevSlide() {
    if (currentSlide === 1) {
        currentSlide = 4; // Если это первый слайд, переходим к последнему
    } else {
        currentSlide--;
    }
    updateSlider();
}
// Функция для переключения на следующий слайд
function nextSlide() {
    if (currentSlide === 4) {
        currentSlide = 1; // Если это последний слайд, переходим к первому
    } else {
        currentSlide++;
    }
    updateSlider();
}
// Функция для перехода на определенный слайд
function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    updateSlider();
}
// Функция для обновления слайдера
function updateSlider() {
    // Скрываем все слайды
    const slides = document.querySelectorAll('.slider-item');
    slides.forEach(slide => {
        slide.classList.remove('slider-active'); // Убираем активный класс
    });

    // Показываем текущий слайд
    const currentSlideElement = document.querySelector(`.slider-${currentSlide}`);
    currentSlideElement.classList.add('slider-active'); // Добавляем активный класс

    // Обновляем пагинацию
    const paginationItems = document.querySelectorAll('.pagination span');
    paginationItems.forEach(item => {
        item.classList.remove('active');
    });
    paginationItems[currentSlide - 1].classList.add('active');
}
// Инициализация слайдера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
});

function updateSlider() {
    const slides = document.querySelectorAll('.slider-item');

    slides.forEach((slide, index) => {
        slide.classList.remove('slider-active', 'slider-prev', 'slider-next');

        if (index + 1 === currentSlide) {
            slide.classList.add('slider-active'); // Текущий слайд
        } else if (index + 1 === (currentSlide === 1 ? slides.length : currentSlide - 1)) {
            slide.classList.add('slider-prev'); // Предыдущий слайд
        } else if (index + 1 === (currentSlide === slides.length ? 1 : currentSlide + 1)) {
            slide.classList.add('slider-next'); // Следующий слайд
        }
    });

    // Обновление пагинации
    const paginationItems = document.querySelectorAll('.pagination span');
    paginationItems.forEach(item => item.classList.remove('active'));
    paginationItems[currentSlide - 1].classList.add('active');
}
let slideInterval = setInterval(nextSlide, 5000); // Слайды переключаются каждые 5 секунд
// Остановка автопрокрутки при взаимодействии с пользователем
document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});
document.querySelector('.slider').addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});


// -----------------------------------------burger

// Получаем элементы
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    const contacts = document.querySelector('.contact-info')

    burger.addEventListener('click', () => {
        burger.classList.toggle('active'); // Переключаем класс для бургера
        nav.classList.toggle('active'); // Переключаем класс для навигации
        contacts.classList.toggle('active');
    });
});




// -------------------------------------------------Title animation
// Проверка, находится ли элемент в зоне видимости
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Находим все секции
const sections = document.querySelectorAll('.section');

function handleScroll() {
    sections.forEach((section) => {
        if (isInViewport(section)) {
            section.classList.add('animate'); // Активация анимации
        } else {
            section.classList.remove('animate'); // Удаление класса при выходе из зоны видимости
        }
    });
}

// Обработка прокрутки
window.addEventListener('scroll', handleScroll);

// Первичная проверка при загрузке страницы
handleScroll();






// ------------------------------------------WE ARE (video button)

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".section__video video");
    const playButton = document.querySelector(".play-button");

    playButton.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playButton.classList.add("hidden");
        } else {
            video.pause();
            playButton.classList.remove("hidden");
        }
    });

    // Показываем кнопку при завершении видео
    video.addEventListener("ended", () => {
        playButton.classList.remove("hidden");
    });

    // Клик по самому видео для воспроизведения/остановки
    video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playButton.classList.add("hidden");
        } else {
            video.pause();
            playButton.classList.remove("hidden");
        }
    });
});

//-------------------------------------------SLIDER PROJECTS
$(document).ready(function () {
    $('#projects-slider').slick({
        infinite: true,        // Бесконечный цикл прокрутки
        slidesToShow: 3,       // Показывать 3 слайда одновременно
        slidesToScroll: 1,     // Прокручивать по 1 слайду за раз
        arrows: true,          // Показать стрелки
        prevArrow: '#prev-btn',// Связываем с вашими кастомными кнопками
        nextArrow: '#next-btn',
        responsive: [          // Адаптивность для разных разрешений
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // На экранах до 1024px показывать 2 слайда
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // На экранах до 768px показывать 1 слайд
                    slidesToScroll: 1
                }
            }
        ]
    });
});


//-------------------------------------------SLIDER REVIEWS 
$(document).ready(function () {
    $('.clients-slider').slick({
        slidesToShow: 1,       // Показывать 1 слайд
        slidesToScroll: 1,     // Прокручивать по 1 слайду
        dots: false,           // Убираем точки навигации
        arrows: true,          // Включаем стрелки навигации
        prevArrow: '#client-prev-btn',  // Кастомная кнопка "предыдущий"
        nextArrow: '#client-next-btn',  // Кастомная кнопка "следующий"
        autoplay: true,        // Включаем автопрокрутку
        autoplaySpeed: 3000,   // Интервал автопрокрутки (3 секунды)
        adaptiveHeight: true,  // Адаптивная высота слайдера в зависимости от контента
    });
});


// --------------------------------------------FACTS
function animatePercentage(id, targetValue, duration) {
    const percentageElement = document.querySelector(`#${id} .percentage`);
    const ringProgress = document.querySelector(`#${id} .ring-progress`);

    const circumference = 433; // Длина окружности круга с радиусом 69
    ringProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    ringProgress.style.strokeDashoffset = circumference;

    let currentValue = 0;
    const stepTime = duration / 100; // Время для одного шага
    const step = targetValue / 100; // Шаг увеличения для быстрого счета

    const interval = setInterval(() => {
        if (currentValue < targetValue) {
            currentValue += step;

            if (currentValue > targetValue) currentValue = targetValue;

            if (id === 'ring1' || id === 'ring4') {
                percentageElement.textContent = `${Math.floor(currentValue)}%`;
            } else if (id === 'ring3') {
                const number = Math.floor((9452 * currentValue) / 94.52);
                percentageElement.textContent = number;
            } else {
                percentageElement.textContent = `${Math.floor(currentValue)}`;
            }

            const offset = circumference - (currentValue / 100) * circumference;
            ringProgress.style.strokeDashoffset = offset;
        } else {
            clearInterval(interval);
        }
    }, stepTime);
}

function resetRing(id) {
    const percentageElement = document.querySelector(`#${id} .percentage`);
    const ringProgress = document.querySelector(`#${id} .ring-progress`);

    percentageElement.textContent = id === 'ring3' ? '0' : '0%';
    ringProgress.style.strokeDashoffset = 433; // Сбросить окружность
}

const factsSection = document.querySelector('#facts');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animatePercentage('ring1', 98, 1000);
                animatePercentage('ring2', 20, 600);
                animatePercentage('ring3', 94.52, 3000);
                animatePercentage('ring4', 100, 1000);
            } else {
                resetRing('ring1');
                resetRing('ring2');
                resetRing('ring3');
                resetRing('ring4');
            }
        });
    },
    { threshold: 0.5 } // Анимация запускается, когда секция наполовину видна
);

observer.observe(factsSection);






