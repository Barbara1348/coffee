const button_next = document.getElementById("button_next");
const button_back = document.getElementById("button_back");
const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slides .slide");
const indicatorsContainer = document.querySelector(".dots");

let index = 0;

/**
 * Стилистика переключения слайдов
 */
function updateSlider() {
    slides.style.transform = `translateX(-${index * 51}%)`;
    slides.style.transition = "transform 0.8s ease";
    updateIndicators();
}

/**
 * Кнопка переключения назад
 */
button_back.addEventListener("click", () => {
    if (index === 0) {
        index = slideItems.length - 2;
    } else {
        index--;
    }
    updateSlider();
});

/**
 * Кнопка переключения вперед
 */
button_next.addEventListener("click", () => {
    if (index === slideItems.length - 2) {
        index = 0;
    } else {
        index++;
    }
    updateSlider();
});

/**
 * Создание индикаторов
 */
function createIndicators() {
    for (let i = 0; i < slideItems.length - 1; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("dot");
        if (i === 0) indicator.classList.add("active");
        indicator.addEventListener("click", () => {
            index = i;
            updateSlider();
            updateIndicators();
        });
        indicatorsContainer.appendChild(indicator);
    }
}

/**
 * Обновление активного индикатора
 */
function updateIndicators() {
    const indicators = document.querySelectorAll(".dot");
    indicators.forEach((indicator, i) => {
        const isActive = (i === index && index < slideItems.length - 1);
        indicator.classList.toggle("active", isActive);
    });
}

createIndicators();
