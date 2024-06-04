class TitleH2 {

    #titlesH2 = document.querySelectorAll('[data-h2]');
    
    init() {
        this.AddEventClickH2();
    }

    ToggleStyleH2(elem) {
        if(elem) {
            if(elem.classList.contains('reduce')) {
                elem.classList.remove('reduce');
            } else {
                elem.classList.add('reduce');
            }
        }
    }

    ToggleContent(dataContent) {
        if(document.querySelector(`[data-content=${dataContent}]`)) {
            const content = document.querySelector(`[data-content=${dataContent}]`);

            if(content.classList.contains('display-none')) {
                content.classList.remove('display-none');
            } else {
                content.classList.add('display-none');
            }
        }
    }

    AddEventClickH2() {
        if(document.querySelector('[data-h2]')) {
            this.#titlesH2.forEach((elem)=>{
                elem.addEventListener('click', (e)=>{
                    const thisTarget = e.target;
                    const thisDataH2 = thisTarget.getAttribute('data-h2');
                    this.ToggleContent(thisDataH2);
                    this.ToggleStyleH2(thisTarget);
                })
            });
        }
    }

}

const titleH2 = new TitleH2();
titleH2.init();