const Alert = require("electron-alert");
const ipc = require('electron').ipcMain;

function ShowMessage(title, text) {
    let alert = new Alert();
    let swalOptions = {
	    title: title,
	    text: text,
	    position: "bottom",
        bs: {
            frame: false,
			transparent: true,
			thickFrame: false,
			closable: false,
			backgroundColor: "#00000000",
			hasShadow: false,
        }
    }
    alert.fireFrameless(swalOptions, null, true, true)
}

function ShowErrorMessage(err) {
    Alert.uncaughtException(false, err => {
        console.error("Uncaught Exception:", err);
        app.exit(1);
    }, true, true)
}

ipc.on('show-alert', (event, messages) => {
    const title = messages.title;
    const message = messages.message;
    ShowMessage(title, message)
})

ipc.on('show-error-alert', (event, messages) => {
    const error = messages.error;
    ShowErrorMessage(error)
})

module.exports.ShowMessage = ShowMessage;
module.exports.ShowErrorMessage = ShowErrorMessage;