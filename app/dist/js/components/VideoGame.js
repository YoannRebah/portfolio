class VideoGame {

    #btnBackToArcadeMenu = document.querySelector('[data-btn-action="back-to-arcade-menu"]');
    static #videoGame = document.querySelector('.video-game');
    static #game = document.querySelector('.game');
    static #healthBar = document.querySelector('.health-bar');
    static #health = 100;
    static #healthMin = 0;
    static #healthMax = 100;
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
    static #meteorsPerSecond = 1;
    static #meteorInterval;
    static #increaseMeteorsInterval;

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
        VideoGame.RemoveAllMeteorsHTML();
        VideoGame.ResetMeteorCreation();
        VideoGame.ResetHealthBar();
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
            const collisionBox = document.createElement('div');
            collisionBox.classList.add('collision-box');
            this.#gameCursor.append(collisionBox);
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
        
        function createMeteor() {
          const meteor = document.createElement('div');
          meteor.classList.add('meteor');
    
          const randomClass = meteorClasses[Math.floor(Math.random() * meteorClasses.length)];
          meteor.classList.add(randomClass);
    
          const img = document.createElement('img');
          img.src = './app/dist/assets/images/meteor.png';
          img.classList.add(randomClass);
    
          const randomSize = Math.floor(Math.random() * 61) + 20; // entre 20 et 80
          img.style.width = `${randomSize}px`;
          img.style.height = `${randomSize}px`;
    
          let dataDamage;
          if (randomSize >= 20 && randomSize <= 40) {
            dataDamage = 10;
          } else if (randomSize >= 41 && randomSize <= 60) {
            dataDamage = 20;
          } else {
            dataDamage = 30;
          }
    
          meteor.setAttribute('data-damage', dataDamage);
    
          const randomLeft = Math.floor(Math.random() * 101);
          meteor.style.left = `${randomLeft}%`;
    
          meteor.append(img);
          VideoGame.#game.append(meteor);
    
          setTimeout(() => {
            meteor.remove();
          }, 5000);
    
          const interval = setInterval(() => {
            const rocketCursor = document.querySelector('.collision-box');
            if (rocketCursor && isColliding(meteor, rocketCursor)) {
              console.log(`Météore touché! Dégâts: ${dataDamage}`);
              VideoGame.UpdateHealthBar(-dataDamage);
              clearInterval(interval);
            }
          }, 100);
        }
    
        function isColliding(el1, el2) {
          const rect1 = el1.getBoundingClientRect();
          const rect2 = el2.getBoundingClientRect();
          
          return !(rect1.right < rect2.left || 
                   rect1.left > rect2.right || 
                   rect1.bottom < rect2.top || 
                   rect1.top > rect2.bottom);
        }
    
        VideoGame.#meteorInterval = setInterval(() => {
          for (let i = 0; i < VideoGame.#meteorsPerSecond; i++) {
            createMeteor();
          }
        }, 1000);
    
        VideoGame.#increaseMeteorsInterval = setInterval(() => {
            VideoGame.#meteorsPerSecond += 1;
        }, 20000);
    }

    static ResetMeteorCreation() {
        clearInterval(VideoGame.#meteorInterval);
        clearInterval(VideoGame.#increaseMeteorsInterval);
        VideoGame.#meteorsPerSecond = 1;
        VideoGame.AppendMeteorsHTML();
    }
    
    static RemoveAllMeteorsHTML() {
        document.querySelectorAll('.meteor').forEach((elem)=>{
            elem.remove();
        })
    }

    static UpdateHealthBar(dataDamage) {
        VideoGame.#health += dataDamage;

        if(VideoGame.#health <= VideoGame.#healthMin) {
            VideoGame.#health = VideoGame.#healthMin;
            VideoGame.#healthBar.style.width = `${VideoGame.#healthMin}%`;
        }

        if(VideoGame.#health >= VideoGame.#healthMax) {
            VideoGame.#health = VideoGame.#healthMax;
            VideoGame.#healthBar.style.width = `${VideoGame.#healthMax}%`;
        }

        VideoGame.#healthBar.style.width = `${VideoGame.#health}%`;
    }

    static ResetHealthBar() {
        VideoGame.#healthBar.style.width = `${VideoGame.#healthMax}%`;
    }
    
}