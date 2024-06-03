class Arcade {

    #btnOpenMenu = document.querySelector('[data-btn-action="open-arcade-menu"]');
    #btnPlayVideoGame = document.querySelector('[data-btn-action="play-video-game"]');
    #btnQuitVideoGame = document.querySelector('[data-btn-action="quit-video-game"]');
    #videoGameMenu = document.querySelector('.video-game-menu');
    #videoGame = document.querySelector('.video-game');
    #game = document.querySelector('.game');
    #currentPositionX = 0;
    #gameCursor;

    init() {
        this.AddEventBtnOpenMenu();
        this.AddEventBtnNewGame();
        this.AddEventBtnQuitMenu();
        this.AddEventMouseEnterGame();
        this.AddEventMouseMoveGame();
    }

    get GameWidth() {
        return this.#game.offsetWidth;
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
        if(document.querySelector('.game-cursor')) {
            this.#gameCursor.classList.remove('game-cursor-up');
            this.#gameCursor.classList.add(`game-cursor-${direction}`);
            let timeout = setTimeout(()=>{
                this.#gameCursor.classList.remove(`game-cursor-${direction}`);
                this.#gameCursor.classList.add('game-cursor-up');
                clearTimeout(timeout);
            }, 500)
        }
    }

    AddEventMouseEnterGame() {
        this.#game.addEventListener('mouseenter', (e) => {
            if(document.querySelector('.game-cursor')) {
                return
            } else {
                this.#gameCursor = document.createElement('div');
                this.#gameCursor.classList.add('game-cursor', 'game-cursor-up')
                this.#game.append(this.#gameCursor);
            }
        });
    }

    AddEventMouseMoveGame() {
        this.#game.addEventListener('mousemove', (e) => {
            const clientX = e.clientX;
    
            if (clientX < this.#currentPositionX) {
                this.UpdateGameMouseCursor('left');
            } else if (clientX > this.#currentPositionX) {
                this.UpdateGameMouseCursor('right');
            }
    
            this.#currentPositionX = clientX;
            this.UpdateCursorPosition(this.#currentPositionX);
        });
    }
    
    UpdateCursorPosition(x) {
        this.#gameCursor.style.left = `${x}px`;
    }
}