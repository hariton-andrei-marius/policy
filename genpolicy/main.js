const CONFIG = {
    "sites": ["http://hagik.altervista.org", "https://hagik.altervista.org"],
    "policy": "https://hagik.altervista.org/u/packages/genpolicy/policy.html",
    "message": "This site uses cookies to provide to you some services. If you want to know more about Privacy & Cookie Policy and our Terms Of Use, click the link. By closing this banner, or by continuing to browse, you accept our Terms Of Use and our Policy.",
    "button_ok": "OK",
    "button_readmore": "Read more"
};

function start() {
    let cookies = document.cookie;
    let isRightSite = false;
    
    for(let i = 0; i < CONFIG.sites.length; i++) {
    	if(window.location.origin === CONFIG.sites[i]) {
        	isRightSite = true;
        }
    }

    if (!cookies.includes("hpolicy=1") && isRightSite) {
        init();
    }
}

function init() {
    var container = document.createElement("section");
    let text = document.createElement("p");
    let confirm = document.createElement("a");
    let readmore = document.createElement("a");
    let message = document.createTextNode(CONFIG.message);
    let domElement = document.querySelector("body");

    container.setAttribute("id", "hpolicy");
    text.setAttribute("class", "hpolicy__text");
    confirm.setAttribute("class", "hpolicy__confirm");
    readmore.setAttribute("class", "hpolicy__readmore");
    confirm.setAttribute("target", "_blank");
    readmore.setAttribute("href", CONFIG.policy);
    confirm.innerText = CONFIG.button_ok;
    readmore.setAttribute("target", "_blank");
    readmore.innerText = CONFIG.button_readmore;
    confirm.onclick = () => setCheckCookie();

    text.appendChild(message);
    container.appendChild(text);
    container.appendChild(readmore);
    container.appendChild(confirm);
    
    if(domElement) {
        domElement.appendChild(container);
    }
    else {
        document.querySelector("html").appendChild(container);
    }

    setStyle();
}

function setStyle(otherCSS) {
    var css = `
    #hpolicy {
        z-index: 99999;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: #FFF;
        width: 80%;
        max-width: 800px;
        font-family: Roboto, calibri, arial, sans-serif;
        padding: 20px;
        font-size: 15px;
        border-radius: 4px;
        animation: hpolicy 1s;
    }

    .hpolicy__text {
        margin: 0 0 16px 0;
    }

    .hpolicy__confirm {
        margin-left: 10px;
    }

    .hpolicy__confirm,
    .hpolicy__readmore {
        cursor: pointer;
        background: #FFF;
        color: #000;
        border-radius: 4px;
        border: none;
        text-decoration: none;
        padding: 5px;
        font-size: 15px;
    }

    .hpolicy__confirm:hover,
    .hpolicy__readmore:hover {
        background: #DDD;
        color: #000;
    }

    .hpolicy__confirm:active,
    .hpolicy__readmore:active {
        background: #AAA;
        color: #000;
    }

    @keyframes hpolicy {
        from {bottom: -200px;}
        to {bottom: 20px;}
    }
    `,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);
    style.setAttribute("type", "text/css");

    if (style.styleSheet) {
        // IE8 and below.
        style.styleSheet.cssText = otherCSS ? otherCSS : css;
    } else {
        style.appendChild(document.createTextNode(otherCSS ? otherCSS : css));
    }
}

function setCheckCookie() {
    document.cookie = "hpolicy=1";
    setStyle("#hpolicy {display: none;}");
}

start();