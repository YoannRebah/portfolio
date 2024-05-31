class EmployeeCard {

    #employeeCard = document.querySelector('.employee-card');
    #height = this.#employeeCard.clientHeight;
    #width = this.#employeeCard.clientWidth;

    init() {
        this.addEventMouseMove();
        this.addEventMouseOut();
        this.addEventMouseDown();
        this.addEventMouseUp();
    }

    addEventMouseMove() {
        this.#employeeCard.addEventListener('mousemove', this.handleMove.bind(this));
    }

    handleMove(e) {
        const xVal = e.layerX;
        const yVal = e.layerY;
        const yRotation = 20 * ((xVal - this.#width / 2) / this.#width);
        const xRotation = -20 * ((yVal - this.#height / 2) / this.#height);
        const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
        this.#employeeCard.style.transform = string;
    }

    addEventMouseOut() {
        this.#employeeCard.addEventListener('mouseout', this.handleMouseOut.bind(this));
    }

    handleMouseOut() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
    }

    addEventMouseDown() {
        this.#employeeCard.addEventListener('mousedown', this.handleMouseDown.bind(this));
    }

    handleMouseDown() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
    }

    addEventMouseUp() {
        this.#employeeCard.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseUp() {
        this.#employeeCard.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
    }
}