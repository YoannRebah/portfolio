class Section {

    #titlesH2 = document.querySelectorAll('[data-h2]');
    #contentSkills = document.querySelector('.content[data-content="skills"]');
    #contentTools = document.querySelector('.content[data-content="tools"]');
    #skills = [
        {
            id: "html",
            label: "HTML",
            iconClassName: "fa-brands fa-html5",
            items: [
                {
                    label: "Structure",
                    percent: 92
                },
                {
                    label: "Accessibilité",
                    percent: 84
                },
                {
                    label: "SEO",
                    percent: 77
                },
                {
                    label: "Performances",
                    percent: 99
                },
                {
                    label: "Bonnes pratiques",
                    percent: 87
                }
            ]
        },
        {
            id: "sass",
            label: "SASS",
            iconClassName: "fa-brands fa-sass",
            items: [
                {
                    label: "Syntaxe",
                    percent: 80
                },
                {
                    label: "Sélecteurs",
                    percent: 90
                },
                {
                    label: "Architecture",
                    percent: 85
                },
                {
                    label: "Performances",
                    percent: 78
                },
                {
                    label: "Bonnes pratiques",
                    percent: 93
                }
            ]
        },
        {
            id: "js",
            label: "JavaScript",
            iconClassName: "fa-brands fa-js",
            items: [
                {
                    label: "Bases",
                    percent: 95
                },
                {
                    label: "Structure de données",
                    percent: 88
                },
                {
                    label: "POO",
                    percent: 82
                },
                {
                    label: "Manipulation du DOM",
                    percent: 76
                },
                {
                    label: "Bonnes pratiques",
                    percent: 97
                }
            ]
        }
    ];
    #tools = [
        {
            label: "VS Code",
            animationDelay: "10s"
        },
        {
            label: "Visual Studio",
            animationDelay: "2.2s"
        },
        {
            label: "Figma",
            animationDelay: "8s"
        },
        {
            label: "Git",
            animationDelay: "4.5s"
        },
        {
            label: "AEM",
            animationDelay: "1s"
        },
        {
            label: "Wordpress",
            animationDelay: "3.8s"
        }
    ];
    
    init() {
        this.AddEventClickH2();
        this.AppendSkillsHTML();
        this.AppendToolsHTML();
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
            this.#titlesH2.forEach((elem)=>{
                elem.addEventListener('click', (e)=>{
                    const thisTarget = e.target;
                    const thisDataH2 = thisTarget.getAttribute('data-h2');
                    this.ToggleContent(thisDataH2);
                    this.ToggleStyleH2(thisTarget);
                })
            });
        }
    }

    AppendSkillsHTML() {
        this.#skills.forEach((elem)=>{
            const rowSkill = document.createElement('div');
            rowSkill.classList.add('row-skill');
            rowSkill.setAttribute('data-skill', elem.id);

            const hr = document.createElement('hr');
            hr.classList.add('cyan');

            const containerIconText = document.createElement('div');
            containerIconText.classList.add('container-icon-text');

            const label = document.createElement('p');
            label.innerHTML = elem.label;

            const icon = document.createElement('i');
            icon.className = elem.iconClassName;

            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');

            containerIconText.append(label, icon);
            rowSkill.append(containerIconText);

            elem.items.forEach((item)=>{
                const skillItem = document.createElement('div');
                skillItem.classList.add('skill-item');

                const label = document.createElement('p');
                label.innerHTML = `${item.label}&nbsp;:`;

                const containerProgressBar = document.createElement('div');
                containerProgressBar.classList.add('container-progress-bar');

                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');
                progressBar.style.width = `${item.percent}%`;
                progressBar.setAttribute('data-percent', `${item.percent}%`);

                containerProgressBar.append(progressBar);
                skillItem.append(label, containerProgressBar);
                wrapper.append(skillItem);
            })

            rowSkill.append(wrapper);
            this.#contentSkills.append(rowSkill, hr);
        });
    }

    AppendToolsHTML() {
        this.#tools.forEach((elem)=>{
            const tool = document.createElement('div');
            tool.classList.add('tool');

            const screen = document.createElement('div');
            screen.classList.add('screen');
            screen.setAttribute('data-tool', elem.label);
            screen.style.animationDelay = elem.animationDelay;

            tool.append(screen);

            this.#contentTools.append(tool);
        });
    }

}