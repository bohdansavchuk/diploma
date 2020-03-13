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

});