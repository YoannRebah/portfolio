class LoaderController {

    static get LoaderHTML() {
        return document.querySelector('.loader-background') || null;
    }

    static Show() {
        const loader = LoaderController.LoaderHTML;
        if (loader) loader.classList.remove('display-none');
    }

    static Hide() {
        const loader = LoaderController.LoaderHTML;
        if (loader) loader.classList.add('display-none');
    }
}

class LocalStorageController {

    static get PortfolioKey() {
        return 'portfolio-yr';
    }

    static get Data() {
        const data = JSON.parse(localStorage.getItem(LocalStorageController.PortfolioKey));
        return data;
    }

    static SetData(key, value) {
        let data = LocalStorageController.Data;
        if (!data) data = {};
        data[key] = value;
        const stringifiedData = JSON.stringify(data);
        localStorage.setItem(LocalStorageController.PortfolioKey, stringifiedData);
    }

    init() {
        if(localStorage.getItem(LocalStorageController.PortfolioKey) == null) this.StoreDefaultData();
    }

    StoreDefaultData() {
        const defaultData = {
            mainNavIsReduce: false,
        }
        localStorage.setItem(LocalStorageController.PortfolioKey, JSON.stringify(defaultData));
    }
}

class SectionController {

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

    AppendTVProgramHTML() {
        const video = document.createElement('video');
        video.src = './app/dist/assets/images/program-tv.mp4';
        video.autoplay = true;
        video.controls = false;

        const programTV = document.createElement('div');
        programTV.classList.add('program-tv');

        programTV.append(video);
        document.body.append(programTV);

        video.play();
    }

    InitSignalOn() {
        document.querySelector('#loader-text-1').innerHTML = `<i class="fa-solid fa-satellite-dish"></i> Signal faible.`;
        document.querySelector('#loader-text-2').innerHTML = `Reprise des programmes...`;
        document.querySelectorAll('.fa-solid.fa-video-slash').forEach((elem)=>{
            elem.classList.remove('fa-video-slash');
            elem.classList.add('fa-video');
        });
        LoaderController.Show();

        let timeout = setTimeout(()=>{
            LoaderController.Hide();
            this.AppendTVProgramHTML();
            clearTimeout(timeout);
        }, 5000);
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

        if(this.#timerTime === 3600) this.InitSignalOn();
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

class EmployeeCardController {

    #employeeCard = document.querySelector('.employee-card');
    #height = this.#employeeCard.clientHeight;
    #width = this.#employeeCard.clientWidth;

    init() {
        this.addEventMouseMove();
        this.addEventMouseOut();
        this.addEventMouseDown();
        this.addEventMouseUp();
    }

    addEventMouseMove() {
        this.#employeeCard.addEventListener('mousemove', this.handleMove.bind(this));
    }

    handleMove(e) {
        const xVal = e.layerX;
        const yVal = e.layerY;
        const yRotation = 20 * ((xVal - this.#width / 2) / this.#width);
        const xRotation = -20 * ((yVal - this.#height / 2) / this.#height);
        const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
        this.#employeeCard.style.transform = string;
    }

    addEventMouseOut() {
        this.#employeeCard.addEventListener('mouseout', this.handleMouseOut.bind(this));
    }

    handleMouseOut() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
    }

    addEventMouseDown() {
        this.#employeeCard.addEventListener('mousedown', this.handleMouseDown.bind(this));
    }

    handleMouseDown() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
    }

    addEventMouseUp() {
        this.#employeeCard.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseUp() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
    }
}

class ReferencesController {

    #referencesList = document.querySelector('.references-list');
    #references = [
        {
            html: "3D Hover Effect",
            href: "https://codepen.io/technokami/pen/abojmZa"
        },
        {
            html: "Wave Generator",
            href: "https://www.softr.io/tools/svg-wave-generator"
        },
        {
            html: "Fontawesome",
            href: "https://fontawesome.com/"
        },
        {
            html: "Google Fonts",
            href: "https://fonts.google.com/"
        },
        {
            html: "Employee Card",
            href: "https://www.google.com/search?q=employee+card+1980&sca_esv=470f2cd7629ffe1b&sca_upv=1&rlz=1C1ONGR_fr__1099__1099&udm=2&biw=1920&bih=911&sxsrf=ADLYWILB0iesC9XMdrWEn_ABfyuWyTrglQ%3A1717138237228&ei=PXNZZtm4Db2bkdUP3uuTkAg&ved=0ahUKEwiZy6O1preGAxW9TaQEHd71BIIQ4dUDCBA&uact=5&oq=employee+card+1980&gs_lp=Egxnd3Mtd2l6LXNlcnAiEmVtcGxveWVlIGNhcmQgMTk4MEibTVAAWJ1IcAB4AJABAJgBeaAB_guqAQQxNS4zuAEDyAEA-AEBmAIOoALfCcICBBAjGCfCAgUQABiABMICCxAAGIAEGLEDGIMBwgIIEAAYgAQYsQPCAg0QABiABBixAxhDGIoFwgIKEAAYgAQYQxiKBcICBBAAGB7CAgcQABiABBgTmAMAkgcEMTEuM6AH40s&sclient=gws-wiz-serp#vhid=IKqhJ5HYQ4lS3M&vssid=mosaic"
        },
        {
            html: "Marquee",
            href: "https://ryanmulligan.dev/blog/css-marquee/"
        },
        {
            html: "Unsplash",
            href: "https://unsplash.com/fr"
        },
        {
            html: "Neon Text Effect",
            href: "https://codepen.io/ananyaneogi/pen/Bgozrz"
        }
    ];

    init() {
        this.AppendReferencesHTML();
    }

    AppendReferencesHTML() {
        this.#references.forEach((elem)=>{
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.innerHTML = elem.html;
            a.setAttribute('target', '_blank');
            a.setAttribute('href', elem.href);

            li.append(a);
            this.#referencesList.append(li);
        })
    }
}

window.onload = () => {

    const localStorageController = new LocalStorageController();
    localStorageController.init();
   
    const sectionController = new SectionController();
    sectionController.init();

    const mainNavController = new MainNavController();
    mainNavController.init();

    const overlayController = new OverlayController();
    overlayController.init();

    const employeeCardController = new EmployeeCardController();
    employeeCardController.init();

    const referencesController = new ReferencesController();
    referencesController.init();

    const timerController = new TimerController();

    let timeout = setTimeout(()=>{
        LoaderController.Hide();
        timerController.init();
        clearTimeout(timeout);
    }, 5000);

}