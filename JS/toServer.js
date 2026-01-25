const URL = `https://6963c4b02d146d9f58d45a80.mockapi.io/test/data`;

async function getData(id) {
    const thisUrl = id ? `${API_URL}/${id}` : URL;
    try {
        const response = await fetch(thisUrl);
        if (!response.ok) throw new Error("Không tìm thấy bài viết");

        const data = await response.json();

        // console.log(`Chi tiết bài ${id}:`, data);
        console.log(`done`);
        return data;
    } catch (error) {
        console.error("Lỗi:", error);
        return false;
    }
}

async function postData(data) {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const newPost = await response.json();
        console.log("Đã tạo thành công:", newPost);
        return newPost;
    } catch (error) {
        console.error("Lỗi khi tạo:", error);
    }
}

async function deleteData(id) {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log(`Đã xóa bài viết ${id} thành công!`);
            return true;
        } else {
            console.log("Xóa thất bại (có thể ID không tồn tại)");
            return false;
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

async function updateData(id, data) {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const updatedPost = await response.json();
        console.log("Đã cập nhật (vá) thành công:", updatedPost);
        return updatedPost;
    } catch (error) {
        console.error("Lỗi:", error);
        return false;
    }
}

// function editTagName(tag, type = ``) {
//     if (![`section`, `project`].includes(type)) return;
//     const id = tag.getAttribute(`data-${type}-id`);

//     async function editTagNameCallBack(inputTag) {
//         const newName = inputTag.querySelector(`input`).value;
//         if (newName === ``) return console.log(`empty`);

//         const textTag = tag.querySelector(`.text`);
//         const oldName = textTag.textContent;
//         const listFrom = type === `section` ? sectionBar : projectList;
//         const list = Array.from(listFrom.querySelectorAll(`.text`));

//         //
//         if (!checkDulNameInList(list, oldName, newName))
//             return console.log(`it is dul`);

//         if (type === `section`) {
//             const projectId = getActiveProject(`id`);
//             const source = getProjectSource(projectId);
//             const clone = structuredClone(source);
//             const sectionSource = getSectionSource(projectId, id);
//             clone.page.forEach((page) => {
//                 if (page.id === id) page.name = newName;
//             });

//             const result = await updateData(projectId, clone);
//             console.log(result);
//             if (!result) return;

//             // if done
//             sectionSource.name = newName;
//             textTag.textContent = newName;
//         } else {
//             const source = getProjectSource(id);
//             console.log(source);

//             // update server
//             const clone = structuredClone(source);
//             clone.name = newName;

//             const result = await updateData(id, clone);
//             console.log(result);
//             if (!result) return;
//             // const result = deleteData(id);

//             // if done
//             source.name = newName;
//             textTag.textContent = newName;
//             const pinNode = projectPinBar.querySelector(
//                 `[data-project-id="${id}"] .text`,
//             );
//             if (pinNode) pinNode.textContent = newName;
//         }

//         inputTag.querySelector(`input`).value = ``;
//         return true;
//     }
//     addInputTag(tag, editTagNameCallBack);
// }
