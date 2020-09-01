document.querySelector(".btn").addEventListener("click", (e) => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, getIndigoData());
    })
});

function getIndigoData() {
    const selector = document.querySelector("#selector").value;
    const color = document.querySelector("#color").value;

    console.log('in');
    return {selector: selector, color: color};
}