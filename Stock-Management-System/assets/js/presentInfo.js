function presentInfo(buttonName) {
    const button = document.getElementById(buttonName);
    if (button) {
        button.dataset.originalText = button.textContent;
        button.textContent = "sample info text";
    }
}

function restoreInfo(buttonName) {
    const button = document.getElementById(buttonName);
    if (button && button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        delete button.dataset.originalText;
    }
}