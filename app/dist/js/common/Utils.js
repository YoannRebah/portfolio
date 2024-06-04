class Utils {

    static get BodyBgColorHexa() {
        const bgColor = window.getComputedStyle(document.body).backgroundColor;
        const rgbValues = bgColor.match(/\d+/g).map(Number);
        return Utils.RGBToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
    }

    static get BodyBgColorBase16() {
        return Utils.HexaToBase16(Utils.BodyBgColorHexa);
    }

    static HexaToBase16(hexa) {
        return parseInt(hexa.substring(1), 16); 
    }

    static RGBToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
    
}