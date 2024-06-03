class VideoGame {

    #btnBackToArcadeMenu = document.querySelector('[data-btn-action="back-to-arcade-menu"]');
    static #videoGame = document.querySelector('.video-game');
    static #game = document.querySelector('.game');
    static #currentPositionX = 0;
    static #gameCursor;

    init() {
        this.AddEventBtnBackToArcadeMenu();
    }

    static ShowVideoGame() {
        this.#videoGame.classList.add('active');
    }

    static HideVideoGame() {
        this.#videoGame.classList.remove('active');
    }

    static StartNewGame() {
        VideoGame.ShowVideoGame();
        VideoGame.CreateGameCursorHTML();
        VideoGame.AddEventMouseMoveGame();
        VideoGame.ToggleGameMouseCursor();
    }

    StopGame() {
        VideoGame.HideVideoGame();
    }

    AddEventBtnBackToArcadeMenu() {
        this.#btnBackToArcadeMenu.addEventListener('click', ()=>{
            this.StopGame();
        });
    }

    static ShowGameMouseCursor() {
        if(document.querySelector('.game-cursor')) {
            VideoGame.#gameCursor.classList.remove('hidden');
        }
    }

    static HideGameMouseCursor() {
        if(document.querySelector('.game-cursor')) {
            VideoGame.#gameCursor.classList.add('hidden');
        }
    }

    static CreateGameCursorHTML() {
        if(document.querySelector('.game-cursor')) {
            return
        } else {
            this.#gameCursor = document.createElement('div');
            this.#gameCursor.classList.add('game-cursor');
            VideoGame.#game.append(VideoGame.#gameCursor);
        }
    }

    static AddEventMouseMoveGame() {
        VideoGame.#game.addEventListener('mousemove', (e) => {
            const clientX = e.clientX;
            VideoGame.#currentPositionX = clientX;
            VideoGame.UpdateGameMouseCursorPosition(VideoGame.#currentPositionX);
            VideoGame.ToggleGameMouseCursor();
        });
    }
    
    static UpdateGameMouseCursorPosition(x) {
        VideoGame.#gameCursor.style.transform = `translateX(${x}px)`;
    }

    static ToggleGameMouseCursor() {
        const elementRect = VideoGame.#gameCursor.getBoundingClientRect();
        const containerRect = VideoGame.#game.getBoundingClientRect();

        const isTouchingLeft = elementRect.left <= containerRect.left;
        const isTouchingRight = elementRect.right >= containerRect.right;

        if(isTouchingLeft || isTouchingRight) {
            this.HideGameMouseCursor();
        } else {
            this.ShowGameMouseCursor();
        }
    }
}