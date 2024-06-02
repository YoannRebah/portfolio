class Contents {

    static #contentElements = [
        {
            href: "skills",
            target: "",
            ariaLabel: "Compétences",
            label: "Compétences",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "fa-solid fa-briefcase",
            isInMainNav: true,
            isInFooter: true
        },
        {
            href: "tools",
            target: "",
            ariaLabel: "Outils",
            label: "Outils",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "fa-solid fa-screwdriver-wrench",
            isInMainNav: true,
            isInFooter: true
        },
        {
            href: "notable-achievements",
            target: "",
            ariaLabel: "Réalisations",
            label: "Réalisations",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "fa-solid fa-diagram-project",
            isInMainNav: true,
            isInFooter: true
        },
        {
            href: "current-job",
            target: "",
            ariaLabel: "Poste Actuel",
            label: "Poste Actuel",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "",
            isInMainNav: false,
            isInFooter: true
        },
        {
            href: "interests",
            target: "",
            ariaLabel: "Centres d'intérêt",
            label: "Centres d'intérêt",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "",
            isInMainNav: false,
            isInFooter: true
        },
        {
            href: "contact",
            target: "",
            ariaLabel: "Contact",
            label: "Contact",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "",
            isInMainNav: false,
            isInFooter: true
        },
        {
            href: "location",
            target: "",
            ariaLabel: "Localisation",
            label: "Localisation",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "",
            isInMainNav: false,
            isInFooter: true
        },
        {
            href: "references",
            target: "",
            ariaLabel: "Références & Inspirations",
            label: "Références & Inspirations",
            classNames: "",
            dataTitlePopin: "",
            iconClassNames: "",
            isInMainNav: false,
            isInFooter: true
        },
        {
            href: "https://github.com/YoannRebah/portfolio",
            target: "_blank",
            ariaLabel: "Code source du portfolio",
            label: "",
            classNames: "large",
            dataTitlePopin: "Code source du portfolio",
            iconClassNames: "fa-brands fa-github",
            isInMainNav: true,
            isInFooter: true
        }
    ];

    static get ContentsElements() {
        return Contents.#contentElements;
    }
}