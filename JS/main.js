const serverURL = `https://6963c4b02d146d9f58d45a80.mockapi.io/test/users`;

// -------------------- GET --------------------

async function getFromServer(id = ``) {
    if (typeof id !== `string`) return `invalid type`;
    try {
        const response = await fetch(`${serverURL}/${id}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Post error : `, error);
        return null;
    }
}


// -------------------- POST --------------------

async function postToServer(data) {
    try {
        const response = await fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const newPost = await response.json();
        console.log("Posted:", newPost);
    } catch (error) {
        console.error(`Post error : `, error);
    }
}

// -------------------- UPDATE --------------------

async function updateToServer(id, data) {
    if (typeof id !== `string`) return `invalid type`;
    try {
        const response = await fetch(`${serverURL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const updatedPost = await response.json();
        console.log("Posted:", updatedPost);
    } catch (error) {
        console.error(`Post error : `, error);
    }
}

// updateToServer() 
