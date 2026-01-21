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
const sectionContent = document.querySelector(`.section-content`);

const testingList = [
    {
        name: "yewu1",
        id: `1`,
        page: [
            {
                name: "page-1.1",
                id: `1`,
                content: [
                    {
                        type: "listToDo",
                        else: "...",
                        html: "yewu1-1.1",
                    },
                    {
                        type: "procedure",
                        else: "...",
                        html: "yewu1-1.1",
                    },
                ],
            },
            {
                name: "page-1.2",
                id: `2`,
                content: [
                    {
                        type: "listToDo",
                        else: "...",
                        html: "yewu1-1.2",
                    },
                    {
                        type: "procedure",
                        else: "...",
                        html: "yewu1-1.2",
                    },
                ],
            },
        ],
    },
    {
        name: "yewu2",
        id: `2`,
        page: [
            {
                name: "page-2.1",
                id: `1`,
                content: [
                    {
                        type: "listToDo",
                        else: "...",
                        html: "yewu2-1.1",
                    },
                    {
                        type: "procedure",
                        else: "...",
                        html: "yewu2-1.1",
                    },
                ],
            },
            {
                name: "page-2.2",
                id: `2`,
                content: [
                    {
                        type: "listToDo",
                        else: "...",
                        html: "yewu2-1.2",
                    },
                    {
                        type: "procedure",
                        else: "...",
                        html: "yewu2-1.2",
                    },
                ],
            },
        ],
    },
    {
        name: "yewu3",
        id: `3`,
        page: [
            {
                name: "page-3.1",
                id: `1`,
                content: [
                    {
                        type: "listToDo",
                        else: "...",
                        html: "yewu3-1.1",
                    },
                    {
                        type: "procedure",
                        else: "...",
                        html: "yewu3-1.1",
                    },
                ],
            },
            {
                name: "page-3.2",
                id: `2`,
                content: [
                    {
                        type: "listToDo",
                        else: "...",
                        html: "yewu3-1.2",
                    },
                    {
                        type: "procedure",
                        else: "...",
                        html: "yewu3-1.2",
                    },
                ],
            },
        ],
    },
];

// project = testingList + forEach
// page = testingList.page + forEach
// content = testingList.page.content + forEach
