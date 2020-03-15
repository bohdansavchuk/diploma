'use strict';
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

export default calc;