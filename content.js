
chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if (req.type === 'borderChange') {
        setIndigoBorder(req);
    } else if (req.type === 'more') {
        moreIndigo();
    } else if (req.type === 'evenMore') {
        EvenMoreIndigo();
    } else if (req.type === 'evenMoreOfTheMore') {
        EvenMoreOfTheMoreIndigo();
    } else if (req.type === 'remove') {
        remove();
    }
    
    sendResponse({moreStage: req.type === 'getStage' ? getMoreStage() : null});

    if(req.isSetStage) {
        setMoreStage(req.moreStage);
    }
});

function setIndigoBorder(indigoData) {
    const indigoStyle = getIndigoStyle();
    
    indigoStyle.innerHTML += `
    ${indigoData.selector} {
        border: solid 2px #${indigoData.color} !important;
    }`;
}

function moreIndigo() {
    const indigoStyle = getIndigoStyle();
    
    indigoStyle.innerHTML += `
    *, *::after, *::before {
        color: #283593 !important;
    }`;
}

function EvenMoreIndigo() {
    const indigoStyle = getIndigoStyle();
    
    indigoStyle.innerHTML += `
    *, *::after, *::before {
        background-color: #7986cb !important;
    }`;
}

function EvenMoreOfTheMoreIndigo() {
    const indigoStyle = getIndigoStyle();

    indigoStyle.innerHTML += `
    *, *::after, *::before {
        animation: pulse-indigo 5s infinite linear;
    }
    
    @keyframes pulse-indigo {
        0% {
            box-shadow: 0 0 #c5cae9;
        }
        50% {
            box-shadow: 0 0 69px 69px #1a237e;
        }
        100% {
            box-shadow: 0 0 #c5cae9;
        }
    }
    `;
}

function remove() {
    const indigoStyle = getIndigoStyle();
    indigoStyle.innerHTML = '';
}

function getIndigoStyle() {
    const elemId = 'indigo5000000';
    let indigoStyle = document.getElementById(elemId);
    if (!indigoStyle) {
        indigoStyle = document.createElement('style');
        indigoStyle.setAttribute("id", elemId);
        document.head.appendChild(indigoStyle);
    }

    return indigoStyle;
}

function setMoreStage(stage) {
    window.sessionStorage.setItem('indigo5000000Stage', stage);
}

function getMoreStage() {
    return parseInt(window.sessionStorage.getItem('indigo5000000Stage'));
}