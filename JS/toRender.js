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
    if (addInputTag.inputTag) addInputTag.inputTag.remove();
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
        return element.textContent.trim().includes(text);
    });
}

function makeID() {
    return String(Math.floor(Math.random() * 10000)) + `-` + Date.now();
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
            objPath: [`page`],
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
            objPath: [`page`],
        },
    ]);
}
function getContentSourceList(projectId, sectionId) {
    return dataQuery(testingList, [
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
}
function deleteData(array, id) {
    let index = null;
    for (let i in array) {
        if (array[i].id === id) index = i;
    }
    if (index) array.splice(index, 1);
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
        if (i.textContent == newName && i.textContent != oldName) {
            return false;
        }
    }
    return true;
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

    // add init value
    const defaultText = parentTag.querySelector(`.text`);
    if (defaultText)
        inputTag.querySelector(`input`).value = defaultText.textContent;
    parentTag.append(inputTag);

    inputTag.onclick = (e) => {
        e.stopPropagation();
        const cl = e.target.classList;
        if (cl.contains(`submit`)) {
            //
            if (submitCb(inputTag)) inputTag.remove();
        } else if (cl.contains(`close`)) {
            //
            inputTag.querySelector(`input`).value = ``;
            inputTag.remove();
        }
    };
}

function editTagName(tag, type = ``) {
    if (![`section`, `project`].includes(type)) return;
    const id = tag.getAttribute(`data-${type}-id`);

    async function editTagNameCallBack(inputTag) {
        const newName = inputTag.querySelector(`input`).value;
        if (newName === ``) return console.log(`empty`);

        const textTag = tag.querySelector(`.text`);
        const oldName = textTag.textContent;
        const listFrom = type === `section` ? sectionBar : projectList;
        const list = Array.from(listFrom.querySelectorAll(`.text`));

        //
        if (!checkDulNameInList(list, oldName, newName))
            return console.log(`it is dul`);

        if (type === `section`) {
            const projectId = getActiveProject(`id`);
            const source = getProjectSource(projectId);
            const clone = structuredClone(source);
            const sectionSource = getSectionSource(projectId, id);
            clone.page.forEach((page) => {
                if (page.id === id) page.name = newName;
            });

            const result = await updateData(projectId, clone);
            console.log(result);
            if (!result) return;

            // if done
            sectionSource.name = newName;
            textTag.textContent = newName;
        } else {
            const source = getProjectSource(id);
            console.log(source);

            // update server
            const clone = structuredClone(source);
            clone.name = newName;

            const result = await updateData(id, clone);
            console.log(result);
            if (!result) return;
            // const result = deleteData(id);

            // if done
            source.name = newName;
            textTag.textContent = newName;
            const pinNode = projectPinBar.querySelector(
                `[data-project-id="${id}"] .text`,
            );
            if (pinNode) pinNode.textContent = newName;
        }

        inputTag.querySelector(`input`).value = ``;
        return true;
    }

    addInputTag(tag, editTagNameCallBack);
}

function addTag(tag, type = ``) {
    if (![`section`, `project`].includes(type)) return;

    async function addTagCallBack(inputTag) {
        // xu ly xss
        const newName = inputTag.querySelector(`input`).value.trim();
        if (newName === ``) return console.log(`empty`);
        const listFrom = type === `section` ? sectionBar : projectList;
        const list = Array.from(listFrom.querySelectorAll(`.text`));
        //
        if (!checkDulNameInList(list, ``, newName))
            return console.log(`it is dul`);

        const newObj = {
            name: newName,
            // id: newId,
            [type === `project` ? `page` : `content`]: [],
        };

        if (type === `project`) {
            var source = testingList;
            var parent = projectList;

            //  append newObj to server
            var result = await postData(newObj);
            var newId = result.id;
            newObj.id = newId;
            //
        } else {
            const projectId = getActiveProject(`id`);
            var source = getSectionSourceList(projectId);
            var parent = sectionBar;
            var copyProject = structuredClone(getProjectSource(projectId));
            var newId = makeID();
            newObj.id = newId;
            copyProject.page.push(newObj);

            //  append copyProject to server
            var result = await updateData(projectId, copyProject);
        }
        // console.log(newObj);

        source.push(newObj);
        parent.insertAdjacentHTML(
            `beforeend`,
            `<li class="${type}-item" data-${type}-id="${newObj.id}"><span class="text">${newName}</span><button class="edit">E</button><button class="destroy">D</button></li>`,
        );
        console.log(testingList);

        inputTag.querySelector(`input`).value = ``;
        return true;
    }
    addInputTag(tag, addTagCallBack);
}

// project list

function projectListRender() {
    projectList.innerHTML = `<li class="project-item add">add</li>`;

    testingList.forEach((value) => {
        //
        projectList.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-item" data-project-id = "${value.id}"><span class="text">${value.name}</span><button class="edit">E</button><button class="destroy">D</button></li>`,
        );
    });
}

function deleteProject(tag) {
    const id = tag.getAttribute(`data-project-id`);

    // send delete to server
    // if done
    deleteData(testingList, id);
    closePin(tag);
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
    if (!closeNode) return;
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
    let html = `<li class="section-item add">add</li>`;

    if (list) {
        for (let i of list) {
            html += `<li class="section-item" data-section-id="${i.id}" ><span class="text">${i.name}</span><button class="edit">E</button><button class="destroy">D</button></li>`;
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
        html += `<li class="contentItem" data-content-id="${content.id}" >${content.html}</li>`;
    });
    sectionContent.innerHTML = html;
}
