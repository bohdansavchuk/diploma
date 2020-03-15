'use strict';
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

export default getPopup;