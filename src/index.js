'use strict';

const Sentry = require('@sentry/electron');
Sentry.init({ dsn: "https://32e566d62a3d46cdafa1a806df0e0f00@app.glitchtip.com/1987" });

const express = require('express');
const serverApp = express();
const http = require('http');
const serverPort = '4187';
const server = http.createServer(serverApp);
const logger = require('./routes/log');
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const { is } = require('electron-util');
const unhandled = require('electron-unhandled');
const contextMenu = require('electron-context-menu');
const Alert = require('electron-alert');
require('@electron/remote/main').initialize();

autoUpdater.setFeedURL({
	provider: 'github',
	owner: 'GlobalGamer2015',
	repo: 'Odysee-Chatter-Bot',
	updaterCacheDirName: 'odyseechatterbot-updater'
})

unhandled();
contextMenu();

app.disableHardwareAcceleration();

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.GG2015.OdyseeChatterBot');

app.on("ready", () => {
	process.on(
		"uncaughtException",
		Alert.uncaughtException(false, err => {
			console.error("Uncaught Exception:", err);
			app.exit(1);
		}, true, true)
	);
})

if (!is.development) {
	const FIFTEEN_MINUTES = 1000 * 60 * 15;
	setInterval(() => {
 		autoUpdater.checkForUpdates();
 	}, FIFTEEN_MINUTES);
 	autoUpdater.checkForUpdatesAndNotify();
}

if(is.development) {
	console.log("Developing once again!")
}

const check_for_certain_files = require('./routes/create_files_on_start')();

io.on('connection', (socket) => {
	logger.WriteLog('Connection to client established.', 'Connection to client established.')
});

// Prevent window from being garbage collected
let mainWindow;
let win;

app.whenReady().then(async () => {
	const { screen } = require('electron');
	const {width,height} = screen.getPrimaryDisplay().workAreaSize;
	win = new BrowserWindow({
		title: app.name,
		show: false,
		width: width,
		height: height,
		webPreferences: {
      		nodeIntegration: true,
      		contextIsolation: false,
			enableRemoteModule: true
    	}
	});
	win.setBackgroundColor('#241c30');
	require("@electron/remote/main").enable(win.webContents)

	win.setMenu(null)

	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});

	await win.loadURL(`http://localhost:4187/connect`);
});

// View engine setup
serverApp.set('views', path.join(__dirname, 'views'));
serverApp.set('view engine', 'pug');
serverApp.engine('html', require('ejs').renderFile);
serverApp.set('views',__dirname+'/html/');


serverApp.get('/connect', function (req, res, next) {
	res.render('./connect.html')
})

serverApp.get('/connecting', function (req, res, next) {
	const ChannelClaimId = req.query.ChannelClaimUrl;
	const Odysee = require('./routes/odysee')(ChannelClaimId, io);
	res.redirect('/user')
})

serverApp.get('/livestreams', function (req, res, next) {
	res.render('./livestreams.html')
})

/* GET popup. */
serverApp.get(`/popup`, function (req, res, next) {
	res.render('./popup.html', { data: { name: req.query.name, id: req.query.id, comment_id: req.query.comment_id }})
});

/* GET user profile. */
serverApp.get(`/user`, function (req, res, next) {
	res.render('./main.html')
});
/* GET chat. */
serverApp.get('/chat', function (req, res, next) {
	res.render('./chat.html')
});
/* GET commands. */
serverApp.get('/commands', function (req, res, next) {
	res.render('./commands.html')
});
/* GET embedded commands. */
serverApp.get('/commands_embedded', function (req, res, next) {
	res.render('./commands_embedded.html')
});
/* GET settings. */
serverApp.get('/settings', function (req, res, next) {
	res.render('./settings.html')
});

// Files
const Files = require('./routes/files.js');
serverApp.use('/files', Files);
serverApp.use('/files', express.static(path.join(__dirname, 'html')))

// Overlay
const Overlay = require('./routes/overlay.js');
serverApp.use('/overlay', Overlay);
serverApp.use('/overlay', express.static(path.join(__dirname, 'html')))

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}
		mainWindow.show();
	}
});

app.on('window-all-closed', () => {
	if (!is.macos) {
		app.quit();
	}
});

app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow();
	}
});

server.listen(serverPort), (err) => {
  if(err) {
		Alert.ShowErrorMessage(err)
  }
}