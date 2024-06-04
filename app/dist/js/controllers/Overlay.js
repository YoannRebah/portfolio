class Overlay {
    
    #overlay = document.querySelector('.overlay');
    #glitchLinesMaxCount = 8;
    #glitchLineMinHeight = 1;
    #glitchLineMaxHeight = 3;
    #intervalCreateGlitchLine = 16000;
    #intervalRemoveGlitchLines = 6000;

    init() {
        this.AppendGlitchLinesHTML();
        this.StartPeriodicRemoval();
    }

    AppendGlitchLinesHTML() {
        const createGlitchLines = () => {
            const randomCountGlitchLines = Math.floor(Math.random() * this.#glitchLinesMaxCount);

            for (let i = 0; i < randomCountGlitchLines; i++) {
                const delay = Math.random() * this.#intervalCreateGlitchLine;
                setTimeout(() => {
                    const glitchLine = document.createElement('div');
                    glitchLine.classList.add('glitch-line');
                    glitchLine.style.height = `${Math.floor(Math.random() * this.#glitchLineMaxHeight) + this.#glitchLineMinHeight}px`;
                    this.#overlay.appendChild(glitchLine);
                }, delay);
            }
        };

        setInterval(createGlitchLines, this.#intervalCreateGlitchLine);
    }

    RemoveAllGlitchLines() {
        this.#overlay.querySelectorAll('.glitch-line').forEach((elem) => {
            this.#overlay.removeChild(elem);
        });
    }

    StartPeriodicRemoval() {
        setInterval(() => {
            this.RemoveAllGlitchLines();
        }, this.#intervalRemoveGlitchLines);
    }
}

const overlay = new Overlay();
overlay.init();