'use strict';
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

export default getGift;