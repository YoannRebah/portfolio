class Arcade {

    #videoGameMenu = document.querySelector('.video-game-menu');
    #btnOpenMenu = document.querySelector('[data-btn-action="open-arcade-menu"]');
    #btnPlayVideoGame = document.querySelector('[data-btn-action="play-video-game"]');
    #btnQuitVideoGame = document.querySelector('[data-btn-action="quit-video-game"]');

    init() {
        this.AddEventBtnOpenMenu();
        this.AddEventBtnNewGame();
        this.AddEventBtnQuitMenu();
    }

    ShowArcadeMenu() {
        this.#videoGameMenu.classList.add('active');
    }

    HideArcadeMenu() {
        this.#videoGameMenu.classList.remove('active');
    }

    StartNewGame() {
        this.HideArcadeMenu();
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
}