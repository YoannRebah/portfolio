class Arcade {

    #btnOpenMenu = document.querySelector('[data-btn-action="open-arcade-menu"]');
    #btnPlayVideoGame = document.querySelector('[data-btn-action="play-video-game"]');
    #btnQuitVideoGame = document.querySelector('[data-btn-action="quit-video-game"]');
    #videoGameMenu = document.querySelector('.video-game-menu');
    #videoGame = document.querySelector('.video-game');
    #game = document.querySelector('.game');
    #currentPositionX = 0;

    init() {
        this.AddEventBtnOpenMenu();
        this.AddEventBtnNewGame();
        this.AddEventBtnQuitMenu();
        this.AddEventMouseMoveGame();
    }

    ShowArcadeMenu() {
        this.#videoGameMenu.classList.add('active');
    }

    HideArcadeMenu() {
        this.#videoGameMenu.classList.remove('active');
    }

    ShowVideoGame() {
        this.#videoGame.classList.add('active');
    }

    HideVideoGame() {
        this.#videoGame.classList.remove('active');
    }

    StartNewGame() {
        this.HideArcadeMenu();
        this.ShowVideoGame();
    }

    QuitArcadeMenu() {
        this.HideArcadeMenu();
    }

    AddEventBtnOpenMenu() {
        this.#btnOpenMenu.addEventListener('click', ()=>{
            this.ShowArcadeMenu();
        });
    }

    AddEventBtnNewGame() {
        this.#btnPlayVideoGame.addEventListener('click', ()=>{
            this.StartNewGame();
        });
    }

    AddEventBtnQuitMenu() {
        this.#btnQuitVideoGame.addEventListener('click', ()=>{
            this.QuitArcadeMenu();
        });
    }

    UpdateGameMouseCursor(direction /* left or right */) {
        this.#game.classList.remove('game-cursor-up');
        this.#game.classList.add(`game-cursor-${direction}`);
        let timeout = setTimeout(()=>{
            this.#game.classList.remove(`game-cursor-${direction}`);
            this.#game.classList.add('game-cursor-up');
            clearTimeout(timeout);
        }, 500)
    }

    AddEventMouseMoveGame() {
        this.#game.addEventListener('mousemove', (e) => {
            const clientX = e.clientX;
            const fixedY = this.#game.offsetHeight - 100; // Position verticale fixe à 100px du bas du conteneur
    
            if (clientX < this.#currentPositionX) {
                this.UpdateGameMouseCursor('left');
                console.log('less');
            } else if (clientX > this.#currentPositionX) {
                this.UpdateGameMouseCursor('right');
                console.log('more');
            }
    
            this.#currentPositionX = clientX;
    
            // Mettre à jour la position du curseur en forcant la position Y
            this.UpdateCursorPosition(clientX, fixedY);
            console.log(`clientX: ${clientX}, fixedY: ${fixedY}`);
        });
    }
    
    UpdateCursorPosition(x, y) {
        const cursor = document.querySelector('.cursor'); // Assurez-vous d'avoir un élément de curseur
        const cursorWidth = cursor.offsetWidth;
        cursor.style.left = `${x - cursorWidth / 2}px`; // Ajustement de la position en soustrayant la moitié de la largeur
        cursor.style.top = `${y}px`;
    }
}