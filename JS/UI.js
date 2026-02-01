// showSection.onclick = (e) => {
//     sectionBar.classList.toggle(`width-hide`);
// };

const mainNotificationNode = makeANode({
    tagName: `div`,
    initClass: `mainNotificationNode`,
    innerHtml: ``,
});

function mainNotification(text, color) {
    document.body.append(mainNotificationNode);
    setTimeout(() => {
        mainNotificationNode.classList.add(`show`);
        mainNotificationNode.classList.add(color);
        mainNotificationNode.textContent = text;
    }, 0);

    setTimeout(() => {
        mainNotificationNode.classList.remove(`show`);
        mainNotificationNode.textContent = ``;
        mainNotificationNode.remove();
    }, 4000);
}

function askConfirm(message) {
    return new Promise((resolve) => {
        const modal = document.createElement("div");
        modal.className = "confirm-modal";
        modal.innerHTML = `
            <div class="confirm-modal-box">
                <p class = "confirm-modal-message" >${message}</p>
                <button class="confirm-modal-cancel">Noooo !</button>
                <button class="confirm-modal-ok">OK</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".confirm-modal-ok").onclick = () => {
            cleanup();
            resolve(true);
        };

        modal.querySelector(".confirm-modal-cancel").onclick = () => {
            cleanup();
            resolve(false);
        };

        function cleanup() {
            modal.remove();
        }
    });
}
