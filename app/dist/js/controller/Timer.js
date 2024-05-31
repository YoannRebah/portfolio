class Timer {

    #timer = document.querySelector('.timer');
    #timerTime = 0;

    init() {
        setInterval(() => this.UpdateTimer(), 1000);
    }

    AppendTVProgramHTML() {
        const video = document.createElement('video');
        video.src = './app/dist/assets/images/program-tv.mp4';
        video.autoplay = true;
        video.controls = false;

        const programTV = document.createElement('div');
        programTV.classList.add('program-tv');

        programTV.append(video);
        document.body.append(programTV);

        video.play();
    }

    InitSignalOn() {
        document.querySelector('#loader-text-1').innerHTML = `<i class="fa-solid fa-satellite-dish"></i> Signal faible.`;
        document.querySelector('#loader-text-2').innerHTML = `Reprise des programmes...`;
        document.querySelectorAll('.fa-solid.fa-video-slash').forEach((elem)=>{
            elem.classList.remove('fa-video-slash');
            elem.classList.add('fa-video');
        });
        LoaderController.Show();

        let timeout = setTimeout(()=>{
            LoaderController.Hide();
            this.AppendTVProgramHTML();
            clearTimeout(timeout);
        }, 5000);
    }

    FormatTime(number) {
        return String(number).padStart(2, '0');
    }

    UpdateTimer() {
        const hours = Math.floor(this.#timerTime / 3600);
        const minutes = Math.floor((this.#timerTime % 3600) / 60);
        const seconds = this.#timerTime % 60;
        
        this.#timer.textContent = `${this.FormatTime(hours)}:${this.FormatTime(minutes)}:${this.FormatTime(seconds)}`;
        this.#timerTime++;

        if(this.#timerTime === 3600) this.InitSignalOn();
    }
}