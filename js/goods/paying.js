function paying(event) {
    event.preventDefault();

    const paymentMethods = document.querySelectorAll('.form input[type="checkbox"]');
    let selectedMethod = null;

    paymentMethods.forEach(method => {
        if (method.checked) {
            selectedMethod = method.nextElementSibling.textContent.trim();
        }
    });

    if (!selectedMethod) {
        const errorElem = document.getElementById("loginError");
        errorElem.innerText = "Пожалуйста, выберите способ оплаты";
        document.getElementById("myModal").style.display = "block";
        return false; 
    }
    const successModal = document.createElement('div');
    successModal.id = "successModal";
    successModal.style.position = 'fixed';
    successModal.style.top = '0';
    successModal.style.left = '0';
    successModal.style.width = '100%';
    successModal.style.height = '100%';
    successModal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    successModal.style.display = 'flex';
    successModal.style.justifyContent = 'center';
    successModal.style.alignItems = 'center';
    successModal.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.textAlign = 'center';
    modalContent.innerHTML = `
        <h3>Оплата прошла успешно!</h3>
        <p>Способ оплаты: ${selectedMethod}</p>
        <p>Спасибо за ваш заказ в кофейне "Небо и Земля"</p>
        <button id="closeSuccessModal" style="margin-top: 15px; padding: 8px 16px; background: #6F4E37; color: white; border: none; border-radius: 4px;">Закрыть</button>
    `;

    successModal.appendChild(modalContent);
    document.body.appendChild(successModal);

    document.getElementById('closeSuccessModal').addEventListener('click', function() {
        document.body.removeChild(successModal);
        clearCart();
    });

    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            document.body.removeChild(successModal);
            clearCart();
        }
    });

    function clearCart() {
        const drinksContainer = document.querySelector('.container_drinks');
        const foodContainer = document.querySelector('.container_food');
        
        if (drinksContainer) drinksContainer.innerHTML = '';
        if (foodContainer) foodContainer.innerHTML = '';
        
        const paymentRow = document.querySelector('.rows .row');
        if (paymentRow) {
            paymentRow.innerHTML = '<h4>К оплате: 0 ₽</h4>';
        }
        
        const usersManager = new UsersManager();
        const userId = usersManager.getCurrentUser();
        let cartData = localStorage.getItem('userCart');
        
        if (cartData) {
            cartData = JSON.parse(cartData);
            if (cartData[userId]) {
                cartData[userId] = []; 
                localStorage.setItem('userCart', JSON.stringify(cartData));
            }
        }
        
        paymentMethods.forEach(method => {
            method.checked = false;
        });
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.querySelector('aside form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', paying);
    }
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});