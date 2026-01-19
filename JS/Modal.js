class Modal {
    static currentModal = [];

    constructor(input) {
        options = Object.assign(
            {
                closeMethod: [`esc`, `backdrop`, `button`],
            },
            input,
        );
    }

    open() {
        //
    }
    close() {
        //
    }
}
