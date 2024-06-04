const timer = new Timer();
const titlePopin = new TitlePopin();

window.onload = () => {
    initPageStart();
}

function initPageStart() {
    let timeout = setTimeout(()=>{
        timer.init();
        titlePopin.init();
        Loader.Hide();
        clearTimeout(timeout);
    }, 5000);
}