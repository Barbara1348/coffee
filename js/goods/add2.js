/**
 * Менеджер работы с опциями продуктов
 */
class ProductOptionsManager {
    constructor() {
        this.storageKey = 'productOptions';
        this.currentProductId = this.getProductIdFromUrl();
    }

    getProductIdFromUrl() {
        const path = window.location.pathname;
        const parts = path.split('/');
        return parts[parts.length - 2]; // ID продукта из URL
    }

    saveOptions(options) {
        const allOptions = this.getAllOptions();
        allOptions[this.currentProductId] = options;
        localStorage.setItem(this.storageKey, JSON.stringify(allOptions));
    }

    getOptions() {
        const allOptions = this.getAllOptions();
        return allOptions[this.currentProductId] || null;
    }

    getAllOptions() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {};
    }

    getSummary() {
        let sum = 0;
        const basePrice = 120;

        sum += basePrice;

        // Проверяем тип питания
        const veget = document.getElementById("food_crit_2_veget");
        const vegan = document.getElementById("drink_crit_2_vegan");
        
        if (veget && veget.checked) sum += 90;
        if (vegan && vegan.checked) sum += 50;

        // Проверяем массу (может быть выбран только один вариант)
        const massa100 = document.getElementById("food_crit_100");
        const massa200 = document.getElementById("food_crit_200");
        const massa300 = document.getElementById("food_crit_300");
        const massa400 = document.getElementById("food_crit_400");

        if (massa200 && massa200.checked) sum += 50;
        else if (massa300 && massa300.checked) sum += 80;
        else if (massa400 && massa400.checked) sum += 100;

        return sum;
    }

    initCheckboxes() {
        const form = document.querySelector('form');
        if (!form) return;

        // Группируем чекбоксы по категориям
        this.setupCheckboxGroups();
        
        this.restoreOptions();
        this.updateButtonPrice();

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    setupCheckboxGroups() {
        // Находим все контейнеры категорий
        document.querySelectorAll('.category .container').forEach(container => {
            const checkboxes = container.querySelectorAll('input[type="checkbox"]');
            
            // Добавляем обработчик для каждого чекбокса
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        // Снимаем выделение с других чекбоксов в этой группе
                        checkboxes.forEach(cb => {
                            if (cb !== e.target) cb.checked = false;
                        });
                    }
                    this.saveCurrentOptions();
                    this.updateButtonPrice();
                });
            });
        });
    }

    updateButtonPrice() {
        const button = document.getElementById('addToCart');
        if (button) {
            const summary = this.getSummary();
            const summaryElement = button.querySelector('.summary') || document.createElement('div');
            summaryElement.className = 'summary';
            summaryElement.textContent = `${summary} ₽`;
            
            if (!button.querySelector('.summary')) {
                button.appendChild(summaryElement);
            }
        }
    }

    saveCurrentOptions() {
        const options = {};

        document.querySelectorAll('.category').forEach(category => {
            const categoryName = category.querySelector('h5').textContent.trim();
            const selectedCheckbox = category.querySelector('input[type="checkbox"]:checked');

            if (selectedCheckbox) {
                options[categoryName] = selectedCheckbox.nextElementSibling.textContent.trim();
            }
        });

        this.saveOptions(options);
    }

    restoreOptions() {
        const options = this.getOptions();
        if (!options) return;

        document.querySelectorAll('.category').forEach(category => {
            const categoryName = category.querySelector('h5').textContent.trim();
            const optionValue = options[categoryName];

            if (optionValue) {
                const checkboxes = category.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    if (checkbox.nextElementSibling.textContent.trim() === optionValue) {
                        checkbox.checked = true;
                    }
                });
            }
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.saveCurrentOptions();

        const productData = {
            id: this.currentProductId,
            name: document.querySelector('.about_product h2').textContent,
            image: document.querySelector('.img_block .img').src,
            link: window.location.href,
            type: 'food',
            price: this.getSummary(), // Используем рассчитанную цену
            quantity: 1,
            options: this.getOptions()
        };

        const cartManager = new CartManager();
        const cart = cartManager.getCart();
        cart.push(productData);
        cartManager.saveCart(cart);

        alert('Товар добавлен в корзину!');
        window.location.href = '/bag/index.html';
    }
}

/**
 * Менеджер корзины товаров
 */
class CartManager {
    constructor() {
        this.cartKey = 'userCart';
        this.productsContainer = document.querySelector('.drinks > div');
        this.foodContainer = document.querySelector('.food > div');

        if (this.productsContainer) {
            this.initCart();
        }
    }

    initCart() {
        this.displayCartItems();
        this.updateTotal();
    }

    getCart() {
        const cart = localStorage.getItem(this.cartKey);
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cart) {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }

    displayCartItems() {
        const cart = this.getCart();
        this.productsContainer.innerHTML = '';
        this.foodContainer.innerHTML = '';

        if (cart.length === 0) {
            this.productsContainer.innerHTML = '<p class="empty-cart">Ваша корзина пуста</p>';
            return;
        }

        cart.forEach(item => {
            const card = this.createCartItemCard(item);
            if (item.type === 'food') {
                this.foodContainer.appendChild(card);
            } else {
                this.foodContainer.appendChild(card);
            }
        });
    }

    createCartItemCard(item) {
        const card = document.createElement('div');
        card.className = 'card';

        const imgBlock = document.createElement('div');
        imgBlock.className = 'img_block';

        const img = document.createElement('img');
        img.className = 'img';
        img.src = item.image;
        img.alt = item.name;

        imgBlock.appendChild(img);
        card.appendChild(imgBlock);

        const fillBlock = document.createElement('div');
        fillBlock.className = 'fill';

        const nameBlock = document.createElement('div');
        nameBlock.className = 'name';

        const name = document.createElement('h3');
        name.textContent = item.name;
        nameBlock.appendChild(name);

        if (item.type === 'drink') {
            const strengthBlock = document.createElement('div');
            for (let i = 0; i < item.strength; i++) {
                const strengthIcon = document.createElement('img');
                strengthIcon.src = '/assets/images/zerno.svg';
                strengthIcon.alt = 'Степень крепости';
                strengthBlock.appendChild(strengthIcon);
            }
            nameBlock.appendChild(strengthBlock);
        }

        fillBlock.appendChild(nameBlock);

        const optionsBlock = document.createElement('div');
        optionsBlock.className = 'options';

        if (item.options) {
            for (const [category, value] of Object.entries(item.options)) {
                const option = document.createElement('p');
                option.innerHTML = `<strong>${category}:</strong> ${value}`;
                optionsBlock.appendChild(option);
            }
        }

        fillBlock.appendChild(optionsBlock);

        const link = document.createElement('a');
        link.href = item.link;

        const button = document.createElement('button');
        button.textContent = `${item.price} Р`;
        link.appendChild(button);

        fillBlock.appendChild(link);
        card.appendChild(fillBlock);

        return card;
    }

    updateTotal() {
        const cart = this.getCart();
        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        document.querySelector('.rows .row:first-child h4').innerHTML = `Всего: <span>${total} ₽</span>`;
        document.querySelector('.rows .row:last-child h4').innerHTML = `К оплате: <span>${total} ₽</span>`;
    }
}

// Инициализация
if (document.querySelector('.additional')) {
    document.addEventListener('DOMContentLoaded', () => {
        const optionsManager = new ProductOptionsManager();
        optionsManager.initCheckboxes();
    });
}

if (document.querySelector('.container')) {
    document.addEventListener('DOMContentLoaded', () => {
        const cartManager = new CartManager();
    });
}