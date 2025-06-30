document.addEventListener('DOMContentLoaded', function() {
    // Инициализация хлебных крошек
    initBreadcrumbs();
    
    // Обработчики для пунктов меню
    setupMenuLinks();
});

function initBreadcrumbs() {
    // При загрузке страницы проверяем, есть ли сохраненные крошки
    const savedBreadcrumbs = sessionStorage.getItem('breadcrumbs');
    
    if (savedBreadcrumbs) {
        const breadcrumbsContainer = document.querySelector('.breadcrumbs');
        breadcrumbsContainer.innerHTML = savedBreadcrumbs;
    } else {
        // По умолчанию только "Главная"
        updateBreadcrumbs([{title: 'Главная', url: 'index.html'}]);
    }
}

function setupMenuLinks() {
    // Находим все ссылки в навигации
    const navLinks = document.querySelectorAll('nav ul a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Для якорных ссылок (#section) не обновляем крошки
            if (!this.getAttribute('href').startsWith('#')) {
                const sectionTitle = this.querySelector('li').textContent;
                const sectionUrl = this.getAttribute('href');
                
                // Получаем текущие крошки
                const currentCrumbs = getCurrentBreadcrumbs();
                
                // Добавляем новый элемент (если его еще нет)
                if (!currentCrumbs.some(crumb => crumb.url === sectionUrl)) {
                    currentCrumbs.push({
                        title: sectionTitle,
                        url: sectionUrl
                    });
                    updateBreadcrumbs(currentCrumbs);
                }
            }
        });
    });
}

function getCurrentBreadcrumbs() {
    const breadcrumbsContainer = document.querySelector('.breadcrumbs');
    const crumbs = [];
    
    // Собираем текущие крошки из DOM
    breadcrumbsContainer.querySelectorAll('a').forEach(link => {
        crumbs.push({
            title: link.textContent,
            url: link.getAttribute('href')
        });
    });
    
    // Добавляем текущую страницу (если это не главная)
    const currentPage = breadcrumbsContainer.querySelector('span');
    if (currentPage) {
        crumbs.push({
            title: currentPage.textContent,
            url: window.location.pathname
        });
    }
    
    return crumbs;
}

function updateBreadcrumbs(crumbs) {
    const breadcrumbsContainer = document.querySelector('.breadcrumbs');
    let html = '';
    
    crumbs.forEach((crumb, index) => {
        if (index < crumbs.length - 1) {
            // Для всех кроме последнего - ссылка
            html += `<a href="${crumb.url}">${crumb.title}</a>`;
        } else {
            // Последний элемент - текущая страница (без ссылки)
            html += `<span>${crumb.title}</span>`;
        }
        
        // Добавляем разделитель, если не последний элемент
        if (index < crumbs.length - 1) {
            html += '<span class="separator">/</span>';
        }
    });
    
    breadcrumbsContainer.innerHTML = html;
    
    // Сохраняем в sessionStorage (исчезнет при закрытии вкладки)
    sessionStorage.setItem('breadcrumbs', breadcrumbsContainer.innerHTML);
}