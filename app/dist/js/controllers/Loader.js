class Loader {

    static get LoaderHTML() {
        return document.querySelector('.loader-background') || null;
    }

    static Show() {
        const loader = Loader.LoaderHTML;
        if (loader) loader.classList.remove('display-none');
    }

    static Hide() {
        const loader = Loader.LoaderHTML;
        if (loader) loader.classList.add('display-none');
    }
}