// const mainURL = `https://6963c4b02d146d9f58d45a80.mockapi.io/test/data`;
// const minorURL = `https://6963c4b02d146d9f58d45a80.mockapi.io/test/minor`;

let mainURL = ``;
let minorURL = ``;



async function getData(URL, id) {
    const thisUrl = id ? `${API_URL}/${id}` : URL;
    try {
        const response = await fetch(thisUrl);
        if (!response.ok) throw new Error("Không tìm thấy bài viết");

        const data = await response.json();

        // console.log(`Chi tiết bài ${id}:`, data);
        return data;
    } catch (error) {
        console.error("Lỗi:", error);
        return false;
    }
}

async function postData(URL, data) {
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
        // return newPost;
    } catch (error) {
        console.error("Lỗi khi tạo:", error);
        return false;
    }
}

async function deleteData(URL, id) {
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

async function updateData(URL, id, data) {
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
