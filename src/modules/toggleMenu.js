'use strict';
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

export default toggleMenu;