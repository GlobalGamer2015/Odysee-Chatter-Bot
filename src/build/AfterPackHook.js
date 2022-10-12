exports.default = async function(context) {
    const fs = require('fs');

    fs.mkdirSync('./dist/win-unpacked/data/chat_history'), function (err) {
        if(err) {
            return console.error(err)
        }
    }
    fs.mkdirSync('./dist/win-unpacked/data/commands'), function (err) {
        if(err) {
            return console.error(err)
        }
    }
}

/*

"build": {
		"afterPack": "./build/AfterPackHook.js",
		"appId": "com.GG2015.OdyseeChatterBot",
		"extraFiles": [
			{
				"from": "./data/languages.json",
				"to": "./data/languages.json"
			},
			{
				"from": "./app-update.yml",
				"to": "./resources/app-update.yml"
			},
			{
				"from": "./ENDUSER_LICENSE",
				"to": "./LICENSE.odyseechatter_enduser.txt"
			}
		],
		"win": {
			"target": [
				"nsis"
			],
			"icon": "build/icon.ico"
		},
		"nsis": {
			"include": "build/installer.nsh",
			"installerIcon": "build/icon.ico",
			"uninstallerIcon": "build/icon.ico",
			"license": "ENDUSER_LICENSE",
			"runAfterFinish": false,
			"allowToChangeInstallationDirectory": true,
			"oneClick": false,
			"perMachine": false,
			"multiLanguageInstaller": true,
			"createDesktopShortcut": true,
			"createStartMenuShortcut": true,
			"menuCategory": true,
			"deleteAppDataOnUninstall": false
		}
	}

*/