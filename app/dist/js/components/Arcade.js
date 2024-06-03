class Arcade {

    #btnOpenArcadeMenu = document.querySelector('[data-btn-action="open-arcade-menu"]');
    #btnNewGame = document.querySelector('[data-btn-action="new-game"]');
    #btnQuitArcadeMenu = document.querySelector('[data-btn-action="quit-arcade-menu"]');
    static #videoGameMenu = document.querySelector('.video-game-menu');

    init() {
        this.AddEventBtnOpenMenu();
        this.AddEventBtnNewGame();
        this.AddEventBtnQuitMenu();
    }

    static ShowArcadeMenu() {
        this.#videoGameMenu.classList.add('active');
    }

    static HideArcadeMenu() {
        this.#videoGameMenu.classList.remove('active');
    }

    static QuitArcadeMenu() {
        Arcade.HideArcadeMenu();
    }

    AddEventBtnOpenMenu() {
        this.#btnOpenArcadeMenu.addEventListener('click', ()=>{
            Arcade.ShowArcadeMenu();
        });
    }

    AddEventBtnNewGame() {
        this.#btnNewGame.addEventListener('click', ()=>{
            VideoGame.StartNewGame();
        });
    }

    AddEventBtnQuitMenu() {
        this.#btnQuitArcadeMenu.addEventListener('click', ()=>{
            Arcade.QuitArcadeMenu();
        });
    }
}