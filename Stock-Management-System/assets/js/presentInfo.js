function presentInfo(buttonName) {
    const button = document.getElementById(buttonName);
    if (button) {
        button.dataset.originalText = button.textContent;
        button.textContent = "<p class='text'>sample info text</p>";
    }
}

function restoreInfo(buttonName) {
    const button = document.getElementById(buttonName);
    if (button && button.dataset.originalText) {
        button.innerHTML = "<p class='text'>" + button.dataset.originalText + "</p>";
        delete button.dataset.originalText;
    }
}