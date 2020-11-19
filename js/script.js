"use strict";

window.addEventListener('DOMContentLoaded', function() {

    let sex, weight, height, age, ratio;

    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'male';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initSetting(selector, activeClass){

        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    function calcTotal(){
        if (!sex || !weight || !height || !age || !ratio){
            result.textContent = '_____';
            return;
        } 
        
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            return;
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            return;
        }
    }


    function getDynamicInformation(physicalSelector) {

        const input = document.querySelector(physicalSelector);
        
        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)){
                input.style.border = "2px solid red";
            } else {
                input.style.border = "none";
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    console.log(age);
                    break;
            }
            calcTotal();
        });
    }

    function getStaticInformation(selector, activeClass) {

        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {

            console.log(elem);
            elem.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                console.log(ratio, sex);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
       
    }
    
    initSetting('#gender div', 'calculating__choose-item_active');
    initSetting('#physical div', 'calculating__choose-item_active');

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('#physical div', 'calculating__choose-item_active');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age'); 
});

