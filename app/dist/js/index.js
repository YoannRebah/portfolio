class ContentController {

    #dataH2 = document.querySelectorAll('[data-h2]');

    init() {
        this.AddEventClickH2();
    }

    TogglePseudoCssH2(elem) {
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
        this.#dataH2.forEach((elem)=>{
            elem.addEventListener('click', (e)=>{
                const thisTarget = e.target;
                const thisDataH2 = thisTarget.getAttribute('data-h2');
                this.ToggleContent(thisDataH2);
                this.TogglePseudoCssH2(thisTarget);
            })
        })
    }
}

class HeroBannerController {

    #heroBanner = document.querySelector('[data-container="hero-banner"]');
    #mainNav = document.querySelector('[data-container="main-nav"]');

    init() {
        this.AddEventWindowScroll();
    }

    AddEventWindowScroll() {
        window.addEventListener('scroll', ()=>{
            const scrollY = window.scrollY;
            const opacityValue = scrollY/250;

            this.#heroBanner.style.opacity = `${1 - opacityValue}`;

            if(scrollY > 180) {
                this.#mainNav.style.opacity = `1`;
            } else {
                this.#mainNav.style.opacity = `0`;
            }
        })
    }
}

window.onload = () => {
   
    const contentController = new ContentController();
    contentController.init();

    const heroBannerController = new HeroBannerController();
    heroBannerController.init();

}