const burgerMenu = document.getElementById('burgerMenu');
const mobileNav = document.getElementById('mobileNav');
const closeMobileNav = document.getElementById('closeMobileNav');

burgerMenu.addEventListener('click', function () {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
});

closeMobileNav.addEventListener('click', function () {
    mobileNav.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл
});

// Закрытие меню при клике на ссылку
const mobileLinks = mobileNav.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Анимация бургера
burgerMenu.addEventListener('click', function () {
    this.classList.toggle('active');
});