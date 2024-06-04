class Loader {

    static get LoaderHTML() {
        return document.querySelector('.loader-background') || null;
    }

    static Show() {
        const loader = Loader.LoaderHTML;
        if (loader) loader.classList.remove('display-none');
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
    }

    static Hide() {
        const loader = Loader.LoaderHTML;
        if (loader) loader.classList.add('display-none');
        document.body.style.overflow = "auto";
    }
}