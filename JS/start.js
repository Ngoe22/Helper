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
                <div class="getDb-body">
                    <div class="getDb-row">
                        <div class="getDb-label">main URL</div>
                        <input type="text" class="getDb-input main" />
                    </div>
                    <div class="getDb-row">
                        <div class="getDb-label">minor URL</div>
                        <input type="text" class="getDb-input minor" />
                    </div>
                </div>
                <button class="getDb-btn">Get in</button>
            </div>`;

        getDB.onclick = async (e) => {
            if (e.target.classList.contains(`getDb-btn`)) {
                const inputForMain = getDB.querySelector(`.main`).value;
                const inputForMinor = getDB.querySelector(`.minor`).value;

                localStorage.setItem("mainDB", inputForMain);
                localStorage.setItem("minorDB", inputForMinor);

                mainURL = inputForMain;
                minorURL = inputForMinor;

                getDB.remove();
                resolve(true);
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
    await renderReminder();
    await updateMainData();
    runLoadingAnimation(false);
}
start();
