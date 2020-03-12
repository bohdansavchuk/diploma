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

                    let overlay = e.querySelector('.overlay');
                    let close = e.querySelector('.close_icon');

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
            headerMain = document.querySelector('.header-main');

        window.addEventListener('scroll', () => {
            if(document.documentElement.scrollTop > headerMain.offsetHeight) {
                toTop.style.display = 'block';
            } else {
                toTop.style.display = 'none';
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
        const menuButton = document.querySelector('.menu-button');

        const clientWidth = () => {
            document.body.clientWidth < 768 ? menuButton.style.display = "block" : menuButton.style.display = "none";
        };
        clientWidth();

        window.addEventListener('resize', () => {
            clientWidth();
        });

    };

    toggleMenu();
});