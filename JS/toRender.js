// ----------------------------  init ----------------------------

function projectListRender() {
    projectList.innerHTML = `<li class="project-item-add">add</li>`;
    testingList.forEach((value) => {
        //
        projectList.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-item" data-project-id = "${value.id}"><span class="text">${value.name}</span><button class="edit">E</button><button class="destroy">D</button></li>`,
        );
    });
}
projectListRender();

// ----------------------------  onclick ----------------------------

// show list btn
projectListWrap.onclick = (e) => {
    e.stopPropagation();
    const n = e.target;
    const nCl = n.classList;
    const parent = n.closest(`.project-item`);

    if (n === projectListBtn) {
        projectList.classList.toggle(`hide`);
    }
    if (nCl.contains(`project-item`) || nCl.contains(`text`)) {
        //
        addToPin(parent);
    } else if (nCl.contains(`edit`)) {
        //
    } else if (nCl.contains(`destroy`)) {
        //
    }
};
document.body.onclick = (e) => {
    projectList.classList.add(`hide`);
};

// pin bar
projectPinBar.onclick = (e) => {
    e.stopPropagation();
    const clicked = e.target;
    const eClassList = e.target.classList;
    const parent = clicked.closest(`.project-pinItem`);

    if (eClassList.contains(`project-pinCancel`)) {
        // unpinClickHandle(clicked);
    } else if (
        eClassList.contains(`project-pinItem`) ||
        eClassList.contains(`text`)
    ) {
        addToPin(parent);
    }
};

// sections
sectionBar.onclick = (e) => {
    const parent = e.target.closest(`.section-item`);

    e.stopPropagation();
    const eClassList = e.target.classList;
    if (eClassList.contains(`section-item`) || eClassList.contains(`text`)) {
        sectionActive(parent);
    } else if (eClassList.contains(`edit`)) {
        editSectionClickHandle(parent);
    } else if (eClassList.contains(`destroy`)) {
        deleteSectionClick(parent);
    }
};

// ---------------------------- minor function  ----------------------------

function arrayDelete(array, deleteValue) {
    const index = array.indexOf(deleteValue);
    array.splice(index, 1);
}

function clearActive(parent, childrenClass) {
    const findActive = parent.querySelector(childrenClass);
    if (findActive) findActive.classList.remove(`active`);
}

function makeANode(input) {
    const { tagName, initClass, innerHtml } = Object.assign(
        {
            tagName: `div`,
            initClass: ``,
            innerHtml: ``,
        },
        input,
    );

    const newNode = document.createElement(tagName);
    newNode.className = initClass;
    newNode.innerHTML = innerHtml;

    return newNode;
}

// dataQuery(testingList, [
//     {
//         key: `name`,
//         value: `yewu2`,
//         objPath: [`page`],
//     },
//     {
//         key: `name`,
//         value: `page-2.2`,
//         objPath: [`content`],
//     },
// ]);
function dataQuery(root, paths) {
    let currentI = 0;
    let pathI = 0;
    const pathL = paths.length;
    let current = root;
    let currentL = current.length;

    try {
        while (1) {
            if (current[currentI][paths[pathI].key] === paths[pathI].value) {
                current = current[currentI];
                const temp = paths[pathI].objPath;

                for (i of temp) {
                    current = current[i];
                }
                currentL = current.length;
                currentI = -1;
                pathI++;
            }
            currentI++;
            if (currentI >= currentL || pathI >= pathL) break;
        }
    } catch {
        return false;
    }

    return current === root ? false : current;
}

function querySelectorByText(parent = document, selector, text) {
    const elements = parent.querySelectorAll(selector);
    return Array.from(elements).find((element) => {
        return element.textContent.trim().includes(text);
    });
}

function makeID() {
    return String(Math.floor(Math.random() * 10000)) + `-` + Date.now();
}

function getActiveProject(atr = false) {
    const node = projectPinBar.querySelector(`.project-pinItem.active`);
    return atr === `id` ? node : node.getAttribute(`data-project-id`);
}
function getActiveSection(atr = false) {
    const node = sectionBar.querySelector(`.section-item.active`);
    return atr === `id` ? node : node.getAttribute(`data-section-id`);
}

// function

function getProjectSource(projectId) {
    const output = dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [],
        },
    ]);
    return output;
}
function getSectionSource(projectId, sectionId) {
    const output = dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [`page`],
        },
        {
            key: `id`,
            value: sectionId,
            objPath: [],
        },
    ]);
    return output;
}
function getSectionSourceList(projectId) {
    const output = dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [`page`],
        },
    ]);
    return output;
}

function getContentSourceList(projectId, sectionId) {
    const output = dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [`page`],
        },
        {
            key: `id`,
            value: sectionId,
            objPath: [`content`],
        },
    ]);
    return output;
}

// ---------------------------- function onclick ----------------------------

function parentCLear(parent) {}

function clearActive(parent) {
    const list = Array.from(parent.children);
    list.forEach((node) => {
        node.classList.remove(`active`);
    });
}

function addToPin(tag) {
    const id = tag.getAttribute(`data-project-id`);
    const tagText = tag.querySelector(`.text`).textContent;
    const isExisted = projectPinBar.querySelector(`[data-project-id="${id}"]`);

    clearActive(projectPinBar);
    if (!isExisted) {
        projectPinBar.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-pinItem active" data-project-id="${id}" > <span class="text">${tagText}</span> <button class="project-pinCancel" >X</button></li>`,
        );
    } else {
        isExisted.classList.add(`active`);
    }
    sectionBarRender(id);
}

function sectionBarRender(projectId) {
    const list = getSectionSourceList(projectId);

    // render
    let html = `<li class="section-item-add">add</li>`;
    for (let i of list) {
        html += `<li class="section-item" data-section-id="${i.id}" ><span class="text">${i.name}</span><button class="edit">E</button><button class="destroy">D</button></li>`;
    }
    sectionBar.innerHTML = html;
}

function sectionActive(tag) {
    clearActive(sectionBar);
    tag.classList.add(`active`);
    const id = tag.getAttribute(`data-section-id`);
    const projectId = getActiveProject(`id`);
    const data = getContentSourceList(projectId, id);
}

function contentRender() {}
