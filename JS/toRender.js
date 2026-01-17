const current = {
    pinList: [],
};

// ----------------------------  init ----------------------------

function initRender() {
    testingList.forEach((value) => {
        projectList.insertAdjacentHTML(
            `beforeend`,
            `<li class="project-item">${value.name}</li>`,
        );
    });
}
initRender();

// ----------------------------  onclick ----------------------------

// show list btn
projectListWrap.onclick = (e) => {
    e.stopPropagation();
    const clicked = e.target;
    if (clicked === projectListBtn) {
        projectList.classList.toggle(`hide`);
    }
    if (clicked.classList.contains(`project-item`)) {
        // projectOpen(clicked);

        pinClickHandle(clicked, true);
    }
};
document.body.onclick = (e) => {
    projectList.classList.add(`hide`);
};

// pin bar
projectPinList.onclick = (e) => {
    const eClassList = e.target.classList;
    if (eClassList.contains(`project-pinCancel`)) {
        sideListCLose(e.target);
    }
    if (eClassList.contains(`project-pinItem`)) {
        pinClickHandle(e.target);
    }
};

// sections
sectionList.onclick = (e) => {
    const eClassList = e.target.classList;
    if (eClassList.contains(`section-item`)) {
        sideListActive(e.target);
    }
};

// ---------------------------- minor function  ----------------------------

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
    return current;
}

function querySelectorByText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).find((element) => {
        return element.textContent.trim().includes(text);
    });
}

// ---------------------------- function onclick ----------------------------
const currentPin = new Set();
const currentActive = {
    pin: ``,
    section: ``,
};
// add init set from sever

function pinClickHandle(clicked, add = false) {
    projectName = clicked.textContent;

    if (add) {
        if (currentPin.has(projectName)) {
            //
        } else {
            currentPin.add(projectName);
        }
    }
    pinRender(projectName);
}

function pinRender(projectName) {
    // check is Active
    if (currentActive.pin === projectName) return;

    // update currentActive.pin
    currentActive.pin = projectName;

    //  render
    const list = Array.from(currentPin);
    projectPinList.innerHTML = ``;
    for (let i of list) {
        projectPinList.insertAdjacentHTML(
            `beforeend`,
            i === projectName
                ? `<li class="project-pinItem active">${i}</li>`
                : `<li class="project-pinItem">${i}</li>`,
        );
    }
    sideListRender(projectName);
}

function sideListRender() {
    const data = dataQuery(testingList, [
        {
            key: `name`,
            value: `${currentActive.pin}`,
            objPath: [`page`],
        },
    ]);
    //
    let html = `<li class="section-item-add">add</li>`;
    for (let i of data) {
        html += `<li class="section-item">${i.name}</li>`;
    }
    sectionList.innerHTML = html;
}

function sideListActive(sectionNode) {
    const sectionName = sectionNode.textContent;

    if (!sectionNode.classList.contains(`active`)) {
        clearActive(sectionList, `.section-item.active`);
        currentActive.section = sectionName;
        sectionNode.classList.add(`active`);
        contentRender();
    }
}

function contentRender() {
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

    console.log(data);

    sectionContent.innerHTML = ``;
    for (let i of data) {
        console.log(i);

        sectionContent.insertAdjacentHTML(
            `beforeend`,
            `<li class="section-content-card">${i.type}</li>`,
        );
    }
}

//  ---------------------------- render ----------------------------
