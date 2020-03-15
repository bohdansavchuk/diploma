'use strict';

import getMenu from './modules/getMenu';
import getPopup from './modules/getPopup';
import getScrollTop from './modules/getScrollTop';
import toggleMenu from './modules/toggleMenu';
import slider from './modules/slider';
import getGift from './modules/getGift';
import sendForm from './modules/sendForm';
import calc from './modules/calc';

// page select
getMenu();
// popup 
getPopup();
// arrow to scroll
getScrollTop();
// menu
toggleMenu();
// slider
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
getGift();
// send form
sendForm();
// calc
calc();