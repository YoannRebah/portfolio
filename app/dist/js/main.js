window.onload = () => {

    const timer = new Timer();

    const localStorage = new LocalStorage();
    localStorage.init();

    const titlePopin = new TitlePopin();
    titlePopin.init();
   
    const section = new Section();
    section.init();

    const mainNav = new MainNav();
    mainNav.init();

    const overlay = new Overlay();
    overlay.init();

    const employeeCard = new EmployeeCard();
    employeeCard.init();

    const references = new References();
    references.init();

    const earthGlobe = new EarthGlobe();
    earthGlobe.init();

    let timeout = setTimeout(()=>{
        Loader.Hide();
        timer.init();
        var typed = new Typed('#typed-text-cities', {
            strings: ["????", "Évry", "[CITY_NAME_ERROR]", "Soisy-sur-????", "Paris", "Suresnes", "????", "DATA_CITY", "Juvisy", "Draveil", "New-York", "Créteil"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            cursorChar: '<i class="fa-solid fa-square"></i>',
            loop: true
        });
        clearTimeout(timeout);
    }, 5000);

}