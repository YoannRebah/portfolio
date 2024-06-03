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

    UpdateGameMouseCursor() {
        this.#game.classList.forEach((className) => {
            if (className.startsWith('toto')) {
                this.#game.classList.remove(className);
            }
        });
    }

    AddEventMouseMoveGame() {
        this.#game.addEventListener('mousemove', (e) => {
            const clientX = e.clientX;

            if (clientX < this.#currentPositionX) {
                console.log('less');
            } else if (clientX > this.#currentPositionX) {
                console.log('more');
            }

            this.#currentPositionX = clientX;
            console.log(clientX);
        });
    }
}