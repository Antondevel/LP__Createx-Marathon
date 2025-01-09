// -----------------------------------------------SLIDER HEADER

let currentSlide = 1;
const slides = document.querySelectorAll('.slider-item');
const paginationItems = document.querySelectorAll('.pagination span');

function updateSlider() {
    // Скрываем все слайды
    slides.forEach(slide => slide.classList.remove('slider-active', 'slider-prev', 'slider-next'));

    // Показываем текущий слайд и определяем предыдущий/следующий
    slides[currentSlide - 1].classList.add('slider-active');
    const prevIndex = (currentSlide - 2 + slides.length) % slides.length;
    const nextIndex = currentSlide % slides.length;
    slides[prevIndex].classList.add('slider-prev');
    slides[nextIndex].classList.add('slider-next');

    // Обновляем пагинацию
    paginationItems.forEach(item => item.classList.remove('active'));
    paginationItems[currentSlide - 1].classList.add('active');
}

function changeSlide(direction) {
    currentSlide = direction === 'next'
        ? (currentSlide % slides.length) + 1
        : (currentSlide - 2 + slides.length) % slides.length + 1;
    updateSlider();
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    updateSlider();
}

document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
    let slideInterval = setInterval(() => changeSlide('next'), 5000);

    document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(slideInterval));
    document.querySelector('.slider').addEventListener('mouseleave', () => slideInterval = setInterval(() => changeSlide('next'), 5000));
});

// ----------------------------------------------BURGER

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    const contacts = document.querySelector('.contact-info');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        contacts.classList.toggle('active');
    });
});

// ----------------------------------------------TITLE ANIMATION

function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight - offset && rect.bottom >= offset;
}

const sections = document.querySelectorAll('.section');
const clientsTitle = document.querySelector('.clients__title');

function handleScroll() {
    const defaultOffset = 300;
    const clientsTitleOffset = 300;

    sections.forEach(section => {
        const offset = section === clientsTitle ? clientsTitleOffset : defaultOffset;
        if (isInViewport(section, offset)) {
            section.classList.add('animate');
        } else {
            section.classList.remove('animate');
        }
    });
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// ------------------------------------------WE ARE (video button)

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".section__video video");
    const playButton = document.querySelector(".play-button");
    const pauseButton = document.querySelector(".pause-button");

    pauseButton.classList.add("hidden");

    let hideButtonsTimer;

    function hideButtons() {
        hideButtonsTimer = setTimeout(() => {
            if (!video.paused && !pauseButton.matches(':hover')) {
                pauseButton.classList.add("hidden");
            }
        }, 1000);
    }

    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playButton.classList.add("hidden");
            pauseButton.classList.remove("hidden");
        } else {
            video.pause();
            pauseButton.classList.add("hidden");
            playButton.classList.remove("hidden");
        }
        clearTimeout(hideButtonsTimer);
        hideButtons();
    }

    function showPauseButtonTemporarily() {
        if (!video.paused) {
            pauseButton.classList.remove("hidden");
            clearTimeout(hideButtonsTimer);
            hideButtons();
        }
    }

    playButton.addEventListener("click", togglePlayPause);
    pauseButton.addEventListener("click", togglePlayPause);
    video.addEventListener("click", togglePlayPause);

    video.addEventListener("play", () => {
        playButton.classList.add("hidden");
        pauseButton.classList.remove("hidden");
        clearTimeout(hideButtonsTimer);
        hideButtons();
    });

    video.addEventListener("pause", () => {
        pauseButton.classList.add("hidden");
        playButton.classList.remove("hidden");
        clearTimeout(hideButtonsTimer);
    });

    // Desktop mouse events
    video.addEventListener("mousemove", showPauseButtonTemporarily);
    video.addEventListener("mouseleave", () => {
        if (!video.paused) {
            hideButtons();
        }
    });

    pauseButton.addEventListener("mouseenter", () => clearTimeout(hideButtonsTimer));
    pauseButton.addEventListener("mouseleave", hideButtons);

    // Mobile touch events
    video.addEventListener("touchstart", () => {
        showPauseButtonTemporarily();
    });

    pauseButton.addEventListener("touchstart", () => {
        clearTimeout(hideButtonsTimer);
    });
});


// -------------------------------------------SLIDER PROJECTS & REVIEWS

$(document).ready(function () {
    $('#projects-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '#prev-btn',
        nextArrow: '#next-btn',
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    });

    $('.clients-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: '#client-prev-btn',
        nextArrow: '#client-next-btn',
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
    });
});

// --------------------------------------------FACTS

function animatePercentage(id, targetValue, duration) {
    const percentageElement = document.querySelector(`#${id} .percentage`);
    const ringProgress = document.querySelector(`#${id} .ring-progress`);
    const circumference = 433;

    ringProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    ringProgress.style.strokeDashoffset = circumference;

    let currentValue = 0;
    const stepTime = duration / 100;
    const step = targetValue / 100;

    const interval = setInterval(() => {
        if (currentValue < targetValue) {
            currentValue += step;
            currentValue = Math.min(currentValue, targetValue);

            if (id === 'ring1' || id === 'ring4') {
                percentageElement.textContent = `${Math.floor(currentValue)}%`;
            } else if (id === 'ring3') {
                percentageElement.textContent = Math.floor((9452 * currentValue) / 94.52);
            } else {
                percentageElement.textContent = Math.floor(currentValue);
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
    ringProgress.style.strokeDashoffset = 433;
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
    { threshold: 0.5 }
);

observer.observe(factsSection);
