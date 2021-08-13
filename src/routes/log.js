const fs = require('fs');
const fetch = require('node-fetch');
const process = require('process');

const ts = require('user-timezone');
const is = require('electron-util/source/is');
const timeFormat = 'YYYY-MM-DD hh:mm:ss A';

const ipcRenderer = require('electron').ipcRenderer;

function WriteError(fileName, fileError, consoleMessage) {
	if(is.development) {
		console.log(consoleMessage);
	}
	else {
		fs.appendFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/log/log.txt`, `${ts.datetime(Math.floor(Date.now() / 1000), timeFormat)} · Error · File: ${fileName} · ${fileError}\n`, function (err) {
				if(err) {
					ipcRenderer.send('show-error-alert', {title: "Error", message: err})
				}
			}
		);

		fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
			if(err) {
				swal({
					title: "Error",
					text: `Please screenshot this error and report it:\n\n${err}`,
					icon: "error"
				});
			}
			settingsObject = JSON.parse(data);
	
			if(settingsObject["error-report"] == "enabled") {
				SendError(fileName, fileError);
			}
		})
	}
}

function WriteLog(logMessage, consoleMessage) {
	if(is.development) {
		console.log(consoleMessage);
	}
    else {
		fs.appendFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/log/log.txt`, `${ts.datetime(Math.floor(Date.now() / 1000), timeFormat)} · Log · ${logMessage}\n`, function (err) {
				if(err) {
					ipcRenderer.send('show-error-alert', {title: "Error", message: err})
				}
			}
		);
	}
}

function SendError(fileName, fileError) {
	try {
		const body = { 
			timestamp: `${ts.datetime(Math.floor(Date.now() / 1000), timeFormat)}`,
			filename: `${fileName}`,
			error: `${fileError}`
		}
		   fetch(`https://www.odysee-chatter.com/api/createErrorReport`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
		.then(res => res.json())
		.then(resJson => {
			//console.log(resJson)
		})
	}
	catch(error) {
		if(error) {
            console.error(error)
        }
	}
}

module.exports.WriteError = WriteError;
module.exports.WriteLog = WriteLog;