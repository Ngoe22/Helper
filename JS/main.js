// project-list-btn

// project-list
// project-item add

// project-pinList

// tools

// section-list
// section-item add

// section-content

const projectListBtn = document.querySelector(`.project-list-btn`);
const projectList = document.querySelector(`.project-list`);
const projectListWrap = document.querySelector(`.project-list-wrap`);
const projectPinBar = document.querySelector(`.project-pinList`);
const tools = document.querySelector(`.tools`);
const sectionBar = document.querySelector(`.section-list`);
const contentBoard = document.querySelector(`.content-board`);
const showSection = document.querySelector(`.show-section`);
// console.log(testingList);
let mainData = [];
let minorData = [];

async function updateMainData() {
    mainData = await getData(mainURL);
    projectListRender();
}

async function updateMinorData() {
    minorData = await getData(minorURL);

    if (!minorData[0]) {
        postData(minorURL, { id: `1`, name: `reminder`, list: {} });
    }
}

// minorURL[0] == reminder

