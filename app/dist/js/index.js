class LoaderController {
    static Show() {
        if(document.querySelector('.loader-background')) {
            document.querySelector('.loader-background').classList.remove('display-none');
        }
    }
    static Hide() {
        if(document.querySelector('.loader-background')) {
            document.querySelector('.loader-background').classList.add('display-none');
        }
    }
}

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

class MainNavController {

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

class TimerController {

    #timer = document.querySelector('.timer');
    #timerTime = 0;

    init() {
        setInterval(() => this.UpdateTimer(), 1000);
    }

    FormatTime(number) {
        return String(number).padStart(2, '0');
    }

    UpdateTimer() {
        const hours = Math.floor(this.#timerTime / 3600);
        const minutes = Math.floor((this.#timerTime % 3600) / 60);
        const seconds = this.#timerTime % 60;
        
        this.#timer.textContent = `${this.FormatTime(hours)}:${this.FormatTime(minutes)}:${this.FormatTime(seconds)}`;
        
        this.#timerTime++;
    }
}

class OverlayController {
    #overlay = document.querySelector('.overlay');

    init() {
        this.AddAndRemoveRandomDivs();
        this.StartPeriodicRemoval();
    }

    AddAndRemoveRandomDivs() {
        const addDivs = () => {
            const numDivsToAdd = Math.floor(Math.random() * 8);
            for (let i = 0; i < numDivsToAdd; i++) {
                const delay = Math.random() * 16000;

                setTimeout(() => {
                    const newDiv = document.createElement('div');
                    newDiv.className = 'glitch-line';
                    newDiv.style.height = `${Math.floor(Math.random() * 3) + 1}px`;
                    this.#overlay.appendChild(newDiv);
                }, delay);
            }
        };

        setInterval(addDivs, 16000);
    }

    RemoveAllGlitchLines() {
        const glitchDivs = this.#overlay.querySelectorAll('.glitch-line');

        glitchDivs.forEach(div => {
            this.#overlay.removeChild(div);
        });
    }

    StartPeriodicRemoval() {
        setInterval(() => {
            this.RemoveAllGlitchLines();
        }, 6000);
    }
}

window.onload = () => {

    const localStorageController = new LocalStorageController();
    localStorageController.init();
   
    const contentController = new ContentController();
    contentController.init();

    const mainNavController = new MainNavController();
    mainNavController.init();

    const overlayController = new OverlayController();
    overlayController.init();

    const timerController = new TimerController();

    let timeout = setTimeout(()=>{
        LoaderController.Hide();
        timerController.init();
        clearTimeout(timeout);
    }, 2500)

}