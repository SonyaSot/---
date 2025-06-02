// Модальное окно
const modal = document.getElementById('callbackModal');
const btn = document.querySelector('.callback');
const span = document.querySelector('.close');

btn.onclick = function() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Обработка форм
document.getElementById('callbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    this.reset();
    modal.style.display = 'none';
});

document.getElementById('modalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо! Мы перезвоним вам в течение 15 минут.');
    this.reset();
    modal.style.display = 'none';
});

// Каталог автомобилей (если на странице)
if (document.querySelector('.catalog')) {
    const cars = [
        {
            id: 1,
            brand: 'toyota',
            model: 'Toyota Camry',
            price: '2 450 000 ₽',
            image: 'images/car1.jpg',
            consumption: '7.5 л/100км',
            type: 'sedan'
        },
        {
            id: 2,
            brand: 'hyundai',
            model: 'Hyundai Creta',
            price: '1 850 000 ₽',
            image: 'images/car2.jpg',
            consumption: '6.8 л/100км',
            type: 'suv'
        },
        {
            id: 3,
            brand: 'kia',
            model: 'Kia Rio',
            price: '1 350 000 ₽',
            image: 'images/car3.jpg',
            consumption: '6.2 л/100км',
            type: 'sedan'
        },
        {
            id: 4,
            brand: 'nissan',
            model: 'Nissan Qashqai',
            price: '2 150 000 ₽',
            image: 'images/car4.jpg',
            consumption: '7.0 л/100км',
            type: 'suv'
        },
        {
            id: 5,
            brand: 'toyota',
            model: 'Toyota RAV4',
            price: '2 750 000 ₽',
            image: 'images/car5.jpg',
            consumption: '7.2 л/100км',
            type: 'suv'
        },
        {
            id: 6,
            brand: 'hyundai',
            model: 'Hyundai Solaris',
            price: '1 250 000 ₽',
            image: 'images/car6.jpg',
            consumption: '6.0 л/100км',
            type: 'sedan'
        }
    ];

    const carsGrid = document.querySelector('.cars-grid');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const typeFilter = document.getElementById('typeFilter');
    const resetBtn = document.getElementById('resetFilters');

    // Отображение автомобилей
    function displayCars(filteredCars = cars) {
        carsGrid.innerHTML = '';
        
        filteredCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.model}">
                <h3>${car.model}</h3>
                <p class="price">от ${car.price}</p>
                <p>Расход: ${car.consumption}</p>
                <a href="car-details.html?id=${car.id}" class="btn">Подробнее</a>
            `;
            carsGrid.appendChild(carCard);
        });
    }

    // Фильтрация автомобилей
    function filterCars() {
        const brandValue = brandFilter.value;
        const priceValue = priceFilter.value;
        const typeValue = typeFilter.value;
        
        let filtered = cars;
        
        if (brandValue) {
            filtered = filtered.filter(car => car.brand === brandValue);
        }
        
        if (priceValue) {
            if (priceValue === '1') {
                filtered = filtered.filter(car => parseInt(car.price.replace(/\D/g,'')) < 1500000);
            } else if (priceValue === '2') {
                filtered = filtered.filter(car => {
                    const price = parseInt(car.price.replace(/\D/g,''));
                    return price >= 1500000 && price <= 2500000;
                });
            } else if (priceValue === '3') {
                filtered = filtered.filter(car => parseInt(car.price.replace(/\D/g,'')) > 2500000);
            }
        }
        
        if (typeValue) {
            filtered = filtered.filter(car => car.type === typeValue);
        }
        
        displayCars(filtered);
    }

    // Сброс фильтров
    resetBtn.addEventListener('click', function() {
        brandFilter.value = '';
        priceFilter.value = '';
        typeFilter.value = '';
        displayCars();
    });

    // Слушатели изменений фильтров
    brandFilter.addEventListener('change', filterCars);
    priceFilter.addEventListener('change', filterCars);
    typeFilter.addEventListener('change', filterCars);

    // Первоначальная загрузка
    displayCars();
}
