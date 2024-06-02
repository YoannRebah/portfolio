window.onload = () => {

    const timer = new Timer();

    const localStorage = new LocalStorage();
    localStorage.init();
   
    const section = new Section();
    section.init();

    const mainNav = new MainNav();
    mainNav.init();

    const footer = new Footer();
    footer.init();

    const overlay = new Overlay();
    overlay.init();

    const employeeCard = new EmployeeCard();
    employeeCard.init();

    const references = new References();
    references.init();

    const earthGlobe = new EarthGlobe();

    const titlePopin = new TitlePopin();

    const initTypedJs = () => {
        var typed = new Typed('#typed-text-cities', {
            strings: ["????", "Failed to retrieve data", "NETWORK_FAILED", "ERROR_6005", "Cannot retrieve data"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            cursorChar: '<i class="fa-solid fa-square"></i>',
            loop: true
        });
    }

    let timeout = setTimeout(()=>{
        Loader.Hide();
        timer.init();
        earthGlobe.init();
        initTypedJs();
        titlePopin.init();
        clearTimeout(timeout);
    }, 5000);
}