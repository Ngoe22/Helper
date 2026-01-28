// ----------------------------  init ----------------------------

// ----------------------------  onclick ----------------------------

// show list btn
projectListBtn.onclick = (e) => {
    e.stopPropagation();
    projectList.classList.toggle(`hide`);
};

projectList.onclick = (e) => {
    e.stopPropagation();
    const n = e.target;
    if (n === projectList) return;
    const nCl = n.classList;
    const parent = n.closest(`.project-item`);

    if (parent.classList.contains(`add`)) {
        addTag(parent, `project`);
    } else if (nCl.contains(`project-item`) || nCl.contains(`text`)) {
        //
        addToPin(parent);
    } else if (nCl.contains(`edit`)) {
        editTagName(parent, `project`);
    } else if (nCl.contains(`destroy`)) {
        deleteProject(parent);
    }
};
document.body.onclick = (e) => {
    projectList.classList.add(`hide`);
    if (addInputTag.inputTag) {
        addInputTag.inputTag.remove();
        addInputTag.inputText.value = ``;
    }
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
    if (!parent) return;
    e.stopPropagation();
    const eClassList = e.target.classList;
    if (parent.classList.contains(`add`)) {
        addTag(parent, `section`);
    } else if (
        eClassList.contains(`section-item`) ||
        eClassList.contains(`text`)
    ) {
        sectionActive(parent);
    } else if (eClassList.contains(`edit`)) {
        editTagName(parent, `section`);
    } else if (eClassList.contains(`destroy`)) {
        deleteSection(parent);
    }
};

contentBoard.onclick = (e) => {
    console.log(`meow`);

    const node = e.target;
    if (node.classList.contains(`add`)) {
        contentAdd(node);
        return;
    }
    const parent = e.target.closest(`.content-card`);
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
        return element.textContent.trim() === text;
    });
}

function makeID() {
    return Date.now() + `-` + String(Math.floor(Math.random() * 10000));
}

function getActiveProject(atr = false) {
    const node = projectPinBar.querySelector(`.project-pinItem.active`);
    if (!node) return false;
    return atr === `id` ? node.getAttribute(`data-project-id`) : node;
}
function getActiveSection(atr = false) {
    const node = sectionBar.querySelector(`.section-item.active`);
    return atr === `id` ? node.getAttribute(`data-section-id`) : node;
}

// function

function getProjectSource(projectId) {
    return dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [],
        },
    ]);
}
function getSectionSource(projectId, sectionId) {
    return dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [`pageData`],
        },
        {
            key: `id`,
            value: sectionId,
            objPath: [],
        },
    ]);
}
function getSectionSourceList(projectId) {
    return dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [`pageData`],
        },
    ]);
}
function getContentSourceList(projectId, sectionId) {
    return dataQuery(testingList, [
        {
            key: `id`,
            value: projectId,
            objPath: [`pageData`, sectionId, `contentData`],
        },
    ]);
}
function deleteArrayElById(array, id) {
    let index = null;
    for (let i in array) {
        if (array[i].id === id) index = i;
    }
    if (index) array.splice(index, 1);
}

function editTextOfTag(parentTag, selector, text) {
    const tag = parentTag.querySelector(selector);
    if (tag) return (tag.textContent = text);
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

function checkDulNameInList(list, oldName, newName) {
    for (let i of list) {
        if (i.name === newName && i.name !== oldName) {
            return true;
        }
    }
    return false;
}

function addInputTag(parentTag, submitCb) {
    if (!addInputTag.inputTag) {
        addInputTag.inputTag = makeANode({
            tagName: `div`,
            initClass: `getTempText`,
            innerHtml: `<input  type="text"><button class="submit" ></button><button class="close" ></button>`,
        });
        addInputTag.inputText = addInputTag.inputTag.querySelector(`input`);
        addInputTag.onClose = () => {
            addInputTag.inputTag.remove();
            addInputTag.inputText.value = ``;
            inputTag.classList.remove(`none-touch`);
        };
    }
    const [inputTag, inputText] = [addInputTag.inputTag, addInputTag.inputText];

    // add init value
    const defaultText = parentTag.querySelector(`.text`);
    if (defaultText)
        inputTag.querySelector(`input`).value = defaultText.textContent;
    parentTag.append(inputTag);
    inputText.focus();
    inputTag.onclick = (e) => {
        e.stopPropagation();
        const cl = e.target.classList;
        if (cl.contains(`submit`)) {
            inputTag.classList.add(`none-touch`);
            //
            submitCb(inputTag).then((result) => {
                if (result) {
                    addInputTag.onClose();
                } else {
                    inputTag.classList.remove(`none-touch`);
                    addInputTag.inputText.focus();
                }
            });
        } else if (cl.contains(`close`)) {
            //
            addInputTag.onClose();
        }
    };
}

// editTagNameCheck
// editTagName
function editTagName(tag, type = ``) {
    if (![`section`, `project`].includes(type)) return false;

    async function editTagNameCallBack(inputTag) {
        const id = tag.getAttribute(`data-${type}-id`);
        const newName = inputTag.querySelector(`input`).value.trim();
        const oldName = tag.querySelector(`.text`).textContent;

        if (newName === oldName) return true;
        if (newName === ``) {
            console.log(`empty bro`);
            return false;
        }
        if (
            querySelectorByText(
                type === `section` ? sectionBar : projectList,
                `[data-${type}-id] .text`,
                newName,
            )
        ) {
            console.log(`dul bro`);
            return false;
        }

        //
        return (result =
            type === `project`
                ? await projectUpdateToServer(id, newName)
                : await sectionUpdateToServer(id, newName));
    }
    addInputTag(tag, editTagNameCallBack);
}
async function projectUpdateToServer(id, newName) {
    // const clone = structuredClone(getProjectSource(id));
    // clone.name = newName;
    if (!(await updateData(id, { name: newName }))) return false;
    updateMainData();
    editTextOfTag(projectList, `[data-project-id="${id}"] .text`, newName);
    editTextOfTag(projectPinBar, `[data-project-id="${id}"] .text`, newName);
    return true;
}
async function sectionUpdateToServer(id, newName) {
    const projectId = getActiveProject(`id`);
    const clone = structuredClone(getSectionSourceList(projectId));
    clone[id].name = newName;
    if (!(await updateData(projectId, { pageData: clone }))) return false;
    updateMainData();
    editTextOfTag(sectionBar, `[data-section-id="${id}"] .text`, newName);
    return true;
}

//  adding tag

function addTag(tag, type = ``) {
    if (![`section`, `project`].includes(type)) return;

    async function addTagCallBack(inputTag) {
        // xu ly xss
        // project
        const newName = inputTag.querySelector(`input`).value.trim();
        if (newName === ``) {
            console.log(`empty bro`);
            return false;
        }
        if (
            querySelectorByText(
                type === `section` ? sectionBar : projectList,
                `[data-${type}-id] .text`,
                newName,
            )
        ) {
            console.log(`dul bro`);
            return false;
        }
        // return false;
        //
        return (result =
            type === `project`
                ? await addProjectToServer(newName)
                : await addSectionToServer(newName));
    }
    addInputTag(tag, addTagCallBack);
}
async function addProjectToServer(newName) {
    const parentId = makeID();
    const results = await postData({
        name: newName,
        csId: parentId,
        pageData: {},
    });
    if (!results.id) return false;
    updateMainData();
    projectList.insertAdjacentHTML(
        `beforeend`,
        `<li class="project-item" data-project-id="${results.id}"><span class="text">${newName}</span><button class="edit"></button><button class="destroy"></button></li>`,
    );
    return true;
}
async function addSectionToServer(newName) {
    const newId = makeID();
    const projectId = getActiveProject(`id`);

    const clone = structuredClone(getSectionSourceList(projectId));

    // return true;
    clone[newId] = {
        name: newName,
        id: newId,
        contentData: {},
    };

    console.log(clone);
    // return true;
    const result = await updateData(projectId, { pageData: clone });
    if (!result) return false;
    await updateMainData();
    sectionBar.insertAdjacentHTML(
        `beforeend`,
        `<li class="section-item" data-section-id="${newId}"><span class="text">${newName}</span><button class="edit">E</button><button class="destroy">D</button></li>`,
    );

    return true;
}

// project list

function projectListRender() {
    projectList.innerHTML = `<li class="project-item add"></li>`;
    testingList.forEach((value) => {
        //
        projectList.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-item" data-project-id = "${value.id}"><span class="text">${value.name}</span><button class="edit"></button><button class="destroy"></button></li>`,
        );
    });
}

async function deleteProject(tag) {
    const id = tag.getAttribute(`data-project-id`);
    const result = await deleteData(id);
    if (!result) return console.log(`delete fail`);
    closePin(tag);
    await updateMainData();
    projectListRender();
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
            `<li class="project-pinItem active" data-project-id="${id}" > <span class="text">${tagText}</span> <button class="project-pinCancel close" ></button></li>`,
        );
    } else {
        if (isExisted.classList.contains(`active`)) return;
        clearActive(projectPinBar);
        isExisted.classList.add(`active`);
    }
    parentCLear([contentBoard]);
    sectionBarRender(id);
}

function closePin(tag) {
    const id = tag.getAttribute(`data-project-id`);
    closeNode = projectPinBar.querySelector(`[data-project-id="${id}"]`);
    if (!closeNode) return;
    if (closeNode.classList.contains(`active`)) {
        parentCLear([sectionBar, contentBoard]);
    }
    closeNode.remove();
    closeNode = null;
}

// section

function sectionBarRender(projectId) {
    const list = Object.entries(getSectionSourceList(projectId));
    // render
    let html = `<li class="section-item add"></li>`;
    if (list) {
        for (let [key, value] of list) {
            html += `<li class="section-item" data-section-id="${value.id}" ><span class="text">${value.name}</span><button class="edit"></button><button class="destroy"></button></li>`;
        }
    }
    sectionBar.innerHTML = html;
}

function sectionActive(tag) {
    if (tag.classList.contains(`add`)) return;
    clearActive(sectionBar);
    tag.classList.add(`active`);
    contentRender(tag.getAttribute(`data-section-id`));
}

async function deleteSection(tag) {
    const id = tag.getAttribute(`data-section-id`);
    const projectId = getActiveProject(`id`);
    // send delete on server
    const clone = structuredClone(getSectionSourceList(projectId));
    delete clone[id];
    // deleteArrayElById(clone, id);
    if (!(await updateData(projectId, { pageData: clone }))) return false;
    await updateMainData();
    if (tag.classList.contains(`active`)) parentCLear([contentBoard]);
    sectionBarRender(projectId);
    return true;
}

// content
function contentRender(sectionId) {
    const projectId = getActiveProject(`id`);
    const data = Array.from(getContentSourceList(projectId, sectionId));

    let html = ``;
    data.forEach((content) => {
        html += `<li class="contentItem" data-content-id="${content.id}" >${content.html}</li>`;
    });
    html += `<li class="contentItem add"  >add</li>`;
    contentBoard.innerHTML = html;
}

function contentAdd(node) {
    contentBoard.insertAdjacentHTML(
        `beforeend`,
        `
        <div class="content-card">
            <div class="card-head">
                <div class="card-title"></div>
                <div class="card-btns">
                    <button class="card-btn edit-title"></button>
                    <button class="card-btn edit-title"></button>
                </div>
            </div>
            <div class="card-body">meow</div>
        </div>
        `,
    );
}
