function isMock(url) {
    if (url.startsWith("https://") && url.includes(".mockapi.io")) return true;
    return false;
}

function getDataBase() {
    return new Promise((resolve) => {
        const mainDB = localStorage.getItem("mainDB");
        const minorDB = localStorage.getItem("minorDB");

        if (mainDB && minorDB) {
            mainURL = mainDB;
            minorURL = minorDB;
            resolve(true);
            return;
        }
        runLoadingAnimation(false);
        const getDB = document.createElement(`div`);
        getDB.className = `getDb`;
        getDB.innerHTML = `
     <div class="getDb-box">
                <div class="getDb-head">hi Sweetheart</div>
                <div class="getDb-body">
                    <div class="getDb-row">
                        <div class="getDb-label">main URL</div>
                        <input type="text" class="getDb-input main" />
                    </div>
                    <div class="getDb-row">
                        <div class="getDb-label">minor URL</div>
                        <input type="text" class="getDb-input minor" />
                    </div>
                    <button class="getDb-btn">Get in</button>
                </div>
                
            </div>`;

        getDB.onclick = async (e) => {
            if (e.target.classList.contains(`getDb-btn`)) {
                const inputForMain = getDB.querySelector(`.main`).value;
                const inputForMinor = getDB.querySelector(`.minor`).value;

                if (isMock(inputForMain) && isMock(inputForMinor)) {
                    runLoadingAnimation(true);
                    localStorage.setItem("mainDB", inputForMain);
                    localStorage.setItem("minorDB", inputForMinor);

                    mainURL = inputForMain;
                    minorURL = inputForMinor;

                    getDB.remove();
                    resolve(true);
                    return;
                }
                mainNotification(`URL is invalid`, `red`);
            }
        };
        document.body.append(getDB);
    });
}

async function start() {
    runLoadingAnimation(true);
    setInterval(updateClock2, 1000);
    renderTimezoneList();
    await getDataBase();
    await updateMainData();
    await renderReminder();
    runLoadingAnimation(false);
}
start();
