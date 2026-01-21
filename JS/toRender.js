const current = {
    pinList: [],
};

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
    const clicked = e.target;
    const clickedCl = clicked.classList;
    const parent = clicked.closest(`.project-item`);

    if (clicked === projectListBtn) {
        projectList.classList.toggle(`hide`);
    }
    if (clickedCl.contains(`project-item`) || clickedCl.contains(`text`)) {
        pinClickHandle({
            node: parent,
            addPin: true,
            contentReset: true,
        });
    } else if (clickedCl.contains(`edit`)) {
        editProjectClickHandle(parent);
    } else if (clickedCl.contains(`destroy`)) {
        deleteProjectClick(parent);
    }
};
document.body.onclick = (e) => {
    projectList.classList.add(`hide`);
    focusInputRemove();
};

// pin bar
projectPinList.onclick = (e) => {
    e.stopPropagation();
    const clicked = e.target;
    const eClassList = e.target.classList;
    if (eClassList.contains(`project-pinCancel`)) {
        unpinClickHandle(clicked);
    }
    if (eClassList.contains(`project-pinItem`)) {
        pinClickHandle({
            node: clicked,
            addPin: false,
            contentReset: true,
        });
    }
};

// sections
sectionList.onclick = (e) => {
    const parent = e.target.closest(`.section-item`);

    e.stopPropagation();
    const eClassList = e.target.classList;
    if (eClassList.contains(`section-item`) || eClassList.contains(`text`)) {
        sideListActive(parent);
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
    option = Object.assign(
        {
            tagName: `div`,
            class: ``,
            innerHtml: ``,
        },
        input,
    );

    const newNode = document.createElement(option.tagName);
    newNode.className = option.class;
    newNode.innerHTML = option.innerHtml;

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

    // console.log(current);
    return current === root ? false : current;
}

function querySelectorByText(parent = document, selector, text) {
    const elements = parent.querySelectorAll(selector);
    return Array.from(elements).find((element) => {
        return element.textContent.trim().includes(text);
    });
}

function updatePinArray() {}

function makeID() {
    return String(Math.floor(Math.random() * 10000)) + `-` + Date.now();
}
// ---------------------------- function onclick ----------------------------

const currentActive = {
    pinID: ``,
    sectionID: ``,
    pinList: [],
};
// add init set from sever

function pinClickHandle(input) {
    options = Object.assign(
        {
            node: null,
            addPin: false,
            contentReset: false,
        },
        input,
    );
    const { node, addPin, contentReset } = options;
    const projectID = node.getAttribute("data-project-id");

    // check is Active
    if (currentActive.pinID === projectID) return;

    if (addPin) {
        if (currentActive.pinList.includes(projectID)) {
            //
        } else {
            currentActive.pinList.push(projectID);
        }
    }

    // update currentActive.pin
    currentActive.pinID = projectID.trim();

    pinRender();
    sideListRender();
    contentRender(contentReset);
}

function unpinClickHandle(clicked) {
    pinList = currentActive.pinList;
    projectID = clicked
        .closest(`.project-pinItem`)
        .getAttribute("data-project-id");
    arrayDelete(pinList, projectID);
    if (pinList.length === 0) {
        currentActive.pin = ``;
        pinRender();
        sideListRender(true);
        contentRender(true);
    } else {
        if (currentActive.pinID === projectID) {
            moveToTheLastPin();
            sideListRender();
            contentRender(true);
        }
        pinRender();
    }
}
function moveToTheLastPin() {
    pinList = currentActive.pinList;
    const lastInList = pinList[pinList.length - 1];
    currentActive.pinID = lastInList;
}

//  ---------------------------- render ----------------------------

function pinRender() {
    if (currentActive.pinList.length === 0)
        return (projectPinList.innerHTML = `...`);

    //  render
    const projectID = currentActive.pinID;
    const list = currentActive.pinList;

    // get newest names
    const getName = {};
    for (let i of testingList) {
        getName[i.id] = i.name;
    }

    projectPinList.innerHTML = ``;
    for (let i of list) {
        projectPinList.insertAdjacentHTML(
            `beforeend`,
            i === projectID
                ? `<li class="project-pinItem active" data-project-id="${i}" >${getName[i]}<button class="project-pinCancel" >X</button></li>`
                : `<li class="project-pinItem" data-project-id="${i}" >${getName[i]}<button class="project-pinCancel" >X</button></li>`,
        );
    }
}

function sideListRender(reset = false) {
    if (reset) {
        currentActive.sectionID = ``;
        return (sectionList.innerHTML = `...`);
    }
    const data = dataQuery(testingList, [
        {
            key: `id`,
            value: `${currentActive.pinID}`,
            objPath: [`page`],
        },
    ]);
    if (!data) {
        sectionList.innerHTML = `...`;
        return console.log(`section render : no match data`);
    }
    // render
    let html = `<li class="section-item-add">add</li>`;
    for (let i of data) {
        html += `<li class="section-item" data-section-id="${i.id}" ><span class="text">${i.name}</span><button class="edit">E</button><button class="destroy">D</button></li>`;
    }
    sectionList.innerHTML = html;
}

function sideListActive(sectionNode) {
    const sectionID = sectionNode.getAttribute("data-section-id");

    if (!sectionNode.classList.contains(`active`)) {
        clearActive(sectionList, `.section-item.active`);
        currentActive.sectionID = sectionID;
        sectionNode.classList.add(`active`);
        contentRender();
    }
}

function contentRender(reset = false) {
    if (reset) return (sectionContent.innerHTML = `...`);

    const data = dataQuery(testingList, [
        {
            key: `id`,
            value: `${currentActive.pinID}`,
            objPath: [`page`],
        },
        {
            key: `id`,
            value: `${currentActive.sectionID}`,
            objPath: [`content`],
        },
    ]);

    sectionContent.innerHTML = ``;
    for (let i of data) {
        sectionContent.insertAdjacentHTML(
            `beforeend`,
            `<li class="section-content-card" >${i.type} \n ${i.html}</li>`,
        );
    }
}

//  ---------------------------- modified ----------------------------

function editProjectClickHandle(e) {
    obj = {
        dataAddress: dataQuery(testingList, [
            {
                key: `id`,
                value: e.getAttribute(`data-project-id`),
                objPath: [],
            },
        ]),
        textQuerySelector: `.project-item .text`,
        renderPart: `project`,
        editingTag: e,
    };
    editHandle(obj);
}

function editSectionClickHandle(e) {
    obj = {
        dataAddress: dataQuery(testingList, [
            {
                key: `id`,
                value: currentActive.pinID,
                objPath: [`page`],
            },
            {
                key: `id`,
                value: e.getAttribute(`data-section-id`),
                objPath: [],
            },
        ]),
        textQuerySelector: `.project-item .text`,
        renderPart: `section`,
        editingTag: e,
    };
    editHandle(obj);
}

//  ---------------------------- modified process ----------------------------

function focusInputRemove() {
    // let focusInput = editHandle.focusInput;
    // input node delete
    if (!editHandle.focusInput) return;

    editHandle.focusInput.remove();
    editHandle.focusInput.onclick = null;
    editHandle.focusInput = null;
    editHandle.focusInput = null;
}

// let focusInput = null;
function editHandle(obj) {
    if (editHandle.focusInput) {
        editHandle.focusInput.querySelector(`input`).focus();
        return;
    }

    const { dataAddress, textQuerySelector, renderPart, editingTag } = obj;

    let inputNode = makeANode({
        tagName: `div`,
        class: `getTempText`,
        innerHtml: `<input type="text"><button class="submit" >V</button><button class="close" >X</button>`,
    });

    const inputTag = inputNode.querySelector(`input`);
    const oldName = editingTag.querySelector(`.text`).textContent;
    inputTag.value = oldName;

    inputNode.onclick = (e) => {
        const eCl = e.target.classList;
        if (eCl.contains(`submit`)) {
            //
            const newName = inputTag.value;

            const isDul = querySelectorByText(
                projectList,
                textQuerySelector,
                newName,
            );

            if (isDul === undefined || isDul.textContent === oldName) {
                // update to sever then update

                dataAddress.name = newName;
                // render after modified
                if (renderPart === `project`) {
                    projectListRender();
                    pinRender();
                } else if (renderPart === `section`) {
                    sideListRender();
                }
            } else {
                return console.log(`it is dul bro`);
            }
        } else if (eCl.contains(`close`)) {
            //
        } else {
            return;
        }
        focusInputRemove();
    };

    editHandle.focusInput = inputNode;
    editingTag.append(inputNode);
}

// delete

function deleteProjectClick(e) {
    const tagId = e.getAttribute(`data-project-id`);
    const obj = {
        idList: currentActive.pinList,
        id: tagId,
        dataSource: testingList,
        deleteData: dataQuery(testingList, [
            {
                key: `id`,
                value: tagId,
                objPath: [],
            },
        ]),
        type: `project`,
    };
    deleteHandle(obj);
}

function deleteSectionClick(e) {
    const tagId = e.getAttribute(`data-section-id`);
    const obj = {
        id: tagId,
        dataSource: dataQuery(testingList, [
            {
                key: `id`,
                value: currentActive.pinID,
                objPath: [`page`],
            },
        ]),
        deleteData: dataQuery(testingList, [
            {
                key: `id`,
                value: currentActive.pinID,
                objPath: [`page`],
            },
            {
                key: `id`,
                value: tagId,
                objPath: [],
            },
        ]),
        type: `section`,
    };
    deleteHandle(obj);
}

function deleteHandle(obj) {
    const { idList, id, dataSource, deleteData, type } = obj;

    arrayDelete(dataSource, deleteData);
    if (type === `project`) {
        arrayDelete(idList, id);
        if (currentActive.pinID === id) {
            moveToTheLastPin();
        }
        projectListRender();
        pinRender();
    }

    console.log(currentActive.sectionID, id);

    if (type === `section` && currentActive.sectionID === id) {
        contentRender(true);
    }
    sideListRender();
}

//  ---------------------------- check ----------------------------
