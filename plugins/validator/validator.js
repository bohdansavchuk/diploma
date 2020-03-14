class Validator {
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method; 
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
        this.error = new Set();
    }

    init(){
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener ('change', this.chekIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.chekIt({target: elem}));
            if (this.error.size) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }

    isValid(elem){

        const validatorMethod = {
            notEmpty(elem) {
                if(elem.value.trim() === ''){
                    return false;
                }
                return true;
            },
            pattern(elem, pattern){
                return pattern.test(elem.value);
            },
            checked(elem) {
                if(elem.checked){
                    return true;
                }
                return false;
            }
        };

        if(this.method) {
            const method = this.method[elem.id];

            if(method) {
                return method.every(item => {
                    return validatorMethod[item[0]](elem, this.pattern[item[1]]);
                });
            }

        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
        }
        
        return true;
    }

    chekIt(event){
        const target = event.target;

        if(this.isValid(target)){
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
        if(elem.previousElementSibling && elem.previousElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Обязательное поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('beforebegin', errorDiv);
    }

    showSuccess(elem){
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.previousElementSibling && elem.previousElementSibling.classList.contains('validator-error')) {
            elem.previousElementSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');

        style.textContent = `
            input.success {
                border: 2px solid green!important;
            }
            input.error {
                border: 2px solid red!important;
            }
            .validator-error {
                font-size: 12px;
                font-family: sans-serif;
                color: red !important;
            }
        `;

        document.head.appendChild(style);
    }

    setPattern(){

        if(!this.pattern.phone) {
            this.pattern.phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        }

        if(!this.pattern.email) {
            this.pattern.email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        }

        if(!this.pattern.text) {
            this.pattern.text = /^[а-яА-Я]+/;
        }

    }
}