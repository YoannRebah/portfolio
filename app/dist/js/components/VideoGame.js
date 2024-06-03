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
    static #scoreCounter = 0;
    static #scoreCounterStep = 50;
    static #intervalScoreCounter = null;
    static #gameIsStarted = false;
    static #scoreCounterIsPaused = false;

    init() {
        this.AddEventBtnBackToArcadeMenu();
        VideoGame.AddEventKeydownEscap();
        VideoGame.SetLocalStorageDefaultHighScore();
    }

    static StartNewGame() {
        VideoGame.SetHighScoreHTML();
        VideoGame.ShowVideoGame();
        VideoGame.AppendTitleMoveToPlayHTML();
        VideoGame.CreateGameCursorHTML();
        VideoGame.AddEventMouseMoveGame();
        VideoGame.ToggleGameMouseCursor();
    }

    static StopGame() {
        VideoGame.SetHighScore();
        VideoGame.RemoveGameCursorHTML();
        VideoGame.RemoveTitleMoveToPlay();
        VideoGame.HideVideoGame();
        VideoGame.ResetScoreCounter();
        VideoGame.InitGameIsEnded();
    }

    static InitGameIsStarted() {
        if(!VideoGame.#gameIsStarted) {
            VideoGame.StartScoreCounter();
            VideoGame.AppendMeteorsHTML();
        }
        VideoGame.#gameIsStarted = true;
    }

    static InitGameIsEnded() {
        VideoGame.#gameIsStarted = false;
        VideoGame.RemoveAllMeteorsHTML();
    }

    static StartScoreCounter() {
        if (VideoGame.#intervalScoreCounter !== null) {
            clearInterval(VideoGame.#intervalScoreCounter);
        }
        VideoGame.#scoreCounterIsPaused = false;
        VideoGame.#intervalScoreCounter = setInterval(() => {
            if (!VideoGame.#scoreCounterIsPaused) {
                VideoGame.#scoreCounter += VideoGame.#scoreCounterStep;
                VideoGame.#scoreHTML.innerHTML = VideoGame.#scoreCounter;
            }
        }, 1000);
    }

    static ResetScoreCounter() {
        clearInterval(VideoGame.#intervalScoreCounter);
        VideoGame.#scoreCounter = 0;
        VideoGame.#scoreHTML.innerHTML = VideoGame.#scoreCounter;
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
        const highScore = VideoGame.#scoreCounter > VideoGame.LocalStorageHighScore ? VideoGame.#scoreCounter : VideoGame.LocalStorageHighScore;
        VideoGame.LocalStorageHighScore = highScore;
    }

    static SetHighScoreHTML() {
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

    static AddEventKeydownEscap() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') {
                VideoGame.StopGame();
            }
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

    static AppendMeteorsHTML() {
        const meteorClasses = ["meteor-anim-1", "meteor-anim-2", "meteor-anim-3", "meteor-anim-4", "meteor-anim-5"];
        let numberOfMeteors = 3; // Minimum de 3 météores au début
        const maxMeteors = 10; // Maximum de 10 météores
        const meteorList = []; // Liste pour stocker les météores générés
    
        const generateMeteor = () => {
            // Créer une image de météore
            const meteor = document.createElement('img');
            meteor.classList.add('meteor');
            meteor.src = "./app/dist/assets/images/meteor.png";
            meteor.alt = "Météore";
    
            // Définir des propriétés aléatoires
            const randomWidth = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
            const randomLeft = Math.random() * 100;
    
            meteor.style.width = `${randomWidth}px`;
            meteor.style.left = `${randomLeft}%`;
    
            // Assigner une classe aléatoire du tableau
            const randomClassIndex = Math.floor(Math.random() * meteorClasses.length);
            meteor.classList.add(meteorClasses[randomClassIndex]);
    
            // Ajouter le météore à l'élément du jeu
            VideoGame.#game.append(meteor);
    
            const meteorData = { element: meteor, timestamp: Date.now() }; // Stocker l'élément du météore et son horodatage
            meteorList.push(meteorData); // Ajouter à la liste des météores générés
    
            // Définir un nouvel intervalle aléatoire pour générer un autre météore
            const randomInterval = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
            setTimeout(generateMeteor, randomInterval);
    
            // Supprimer les météores qui ont dépassé 5 secondes
            const currentTime = Date.now();
            meteorList.forEach((meteorData, index) => {
                if (currentTime - meteorData.timestamp > 5000) {
                    meteorList.splice(index, 1); // Supprimer de la liste
                    meteorData.element.remove(); // Supprimer de l'interface
                }
            });
    
            // Augmenter progressivement le nombre de météores jusqu'au maximum
            if (numberOfMeteors < maxMeteors) {
                numberOfMeteors++;
            }
        };
    
        // Générer un nombre initial de météores
        for (let i = 0; i < numberOfMeteors; i++) {
            generateMeteor();
        }
    }
    
    static RemoveAllMeteorsHTML() {
        document.querySelectorAll('.meteor').forEach((elem)=>{
            elem.remove();
        })
    }
    
    
}