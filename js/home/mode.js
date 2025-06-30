function toggleTheme() {
        const body = document.body;
        const moonIcon = document.getElementById("moon-icon");
        const sunIcon = document.getElementById("sun-icon");
        
        body.classList.toggle("dark-theme");
        
        // Переключаем активные иконки
        moonIcon.classList.toggle("active");
        sunIcon.classList.toggle("active");
        
        // Сохраняем предпочтение темы
        const isDark = body.classList.contains("dark-theme");
        localStorage.setItem("darkTheme", isDark);
    }
    
    // Инициализация темы при загрузке
    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("darkTheme") === "true";
        const moonIcon = document.getElementById("moon-icon");
        const sunIcon = document.getElementById("sun-icon");
        
        if (savedTheme) {
            document.body.classList.add("dark-theme");
            moonIcon.classList.remove("active");
            sunIcon.classList.add("active");
        }
        
        // Назначаем обработчик клика на контейнер
        document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
    });