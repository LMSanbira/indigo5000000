const selectorInput = document.querySelector("#selector");
const colorInput = document.querySelector("#color");
const borderBtn = document.querySelector("#borderBtn");
const moreBtn = document.querySelector("#moreBtn");
const removeBtn = document.querySelector("#removeBtn");

const moreStages = ['more', 'evenMore', 'evenMoreOfTheMore']
const moreTexts = ['More Indigo', 'I said MORE!', 'MOOOOOOORE!!!']
let moreStage = null;

function init() {
    handleSendMessage('getStage', false, setMoreStage);
}

borderBtn.addEventListener("click", (_e) => {
    if(moreStage === null) {
        setMoreStage({moreStage: 0})
    }
    handleSendMessage('borderChange');
});

moreBtn.addEventListener("click", (_e) => {
    moreStage++;
    handleSendMessage(moreStages[moreStage - 1]);
    setMoreStage({moreStage: moreStage});
});

removeBtn.addEventListener("click", (_e) => {
    reset();
    handleSendMessage('remove');
});

colorInput.addEventListener("change", (_e) => {
    document.body.style.background = '#' + colorInput.value;
});

function getIndigoData() {
    const selector = selectorInput.value;
    const color = colorInput.value;

    return {selector: selector, color: color};
}

function setMoreStage(status) {
    if(status.moreStage !== null && status.moreStage !== undefined) {
        moreStage = status.moreStage;
        if(status.moreStage < moreStages.length) {
            moreBtn.innerHTML = moreTexts[moreStage];
            moreBtn.classList.remove('hide');
        }
        else {
            moreBtn.classList.add('hide');
            removeBtn.classList.remove('hide');
        }
    }
}

function handleSendMessage(type, isSetStage = true, getResponse = () => { }) {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        const baseReq = {type: type, moreStage: moreStage, isSetStage: isSetStage};
        chrome.tabs.sendMessage(tabs[0].id, Object.assign(baseReq, getIndigoData()), getResponse);
    });
}

function reset() {
    moreStage = null;
    moreBtn.classList.add('hide');
    removeBtn.classList.add('hide');
}

init();