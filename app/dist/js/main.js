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
        clearTimeout(timeout);
    }, 5000);

}