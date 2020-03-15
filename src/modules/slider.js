'use strict';
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

export default slider;