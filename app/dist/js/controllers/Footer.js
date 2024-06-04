class Footer {

    #footer = document.querySelector('[data-container="footer"]');
    #footerList = this.#footer.querySelector('.list-footer');

    init() {
        this.AppendFooterHTML();
    }

    AppendFooterHTML() {
        Contents.ContentsElements.forEach((elem)=>{
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.classList.add('link-footer');
            a.setAttribute('href', elem.href);
            a.setAttribute('aria-label', elem.ariaLabel);
            elem.classNames != '' ? a.classList.add(elem.classNames) : '';
            elem.target != '' ? a.setAttribute('target', elem.target) : '';
            elem.dataTitlePopin != '' ? a.setAttribute('data-title-popin', elem.dataTitlePopin) : '';

            const span = document.createElement('span');

            if(elem.label != '') {
                span.innerHTML = elem.label;
                a.append(span);
            }

            li.append(a);

            if(elem.isInFooter) {
                this.#footerList.append(li);
            }
        });
    }

}