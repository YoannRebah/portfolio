class References {

    #referencesList = document.querySelector('.references-list');
    #references = [
        {
            html: "Miami Vice (Pilote de 1980)",
            href: "https://x.com/WilliamReymond/status/1728148302494150986?t=n3qVBPyxhhFbx1BkEmAgYQ&s=19"
        },
        {
            html: "L'Œuvre de Michael Mann (cinéaste)",
            href: "https://fr.wikipedia.org/wiki/Michael_Mann"
        },
        {
            html: "TV Achat - 1980",
            href: "https://www.google.com/search?sca_esv=b92ff2ff420a2afa&sca_upv=1&rlz=1C1ONGR_fr__1099__1099&sxsrf=ADLYWIL2_IruAqxrYq10BcA4o5unJ3t5Pw:1717231938960&q=tv+achat+1980&uds=ADvngMgpYEU-_VPft0z-hmM5h-H0_j0_uJJwC869FgeHcAT8jP_V--aNe8ea0U1YmOSPA6UKtJkLG8WFUeOfNv0ewipsAi7umAx8l7PcVFuhonCeFTCtBdCKEHv9xW-mLx7e6Rg9kdkRMKi59R1eFq0KZ47GFWIrh81-ZfmL3GxQcm0pbXBaZ7PvWupwrEerTP9Oi5Jy_XDp54wfWad7E_K1t3dBc780nrlYOUsyuCnJ7XTgP_l4BGB6WtlFE6d1Qftlz_K3T85ANdwjOBmglGtDLTc9mKK5eT5RnzLkoxItbn24AFO9jiw&udm=2&prmd=ivnbz&sa=X&ved=2ahUKEwjezd-9g7qGAxUMRKQEHY7JDPQQtKgLegQIEhAB&biw=1280&bih=551&dpr=1.5#vhid=4XaR2HeV7Mbq_M&vssid=mosaic"
        },
        {
            html: "Employee Card",
            href: "https://www.google.com/search?q=employee+card+1980&sca_esv=470f2cd7629ffe1b&sca_upv=1&rlz=1C1ONGR_fr__1099__1099&udm=2&biw=1920&bih=911&sxsrf=ADLYWILB0iesC9XMdrWEn_ABfyuWyTrglQ%3A1717138237228&ei=PXNZZtm4Db2bkdUP3uuTkAg&ved=0ahUKEwiZy6O1preGAxW9TaQEHd71BIIQ4dUDCBA&uact=5&oq=employee+card+1980&gs_lp=Egxnd3Mtd2l6LXNlcnAiEmVtcGxveWVlIGNhcmQgMTk4MEibTVAAWJ1IcAB4AJABAJgBeaAB_guqAQQxNS4zuAEDyAEA-AEBmAIOoALfCcICBBAjGCfCAgUQABiABMICCxAAGIAEGLEDGIMBwgIIEAAYgAQYsQPCAg0QABiABBixAxhDGIoFwgIKEAAYgAQYQxiKBcICBBAAGB7CAgcQABiABBgTmAMAkgcEMTEuM6AH40s&sclient=gws-wiz-serp#vhid=IKqhJ5HYQ4lS3M&vssid=mosaic"
        },
        {
            html: "3D Hover Effect",
            href: "https://codepen.io/technokami/pen/abojmZa"
        },
        {
            html: "Neon Text Effect",
            href: "https://codepen.io/ananyaneogi/pen/Bgozrz"
        },
        {
            html: "Marquee",
            href: "https://ryanmulligan.dev/blog/css-marquee/"
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
            html: "Unsplash",
            href: "https://unsplash.com/fr"
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
            a.setAttribute('href', elem.href);
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');

            li.append(a);
            this.#referencesList.append(li);
        })
    }
}