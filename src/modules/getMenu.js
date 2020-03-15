'use strict';
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

export default getMenu;