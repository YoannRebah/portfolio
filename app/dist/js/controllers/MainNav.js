class MainNav {

    #mainNav = document.querySelector('[data-container="main-nav"]');
    #mainNavList = this.#mainNav.querySelector('.list-main-nav');
    #btnReduceMainNav = document.querySelector('[data-btn-action="reduce-main-nav"]');

    init() {
        this.AppendMainNavHTML();
        this.AddEventWindowScroll();
        this.AddEventClickBtnReduceMainNav();
    }

    AppendMainNavHTML() {
        Contents.ContentsElements.forEach((elem)=>{
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.classList.add('link-main-nav');
            a.setAttribute('href', elem.href);
            a.setAttribute('aria-label', elem.ariaLabel);
            elem.classNames != '' ? a.classList.add(elem.classNames) : '';
            elem.target != '' ? a.setAttribute('target', elem.target) : '';
            elem.target == '_blank' ? a.setAttribute('rel', 'noopener noreferrer') : '';
            elem.dataTitlePopin != '' ? a.setAttribute('data-title-popin', elem.dataTitlePopin) : '';

            const icon = document.createElement('i');

            if(elem.iconClassNames != '') {
                icon.className = elem.iconClassNames;
                icon.setAttribute('aria-hidden', true);
                a.append(icon);
            }

            const span = document.createElement('span');

            if(elem.label != '') {
                span.innerHTML = elem.label;
                a.append(span);
            }

            li.append(a);

            if(elem.isInMainNav) {
                this.#mainNavList.append(li);
            }
        });
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
            } else {
                this.#mainNav.classList.add('reduce');
                this.#btnReduceMainNav.setAttribute('data-title-popin', 'Afficher le menu');
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
}

const mainNav = new MainNav();
mainNav.init();