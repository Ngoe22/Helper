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
let testingList = [];

async function updateMainData() {
    testingList = await getData();
    projectListRender();
}
updateMainData();

function waterFallOfIf(values, logText) {
    for (let i in values) {
        if (values[i]) {
            console.log(logText[i]);
            return true;
        }
    }
    return false;
}
