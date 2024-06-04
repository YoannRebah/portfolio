class EmployeeCard {

    #employeeCard = document.querySelector('.employee-card');
    #height = this.#employeeCard.clientHeight;
    #width = this.#employeeCard.clientWidth;

    init() {
        this.AddEventMouseMove();
        this.AddEventMouseOut();
        this.AddEventMouseDown();
        this.AddEventMouseUp();
    }

    AddEventMouseMove() {
        this.#employeeCard.addEventListener('mousemove', this.HandleMove.bind(this));
    }

    HandleMove(e) {
        const xVal = e.layerX;
        const yVal = e.layerY;
        const yRotation = 20 * ((xVal - this.#width / 2) / this.#width);
        const xRotation = -20 * ((yVal - this.#height / 2) / this.#height);
        const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
        this.#employeeCard.style.transform = string;
    }

    AddEventMouseOut() {
        this.#employeeCard.addEventListener('mouseout', this.HandleMouseOut.bind(this));
    }

    HandleMouseOut() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
    }

    AddEventMouseDown() {
        this.#employeeCard.addEventListener('mousedown', this.HandleMouseDown.bind(this));
    }

    HandleMouseDown() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
    }

    AddEventMouseUp() {
        this.#employeeCard.addEventListener('mouseup', this.HandleMouseUp.bind(this));
    }

    HandleMouseUp() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
    }
}

const employeeCard = new EmployeeCard();
employeeCard.init();