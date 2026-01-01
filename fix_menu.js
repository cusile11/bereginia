// Скрипт для добавления функциональности скрытия логотипа и бургер-иконки
// Запустить в консоли браузера на странице index.html

// Находим и заменяем функцию openMenu
const openMenuScript = document.createElement('script');
openMenuScript.textContent = `
// Получаем текущие функции
const currentOpenMenu = window.openMenu;
const currentCloseMenuFunc = window.closeMenuFunc;

// Заменяем функцию openMenu
window.openMenu = function() {
    if (currentOpenMenu) currentOpenMenu();
    
    // Скрываем логотип и бургер-иконку на телефонах
    if (window.innerWidth <= 768) {
        const logo = document.querySelector('.logo');
        const burgerIcon = document.querySelector('.burger-menu');
        if (logo) logo.style.display = 'none';
        if (burgerIcon) burgerIcon.style.display = 'none';
    }
};

// Заменяем функцию closeMenuFunc
window.closeMenuFunc = function() {
    if (currentCloseMenuFunc) currentCloseMenuFunc();
    
    // Показываем логотип и бургер-иконку обратно
    const logo = document.querySelector('.logo');
    const burgerIcon = document.querySelector('.burger-menu');
    if (logo) logo.style.display = '';
    if (burgerIcon) burgerIcon.style.display = '';
};

console.log('Функциональность скрытия логотипа и бургер-иконки добавлена!');
`;

document.head.appendChild(openMenuScript);
