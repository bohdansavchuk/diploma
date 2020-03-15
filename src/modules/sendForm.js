'use strict';
const sendForm = () => {
    const form = document.querySelectorAll('form'),
        formPhone = document.querySelectorAll('[type="tel"]'),
        formName = document.querySelectorAll('[name="name"]'),
        thanksPopup = document.getElementById('thanks'),
        popupContent = thanksPopup.querySelector('.form-content'),
        loadMessage = 'images/yin-yang.svg';
    
    let spinInterval,
        count = 0,
        overlay = thanksPopup.querySelector('.overlay'),
        close = thanksPopup.querySelector('.close_icon');

    document.addEventListener('click', () => {
        let target = event.target;

        if(target.contains(overlay) || target.contains(close) || target.matches('.close-btn')) {
            thanksPopup.style.display = 'none';
        }
    });

    formPhone.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^0-9+]/ig, '');
        });
    });

    formName.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^\s/а-яА-Яa]/, '');
        });
    });

    const statusMessage = document.createElement('img');

    let spin = function() {
        spinInterval = requestAnimationFrame(spin);
        if(count < 500) {
            count++;
            statusMessage.style.transform = `rotate(${count*3}deg)`;
        }
    };

    form.forEach((item) => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.src = loadMessage;
            spinInterval = requestAnimationFrame(spin);
            const formData = new FormData(item);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    cancelAnimationFrame(spinInterval);
                    statusMessage.style.transform = 'unset';
                    let inputs = item.querySelectorAll('input');
                    inputs.forEach((item) => {
                        if(item.type !== 'radio' && item.type !== 'hidden') {
                            item.value = '';
                        }
                    });
                    let inStart = () => {
                        statusMessage.remove();
                        inputs.forEach((item) => {
                            item.classList.remove('success');
                        });
                    };
                    setTimeout(inStart, 3000);
                    if(item.id === 'form4' || item.id === 'form5'){
                        let content = item.parentNode;
                        content.innerHTML = `
                        <h4>Спасибо!</h4>
                        <p style="font-size: 20px; color: #ffffff; flex-basis: 60%; padding: 20px">
                        Ваша заявка отправлена. <br> Мы с Вами свяжемся в ближайшее время!</p>
                        `;
                    } else {
                        thanksPopup.style.display = 'block';
                    }
                })
                .catch((error) => {
                    cancelAnimationFrame(spinInterval);
                    statusMessage.style.transform = 'unset';
                    console.error(error);
                    if(item.id === 'form4' || item.id === 'form5'){
                        let content = item.parentNode;
                        content.innerHTML = `
                        <h4>Ошибка!</h4>
                        <p style="font-size: 20px; color: #ffffff; flex-basis: 60%; padding: 20px">
                        Ваша заявка не отправлена.</p>
                        `;
                    } else {
                        thanksPopup.style.display = 'block';
                        popupContent.innerHTML = `
                        <h4>Ошибка!</h4>
                        <p>Ваша заявка не отправлена. <br> Заполните форму ещё раз, пожалуйста!</p>
                        <button class="btn close-btn" wfd-id="216">OK</button>
                        `;
                    }
                });
        });
    });

    const postData = (body) => {

        return fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};

export default sendForm;