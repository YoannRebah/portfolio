class Location {

    #cities = ["????", "Failed to retrieve data", "NETWORK_FAILED", "ERROR_6005", "Cannot retrieve data"];

    init() {
        this.CreateTypedJsCities();
    }

    CreateTypedJsCities() {
        var typed = new Typed('#typed-text-cities', {
            strings: this.#cities,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            cursorChar: '<i class="fa-solid fa-square"></i>',
            loop: true
        });
    }
}

const myLocation = new Location();
myLocation.init();