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
const projectAddItem = document.querySelector(`.project-item.add`);
const projectPinList = document.querySelector(`.project-pinList`);
const tools = document.querySelector(`.tools`);
const sectionList = document.querySelector(`.section-list`);
const sectionAddItem = document.querySelector(`.section-item.add`);
const sectionContent = document.querySelector(`.section-content`);

const testingList = [
    {
        name: "yewu1",
        pagesName: ["page-1.1", "page-1.2"],
        page: [
            {
                name: "page-1.1",
                index: "1",
                content: [
                    {
                        type: "listToDo",
                        index: "1",
                        else: "...",
                        html: "yewu1-1.1",
                    },
                    {
                        type: "procedure",
                        index: "2",
                        else: "...",
                        html: "yewu1-1.1",
                    },
                ],
            },
            {
                name: "page-1.2",
                index: "2",
                content: [
                    {
                        type: "listToDo",
                        index: "1",
                        else: "...",
                        html: "yewu1-1.2",
                    },
                    {
                        type: "procedure",
                        index: "2",
                        else: "...",
                        html: "yewu1-1.2",
                    },
                ],
            },
        ],
    },
    {
        name: "yewu2",
        pagesName: ["page-2.1", "page-2.2"],
        page: [
            {
                name: "page-2.1",
                index: "1",
                content: [
                    {
                        type: "listToDo",
                        index: "1",
                        else: "...",
                        html: "yewu2-1.1",
                    },
                    {
                        type: "procedure",
                        index: "2",
                        else: "...",
                        html: "yewu2-1.1",
                    },
                ],
            },
            {
                name: "page-2.2",
                index: "2",
                content: [
                    {
                        type: "listToDo",
                        index: "1",
                        else: "...",
                        html: "yewu2-1.2",
                    },
                    {
                        type: "procedure",
                        index: "2",
                        else: "...",
                        html: "yewu2-1.2",
                    },
                ],
            },
        ],
    },
];

// project = testingList + forEach
// page = testingList.page + forEach
// content = testingList.page.content + forEach
