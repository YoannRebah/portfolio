class LocalStorageController {

    static get Data() {
        const data = JSON.parse(localStorage.getItem('portfolio-yr'));
        return data;
    }

    static SetData(key, value) {
        const data = LocalStorageController.Data;
        data[key] = value;
        const stringifiedData = JSON.stringify(data);
        localStorage.setItem('portfolio-yr', stringifiedData);
    }

    init() {
        if(localStorage.getItem('portfolio-yr') == null) this.StoreDefaultData();
    }

    StoreDefaultData() {
        const defaultData = {
            mainNavIsReduce: false,
            skillsIsReduce: false,
            projectsIsReduce: false,
            roadmapIsReduce: false
        }

        localStorage.setItem('portfolio-yr', JSON.stringify(defaultData));
    }
}

class ContentController {

    #dataH2 = document.querySelectorAll('[data-h2]');

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
            this.#dataH2.forEach((elem)=>{
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

class HeroBannerController {

    #heroBanner = document.querySelector('[data-container="hero-banner"]');
    #mainNav = document.querySelector('[data-container="main-nav"]');
    #btnReduceMainNav = document.querySelector('[data-btn-action="reduce-main-nav"]');

    init() {
        this.AddEventWindowScroll();
        this.AddEventClickBtnReduceMainNav();
        this.ToggleMainNavByLocalData();
    }

    AddEventWindowScroll() {
        window.addEventListener('scroll', ()=>{
            const scrollY = window.scrollY;
            const opacityValue = scrollY/250;

            if(this.#heroBanner) {
                this.#heroBanner.style.opacity = `${1 - opacityValue}`;
            }

            if(this.#mainNav) {
                if(scrollY > 80) {
                    this.#mainNav.style.opacity = `1`;
                } else {
                    this.#mainNav.style.opacity = `0`;
                }
            }
        });
    }

    ToggleMainNav() {
        if(this.#mainNav) {
            if(this.#mainNav.classList.contains('reduce')) {
                this.#mainNav.classList.remove('reduce');
                this.#btnReduceMainNav.setAttribute('title', 'Masquer le menu');
                LocalStorageController.SetData('mainNavIsReduce', false);
            } else {
                this.#mainNav.classList.add('reduce');
                this.#btnReduceMainNav.setAttribute('title', 'Afficher le menu');
                LocalStorageController.SetData('mainNavIsReduce', true);
            }
        }
    }

    AddEventClickBtnReduceMainNav() {
        if(this.#btnReduceMainNav) {
            this.#btnReduceMainNav.addEventListener('click', ()=>{
                this.ToggleMainNav();
            })
        }
    }

    ToggleMainNavByLocalData() {
        const localData = LocalStorageController.Data;
        
        if(localData.mainNavIsReduce === true) {
            this.#mainNav.classList.add('reduce');
            this.#btnReduceMainNav.setAttribute('title', 'Afficher le menu');
        } else {
            this.#mainNav.classList.remove('reduce');
            this.#btnReduceMainNav.setAttribute('title', 'Masquer le menu');
        }
    }
}

window.onload = () => {

    const localStorageController = new LocalStorageController();
    localStorageController.init();
   
    const contentController = new ContentController();
    contentController.init();

    const heroBannerController = new HeroBannerController();
    heroBannerController.init();

}