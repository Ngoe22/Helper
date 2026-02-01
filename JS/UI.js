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
