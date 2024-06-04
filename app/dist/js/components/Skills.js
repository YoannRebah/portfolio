class Skills {

    #contentSkills = document.querySelector('.content[data-content="skills"]');
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
                    label: "Syntaxe de base",
                    percent: 95
                },
                {
                    label: "Fonctions",
                    percent: 88
                },
                {
                    label: "POO",
                    percent: 82
                },
                {
                    label: "Asynchronicité",
                    percent: 76
                },
                {
                    label: "Bonnes pratiques",
                    percent: 97
                }
            ]
        }
    ];
    
    init() {
        this.AppendSkillsHTML();
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
}

const skills = new Skills();
skills.init();