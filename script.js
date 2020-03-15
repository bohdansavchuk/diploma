document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // page select
    const getMenu = () => {
        const clubsList = document.querySelector('.club-list');

        const handlerMenu = () => {
            clubsList.classList.toggle('active');
        };

        window.addEventListener('click', (event) => {
            let target = event.target;
            if ((!clubsList.contains(target) && clubsList.classList.contains('active')) 
            || (target.closest('.club-select') && !target.closest('.club-list'))
            || (target.matches('.club-list a'))) {
                handlerMenu();
            }
            
        });
    };

    getMenu();

    // popup 
    const getPopup = () => {

        const openPopup = document.querySelectorAll('[data-popup]'),
            popUp = document.querySelectorAll('.popup');

        openPopup.forEach((elem) => {
            elem.addEventListener('click', (event) => {
                event.preventDefault();
                let target = event.target;
                popUp.forEach((e) => {
                    if(target.dataset.popup.substr(1) === e.id) {
                        e.style.display = 'block';
                    }

                    let overlay = e.querySelector('.overlay'),
                        close = e.querySelector('.close_icon');

                    e.addEventListener('click', (event) => {
                        let target = event.target;
                        if(target.contains(overlay) || target.contains(close)) {
                            e.style.display = 'none';
                        }
                    });
                });
                
            });
        });
    };

    getPopup();

    // arrow to scroll
    const getScrollTop = () => {
        const toTop = document.getElementById('totop'),
            headerMain = document.querySelector('.header-main'),
            topMenu = document.querySelector('.top-menu');

        window.addEventListener('scroll', () => {
            if(document.documentElement.scrollTop > headerMain.offsetHeight) {
                toTop.style.display = 'block';
            } else {
                toTop.style.display = 'none';
            }

            if(topMenu.getBoundingClientRect().top <= 0 && document.body.clientWidth < 768 && document.documentElement.scrollTop !== 0) {
                topMenu.style.position = 'fixed';
            } else {
                topMenu.style.position = 'unset';
            }

        });

        toTop.addEventListener('click', (event) => {
            event.preventDefault();
            document.documentElement.scrollIntoView({block: 'start', behavior: 'smooth'});
        });
        
    };

    getScrollTop();

    // menu
    const toggleMenu = () => {
        const menuButton = document.querySelector('.menu-button'),
            menu = document.querySelector('.popup-menu');

        const clientWidth = () => {
            document.body.clientWidth < 768 ? menuButton.style.display = "block" : menuButton.style.display = "none";
        };

        clientWidth();

        window.addEventListener('resize', () => {
            clientWidth();
        });

        document.addEventListener('click', (event) => {
            let target = event.target;

            if(target.closest('.menu-button')) {
                menu.style.display = 'flex';
            }

            if(target.closest('.close-menu-btn') || target.closest('.scroll')) {
                menu.style.display = 'none';
            }
        });

    };

    toggleMenu();

    // slider
    const slider = ({main, sl, arrL, arrR}) => {
        const slider = document.querySelector(main), 
            slide = slider.querySelectorAll(sl),
            dotsP = slider.querySelector('.slider-dots');

        let currentSlide = 0,
            interval,
            dots = [];


        for(let i = 0; i < slide.length; i++){
            dots.length = i;
            let dot = document.createElement('li');
            dot.classList.add('slider-dot');
            dotsP.appendChild(dot);
            dots.push(dot);
        }

        let dot = slider.querySelectorAll('.slider-dot');
            dot[0].classList.add('dot-active');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }  
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            
            let target = event.target;

            if(!target.matches('.slider-arrow, .slider-dot')) {
               return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches(arrR)) {
                currentSlide++;
            } else if(target.matches(arrL)) {
                currentSlide--;
            } else if (target.matches('.slider-dot')) {
                dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.slider-arrow') || 
            event.target.matches('.slider-dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.slider-arrow') || 
            event.target.matches('.slider-dot')){
                startSlide();
            }
        });

        startSlide(3000);

    };

    slider({
        main: '.main-slider',
        sl: '.slide',
        dt: '.slider-dots'
    });
 
    slider({
        main: '.gallery-slider',
        sl: '.slide',
        dt: '.slider-dots',
        arrL: '#arrow-left',
        arrR: '#arrow-right'
    });

    // gift
    const getGift = () => {
        const fixedGift = document.querySelector('.fixed-gift'),
            giftPopup = document.getElementById('gift');

        if(fixedGift) {

            let overlay = giftPopup.querySelector('.overlay'),
                close = giftPopup.querySelector('.close_icon');

            document.addEventListener('click', () => {
                let target = event.target;
     
                 if(target.closest('.fixed-gift')){
                     giftPopup.style.display = 'block';
                     fixedGift.style.display = 'none';
                 }
     
                 if(target.contains(overlay) || target.contains(close) || target.matches('.close-btn')) {
                     giftPopup.style.display = 'none';
                 }
             });
        } else {
            return;
        }
    }; 

    getGift();

    // send form
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
    
    sendForm();

    // calc
    const calc = () => {

        const cardCalc = document.getElementById('card-calc');

        if (cardCalc) {
            const time = document.querySelector('.time'),
            timeInputs = time.querySelectorAll('input'),
            mozaikaClub = document.getElementById('card_leto_mozaika'),
            total = document.getElementById('price-total'),
            promo = document.getElementById('promo'),
            priceMoz = ['1999', '9900', '13900', '19900'],
            priceSchel = ['2999', '14900', '21900', '24900'];

            const getCard = () => {

                let result = 0;

                if(mozaikaClub.checked) {
                    timeInputs.forEach((elem) => {
                        if(elem.checked && elem.value === '1') {
                            result = priceMoz[0];
                        }else if (elem.checked && elem.value === '6') {
                            result = priceMoz[1];
                        }else if (elem.checked && elem.value === '9') {
                            result = priceMoz[2];
                        }else if (elem.checked && elem.value === '12') {
                            result = priceMoz[3];
                        }
                    });
                } else {
                    timeInputs.forEach((elem) => {
                        if(elem.checked && elem.value === '1') {
                            result = priceSchel[0];
                        }else if (elem.checked && elem.value === '6') {
                            result = priceSchel[1];
                        }else if (elem.checked && elem.value === '9') {
                            result = priceSchel[2];
                        }else if (elem.checked && elem.value === '12') {
                            result = priceSchel[3];
                        }
                    });
                }

                // функция - оболочка анимации
                const animateCalc = ({linear, draw, duration}) => {
                    let aniInterval;
                    let start = performance.now();

                    const animateBlock = (time) => {
                        aniInterval = requestAnimationFrame(animateBlock);
                        let timeFraction = (time - start) / duration;
                        if (timeFraction >= 1) {timeFraction = 1;}

                        // вычисление текущего состояния анимации
                        let progress = linear(timeFraction);

                        draw(progress); // отрисовать её
                        if (timeFraction >= 1){
                            cancelAnimationFrame(aniInterval);
                        }
                    };
                    requestAnimationFrame(animateBlock);
                };

                animateCalc({
                    // скорость анимации
                    duration: 1200,
                    // функция расчёта времени
                    linear(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        if(promo.value === 'ТЕЛО2020') {
                            total.textContent = Math.floor((progress * result) - ((progress * result) * 30 / 100));
                        } else {
                            promo.value = '';
                            total.textContent = Math.floor(progress * result);
                        }
                    }
                });

            };

            getCard();

            cardCalc.addEventListener('change', (event) => {
                let target = event.target;

                if(target.matches('input')) {
                    getCard();
                }
            });

        }
    };

    calc();

});