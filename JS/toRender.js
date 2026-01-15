function initRender() {
    console.log(testingList);
    testingList.forEach((value) => {
        projectList.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-item">${value.name}</li>`
        );
    });
}
initRender();

//  ---------------------------- render ----------------------------

const currentPin = [];
let currentProject = null;

function projectsPinAdd(projectName) {
    if (currentPin.includes(projectName)) return;
    projectPinList.insertAdjacentHTML(
        "beforeend",
        `<li class="project-pinItem">${projectName}<button class="project-pinCancel"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg></button></li>`
    );
    currentPin.push(projectName);
}
function projectsPinDelete(projectName) {
    currentPin.splice(currentPin.indexOf(projectName), 1);
    const l = currentPin.length;
    if (l > 0) {
        sectionSideListRender(true, currentPin[l - 1]);
    } else {
        sectionSideListRender(false);
    }
}

function sectionSideListRender(add = true, projectName) {
    //  handle remove
    if (add === false)
        return (sectionList.innerHTML = `<li class="section-item-add">add</li>`);

    //  handle add
    if (typeof projectName !== "string") return console.log(`invalid param`);
    for (let i of testingList) {
        if (i.name === projectName) {
            const pagesList = i.pagesName;
            let html = `<li class="section-item-add">add</li>`;
            pagesList.forEach((value) => {
                html += `<li class="section-item">${value}</li>`;
            });
            sectionList.innerHTML = html;
            return;
        }
    }
}
function removeActive(parentNode, childrenCLass = ``) {
    const list = parentNode.querySelectorALL(`.childrenCLass`);
}

// ---------------------------- function onclick ----------------------------

function projectOpen(projectNode) {
    const projectName = projectNode.textContent;
    projectsPinAdd(projectName);
    sectionSideListRender(true, projectName);
}

function projectClose(projectNode) {
    let parent = projectNode.closest(`.project-pinItem`);
    projectsPinDelete(parent.textContent);
    parent.remove();
    parent = null;
}

function sectionOpen() {}

// <li class="project-pinItem">
//     project 1 <button>X</button>
// </li>
