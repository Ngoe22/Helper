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
            `<li class="project-item" data-project = "${value.name}"><span class="text">${value.name}</span><button class="edit">E</button><button class="destroy">D</button></li>`,
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

    if (clicked === projectListBtn) {
        projectList.classList.toggle(`hide`);
    }
    if (clickedCl.contains(`project-item`) || clickedCl.contains(`text`)) {
        pinClickHandle({
            node: clicked.closest(`.project-item`),
            addPin: true,
            contentReset: true,
        });
    } else if (clickedCl.contains(`edit`)) {
        editProject(clicked);
        console.log(`edit`);
    } else if (clickedCl.contains(`destroy`)) {
        // destroySection();
    }
};
document.body.onclick = (e) => {
    projectList.classList.add(`hide`);
};

// pin bar
projectPinList.onclick = (e) => {
    e.stopPropagation();
    const eClassList = e.target.classList;
    if (eClassList.contains(`project-pinCancel`)) {
        unpinClickHandle(e.target);
    }
    if (eClassList.contains(`project-pinItem`)) {
        pinClickHandle({
            node: e.target,
            addPin: false,
            contentReset: true,
        });
    }
};

// sections
sectionList.onclick = (e) => {
    const eClassList = e.target.classList;
    if (eClassList.contains(`section-item`) || eClassList.contains(`text`)) {
        sideListActive(e.target.closest(`.section-item`));
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
    // console.log(current);
    return current === root ? false : current;
}

function querySelectorByText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).find((element) => {
        return element.textContent.trim().includes(text);
    });
}

function updatePinArray() {}

// ---------------------------- function onclick ----------------------------

const currentActive = {
    pin: ``,
    section: ``,
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
    projectName = node.getAttribute("data-project");
    if (addPin) {
        if (currentActive.pinList.includes(projectName)) {
            //
        } else {
            currentActive.pinList.push(projectName);
        }
    }

    // check is Active
    if (currentActive.pin === projectName) return;

    // update currentActive.pin
    currentActive.pin = projectName.trim();

    pinRender();
    sideListRender();
    contentRender(contentReset);
}

function unpinClickHandle(clicked) {
    pinList = currentActive.pinList;
    projectName = clicked
        .closest(`.project-pinItem`)
        .getAttribute("data-project");
    arrayDelete(pinList, projectName);
    if (pinList.length === 0) {
        currentActive.pin = ``;
        pinRender();
        sideListRender(true);
        contentRender(true);
    } else {
        if (currentActive.pin === projectName) {
            const lastInList = pinList[pinList.length - 1];
            currentActive.pin = lastInList;
            sideListRender();
            contentRender(true);
        }
        pinRender();
    }
}

//  ---------------------------- render ----------------------------

function pinRender() {
    if (currentActive.pinList.length === 0)
        return (projectPinList.innerHTML = `...`);

    const projectName = currentActive.pin;

    //  render
    const list = currentActive.pinList;
    projectPinList.innerHTML = ``;
    for (let i of list) {
        projectPinList.insertAdjacentHTML(
            `beforeend`,
            i === projectName
                ? `<li class="project-pinItem active" data-project="${i}" >${i}<button class="project-pinCancel" >X</button></li>`
                : `<li class="project-pinItem" data-project="${i}" >${i}<button class="project-pinCancel" >X</button></li>`,
        );
    }
}

function sideListRender(reset = false) {
    if (reset) {
        currentActive.section = ``;
        return (sectionList.innerHTML = `...`);
    }
    const data = dataQuery(testingList, [
        {
            key: `name`,
            value: `${currentActive.pin}`,
            objPath: [`page`],
        },
    ]);

    if (!data) return console.log(`no match data`);

    //
    let html = `<li class="section-item-add">add</li>`;
    for (let i of data) {
        html += `<li class="section-item" data-section="${i.name}" ><span class="text">${i.name}</span><button class="edit">E</button><button class="destroy">D</button></li>`;
    }
    sectionList.innerHTML = html;
}

function sideListActive(sectionNode) {
    // const sectionName = sectionNode.textContent;
    const sectionName = sectionNode.getAttribute("data-section");

    if (!sectionNode.classList.contains(`active`)) {
        clearActive(sectionList, `.section-item.active`);
        currentActive.section = sectionName;
        sectionNode.classList.add(`active`);
        contentRender();
    }
}

function contentRender(reset = false) {
    if (reset) return (sectionContent.innerHTML = `...`);
    const data = dataQuery(testingList, [
        {
            key: `name`,
            value: `${currentActive.pin}`,
            objPath: [`page`],
        },
        {
            key: `name`,
            value: `${currentActive.section}`,
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

let focusInput = null;
function editProject(editNode) {
    if (focusInput) {
        focusInput.focus();
        return;
    }

    const parent = editNode.closest(`.project-item`);

    const inputNode = makeANode({
        tagName: `div`,
        class: `getTempText`,
        innerHtml: `<input type="text"><button class="submit" >V</button><button class="close" >X</button>`,
    });
    const projectOldName = parent.getAttribute(`data-project`);
    const inputTag = inputNode.querySelector(`input`);
    inputTag.value = projectOldName;

    inputNode.onclick = (e) => {
        const eCl = e.target.classList;
        const pinList = currentActive.pinList;

        if (eCl.contains(`submit`)) {
            //
            const projectDataItem = dataQuery(testingList, [
                {
                    key: `name`,
                    value: projectOldName,
                    objPath: [],
                },
            ]);
            const projectNewName = inputTag.value;

            // check duplicated
            if (projectOldName === projectNewName) {
                focusInput = null;
                inputNode.remove();
                return;
            }

            if (testingList.some((value) => value.name === projectNewName))
                return console.log(`dul`);

            if (projectDataItem.name === currentActive.pin)
                currentActive.pin = projectNewName; // update currentActive.pin

            projectDataItem.name = projectNewName; // update main

            for (i in pinList) {
                if (pinList[i] === projectOldName) {
                    pinList[i] = projectNewName;
                }
            }
            projectListRender();
            pinRender();
            focusInput = null;
            inputNode.remove();
        } else if (eCl.contains(`close`)) {
            focusInput = null;
            inputNode.remove();
        }
    };

    focusInput = inputTag;
    parent.append(inputNode);
}

//  ---------------------------- check ----------------------------
