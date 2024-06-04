const timer = new Timer();
const earthGlobe = new EarthGlobe();
const titlePopin = new TitlePopin();

window.onload = () => {
    initPageStart();
}

function initPageStart() {
    let timeout = setTimeout(()=>{
        timer.init();
        earthGlobe.init();
        titlePopin.init();
        Loader.Hide();
        clearTimeout(timeout);
    }, 5000);
}