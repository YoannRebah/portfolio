class TitlePopin {

    #clientX = 0;
    #clientY = 0;
    #clientX_Fix = 32;
    #dataTitlePopin = document.querySelectorAll('[data-title-popin]');
    #titlePopinText = "";

    init() {
        this.SetClientCoordinates();
        this.SetTitlePopinText();
    }

    SetClientCoordinates() {
        document.body.addEventListener('mousemove', (e) => {
            this.#clientX = e.clientX;
            this.#clientY = e.clientY;
            this.UpdateTitlePopinHTMLPosition();
        });
    }

    SetTitlePopinText() {
        this.#dataTitlePopin.forEach((elem)=>{
            elem.addEventListener('mouseenter', (e)=>{
                this.#titlePopinText = e.target.getAttribute('data-title-popin');
                document.body.append(this.CreateTitlePopinHTML(this.#titlePopinText));
            });
            elem.addEventListener('mouseleave', (e)=>{
                this.RemoveTitlePopinHTML();
            });
        });
    }

    CreateTitlePopinHTML(titlePopinText) {
        const containerTitlePopin = document.createElement('div');
        containerTitlePopin.classList.add('container-title-popin');

        const titlePopin = document.createElement('div');
        titlePopin.classList.add('title-popin');

        const span = document.createElement('span');
        span.innerHTML = titlePopinText;

        titlePopin.append(span);
        containerTitlePopin.append(titlePopin);

        return containerTitlePopin;
    }

    RemoveTitlePopinHTML() {
        if(document.querySelector('.container-title-popin')) {
            document.querySelector('.container-title-popin').remove();
        }
    }

    UpdateTitlePopinHTMLPosition() {
        if(document.querySelector('.container-title-popin')) {
            const containerTitlePopin = document.querySelector('.container-title-popin');
            containerTitlePopin.style.left = `${this.#clientX + this.#clientX_Fix}px`;
            containerTitlePopin.style.top = `${this.#clientY}px`;
        }
    }
}