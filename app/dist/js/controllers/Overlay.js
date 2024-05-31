class Overlay {
    
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