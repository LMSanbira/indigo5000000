chrome.runtime.onMessage.addListener((req) => {
    setIndigo(req);
});

function setIndigo(indigoData) {
    const elemId = 'indigo5000000';
    let indigoStyle = document.getElementById(elemId);
    if (!indigoStyle) {
        indigoStyle = document.createElement('style');
        indigoStyle.setAttribute("id", elemId);
        document.head.appendChild(indigoStyle);
    }

    indigoStyle.innerHTML = `
    ${indigoData.selector} {
        border: solid 2px #${indigoData.color};
    }`;
}