















window.onload = () => {

    const localStorage = new LocalStorage();
    localStorage.init();
   
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

    const timer = new Timer();

    let timeout = setTimeout(()=>{
        Loader.Hide();
        timer.init();
        clearTimeout(timeout);
    }, 5000);

}