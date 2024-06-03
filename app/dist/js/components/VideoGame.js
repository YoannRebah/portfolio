class VideoGame {

    #btnBackToArcadeMenu = document.querySelector('[data-btn-action="back-to-arcade-menu"]');
    static #videoGame = document.querySelector('.video-game');
    static #game = document.querySelector('.game');
    static #currentPositionX = 0;
    static #gameCursor;
    static #scoreHTML = document.querySelector('.score');
    static #highScoreHTML = document.querySelector('.high-score');
    static #localStorageKeyScore = 'portfolio-yr-score';
    static #localStorageKeyHighScore = 'portfolio-yr-high-score';
    static #score = 0;
    static #scoreCounter = 0;
    static #scoreCounterStep = 50;
    static #intervalScoreCounter = null;
    static #gameIsStarted = false;
    static #scoreCounterIsPaused = false;

    init() {
        this.AddEventBtnBackToArcadeMenu();
        VideoGame.SetLocalStorageDefaultHighScore();
    }

    static StartNewGame() {
        VideoGame.ShowVideoGame();
        VideoGame.AppendTitleMoveToPlayHTML();
        VideoGame.CreateGameCursorHTML();
        VideoGame.AddEventMouseMoveGame();
        VideoGame.ToggleGameMouseCursor();
        VideoGame.SetHighScore();
    }

    static StopGame() {
        VideoGame.RemoveGameCursorHTML();
        VideoGame.RemoveTitleMoveToPlay();
        VideoGame.HideVideoGame();
        VideoGame.ResetScoreCounter();
        VideoGame.InitGameIsEnded();
        VideoGame.SetHighScore();
    }

    static InitGameIsStarted() {
        if(!VideoGame.#gameIsStarted) {
            VideoGame.StartScoreCounter();
        }
        VideoGame.#gameIsStarted = true;
    }

    static InitGameIsEnded() {
        VideoGame.#gameIsStarted = false;
        VideoGame.#score = 0;
        VideoGame.#scoreHTML.innerHTML = VideoGame.#score;
    }

    static StartScoreCounter() {
        if (VideoGame.#intervalScoreCounter !== null) {
            clearInterval(VideoGame.#intervalScoreCounter);
        }
        VideoGame.#scoreCounterIsPaused = false;
        VideoGame.#intervalScoreCounter = setInterval(() => {
            if (!VideoGame.#scoreCounterIsPaused) {
                VideoGame.#scoreCounter += VideoGame.#scoreCounterStep;
                VideoGame.#score = VideoGame.#scoreCounter;
                VideoGame.#scoreHTML.innerHTML = VideoGame.#score;
            }
        }, 1000);
    }

    static ResetScoreCounter() {
        clearInterval(VideoGame.#intervalScoreCounter);
        VideoGame.#scoreCounter = 0;
        VideoGame.#score = 0;
        VideoGame.#scoreHTML.innerHTML = VideoGame.#score;
        VideoGame.#intervalScoreCounter = null;
        VideoGame.#scoreCounterIsPaused = false;
    }

    static PauseScoreCounter() {
        VideoGame.#scoreCounterIsPaused = true;
    }

    static ResumeScoreCounter() {
        VideoGame.#scoreCounterIsPaused = false;
    }

    // SCORE
    static get LocalStorageScore() {
        if(localStorage.getItem(VideoGame.#localStorageKeyScore)) {
            return localStorage.getItem(VideoGame.#localStorageKeyScore);
        }
    }

    static set LocalStorageScore(value) {
        localStorage.setItem(VideoGame.#localStorageKeyScore, value);
    }

    // HIGH SCORE
    static get LocalStorageHighScore() {
        if(localStorage.getItem(VideoGame.#localStorageKeyHighScore)) {
            return localStorage.getItem(VideoGame.#localStorageKeyHighScore);
        }
    }

    static set LocalStorageHighScore(value) {
        localStorage.setItem(VideoGame.#localStorageKeyHighScore, value);
    }

    static SetLocalStorageDefaultHighScore() {
        if(localStorage.getItem(VideoGame.#localStorageKeyHighScore) == null) {
            VideoGame.LocalStorageHighScore = 0;
        }
    }

    static SetHighScore() {
        const highScore = VideoGame.LocalStorageScore > VideoGame.LocalStorageHighScore ? VideoGame.LocalStorageScore : VideoGame.LocalStorageHighScore;
        VideoGame.LocalStorageHighScore = highScore;
        VideoGame.#highScoreHTML.innerHTML = VideoGame.LocalStorageHighScore;
    }

    static ShowVideoGame() {
        this.#videoGame.classList.add('active');
    }

    static HideVideoGame() {
        this.#videoGame.classList.remove('active');
    }

    static AppendTitleMoveToPlayHTML() {
        const h3 = document.createElement('h3');
        h3.classList.add('title-move-to-play', 'jersey-15-regular');
        h3.innerHTML = "Déplacez la souris";
        VideoGame.#game.append(h3);
    }

    static RemoveTitleMoveToPlay() {
        if(document.querySelector('.title-move-to-play')) {
            document.querySelector('.title-move-to-play').remove();
        }
    }

    AddEventBtnBackToArcadeMenu() {
        this.#btnBackToArcadeMenu.addEventListener('click', ()=>{
            VideoGame.StopGame();
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

    static RemoveGameCursorHTML() {
        if(document.querySelector('.game-cursor')) {
            document.querySelector('.game-cursor').remove();
        }
    }

    static AddEventMouseMoveGame() {
        VideoGame.#game.addEventListener('mousemove', (e) => {
            const clientX = e.clientX;
            VideoGame.#currentPositionX = clientX;
            VideoGame.#gameCursor.style.transform = `translateX(${VideoGame.#currentPositionX}px)`;
            VideoGame.ToggleGameMouseCursor();
            VideoGame.RemoveTitleMoveToPlay();
            VideoGame.InitGameIsStarted();
        });
    }

    static ToggleGameMouseCursor() {
        const elementRect = VideoGame.#gameCursor.getBoundingClientRect();
        const containerRect = VideoGame.#game.getBoundingClientRect();

        const isTouchingLeft = elementRect.left <= containerRect.left;
        const isTouchingRight = elementRect.right >= containerRect.right;

        if(isTouchingLeft || isTouchingRight) {
            this.HideGameMouseCursor();
            VideoGame.PauseScoreCounter();
        } else {
            this.ShowGameMouseCursor();
            VideoGame.ResumeScoreCounter();
        }
    }
}