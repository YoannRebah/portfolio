class MainNav {

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
                    this.#mainNav.classList.add('active');
                } else {
                    this.#mainNav.classList.remove('active');
                }
            }
        });
    }

    ToggleMainNav() {
        if(this.#mainNav) {
            if(this.#mainNav.classList.contains('reduce')) {
                this.#mainNav.classList.remove('reduce');
                this.#btnReduceMainNav.setAttribute('data-title-popin', 'Masquer le menu');
                LocalStorage.SetData('mainNavIsReduce', false);
            } else {
                this.#mainNav.classList.add('reduce');
                this.#btnReduceMainNav.setAttribute('data-title-popin', 'Afficher le menu');
                LocalStorage.SetData('mainNavIsReduce', true);
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
        const localData = LocalStorage.Data;
        
        if(localData.mainNavIsReduce === true) {
            this.#mainNav.classList.add('reduce');
            this.#btnReduceMainNav.setAttribute('data-title-popin', 'Afficher le menu');
        } else {
            this.#mainNav.classList.remove('reduce');
            this.#btnReduceMainNav.setAttribute('data-title-popin', 'Masquer le menu');
        }
    }
}