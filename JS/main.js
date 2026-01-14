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
const projectAddItem = document.querySelector(`.project-item.add`);
const projectPinList = document.querySelector(`.project-pinList`);
const tools = document.querySelector(`.tools`);
const sectionList = document.querySelector(`.section-list`);
const sectionAddItem = document.querySelector(`.section-item.add`);
const sectionContent = document.querySelector(`.section-content`);

const yewu1 = {
    name: "yewu",
    page: [
        {
            name: "page-1",
            index: "1",
            content: [
                {
                    type: "listToDo",
                    index: "1",
                    else: "...",
                },
                {
                    type: "procedure",
                    index: "2",
                    else: "...",
                },
            ],
        },
        {
            name: "page-2",
            index: "2",
            content: [
                {
                    // meow
                },
            ],
        },
    ],
};

// list [ yewu1 , yewu2 ]
