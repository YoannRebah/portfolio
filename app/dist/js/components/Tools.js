class Tools {

    #contentTools = document.querySelector('.content[data-content="tools"]');
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
        this.AppendToolsHTML();
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

const tools = new Tools();
tools.init();