

// showSection.onclick = (e) => {
//     sectionBar.classList.toggle(`width-hide`);
// };

const mainNotificationNode = makeANode({
    tagName: `div`,
    initClass: `mainNotificationNode`,
    innerHtml: ``,
});

function mainNotification(text, color) {
    document.body.append(mainNotificationNode);
    setTimeout(() => {
        mainNotificationNode.classList.add(`show`);
        mainNotificationNode.classList.add(color);
        mainNotificationNode.textContent = text;
    }, 0);

    setTimeout(() => {
        mainNotificationNode.classList.remove(`show`);
        mainNotificationNode.textContent = ``;
        mainNotificationNode.remove();
    }, 4000);
}

function askConfirm(message) {
    return new Promise((resolve) => {
        const modal = document.createElement("div");
        modal.className = "confirm-modal";
        modal.innerHTML = `
            <div class="confirm-modal-box">
                <p class = "confirm-modal-message" >${message}</p>
                <button class="confirm-modal-cancel">Noooo !</button>
                <button class="confirm-modal-ok">OK</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".confirm-modal-ok").onclick = () => {
            cleanup();
            resolve(true);
        };

        modal.querySelector(".confirm-modal-cancel").onclick = () => {
            cleanup();
            resolve(false);
        };

        function cleanup() {
            modal.remove();
        }
    });
}

//  -------------- TIME ZONES --------------

const TIME_ZONES = {
    "UTC-12": "Etc/GMT+12",
    "UTC-11": "Pacific/Pago_Pago",
    "UTC-10": "Pacific/Honolulu",
    "UTC-9": "America/Anchorage",
    "UTC-8": "America/Los_Angeles",
    "UTC-7": "America/Denver",
    "UTC-6": "America/Chicago",
    "UTC-5": "America/New_York",
    "UTC-4": "America/Halifax",
    "UTC-3": "America/Sao_Paulo",
    "UTC-2": "Etc/GMT+2",
    "UTC-1": "Atlantic/Azores",
    "UTC+0": "Europe/London",
    "UTC+1": "Europe/Paris",
    "UTC+2": "Europe/Athens",
    "UTC+3": "Europe/Moscow",
    "UTC+4": "Asia/Dubai",
    "UTC+5": "Asia/Karachi",
    "UTC+6": "Asia/Dhaka",
    "UTC+7": "Asia/Ho_Chi_Minh",
    "UTC+8": "Asia/Shanghai",
    "UTC+9": "Asia/Tokyo",
    "UTC+10": "Australia/Sydney",
    "UTC+12": "Pacific/Auckland",
    "UTC+14": "Pacific/Kiritimati",
};

// render

const timezoneBtn = document.querySelector(".timezone-btn");
const timezoneList = document.querySelector(".timezone-list");
const clock = document.getElementById("clock");

function renderTimezoneList() {
    let html = ``;
    const TIME_ZONES_ARRAY = Object.entries(TIME_ZONES);
    const timeZone = localStorage.getItem("userTimezone") || "Asia/Ho_Chi_Minh";
    let check = ``;
    for (let [key, value] of TIME_ZONES_ARRAY) {
        html += `
        <label class = "timezone-item" data-timezone="${value}" >
            ${key} | ${value}
            <input type="radio" name="timezone" id="" hidden  ${timeZone === value ? `checked` : ``} />
        </label> `;
    }
    timezoneList.innerHTML = html;
}

// logic

timezoneBtn.onclick = (e) => {
    e.stopPropagation();
    timezoneList.classList.toggle("hide");
};

timezoneList.onclick = (e) => {
    if (e.target.type !== "radio") return;
    const label = e.target.closest("label");
    const timezone = label.dataset.timezone;
    localStorage.setItem("userTimezone", timezone);
    timezoneList.classList.add("hide");
    updateClock2();
};

function getTimeByUTC(timeZone) {
    const parts = new Intl.DateTimeFormat("vi-VN", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false,
    }).formatToParts(new Date());

    const map = {};
    parts.forEach((p) => (map[p.type] = p.value));

    return `${map.hour}:${map.minute}:${map.second} | ${map.day}/${map.month}/${map.year}`;
}

function updateClock2() {
    const timeZone = localStorage.getItem("userTimezone") || "Asia/Ho_Chi_Minh";
    clock.innerText = getTimeByUTC(timeZone);
}



//

function dateToTimestampSimple2(dateStr) {
    return Date.parse(dateStr + `T00:00:00Z`);
}

//  -------------- LOADING --------------

const loadingAnimation = document.createElement(`div`);
loadingAnimation.className = `loading-animation`;
loadingAnimation.innerHTML = `<div class="loader"></div>`;

function runLoadingAnimation(mode) {
    if (mode) {
        document.body.append(loadingAnimation);
    } else {
        loadingAnimation.remove();
    }
}
