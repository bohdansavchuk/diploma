'use strict';
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

export default getScrollTop;