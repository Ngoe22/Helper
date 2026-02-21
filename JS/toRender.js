// ----------------------------  init ----------------------------

// ----------------------------  onclick ----------------------------

// show list btn
projectListBtn.onclick = (e) => {
    e.stopPropagation();
    projectList.classList.toggle(`hide`);
    if (addInputTag.inputTag) {
        addInputTag.inputTag.remove();
        addInputTag.inputText.value = ``;
    }
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
    const node = e.target;
    if (!parent) return;
    e.stopPropagation();
    const eClassList = e.target.classList;

    // if (node.classList.contains(`hide-section`)) {
    //     sectionBar.classList.toggle(`hide-mode`);
    // } else

    if (node.classList.contains(`add`)) {
        addTag(parent, `section`);
    } else if (parent.classList.contains(`head`)) {
        return;
    } else if (
        eClassList.contains(`section-item`) ||
        eClassList.contains(`text`)
    ) {
        sectionActive(parent);
        renderContent();
    } else if (eClassList.contains(`edit`)) {
        editTagName(parent, `section`);
    } else if (eClassList.contains(`destroy`)) {
        deleteSection(parent);
    }
};

contentBoard.onclick = (e) => {
    const node = e.target;
    const list = node.classList;
    const contentCard = node.closest(`.content-card`);
    if (list.contains(`add-a-QA`)) {
        contentAddQA(node);
    } else if (list.contains(`add-a-toDoList`)) {
        contentAddToDo(node);
    } else if (list.contains(`edit-yellow`)) {
        getNewNameForContentCard(contentCard);
    } else if (list.contains(`destroy-red`)) {
        deleteContentCard(contentCard);
        // deleteReminderContentCard(contentCard);
    } else if (list.contains(`QA-add-new-row`)) {
        addContentQARow(contentCard);
    } else if (list.contains(`QA-row-edit`)) {
        const row = node.closest(`.QA-row`);
        getInputToEditContentOfQARow(contentCard, row);
    } else if (list.contains(`QA-row-destroy`)) {
        deleteContentQARow(contentCard, node.closest(`.QA-row`));
    } else if (list.contains(`toDo-add-new-row`)) {
        addContentToDoRow(contentCard);
    } else if (list.contains(`toDo-row-edit`)) {
        const row = node.closest(`.toDo-row`);
        getInputToEditContentOfToDoRow(contentCard, row);
    } else if (list.contains(`toDo-row-destroy`)) {
        deleteContentToDoRow(contentCard, node.closest(`.toDo-row`));
    } else if (list.contains(`toDo-due-date`)) {
        node.onchange = (e) => {
            updateDueForToDo(contentCard, node.closest(`.toDo-row`));
        };
    } else if (list.contains(`toDo-due-time`)) {
        node.onchange = (e) => {
            updateDueForToDo(contentCard, node.closest(`.toDo-row`));
        };
    } else if (list.contains(`toDo-due-reset`)) {
        resetDueForToDo(contentCard, node.closest(`.toDo-row`));
    } else if (list.contains(`rmHtml`)) {
        contentAddRemoveHtml();
    }

    //
    // contentAddRemoveHtml
};

contentBoard.onchange = (e) => {
    const node = e.target;
    const list = node.classList;
    if (list.contains(`removeHtml`)) {
        removeHtmlRun(node);
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
        return element.textContent.trim() === text;
    });
}

function makeID() {
    return Date.now() + `-` + String(Math.floor(Math.random() * 10000));
}

function getActiveProject(atr = false) {
    const node = projectPinBar.querySelector(`.project-pinItem.active`);
    if (!node) return false;

    if (atr === `id`) {
        return node.getAttribute(`data-project-id`);
    } else if (atr === `text`) {
        return node.textContent.trim();
    } else {
        return node;
    }
}
function getActiveSection(atr = false) {
    const node = sectionBar.querySelector(`.section-item.active`);
    if (!node) return false;

    if (atr === `id`) {
        return node.getAttribute(`data-section-id`);
    } else if (atr === `text`) {
        return node.textContent.trim();
    } else {
        return node;
    }
}

// function

function getProjectSource(projectId) {
    return dataQuery(mainData, [
        {
            key: `id`,
            value: projectId,
            objPath: [],
        },
    ]);
}
function getSectionSource(projectId, sectionId) {
    return dataQuery(mainData, [
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
    return dataQuery(mainData, [
        {
            key: `id`,
            value: projectId,
            objPath: [`pageData`],
        },
    ]);
}
function getContentSourceList(projectId, sectionId) {
    return dataQuery(mainData, [
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
    else {
        inputTag.querySelector(`input`).value = ``;
    }
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
            mainNotification(`Pls enter your title`, `red`);
            return false;
        }
        if (
            querySelectorByText(
                type === `section` ? sectionBar : projectList,
                `[data-${type}-id] .text`,
                newName,
            )
        ) {
            mainNotification(`This title already existed`, `red`);
            return false;
        }

        //
        runLoadingAnimation(true);
        //
        let result =
            type === `project`
                ? await projectUpdateToServer(id, newName)
                : await sectionUpdateToServer(id, newName);

        runLoadingAnimation(false);
        return result;
    }
    addInputTag(tag, editTagNameCallBack);
}
async function projectUpdateToServer(id, newName) {
    if (!(await updateData(mainURL, id, { name: newName }))) return false;
    updateMainData();
    editTextOfTag(projectList, `[data-project-id="${id}"] .text`, newName);
    editTextOfTag(projectPinBar, `[data-project-id="${id}"] .text`, newName);
    return true;
}
async function sectionUpdateToServer(id, newName) {
    const projectId = getActiveProject(`id`);
    const clone = structuredClone(getSectionSourceList(projectId));
    clone[id].name = newName;
    if (!(await updateData(mainURL, projectId, { pageData: clone })))
        return false;
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
            mainNotification(`Pls enter your title`, `red`);
            return false;
        }
        if (
            querySelectorByText(
                type === `section` ? sectionBar : projectList,
                `[data-${type}-id] .text`,
                newName,
            )
        ) {
            mainNotification(`This title already existed`, `red`);
            return false;
        }
        // return false;
        //

        runLoadingAnimation(true);
        let result =
            type === `project`
                ? await addProjectToServer(newName)
                : await addSectionToServer(newName);

        runLoadingAnimation(false);
        return result;
    }
    addInputTag(tag, addTagCallBack);
}
async function addProjectToServer(newName) {
    const parentId = makeID();
    const results = await postData(mainURL, {
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
    const result = await updateData(mainURL, projectId, { pageData: clone });
    if (!result) return false;
    await updateMainData();
    sectionBar.insertAdjacentHTML(
        `beforeend`,
        `<li class="section-item" data-section-id="${newId}"><span class="text">${newName}</span><button class="edit"></button><button class="destroy"></button></li>`,
    );

    return true;
}

// project list

function projectListRender() {
    projectList.innerHTML = `<li class="project-item add"></li>`;
    mainData.forEach((value) => {
        //
        projectList.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-item" data-project-id = "${value.id}"><span class="text">${value.name}</span><button class="edit"></button><button class="destroy"></button></li>`,
        );
    });
}

async function deleteProject(tag) {
    const ok = await askConfirm("Sure to delete this ?");
    if (!ok) return;

    runLoadingAnimation(true);
    const id = tag.getAttribute(`data-project-id`);
    const result = await deleteData(mainURL, id);
    if (!result) return console.log(`delete fail`);
    closePin(tag);
    await updateMainData();
    projectListRender();
    runLoadingAnimation(false);
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
            `<li class="project-pinItem active" data-project-id="${id}" > <span class="text">${tagText}</span> <button class="project-pinCancel unpin" ></button></li>`,
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
    // <button class="hide-section" ></button>
    let html = `
    <li class="section-item head">  
    <button class="add" ></button>
    </li>`;
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
}

async function deleteSection(tag) {
    const ok = await askConfirm("Sure to delete this ?");
    if (!ok) return;

    runLoadingAnimation(true);
    //
    const id = tag.getAttribute(`data-section-id`);
    const projectId = getActiveProject(`id`);
    // send delete on server
    const clone = structuredClone(getSectionSourceList(projectId));
    delete clone[id];
    // deleteArrayElById(clone, id);
    if (!(await updateData(mainURL, projectId, { pageData: clone })))
        return false;
    await updateMainData();
    if (tag.classList.contains(`active`)) parentCLear([contentBoard]);
    sectionBarRender(projectId);
    //
    runLoadingAnimation(false);
    return true;
}

// content

function getNewNameForContentCard(card) {
    if (!card) return;
    const nameNode = card.querySelector(`.card-name`);
    if (!nameNode) return;

    const inputForContent = makeANode({
        tagName: `div`,
        initClass: `inputForContent`,
        innerHtml: `<input  type="text"><button class="submit" ></button><button class="close" ></button>`,
    });

    const inputTag = inputForContent.querySelector(`input`);
    nameNode.replaceWith(inputForContent);
    inputTag.value = nameNode.textContent;
    inputTag.focus();

    inputForContent.onclick = (e) => {
        const list = e.target.classList;

        if (list.contains(`close`)) {
            inputForContent.replaceWith(nameNode);
        } else if (list.contains(`submit`)) {
            editContentCard(card, nameNode, inputTag.value);
            inputForContent.replaceWith(nameNode);
        }
    };
}

async function editContentCard(card, nameNode, newName) {
    runLoadingAnimation(true);
    //
    const id = card.getAttribute(`data-content-id`);
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const clone = structuredClone(getSectionSourceList(projectId));
    clone[sectionId].contentData[id].name = newName;
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    nameNode.textContent = newName;
    //
    runLoadingAnimation(false);
}

async function deleteContentCard(card) {
    const ok = await askConfirm("Sure to delete this ?");
    if (!ok) return;

    await deleteReminderContentCard(card);

    //
    runLoadingAnimation(true);
    //

    const id = card.getAttribute(`data-content-id`);
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const clone = structuredClone(getSectionSourceList(projectId));
    delete clone[sectionId].contentData[id];
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    card.remove();
    //
    runLoadingAnimation(false);
}

// --------------------------------------------- content

function renderContent() {
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const source = Object.entries(
        getProjectSource(projectId).pageData[sectionId].contentData,
    );
    // console.log(source);
    let html = ``;
    correspondFunc = {
        QA: renderContentQA,
        toDo: renderContentToDo,
        removeHtml: renderRemoveHtml,
    };
    for (let [key, value] of source) {
        html += `<div class="content-card" data-content-id = "${value.id}" data-content-type = "${value.type}"  >
            <div class="content-card-head">
                <div class="card-name">${value.name}</div>
                <div class="card-btns">
                    <button class="card-btn edit-yellow"></button>
                    <button class="card-btn destroy-red"></button>
                </div>
            </div>
            <div class="card-body">
                ${correspondFunc[value.type](value.rows)} 
            </div>
        </div>`;
    }
    html += `        
    <div class="tools">
        <div class="tool add-a-QA">QA</div>
        <div class="tool rmHtml">Remove HTML</div>
        <div class="tool add-a-toDoList">toDo</div>
    </div>`;
    contentBoard.innerHTML = html;
}

// QA part

async function contentAddQA(node) {
    //
    runLoadingAnimation(true);
    //
    const newId = makeID();
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const clone = structuredClone(getSectionSourceList(projectId));
    //
    clone[sectionId].contentData[newId] = {
        name: `newQA`,
        id: newId,
        type: `QA`,
        rows: {},
    };
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    renderContent();
    runLoadingAnimation(false);
}

function renderContentQA(obj) {
    const list = Object.entries(obj);
    let html = ``;
    for (let [key, QA] of list) {
        html += `<div class="QA-row"   data-qa-row-id = "${key}">
            <div class="QA-Q">${QA[0]}</div>
            <div class="QA-A">${QA[1]}</div>
            <div class="QA-btns">
                <button class="QA-btn QA-row-edit edit"></button>
                <button class="QA-btn QA-row-destroy destroy"></button>
            </div>
        </div>`;
    }
    // lop obj => add to html
    return `<div class="QA-card">
                <div class="QA-body">${html}</div>
                <div class="QA-add-new-row"></div>
            </div>`;
}

async function addContentQARow(contentCard) {
    runLoadingAnimation(true);
    //
    const newRowId = makeID();
    const contentId = contentCard.getAttribute(`data-content-id`);
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const clone = getSectionSourceList(projectId);
    clone[sectionId].contentData[contentId].rows[newRowId] = [`Q`, `A`];
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    renderContent();
    //
    runLoadingAnimation(false);
}

const getQA = makeANode({
    tagName: `div`,
    initClass: `tempToGetQA`,
    innerHtml: `
        <textarea class="tempToGetQA-Q" ></textarea>
        <textarea  class="tempToGetQA-A" ></textarea>
        <div class="tempToGetQA-btns">
            <button class="submit"></button>
            <button class="close"></button>
        </div>
        `,
});
function getInputToEditContentOfQARow(contentCard, row) {
    isInputOn = contentBoard.contains(getQA);
    if (isInputOn) {
        getQA.scrollIntoView({
            behavior: "smooth",
            block: "start", // start | center | end | nearest
        });
        getQA.querySelector(`.tempToGetQA-A`).focus();
        mainNotification(`Finish what QA you are editing`, `red`);
        return;
    }

    const Q = row.querySelector(`.QA-Q`);
    const A = row.querySelector(`.QA-A`);
    row.replaceWith(getQA);

    const inputQ = getQA.querySelector(`.tempToGetQA-Q`);
    const inputA = getQA.querySelector(`.tempToGetQA-A`);

    inputQ.value = Q.textContent;
    inputA.value = A.textContent;

    getQA.onclick = async (e) => {
        const list = e.target.classList;
        if (list.contains(`submit`)) {
            //
            runLoadingAnimation(true);
            //
            getQA.replaceWith(row);
            const projectId = getActiveProject(`id`);
            const sectionId = getActiveSection(`id`);
            const contentId = contentCard.getAttribute(`data-content-id`);
            const rowId = row.getAttribute(`data-qa-row-id`);
            const clone = getSectionSourceList(projectId);
            clone[sectionId].contentData[contentId].rows[rowId] = [
                inputQ.value,
                inputA.value,
            ];
            await updateData(mainURL, projectId, { pageData: clone });
            await updateMainData();
            renderContent();
            //
            runLoadingAnimation(false);
            //
        } else if (list.contains(`close`)) {
            getQA.replaceWith(row);
        }
    };
}

async function deleteContentQARow(contentCard, row) {
    const ok = await askConfirm("Sure to delete this ?");
    if (!ok) return;

    //
    runLoadingAnimation(true);
    //
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const contentId = contentCard.getAttribute(`data-content-id`);
    const rowId = row.getAttribute(`data-qa-row-id`);
    const clone = getSectionSourceList(projectId);
    delete clone[sectionId].contentData[contentId].rows[rowId];
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    renderContent();

    //
    runLoadingAnimation(false);
    //
}

// toDo list part

async function contentAddToDo() {
    //
    runLoadingAnimation(true);
    //
    const newId = makeID();
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const clone = structuredClone(getSectionSourceList(projectId));
    //

    clone[sectionId].contentData[newId] = {
        name: `new toDoList`,
        id: newId,
        type: `toDo`,
        rows: {},
    };
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    renderContent();
    runLoadingAnimation(false);
}

function renderContentToDo(toDoList) {
    const list = Object.entries(toDoList);
    let html = ``;
    // [ title , content , date ,time ]
    for (let [key, obj] of list) {
        html += `<div class="toDo-row" data-todo-row-id="${key}">
            <div class="toDo-header">
                <div class="toDo-due">          
                    <input type="date" class = "toDo-due-date" value="${obj.dueDate}"/>
                    <input type="time" class = "toDo-due-time"  value="${obj.dueTime}" >
                    <div class="toDo-due-reset">reset time</div>
                </div>
                <div class="toDo-btns">
                    <button class="toDo-btn toDo-row-edit edit"></button>
                    <button class="toDo-btn toDo-row-destroy destroy"></button>
                </div>
            </div>
            <div class="toDo-QA">
                <div class="toDo-Q">${obj.taskTitle}</div>
                <div class="toDo-A">${obj.taskContent}</div>
            </div>
        </div>`;
    }
    return `<div class="toDo-card">
                <div class="toDo-body">${html}</div>
                <div class="toDo-add-new-row"></div>
            </div>`;
}

async function addContentToDoRow(contentCard) {
    runLoadingAnimation(true);
    //
    const newRowId = makeID();
    const contentId = contentCard.getAttribute(`data-content-id`);
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const clone = getSectionSourceList(projectId);
    clone[sectionId].contentData[contentId].rows[newRowId] = {
        taskTitle: `task name`,
        taskContent: `task content`,
        dueDate: ``,
        dueTime: ``,
    };
    // [ title , content , date ,time ]
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    renderContent();
    //
    runLoadingAnimation(false);
}

async function deleteContentToDoRow(contentCard, row) {
    const ok = await askConfirm("Sure to delete this ?");
    if (!ok) return;

    runLoadingAnimation(true);
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const contentId = contentCard.getAttribute(`data-content-id`);
    const rowId = row.getAttribute(`data-todo-row-id`);
    const clone = getSectionSourceList(projectId);
    delete clone[sectionId].contentData[contentId].rows[rowId];
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    await updateReminder(rowId, {}, false);
    renderContent();

    runLoadingAnimation(false);
}

const getToDo = makeANode({
    tagName: `div`,
    initClass: `tempToGetToDo`,
    innerHtml: `
        <textarea class="tempToGetToDo-Q" ></textarea>
        <textarea  class="tempToGetToDo-A" ></textarea>
        <div class="tempToGetToDo-btns">
            <button class="submit"></button>
            <button class="close"></button>
        </div>
        `,
});
function getInputToEditContentOfToDoRow(contentCard, row) {
    isInputOn = contentBoard.contains(getToDo);
    if (isInputOn) {
        getToDo.scrollIntoView({
            behavior: "smooth",
            block: "start", // start | center | end | nearest
        });
        getToDo.querySelector(`.tempToGetToDo-A`).focus();
        mainNotification(`Finish what todoList you are editing`, `red`);
        return;
    }

    const Q = row.querySelector(`.toDo-Q`);
    const A = row.querySelector(`.toDo-A`);
    row.replaceWith(getToDo);

    const inputQ = getToDo.querySelector(`.tempToGetToDo-Q`);
    const inputA = getToDo.querySelector(`.tempToGetToDo-A`);

    inputQ.value = Q.textContent;
    inputA.value = A.textContent;

    getToDo.onclick = async (e) => {
        const list = e.target.classList;
        if (list.contains(`submit`)) {
            runLoadingAnimation(true);
            //
            getToDo.replaceWith(row);
            const projectId = getActiveProject(`id`);
            const sectionId = getActiveSection(`id`);
            const contentId = contentCard.getAttribute(`data-content-id`);
            const rowId = row.getAttribute(`data-todo-row-id`);
            const clone = getSectionSourceList(projectId);

            const obj = clone[sectionId].contentData[contentId].rows[rowId];
            obj.taskTitle = inputQ.value;
            obj.taskContent = inputA.value;

            await updateData(mainURL, projectId, { pageData: clone });
            await updateMainData();
            renderContent();
            //
            runLoadingAnimation(false);
        } else if (list.contains(`close`)) {
            getToDo.replaceWith(row);
        }
    };
}

async function updateDueForToDo(contentCard, row) {
    //

    const rowId = row.getAttribute(`data-todo-row-id`);
    const currentDate = row.querySelector(`.toDo-due-date`).value;
    const currentTime = row.querySelector(`.toDo-due-time`).value;

    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const contentId = contentCard.getAttribute(`data-content-id`);

    const clone = getSectionSourceList(projectId);
    const obj = clone[sectionId].contentData[contentId].rows[rowId];
    obj.dueDate = currentDate;
    obj.dueTime = currentTime;

    // runLoadingAnimation(true);

    await updateData(mainURL, projectId, { pageData: clone }); // push
    await updateMainData(); // pull

    if (currentDate || currentTime) {
        await updateReminder(rowId, {
            projectId: projectId,
            sectionId: sectionId,
            contentId: contentId,
            rowId: rowId,
            date: currentDate,
            time: currentTime,
            alarm: alarmFormat(from24ToAM(currentTime), currentDate),
        });
    } else {
        await updateReminder(rowId, {}, false);
    }
    // runLoadingAnimation(false);
    // updateReminder  include    updateMinorData();
    // renderContent();
}
function alarmFormat(time, date) {
    date = date.split("-").reverse().join("/");
    return time + ` | ` + date;
}
function from24ToAM(time) {
    time = time + `:00`;
    const array = time.split(`:`);
    var tail = ` AM`;
    let firstNum = Number(array[0]);

    if (firstNum >= 12) {
        firstNum = firstNum > 12 ? firstNum - 12 : 12;
        tail = ` PM`;
    }
    array[0] = firstNum + ``;
    return array.join(`:`) + tail;
}

async function resetDueForToDo(contentCard, row) {
    const currentDate = row.querySelector(`.toDo-due-date`).value;
    const currentTime = row.querySelector(`.toDo-due-time`).value;
    if (currentDate || currentTime) {
        row.querySelector(`.toDo-due-date`).value = ``;
        row.querySelector(`.toDo-due-time`).value = ``;
        updateDueForToDo(contentCard, row);
    }
}

async function deleteReminderContentCard(contentCard) {
    const type = contentCard.getAttribute(`data-content-type`);
    if (type !== `toDo`) return false;
    const list = contentCard.querySelectorAll(`[data-todo-row-id]`);
    if (!list) return false;
    runLoadingAnimation(true);
    const clone = structuredClone(minorData[0]);
    // data-todo-row-id
    for (let row of list) {
        let id = row.getAttribute(`data-todo-row-id`);
        delete clone.list[id];
    }

    await updateData(minorURL, `1`, clone);
    runLoadingAnimation(false);

    return;
}

//

async function contentAddRemoveHtml() {
    //
    runLoadingAnimation(true);
    //
    const newId = makeID();
    const projectId = getActiveProject(`id`);
    const sectionId = getActiveSection(`id`);
    const clone = structuredClone(getSectionSourceList(projectId));
    //

    clone[sectionId].contentData[newId] = {
        name: `new remove Html`,
        id: newId,
        type: `removeHtml`,
        // rows: ``,
    };
    await updateData(mainURL, projectId, { pageData: clone });
    await updateMainData();
    renderContent();
    runLoadingAnimation(false);
}

function renderRemoveHtml() {
    return (html = `
        <textarea class="removeHtml"></textarea>
        <div class="removedHtml"></div>
        <button class="getRemovedHtml">Copy</button>
    `);
}

function removeHtmlRun(node) {
    const result = node.nextElementSibling;
    const btn = result.nextElementSibling;

    console.log(node.value);

    // const processed = removingHtml(node.value);

    result.innerHTML = node.value;
    btn.onclick = (e) => {
        navigator.clipboard.writeText(result.innerText);
        mainNotification(`COPIED`, `green`);
    };
}

function removingHtml(text) {
    const array = text.split(``);
    const newArray = [];

    let switchh = true;

    for (let i in array) {
        const text = array[i];

        if (text === `<`) {
            switchh = false;
        } else if (text === `>`) {
            switchh = true;
            continue;
        }

        if (switchh) newArray.push(text);
    }

    return newArray.join(``);
}

// Pamper yourself or someone you love with our selectively curated <b>Aromatherapy Blueberry Milk Body Butter</b>, indulge in an upscale spa
