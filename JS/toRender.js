// ----------------------------  init ----------------------------

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
        editProject(parent);
    } else if (nCl.contains(`destroy`)) {
        deleteProject(parent);
    }
};
document.body.onclick = (e) => {
    projectList.classList.add(`hide`);
};

// pin bar
projectPinBar.onclick = (e) => {
    e.stopPropagation();
    const n = e.target;
    const nCl = e.target.classList;
    const parent = n.closest(`.project-pinItem`);

    if (nCl.contains(`project-pinCancel`)) {
        closePin(parent);
    } else if (nCl.contains(`project-pinItem`) || nCl.contains(`text`)) {
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
        editSection(parent);
    } else if (eClassList.contains(`destroy`)) {
        deleteSection(parent);
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
    return atr === `id` ? node.getAttribute(`data-project-id`) : node;
}
function getActiveSection(atr = false) {
    const node = sectionBar.querySelector(`.section-item.active`);
    return atr === `id` ? node.getAttribute(`data-section-id`) : node;
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
    return dataQuery(testingList, [
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

function deleteData(array, id) {
    let index = null;
    for (let i in array) {
        if (array[i].id === id) index = i;
    }

    array.splice(index, 1);
}

// ---------------------------- function onclick ----------------------------

function parentCLear(list) {
    list.forEach((parent) => {
        parent.innerHTML = `...`;
    });
}

function clearActive(parent) {
    const list = Array.from(parent.children);
    list.forEach((node) => {
        node.classList.remove(`active`);
    });
}

function addInputTag(parentTag, submitCb) {
    if (!addInputTag.inputTag) {
        addInputTag.inputTag = makeANode({
            tagName: `div`,
            initClass: `getTempText`,
            innerHtml: `<input  type="text"><button class="submit" >V</button><button class="close" >X</button>`,
        });
    }
    const inputTag = addInputTag.inputTag;

    parentTag.append(inputTag);
    inputTag.querySelector(`input`).value =
        parentTag.querySelector(`.text`).textContent;

    inputTag.onclick = (e) => {
        const cl = e.target.classList;
        if (cl.contains(`submit`)) {
            //
            if (submitCb(inputTag)) inputTag.remove();
        } else if (cl.contains(`close`)) {
            //
            inputTag.remove();
        }
    };
}

// project list

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

function deleteProject(tag) {
    const id = tag.getAttribute(`data-project-id`);
    deleteData(testingList, id);
    // send delete to server
    // if done
    closePin(tag);
    projectListRender();
    console.log(testingList);
}

function editProject(tag) {
    const id = tag.getAttribute(`data-project-id`);

    addInputTag(tag, (inputTag) => {
        const oldName = tag.querySelector(`input`).textContent;
        const newName = inputTag.querySelector(`input`).value;
        const list = Array.from(projectList.querySelectorAll(`.text`));
        for (let i of list) {
            if (i.textContent == newName && i.textContent != oldName) {
                console.log(`this is dul`);
                return false;
            }
        }
        const source = getProjectSource(id);

        // update server

        // if done
        source.name = newName;
        projectListRender();

        const pinNode = projectPinBar.querySelector(
            `[data-project-id="${id}"] .text`,
        );
        if (pinNode) pinNode.textContent = newName;

        return true;
    });
}

function editSection(tag) {
    const id = tag.getAttribute(`data-section-id`);

    addInputTag(tag, (inputTag) => {
        const oldName = tag.querySelector(`input`).textContent;
        const newName = inputTag.querySelector(`input`).value;
        const list = Array.from(sectionBar.querySelectorAll(`.text`));
        for (let i of list) {
            if (i.textContent == newName && i.textContent != oldName) {
                console.log(`this is dul`);
                return false;
            }
        }
        const projectId = getActiveProject(`id`);
        const source = getSectionSource(projectId, id);
        console.log(id);

        // update server

        // if done
        source.name = newName;
        tag.querySelector(`.text`).textContent = newName;

        return true;
    });
}

// pin

function addToPin(tag) {
    if (tag.classList.contains(`active`)) return;

    const id = tag.getAttribute(`data-project-id`);
    const isExisted = projectPinBar.querySelector(`[data-project-id="${id}"]`);

    if (!isExisted) {
        clearActive(projectPinBar);
        const tagText = tag.querySelector(`.text`).textContent;
        projectPinBar.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-pinItem active" data-project-id="${id}" > <span class="text">${tagText}</span> <button class="project-pinCancel" >X</button></li>`,
        );
    } else {
        if (isExisted.classList.contains(`active`)) return;
        clearActive(projectPinBar);
        isExisted.classList.add(`active`);
    }
    parentCLear([sectionContent]);
    sectionBarRender(id);
}

function closePin(tag) {
    const id = tag.getAttribute(`data-project-id`);
    closeNode = projectPinBar.querySelector(`[data-project-id="${id}"]`);
    if (closeNode.classList.contains(`active`)) {
        parentCLear([sectionBar, sectionContent]);
    }
    closeNode.remove();
    closeNode = null;
}

// section

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
    contentRender(tag.getAttribute(`data-section-id`));
}

function deleteSection(tag) {
    const id = tag.getAttribute(`data-section-id`);
    const projectId = getActiveProject(`id`);
    const list = getSectionSourceList(projectId);
    deleteData(list, id);
    // send delete on server
    // if done
    sectionBarRender(projectId);
    parentCLear([sectionContent]);
}

// content
function contentRender(sectionId) {
    const projectId = getActiveProject(`id`);
    const data = getContentSourceList(projectId, sectionId);

    let html = ``;
    data.forEach((content) => {
        html += `<li class="contentItem" data-content-id="" >${content.html}</li>`;
    });
    sectionContent.innerHTML = html;
}
