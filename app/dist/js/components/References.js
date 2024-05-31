class References {

    #referencesList = document.querySelector('.references-list');
    #references = [
        {
            html: "3D Hover Effect",
            href: "https://codepen.io/technokami/pen/abojmZa"
        },
        {
            html: "Wave Generator",
            href: "https://www.softr.io/tools/svg-wave-generator"
        },
        {
            html: "Fontawesome",
            href: "https://fontawesome.com/"
        },
        {
            html: "Google Fonts",
            href: "https://fonts.google.com/"
        },
        {
            html: "Employee Card",
            href: "https://www.google.com/search?q=employee+card+1980&sca_esv=470f2cd7629ffe1b&sca_upv=1&rlz=1C1ONGR_fr__1099__1099&udm=2&biw=1920&bih=911&sxsrf=ADLYWILB0iesC9XMdrWEn_ABfyuWyTrglQ%3A1717138237228&ei=PXNZZtm4Db2bkdUP3uuTkAg&ved=0ahUKEwiZy6O1preGAxW9TaQEHd71BIIQ4dUDCBA&uact=5&oq=employee+card+1980&gs_lp=Egxnd3Mtd2l6LXNlcnAiEmVtcGxveWVlIGNhcmQgMTk4MEibTVAAWJ1IcAB4AJABAJgBeaAB_guqAQQxNS4zuAEDyAEA-AEBmAIOoALfCcICBBAjGCfCAgUQABiABMICCxAAGIAEGLEDGIMBwgIIEAAYgAQYsQPCAg0QABiABBixAxhDGIoFwgIKEAAYgAQYQxiKBcICBBAAGB7CAgcQABiABBgTmAMAkgcEMTEuM6AH40s&sclient=gws-wiz-serp#vhid=IKqhJ5HYQ4lS3M&vssid=mosaic"
        },
        {
            html: "Marquee",
            href: "https://ryanmulligan.dev/blog/css-marquee/"
        },
        {
            html: "Unsplash",
            href: "https://unsplash.com/fr"
        },
        {
            html: "Neon Text Effect",
            href: "https://codepen.io/ananyaneogi/pen/Bgozrz"
        }
    ];

    init() {
        this.AppendReferencesHTML();
    }

    AppendReferencesHTML() {
        this.#references.forEach((elem)=>{
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.innerHTML = elem.html;
            a.setAttribute('target', '_blank');
            a.setAttribute('href', elem.href);

            li.append(a);
            this.#referencesList.append(li);
        })
    }
}