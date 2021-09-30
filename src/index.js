'use strict';

const config_data = require('./config.json');
const express = require('express');
const serverApp = express();
const http = require('http');
const serverPort = '4187';
const server = http.createServer(serverApp);
const logger = require('./routes/log');
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const { app, BrowserWindow, screen, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const { is } = require('electron-util');
const unhandled = require('electron-unhandled');
const contextMenu = require('electron-context-menu');
const Api = require('./routes/api')();
const Alert = require('electron-alert');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

autoUpdater.setFeedURL({
	provider: 'github',
	owner: 'GlobalGamer2015',
	repo: 'Odysee-Chatter-Bot',
	updaterCacheDirName: 'odyseechatterbot-updater'
})

unhandled();
contextMenu();

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

const createMainWindow = async () => {
	const {width,height} = screen.getPrimaryDisplay().workAreaSize
	const win = new BrowserWindow({
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

	win.setMenu(null)

	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});

	//await win.loadFile(path.join(__dirname, './html/connect.html'));
	await win.loadURL(`${config_data.baseURL}/login`);

	return win;
};

const { auth } = require('express-openid-connect');

const config = {
  	authRequired: false,
  	auth0Logout: true,
  	secret: config_data.secret,
  	baseURL: config_data.baseURL,
  	clientID: config_data.clientID,
  	issuerBaseURL: config_data.issuerBaseURL
};

// View engine setup
serverApp.set('views', path.join(__dirname, 'views'));
serverApp.set('view engine', 'pug');
serverApp.engine('html', require('ejs').renderFile);
serverApp.set('views',__dirname+'/html/');

// auth router attaches /login, /logout, and /callback routes to the baseURL
serverApp.use(auth(config));

function connect(req, res) {
	const EmailAddress = req.oidc.user.email;
	const fetch = require('node-fetch');
	const body = { 
		email_address: EmailAddress
	}
   	fetch(`https://www.odysee-chatter.com/api/getCredentials`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body)
	})
	.then(rez => rez.json())
	.then(rez => {
		if(rez.status == "Failed"){
			console.log(rez.reason);
		}
		else if(rez.status == "SUCCESS"){
			const user = {
				nickname: req.oidc.user.nickname,
				name: req.oidc.user.name,
				picture: req.oidc.user.picture,
				updated_at: req.oidc.user.updated_at,
				email: req.oidc.user.email,
				email_verified: req.oidc.user.email_verified,
				sub: req.oidc.user.sub,
				acr: req.oidc.user.acr,
				amr: req.oidc.user.amr,
				api_key: rez.api_key,
				claim_id: rez.claim_id
			}

			if(rez.claim_id == "") {
				/* GET noclaimid. */
				serverApp.get('/noclaimid', function (req, res, next) {
					res.render('./noclaimid.html', {user: user})
				});
				mainWindow.loadURL(`${config_data.baseURL}/noclaimid`)
			}
			else {
				/* GET user profile. */
				serverApp.get('/user', function (req, res, next) {
					res.render('./main.html', {user: user})
				});
				const Odysee = require('./routes/odysee')(EmailAddress, io);
				mainWindow.loadURL(`${config_data.baseURL}/user`)
			}
		}
	})
}

// req.isAuthenticated is provided from the auth router
serverApp.get('/', (req, res, next) => {
  	res.send(req.oidc.isAuthenticated() ? connect(req, res) : app.quit());
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

(async () => {
	await app.whenReady();
	mainWindow = await createMainWindow();
})();

server.listen(serverPort), (err) => {
    if(err) {
		Alert.ShowErrorMessage(err)
    }
}