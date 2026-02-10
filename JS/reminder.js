async function updateReminder(rowId, obj, add = true) {
    if (!minorData[0].list[rowId] && !add) return;

    const clone = structuredClone(minorData[0].list);
    if (add) {
        clone[rowId] = obj;
    } else {
        delete clone[rowId];
    }
    await updateData(minorURL, `1`, { list: clone }); // post
    await updateMinorData();
}

async function renderReminder() {
    await updateMinorData();
    const list = Object.entries(minorData[0].list);

    let html = ``;
    for (let [rowID, obj] of list) {
        for (let project of mainData) {
            if (project.id === obj.projectId) {
                html += `<div class="reminder-row">
                    <div class="reminder-time">${
                        project.pageData[obj.sectionId].contentData[
                            obj.contentId
                        ].rows[obj.rowId].dueDate
                    }
                        ${
                            project.pageData[obj.sectionId].contentData[
                                obj.contentId
                            ].rows[obj.rowId].dueTime
                        }</div>
                    ${project.name} > ${project.pageData[obj.sectionId].name} > ${
                        project.pageData[obj.sectionId].contentData[
                            obj.contentId
                        ].name
                    } > ${
                        project.pageData[obj.sectionId].contentData[
                            obj.contentId
                        ].rows[obj.rowId].taskContent
                    }
                </div>`;
            }
        }
    }

    if (!html) return;
    let reminderNode = document.createElement(`div`);
    reminderNode.className = `reminder`;
    reminderNode.innerHTML = `<div class="reminder-box">
                <div class="reminder-header">REMINDER</div>
                ${html}
                <button class="reminder-btn">Get it!</button>
            </div>`;

    reminderNode.onclick = (e) => {
        if (e.target.classList.contains(`reminder-btn`)) {
            reminderNode.remove();
            reminderNode = null;
        }
    };
    document.body.append(reminderNode);
}
