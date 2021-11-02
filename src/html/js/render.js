const { ipcRenderer } = require('electron/renderer');
ipcRenderer.on('user_info', function(event, message) {
    window.localStorage.setItem('nickname', `${message.user.nickname}`);
	window.localStorage.setItem('name', `${message.user.name}`);
	window.localStorage.setItem('picture', `${message.user.picture}`);
	window.localStorage.setItem('updated_at', `${message.user.updated_at}`);
	window.localStorage.setItem('email', `${message.user.email}`);
	window.localStorage.setItem('email_verified', `${message.user.email_verified}`);
	window.localStorage.setItem('sub', `${message.user.sub}`);
	window.localStorage.setItem('api_key', `${message.user.api_key}`);
	window.localStorage.setItem('claim_id', `${message.user.claim_id}`);
    window.localStorage.setItem('app_version', `${message.user.app_version}`);
})

function popupWindow(html) {
    const name = html.getAttribute('data-streamer-name');
    const id = html.getAttribute('data-streamer-id');
    const comment_id = html.getAttribute('data-streamer-comment-id');

    const { BrowserWindow } = require('@electron/remote')
    const { is } = require('electron-util');

    let popupWindow;
    if(is.development) {
        popupWindow = new BrowserWindow({
            show: false,
            frame: true,
            title: 'Creator Tools',
            width: 600,
            height: 650,
            icon: null,
            resizable: false,
            transparent: true,
            minimizable: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                nativeWindowOpen: true
            }
        })
    }
    else {
        popupWindow = new BrowserWindow({
            show: false,
            frame: true,
            title: 'Creator Tools',
            width: 256,
            height: 584,
            icon: null,
            resizable: false,
            transparent: true,
            minimizable: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            }
        })
    }
    const win = BrowserWindow.getFocusedWindow().getPosition()
    popupWindow.setPosition(win[0]+150,win[1]+150)
    popupWindow.setMenuBarVisibility(false)
    popupWindow.on('close', function () { })
    popupWindow.loadURL(`http://localhost:4187/popup?name=${name}&id=${id}&comment_id=${comment_id}`)
    popupWindow.once('ready-to-show', () => {
        popupWindow.setTitle('Creator Tools')
        popupWindow.show()
    })
}

function CheckForSpaces(name) {
    if(name.includes(" ")) {
        return name.replace(/ /g,"_");
    }
    else {
        return name;
    }
}

function addCommand(event) {
    event.preventDefault() // stop the form from submitting

    const name = event.path[0][1].value;
    const select = event.path[0][2].value;
    const selectSplit = select.split(',')

    const type = event.path[0][3].value;

    const fs = require('fs');
    const process = require('process');

    if(fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${CheckForSpaces(name)}.json`)) {

    }
    else {
        if(type == "Command") {
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${CheckForSpaces(name)}.json`, `{"name":"${CheckForSpaces(name)}","reply":"","active":false,"selectSplit1":"${selectSplit[1]}","selectSplit0":"${selectSplit[0]}","type":"${type}"}`)

            document.getElementById(selectSplit[1]).innerHTML +=
            `<div style="text-align: left;" id="${CheckForSpaces(name)}_start">
                <form id="${CheckForSpaces(name)}" onsubmit="JavaScript:updateCommand(event)">
                    <b>Command: ${CheckForSpaces(name)}</b>
                    <br><label>Command: &nbsp; </label><input class="Command" id="${CheckForSpaces(name)}_Name" type="text" value="${CheckForSpaces(name)}">
                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CheckForSpaces(name)}_Reply" type="text" value="">
                    <br><label>Enabled &nbsp; </label><input id="${CheckForSpaces(name)}_Active" type="checkbox">
                    <button class="${selectSplit[0]}" id="${CheckForSpaces(name)}" type="submit">Update</button>
                </form>
            </div>`
        }
        else if(type == "Timer") {
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${CheckForSpaces(name)}.json`, `{"name":"${CheckForSpaces(name)}","reply":"","active":false,"selectSplit1":"${selectSplit[1]}","selectSplit0":"${selectSplit[0]}","type":"${type}","timer":1,"timer_running":false}`)

            document.getElementById(selectSplit[1]).innerHTML +=
            `<div style="text-align: left;" id="${CheckForSpaces(name)}_start">
                <form id="${CheckForSpaces(name)}" onsubmit="JavaScript:updateCommand(event)">
                    <b>Timer: ${CheckForSpaces(name)}</b>
                    <br><label>Every &nbsp;</label><input class="Command" id="${CheckForSpaces(name)}_Time" type="number" value="1" min="1" max="999" style="width: 50px;"><label> &nbsp; minutes.</label>
                    <br><label>Command: &nbsp; </label><input class="Command" id="${CheckForSpaces(name)}_Name" type="text" value="${CheckForSpaces(name)}">
                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CheckForSpaces(name)}_Reply" type="text" value="">
                    <br><label>Enabled &nbsp; </label><input id="${CheckForSpaces(name)}_Active" type="checkbox">
                    <button class="${selectSplit[0]}" id="${CheckForSpaces(name)}" type="submit">Update</button>
                </form>
            </div>`
        }
    }
}

function removeCommand(event) {
    event.preventDefault() // stop the form from submitting

    const name = event.path[0][1].value;
    const fs = require('fs');
    const process = require('process');

    if(document.getElementById(`${CheckForSpaces(name)}_start`)) {
        if(document.getElementById(`${CheckForSpaces(name)}_start`)) {
            document.getElementById(`${CheckForSpaces(name)}_start`).remove()
        }
        if(document.getElementById(`${CheckForSpaces(name).toLowerCase()}_start`)) {
            document.getElementById(`${CheckForSpaces(name).toLowerCase()}_start`).remove()
        }

        if(fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${CheckForSpaces(name)}.json`)) {
            fs.unlinkSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${CheckForSpaces(name)}.json`)
        }
    }
    else {
        if(fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${CheckForSpaces(name)}.json`)) {
            fs.unlinkSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${CheckForSpaces(name)}.json`)
        }
    }
}

function updateCommand(event) {
    event.preventDefault() // stop the form from submitting

    const id = event.path[0].id;
    const fs = require('fs');
    const process = require('process');

    const CommandName = document.getElementById(id + '_Name').value;
    const CommandReply = document.getElementById(id + '_Reply').value;
    const CommandEnabled = document.getElementById(id + '_Active').checked;
    const CommandSelectSplit1 = event.path[2].id;
    const CommandSelectSplit0 = event.path[0][3].className;

    if(document.getElementById(id + '_Time')) {
        const CommandTimer = document.getElementById(id + '_Time').value;

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${id}.json`, 'utf8', function(err, commandInformation2) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
            const commandInformationParsed = JSON.parse(commandInformation2);

            const commandInformation = {
                name: CommandName,
                reply: CommandReply,
                active: CommandEnabled,
                selectSplit1: CommandSelectSplit1,
                selectSplit0: CommandSelectSplit0,
                type: 'Timer',
                timer: CommandTimer,
                timer_running: commandInformationParsed.timer_running
            }
    
            const jsonString = JSON.stringify(commandInformation)
        
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${id}.json`, jsonString);
        })
    }
    else {
        const commandInformation = {
            name: CommandName,
            reply: CommandReply,
            active: CommandEnabled,
            selectSplit1: CommandSelectSplit1,
            selectSplit0: CommandSelectSplit0,
            type: 'Command'
        }
    
        const jsonString = JSON.stringify(commandInformation)
        
        fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${id}.json`, jsonString);
    }
}

function OnClick(button) {
    const shell = require('electron').shell;
	if(button == 'commands') {
		window.location.href = 'http://localhost:4187/commands';
	}
    else if(button == 'commands_embedded') {
		window.location.href = 'http://localhost:4187/commands_embedded';
	}
	else if(button == 'chat') {
		window.location.href = 'http://localhost:4187/chat';
	}
	else if(button == 'odysee chatter bot') {
		window.location.href = 'http://localhost:4187/user';
	}
	else if(button == 'logout') {
		window.location.href = 'http://localhost:4187/logout';
	}
    else if(button == 'lbc') {
        shell.openExternal("https://odysee.com/@GG2015:b");
    }
    else if(button == 'bmac') {
        shell.openExternal("https://www.buymeacoffee.com/GG2015");
    }
    else if(button == 'stats') {
        window.location.href = 'http://localhost:4187/stats';
    }
    else if(button == 'settings') {
        window.location.href = 'http://localhost:4187/settings';
    }
}

function readCommands() {
    const process = require('process');
    const fs = require('fs');
    try {
        fs.readdir(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands`, function(err, commands) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
            commands.forEach(command => {
                fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/${command}`, 'utf8', function(err, commandInformation) {
                    if(err) {
                        swal({
                            title: "Error",
                            text: `Please screenshot this error and report it:\n\n${err}`,
                            icon: "error"
                        });
                    }

                    const commandInformationParsed = JSON.parse(commandInformation);

                    const CommandName = commandInformationParsed.name;
                    const CommandReply = commandInformationParsed.reply;
                    const CommandActive = commandInformationParsed.active;
                    const CommandSelectSplit0 = commandInformationParsed.selectSplit0;
                    const CommandSelectSplit1 = commandInformationParsed.selectSplit1;
                    const CommandType = commandInformationParsed.type;

                    if(CommandType == "Command") {
                        if(CommandActive == true) {
                            document.getElementById(CommandSelectSplit1).innerHTML +=
                            `<div style="text-align: left;" id="${CommandName}_start">
                                <form id="${CommandName}" onsubmit="JavaScript:updateCommand(event)">
                                    <b>Command: ${CommandName}</b>
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value='${CommandName}'>
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value='${CommandReply}'>
                                    <br><label>Enabled &nbsp; </label><input id="${CommandName}_Active" type="checkbox" checked>
                                    <button class="${CommandSelectSplit0}" id="${CommandName}" type="submit">Update</button>
                                </form>
                            </div>`
                        }
                        else if(CommandActive == false) {
                            document.getElementById(CommandSelectSplit1).innerHTML +=
                            `<div style="text-align: left;" id="${CommandName}_start">
                                <form id="${CommandName}" onsubmit="JavaScript:updateCommand(event)">
                                    <b>Command: ${CommandName}</b>
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value='${CommandName}'>
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value='${CommandReply}'>
                                    <br><label>Enabled &nbsp; </label><input id="${CommandName}_Active" type="checkbox">
                                    <button class="${CommandSelectSplit0}" id="${CommandName}" type="submit">Update</button>
                                </form>
                            </div>`
                        }
                    }
                    else if(CommandType == "Timer") {
                        const CommandTimer = commandInformationParsed.timer;
                        if(CommandActive == true) {
                            document.getElementById(CommandSelectSplit1).innerHTML +=
                            `<div style="text-align: left;" id="${CommandName}_start">
                                <form id="${CommandName}" onsubmit="JavaScript:updateCommand(event)">
                                    <b>Timer: ${CommandName}</b>
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value='${CommandName}'>
                                    <br><label>Every &nbsp;</label><input class="Command" id="${CommandName}_Time" type="number" value='${CommandTimer}' min="1" max="999" style="width: 50px;"><label> &nbsp; minutes.</label>
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value='${CommandReply}'>
                                    <br><label>Enabled &nbsp; </label><input id="${CommandName}_Active" type="checkbox" checked>
                                    <button class="${CommandSelectSplit0}" id="${CommandName}" type="submit">Update</button>
                                </form>
                            </div>`
                        }
                        else if(CommandActive == false) {
                            document.getElementById(CommandSelectSplit1).innerHTML +=
                            `<div style="text-align: left;" id="${CommandName}_start">
                                <form id="${CommandName}" onsubmit="JavaScript:updateCommand(event)">
                                    <b>Timer: ${CommandName}</b>
                                    <br><label>Every &nbsp;</label><input class="Command" id="${CommandName}_Time" type="number" value='${CommandTimer}' min="1" max="999" style="width: 50px;"><label> &nbsp; minutes.</label>
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value='${CommandName}'>
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value='${CommandReply}'>
                                    <br><label>Enabled &nbsp; </label><input id="${CommandName}_Active" type="checkbox">
                                    <button class="${CommandSelectSplit0}" id="${CommandName}" type="submit">Update</button>
                                </form>
                            </div>`
                        }
                    }
                })
            })
        })
    }
    catch (err) {
        swal({
            title: "Error",
            text: `Please screenshot this error and report it:\n\n${err}`,
            icon: "error"
        });
    }
}

// assuming $ is jQuery
$(document).ready(function() {
    $(document).on('click', 'a[href^="http"]', function(event) {
        const shell = require('electron').shell;
        event.preventDefault();
        shell.openExternal(this.href);
    });
})

function checkChannelNameLength(channel_name) {
    if(channel_name.length >= 7) {
        return new_channel_name = `${channel_name.substr(0, 7)}...`;
    }
    else {
        return new_channel_name = channel_name;
    }
}


const io = require("socket.io-client");
socket = io.connect("http://localhost:4187")
socket.on('addTip', (event) => {
    var comment=JSON.parse(event.event.data);
    addTip(comment)
})
function addTip(comment) {
	const channel_id = comment.data.comment.channel_id;
	const channel_name = comment.data.comment.channel_name;
	const channel_url = comment.data.comment.channel_url;
	const support_amount = comment.data.comment.support_amount;
    const currency = comment.data.comment.currency;

    const url = channel_url;
    const url_odysee = url.split("lbry://")
    const url_odysee_complete = `https://odysee.com/${url_odysee[1]}`;

    const fetch = require('node-fetch');
    const body = { 
        api_key: window.localStorage.getItem('api_key'),
        user_claim_id: channel_id
    }
    fetch(`https://www.odysee-chatter.com/api/getSuperChannelInformation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(channel => {
        const thumbnail = channel.channel.items[0].value.thumbnail.url;
        const superchats_wrapper = document.getElementById("livestream-superchats__inner");

        if(superchats_wrapper) {
            if(support_amount) {
                checkChannelNameLength(channel_name)

                superchats_wrapper.innerHTML += `
                <div id="livestream-superchat" class="livestream-superchat">
                    <div class="livestream-superchat__thumbnail">
                        <div class="channel-thumbnail freezeframe-wrapper">
                            <!-- Channel Thumbnail -->
                            <div class="ff-container ff-responsive ff-ready ff-inactive">
                                <!--<canvas class="ff-canvas ff-canvas-ready" width="32" height="32"></canvas>-->
                                <img data-src="${thumbnail}" class="freezeframe-img ff-image" src="${thumbnail}">
                            </div>
                        </div>
                    </div>
                    <div class="livestream-superchat__info">
                        <!-- User / User URL -->
                        <a class="button button--no-style button--uri-indicator" aria-hidden="false" tabindex="0" href="${url_odysee_complete}">
                            <span class="button__content">
                                <span dir="auto" class="channel-name">${new_channel_name}</span>
                            </span>
                        </a>
                        <!-- Credit Icon & Amount -->
                        <span class="livestream-superchat__amount">
                            <span class="credit-amount">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="icon icon--LBC icon__lbc icon__lbc--after-text" aria-hidden="true">
                                    <path d="M1.03125 14.1562V9.84375L12 0L22.9688 9.84375V14.1562L12 24L1.03125 14.1562Z" fill="black"></path>
                                    <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="black"></path>
                                    <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="black"></path>
                                    <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="url(#paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="url(#paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <path d="M15.075 13.6313L20.0062 9.1876L16.2937 5.8501L11.3625 10.2938L15.075 13.6313Z" fill="url(#paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <path d="M15.075 13.6312L8.86875 19.2L12 22.0125L21.3937 13.575V10.425L20.0062 9.1875L15.075 13.6312Z" fill="url(#paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <defs><linearGradient id="paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="3.7206" y1="14.2649" x2="15.1645" y2="14.2649" gradientUnits="userSpaceOnUse"><stop offset="0.2464" stop-color="#E700FF"></stop><stop offset="0.3166" stop-color="#E804F9"></stop><stop offset="0.4108" stop-color="#E90EE8"></stop><stop offset="0.5188" stop-color="#EC1FCC"></stop><stop offset="0.637" stop-color="#F037A5"></stop><stop offset="0.7635" stop-color="#F45672"></stop><stop offset="0.8949" stop-color="#FA7A36"></stop><stop offset="1" stop-color="#FF9B00"></stop></linearGradient><linearGradient id="paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="2.60274" y1="8.40089" x2="15.14" y2="8.40089" gradientUnits="userSpaceOnUse"><stop offset="0.4233" stop-color="#FABD09"></stop><stop offset="0.8292" stop-color="#FA6B00"></stop></linearGradient><linearGradient id="paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="6.8682" y1="14.1738" x2="25.405" y2="4.84055" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><linearGradient id="paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="25.2522" y1="6.08799" x2="3.87697" y2="27.836" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><clipPath id="clip0"><rect width="24" height="24" fill="white"></rect></clipPath></defs>
                                </svg>${support_amount}
                            </span>
                        </span>
                    </div>
                </div>`;
            }
            if(currency) {
                superchats_wrapper.innerHTML += `
                <div id="livestream-superchat" class="livestream-superchat">
                    <div class="livestream-superchat__thumbnail">
                        <div class="channel-thumbnail freezeframe-wrapper">
                            <!-- Channel Thumbnail -->
                            <div class="ff-container ff-responsive ff-ready ff-inactive">
                                <!--<canvas class="ff-canvas ff-canvas-ready" width="32" height="32"></canvas>-->
                                <img data-src="${thumbnail}" class="freezeframe-img ff-image" src="${thumbnail}">
                            </div>
                        </div>
                    </div>
                    <div class="livestream-superchat__info">
                        <!-- User / User URL -->
                        <a class="button button--no-style button--uri-indicator" aria-hidden="false" tabindex="0" href="${url_odysee_complete}">
                            <span class="button__content">
                                <span dir="auto" class="channel-name">${new_channel_name}</span>
                            </span>
                        </a>
                        <!-- Credit Icon & Amount -->
                        <span class="livestream-superchat__amount">
                            <span class="credit-amount">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="icon icon--LBC icon__lbc icon__lbc--after-text" aria-hidden="true">
                                    <path d="M1.03125 14.1562V9.84375L12 0L22.9688 9.84375V14.1562L12 24L1.03125 14.1562Z" fill="black"></path>
                                    <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="black"></path>
                                    <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="black"></path>
                                    <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="url(#paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="url(#paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <path d="M15.075 13.6313L20.0062 9.1876L16.2937 5.8501L11.3625 10.2938L15.075 13.6313Z" fill="url(#paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <path d="M15.075 13.6312L8.86875 19.2L12 22.0125L21.3937 13.575V10.425L20.0062 9.1875L15.075 13.6312Z" fill="url(#paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
                                    <defs><linearGradient id="paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="3.7206" y1="14.2649" x2="15.1645" y2="14.2649" gradientUnits="userSpaceOnUse"><stop offset="0.2464" stop-color="#E700FF"></stop><stop offset="0.3166" stop-color="#E804F9"></stop><stop offset="0.4108" stop-color="#E90EE8"></stop><stop offset="0.5188" stop-color="#EC1FCC"></stop><stop offset="0.637" stop-color="#F037A5"></stop><stop offset="0.7635" stop-color="#F45672"></stop><stop offset="0.8949" stop-color="#FA7A36"></stop><stop offset="1" stop-color="#FF9B00"></stop></linearGradient><linearGradient id="paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="2.60274" y1="8.40089" x2="15.14" y2="8.40089" gradientUnits="userSpaceOnUse"><stop offset="0.4233" stop-color="#FABD09"></stop><stop offset="0.8292" stop-color="#FA6B00"></stop></linearGradient><linearGradient id="paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="6.8682" y1="14.1738" x2="25.405" y2="4.84055" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><linearGradient id="paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="25.2522" y1="6.08799" x2="3.87697" y2="27.836" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><clipPath id="clip0"><rect width="24" height="24" fill="white"></rect></clipPath></defs>
                                </svg>${currency}
                            </span>
                        </span>
                    </div>
                </div>`;
            }
        }
    })
}

function removeComment(delete_comment_id) {
    const fs = require('fs');
    const process = require('process');
    try {
        if(fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`)) {
            fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, 'utf8', function(err, chat) {
                if(err) {
                    swal({
                        title: "Error",
                        text: `Please screenshot this error and report it:\n\n${err}`,
                        icon: "error"
                    });
                }
                var chatData = JSON.parse(chat)
                const messages = chatData.messages;
                messages.pop()
                json = JSON.stringify(chatData, null, 4)
                fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, json, function(err) {
                    if(err) {
                        Alert.ShowErrorMessage(err)
                    }
                })
            })
        }
    }
    catch(e) {
        swal({
            title: "Error",
            text: `Please screenshot this error and report it:\n\n${err}`,
            icon: "error"
        });
    }
}
function getStickerImage(sticker) {
    // Free
    if(sticker === ":CAT:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/CAT/PNG/cat_with_border.png'></img>"};
    if(sticker === ":FAIL:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/FAIL/PNG/fail_with_border.png'></img>"}
    if(sticker === ":HYPE:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/HYPE/PNG/hype_with_border.png'></img>"}
    if(sticker === ":PANTS_1:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/PANTS/PNG/PANTS_1_with_frame.png'></img>"}
    if(sticker === ":PANTS_2:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/PANTS/PNG/PANTS_2_with_frame.png'></img>"}
    if(sticker === ":PISS:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/PISS/PNG/piss_with_frame.png'></img>"}
    if(sticker === ":PREGNANT_MAN_ASIA:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20man/png/Pregnant%20man_white%20border_asia.png'></img>"}
    if(sticker === ":PREGNANT_MAN_BLACK_HAIR:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20man/png/Pregnant%20man_white%20border_black%20hair.png'></img>"}
    if(sticker === ":PREGNANT_MAN_BLACK_SKIN:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20man/png/Pregnant%20man_white%20border_black%20skin.png'></img>"}
    if(sticker === ":PREGNANT_MAN_BLONDE:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20man/png/Pregnant%20man_white%20border_blondie.png'></img>"}
    if(sticker === ":PREGNANT_MAN_RED_HAIR:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20man/png/Pregnant%20man_white%20border_red%20hair%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.png'></img>"}
    if(sticker === ":PREGNANT_WOMAN_BLACK_HAIR_GREEN_SHIRT:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20woman/png/Pregnant%20woman_white_border_black%20hair%20green%20shirt.png'></img>"}
    if(sticker === ":PREGNANT_WOMAN_BLACK_HAIR:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20woman/png/Pregnant%20woman_white_border_black%20hair.png'></img>"}
    if(sticker === ":PREGNANT_WOMAN_BLACK_SKIN:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20woman/png/Pregnant%20woman_white_border_black%20woman.png'></img>"}
    if(sticker === ":PREGNANT_WOMAN_BLONDE:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20woman/png/Pregnant%20woman_white_border_blondie.png'></img>"}
    if(sticker === ":PREGNANT_WOMAN_BROWN_HAIR:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20woman/png/Pregnant%20woman_white_border_brown%20hair.png'></img>"}
    if(sticker === ":PREGNANT_WOMAN_RED_HAIR:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/pregnant%20woman/png/Pregnant%20woman_white_border_red%20hair%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.png'></img>"}
    if(sticker === ":ROCKET_SPACEMAN:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/ROCKET%20SPACEMAN/PNG/rocket-spaceman_with-border.png'></img>"}
    if(sticker === ":SALTY:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/SALTY/PNG/salty.png'></img>"}
    if(sticker === ":SICK_FLAME:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/SICK/PNG/sick2_with_border.png'></img>"}
    if(sticker === ":SICK_SKULL:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/SICK/PNG/with%20borderdark%20with%20frame.png'></img>"}
    if(sticker === ":SLIME:") {return "<img src'https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/SLIME/PNG/slime_with_frame.png'></img>"}
    if(sticker === ":SPHAGETTI_BATH:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/SPHAGETTI%20BATH/PNG/sphagetti%20bath_with_frame.png'></img>"}
    if(sticker === ":THUG_LIFE:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/THUG%20LIFE/PNG/thug_life_with_border_clean.png'></img>"}
    if(sticker === ":WHUUT:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/WHUUT/PNG/whuut_with-frame.png'></img>"}

    // Paid
    if(sticker === ":TIP_HAND_FLIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/tip_hand_flip_$%20_with_border.png'></img>"}
    if(sticker === ":TIP_HAND_FLIP_COIN:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/tip_hand_flip_coin_with_border.png'></img>"}
    if(sticker === ":TIP_HAND_FLIP_LBC:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/tip_hand_flip_lbc_with_border.png'></img>"}
    if(sticker === ":COMET_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/$%20comet%20tip%20with%20border.png'></img>"}
    if(sticker === ":LBC_COMET_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/LBC%20comet%20tip%20with%20border.png'></img>"}
    if(sticker === ":SMALL_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20bordersmall$_tip.png'></img>"}
    if(sticker === ":SILVER_ODYSEE_COIN:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20bordersilver_odysee_coinv.png'></img>"}
    if(sticker === ":SMALL_LBC_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20bordersmall_LBC_tip%20.png'></img>"}
    if(sticker === ":BITE_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/bite_$tip_with%20border.png'></img>"}
    if(sticker === ":BITE_TIP_CLOSEUP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/bite_$tip_closeup.png'></img>"}
    if(sticker === ":BITE_LBC_CLOSEUP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/LBC%20bite.png'></img>"}
    if(sticker === ":MEDIUM_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20bordermedium$_%20tip.png'></img>"}
    if(sticker === ":MEDIUM_LBC_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20bordermedium_LBC_tip%20%20%20%20%20%20%20%20%20%20.png'></img>"}
    if(sticker === ":LARGE_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20borderlarge$tip.png'></img>"}
    if(sticker === ":LARGE_LBC_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20borderlarge_LBC_tip%20.png'></img>"}
    if(sticker === ":BIG_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20borderbig$tip.png'></img>"}
    if(sticker === ":BIG_LBC_TIP:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/big_LBC_TIPV.png'></img>"}
    if(sticker === ":FORTUNE_CHEST:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20borderfortunechest$_tip.png'></img>"}
    if(sticker === ":FORTUNE_CHEST_LBC:") {return "<img src='https://thumbnails.odysee.com/optimize/s:0:100/quality:85/plain/https://static.odycdn.com/stickers/TIPS/png/with%20borderfortunechest_LBC_tip.png'></img>"}
}

function readChatHistory() {
    const fs = require('fs');
    const process = require('process');
    const fetch = require('node-fetch');
    try {
        if(fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`)) {
            fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, 'utf8', function(err, chat) {
                if(err) {
                    swal({
                        title: "Error",
                        text: `Please screenshot this error and report it:\n\n${err}`,
                        icon: "error"
                    });
                }
                var chatData = JSON.parse(chat)

                // Get Channel Information
                const body = { 
                    api_key: window.localStorage.getItem('api_key')
                }
                fetch(`https://www.odysee-chatter.com/api/getChannelInformation`, {
  		            method: 'POST',
  		            headers: { 'Content-Type': 'application/json' },
  		            body: JSON.stringify(body)
	            })
	            .then(res => res.json())
	            .then(channel => {
                    // Load to messageContainer
                    const streamer = channel.channel.items[0].name;
                    const messages = chatData.messages;
                
                    const messageContainer = document.getElementById("messageContainer");

                    messages.forEach(message => {
                        const channel_id = message.channel_id;
                        const channel_name = message.channel_name;
                        const channel_url = message.channel_url;
                        const comment = message.comment;
                        const comment_id = message.comment_id;
                        const currency = message.currency;
                        const is_fiat = message.is_fiat;
                        const is_hidden = message.is_hidden;
                        const is_pinned = message.is_pinned;
                        const signature = message.signature;
                        const signing_ts = message.signing_ts;
                        const support_amount = message.support_amount;
                        const timestamp = message.timestamp;

                        const url = channel_url;
                        const url_odysee = url.split("lbry://")
                        const url_odysee_complete = `https://odysee.com/${url_odysee[1]}`;

                        const body = { 
                            api_key: window.localStorage.getItem('api_key'),
                            user_claim_id: channel_id
                        }
                        fetch(`https://www.odysee-chatter.com/api/getSuperChannelInformation`, {
  		                    method: 'POST',
  		                    headers: { 'Content-Type': 'application/json' },
  		                    body: JSON.stringify(body)
	                    })
	                    .then(res => res.json())
	                    .then(channel => {
                            const thumbnail = channel.channel.items[0].value.thumbnail.url;
                            const superchats_wrapper = document.getElementById("livestream-superchats__inner");

                            if(support_amount) {
                                checkChannelNameLength(channel_name)

                                superchats_wrapper.innerHTML += `
				                <div id="livestream-superchat" class="livestream-superchat">
					                <div class="livestream-superchat__thumbnail">
						                <div class="channel-thumbnail freezeframe-wrapper">
							                <!-- Channel Thumbnail -->
							                <div class="ff-container ff-responsive ff-ready ff-inactive">
								                <!--<canvas class="ff-canvas ff-canvas-ready" width="32" height="32"></canvas>-->
								                <img data-src="${thumbnail}" class="freezeframe-img ff-image" src="${thumbnail}">
							                </div>
						                </div>
					                </div>
					                <div class="livestream-superchat__info">
    						            <!-- User / User URL -->
	    					            <a class="button button--no-style button--uri-indicator" aria-hidden="false" tabindex="0" href="${url_odysee_complete}">
		    					            <span class="button__content">
			    					            <span dir="auto" class="channel-name">${new_channel_name}</span>
				    			            </span>
					    	            </a>
						                <!-- Credit Icon & Amount -->
						                <span class="livestream-superchat__amount">
							                <span class="credit-amount">
								                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="icon icon--LBC icon__lbc icon__lbc--after-text" aria-hidden="true">
									                <path d="M1.03125 14.1562V9.84375L12 0L22.9688 9.84375V14.1562L12 24L1.03125 14.1562Z" fill="black"></path>
									                <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="black"></path>
									                <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="black"></path>
									                <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="url(#paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="url(#paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <path d="M15.075 13.6313L20.0062 9.1876L16.2937 5.8501L11.3625 10.2938L15.075 13.6313Z" fill="url(#paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <path d="M15.075 13.6312L8.86875 19.2L12 22.0125L21.3937 13.575V10.425L20.0062 9.1875L15.075 13.6312Z" fill="url(#paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <defs><linearGradient id="paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="3.7206" y1="14.2649" x2="15.1645" y2="14.2649" gradientUnits="userSpaceOnUse"><stop offset="0.2464" stop-color="#E700FF"></stop><stop offset="0.3166" stop-color="#E804F9"></stop><stop offset="0.4108" stop-color="#E90EE8"></stop><stop offset="0.5188" stop-color="#EC1FCC"></stop><stop offset="0.637" stop-color="#F037A5"></stop><stop offset="0.7635" stop-color="#F45672"></stop><stop offset="0.8949" stop-color="#FA7A36"></stop><stop offset="1" stop-color="#FF9B00"></stop></linearGradient><linearGradient id="paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="2.60274" y1="8.40089" x2="15.14" y2="8.40089" gradientUnits="userSpaceOnUse"><stop offset="0.4233" stop-color="#FABD09"></stop><stop offset="0.8292" stop-color="#FA6B00"></stop></linearGradient><linearGradient id="paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="6.8682" y1="14.1738" x2="25.405" y2="4.84055" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><linearGradient id="paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="25.2522" y1="6.08799" x2="3.87697" y2="27.836" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><clipPath id="clip0"><rect width="24" height="24" fill="white"></rect></clipPath></defs>
								                </svg>${support_amount}
							                </span>
						                </span>
					                </div>
				                </div>`;
                            }
                            if(currency) {
                                superchats_wrapper.innerHTML += `
				                <div id="livestream-superchat" class="livestream-superchat">
					                <div class="livestream-superchat__thumbnail">
						                <div class="channel-thumbnail freezeframe-wrapper">
							                <!-- Channel Thumbnail -->
							                <div class="ff-container ff-responsive ff-ready ff-inactive">
								                <!--<canvas class="ff-canvas ff-canvas-ready" width="32" height="32"></canvas>-->
								                <img data-src="${thumbnail}" class="freezeframe-img ff-image" src="${thumbnail}">
							                </div>
						                </div>
					                </div>
					                <div class="livestream-superchat__info">
						                <!-- User / User URL -->
						                <a class="button button--no-style button--uri-indicator" aria-hidden="false" tabindex="0" href="${url_odysee_complete}">
							                <span class="button__content">
								                <span dir="auto" class="channel-name">${new_channel_name}</span>
							                </span>
						                </a>
						                <!-- Credit Icon & Amount -->
						                <span class="livestream-superchat__amount">
							                <span class="credit-amount">
								                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="icon icon--LBC icon__lbc icon__lbc--after-text" aria-hidden="true">
									                <path d="M1.03125 14.1562V9.84375L12 0L22.9688 9.84375V14.1562L12 24L1.03125 14.1562Z" fill="black"></path>
									                <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="black"></path>
									                <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="black"></path>
									                <path d="M8.925 10.3688L3.99375 14.8125L7.70625 18.15L12.6375 13.7063L8.925 10.3688Z" fill="url(#paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <path d="M8.925 10.3688L15.1312 4.80005L12 1.98755L2.60625 10.425V13.575L3.99375 14.8125L8.925 10.3688Z" fill="url(#paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <path d="M15.075 13.6313L20.0062 9.1876L16.2937 5.8501L11.3625 10.2938L15.075 13.6313Z" fill="url(#paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <path d="M15.075 13.6312L8.86875 19.2L12 22.0125L21.3937 13.575V10.425L20.0062 9.1875L15.075 13.6312Z" fill="url(#paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4)"></path>
									                <defs><linearGradient id="paint0_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="3.7206" y1="14.2649" x2="15.1645" y2="14.2649" gradientUnits="userSpaceOnUse"><stop offset="0.2464" stop-color="#E700FF"></stop><stop offset="0.3166" stop-color="#E804F9"></stop><stop offset="0.4108" stop-color="#E90EE8"></stop><stop offset="0.5188" stop-color="#EC1FCC"></stop><stop offset="0.637" stop-color="#F037A5"></stop><stop offset="0.7635" stop-color="#F45672"></stop><stop offset="0.8949" stop-color="#FA7A36"></stop><stop offset="1" stop-color="#FF9B00"></stop></linearGradient><linearGradient id="paint1_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="2.60274" y1="8.40089" x2="15.14" y2="8.40089" gradientUnits="userSpaceOnUse"><stop offset="0.4233" stop-color="#FABD09"></stop><stop offset="0.8292" stop-color="#FA6B00"></stop></linearGradient><linearGradient id="paint2_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="6.8682" y1="14.1738" x2="25.405" y2="4.84055" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><linearGradient id="paint3_linearee5d7864-d630-4278-a1d0-c3040f0de2c4" x1="25.2522" y1="6.08799" x2="3.87697" y2="27.836" gradientUnits="userSpaceOnUse"><stop stop-color="#BAFF8E"></stop><stop offset="0.6287" stop-color="#008EBB"></stop></linearGradient><clipPath id="clip0"><rect width="24" height="24" fill="white"></rect></clipPath></defs>
								                </svg>${currency}
							                </span>
						                </span>
					                </div>
				                </div>`;
                            }
                        })

                        var ts = require('user-timezone');
                        var timeFormat = 'h:mm:ss A';
			            var time = ts.datetime(timestamp, timeFormat);

				        const creator_tools_button_image = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon--MoreVertical" aria-hidden="true"><g><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></g></svg>';
                        const streamer_image = `<svg size="16" class="icon icon--BadgeStreamer" aria-hidden="true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15" height="15" viewBox="-1182 401 24 24" xml:space="preserve"><style type="text/css">.st0{fill:#FF5490}.st1{fill:#81BBB9}.st2{fill:#2E2A2F}.st3{fill:#FFFFFF}</style><path class="st0" d="M-1169.8,406.4c-4.3,0-7.8,3.5-7.8,7.8c0,0.4,0,0.8,0.1,1.1h1c-0.1-0.4-0.1-0.7-0.1-1.1c0-3.7,3-6.8,6.8-6.8 s6.8,3,6.8,6.8c0,0.4,0,0.8-0.1,1.1h1c0.1-0.4,0.1-0.7,0.1-1.1C-1162.1,409.9-1165.5,406.4-1169.8,406.4z"></path><path class="st0" d="M-1180,414.2c0-5.6,4.6-10.2,10.2-10.2c5.6,0,10.2,4.6,10.2,10.2c0,2.2-0.7,4.3-1.9,5.9l0.8,0.6 c1.3-1.8,2.1-4.1,2.1-6.5c0-6.2-5-11.2-11.2-11.2c-6.2,0-11.2,5-11.2,11.2c0,2.1,0.6,4.1,1.6,5.8l1-0.3 C-1179.4,418-1180,416.2-1180,414.2z"></path><path class="st1" d="M-1163.7,419.4"></path><path class="st1" d="M-1165.6,418.5c0-0.1,0-3.6,0-3.6c0-1.9-1-4.3-4.4-4.3s-4.4,2.4-4.4,4.3c0,0,0,3.6,0,3.6 c-1.4,0.2-1.8,0.7-1.8,0.7s2.2,2.7,6.2,2.7s6.2-2.7,6.2-2.7S-1164.2,418.7-1165.6,418.5z"></path><path class="st2" d="M-1169.2,418.5h-1.5c-1.7,0-3.1-0.6-3.1-2.2v-1.9c0-2.1,1.6-3,3.9-3s3.9,0.9,3.9,3v1.9 C-1166.1,417.8-1167.5,418.5-1169.2,418.5z"></path><path class="st3" d="M-1167.8,416.2c-0.2,0-0.4-0.2-0.4-0.4v-1.1c0-0.2,0-1-1.2-1c-0.2,0-0.4-0.2-0.4-0.4s0.2-0.4,0.4-0.4 c1.2,0,2,0.6,2,1.7v1.1C-1167.4,416.1-1167.6,416.2-1167.8,416.2z"></path></svg>`;

                        if(comment.startsWith("<stkr>")) {
                            const sticker = comment.replace("<stkr>", "").replace("<stkr>", "");
                            
                            if(channel_name === streamer){
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="streamer" href="${url_odysee_complete}">${streamer_image} ${channel_name}</a>: ${getStickerImage(sticker)}</div>`;
                            }
                            // is_moderator & is_streamer is not implemented in https://comments.lbry.com/api 
                            //else if(event.user == "moderator"){
                            //    message.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${event.time}</span><button class="menu__button" data-streamer-name="${event.channel_name}" data-streamer-id="${event.channel_id}" data-streamer-comment-id="${event.comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="moderator" href="${url_odysee_complete}">Moderator ${event.username}</a>: ${getStickerImage(sticker)}</div>`;
                            //}
                            else if(channel_name !== streamer) {
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="user" href="${url_odysee_complete}">${channel_name}</a>: ${getStickerImage(sticker)}</div>`;
                            }
                        }
                        else {
                            if(channel_name === streamer){
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="streamer" href="${url_odysee_complete}">${streamer_image} ${channel_name}</a>: ${comment}</div>`;
                            }
                            // is_moderator & is_streamer is not implemented in https://comments.lbry.com/api 
                            //else if(event.user == "moderator"){
                            //    message.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${event.time}</span><button class="menu__button" data-streamer-name="${event.channel_name}" data-streamer-id="${event.channel_id}" data-streamer-comment-id="${event.comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="moderator" href="${url_odysee_complete}">Moderator ${event.username}</a>: ${event.message}</div>`;
                            //}
                            else if(channel_name !== streamer) {
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="user" href="${url_odysee_complete}">${channel_name}</a>: ${comment}</div>`;
                            }
                        }

                        // Check if is there and remove
				        const tutorialMessage = document.getElementById("tutorial");
				        if(tutorialMessage) {
					        tutorialMessage.remove();
				        }
                    })
                })
            })
        }
    }
    catch(e) {
        swal({
            title: "Error",
            text: `Please screenshot this error and report it:\n\n${err}`,
            icon: "error"
        });
    }
}

function version() {
    var appVersion = window.localStorage.getItem('app_version');
    document.getElementById("version").innerHTML = appVersion;
}

function readSettings() {
    const fs = require('fs');

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        settingsObject = JSON.parse(data);

        document.getElementById('tipchatnotification').value = settingsObject["tip-chat-notification"];
        document.getElementById('tipappnotification').value = settingsObject["tip-app-notification"];

        document.getElementById('fiatnotificationamount').value = settingsObject["support-amount"];
        document.getElementById('lbcnotificationamount').value = settingsObject["currency-amount"];

        document.getElementById('language').value = settingsObject["language"];

        document.getElementById('error_report').value = settingsObject["error-report"];
    })
}

function updateSettings(event) {
    const fs = require('fs');
    const data = new FormData(event);
    
    const form = Object.fromEntries(data.entries());
    const formArray = { form };
    const formData = formArray.form;

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        settingsObject = JSON.parse(data);

        if(formData.tipappnotification != settingsObject["tip-app-notification"]) {
            settingsObject["tip-app-notification"] = formData.tipappnotification;
        }
        if(formData.tipchatnotification != settingsObject["tip-chat-notification"]) {
            settingsObject["tip-chat-notification"] = formData.tipchatnotification;
        }

        if(formData.fiatnotificationamount != "" || !formData.lbcnotificationamount != settingsObject["support-amount"]) {
            settingsObject["support-amount"] = formData.fiatnotificationamount;
        }
        if(formData.lbcnotificationamount != "" || !formData.lbcnotificationamount != settingsObject["currency-amount"]) {
            settingsObject["currency-amount"] = formData.lbcnotificationamount;
        }

        if(formData.language != "" || !formData.language != settingsObject["language"]) {
            settingsObject["language"] = formData.language;
        }

        if(formData.error_report != "" || !formData.error_report != settingsObject["error-report"]) {
            settingsObject["error-report"] = formData.error_report;
        }

        json = JSON.stringify(settingsObject, null, 4)

        fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, json, function(err) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
            const ipcRenderer = require('electron').ipcRenderer;
            ipcRenderer.send('show-alert', {title: "", message: "Settings have been updated."})
        })
    })
}

function updateEmbeddedCommands(event) {
    const fs = require('fs');

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`, 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        embedded_commands = JSON.parse(data)
        var commands = embedded_commands.commands;
        commands.forEach(function(command) {
            if(command.name == "shoutout") {
                command.reply = event.path[0][1].value;
                command.enabled = event.path[0][2].checked;
            }
        })

        json = JSON.stringify(embedded_commands, null, 4)

        fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`, json, function(err) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
            const ipcRenderer = require('electron').ipcRenderer;
            ipcRenderer.send('show-alert', {title: "", message: "Embedded Commands have been updated."})
        })
    })
}

function readEmbeddedCommands() {
    const fs = require('fs');

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`, 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        embedded_commands = JSON.parse(data)
        var commands = embedded_commands.commands;
        commands.forEach(function(command) {
            if(command.name == "shoutout") {
                document.getElementById('Shoutout_Reply').value = command.reply;
                document.getElementById('Shoutout_Active').checked = command.enabled;
            }
        })
    })
}

function OdyseeBackendStatus() {
    const fetch = require('node-fetch');
    fetch(`https://api.na-backend.odysee.com/api/v2/status`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.json())
	.then(json => {
        // Odysee Status
        if(json.general_state === "ok") {
            document.getElementById('odysee_status').innerText = "OK"
        }
        else if(json.general_state !== "ok") {
            document.getElementById('odysee_status').innerText = "Unknown"
        }

        // LBRYnet Status
        if(json.services.lbrynet[0].status === "ok") {
            document.getElementById('lbrynet_status').innerText = "OK"
        }
        else if(json.services.lbrynet[0].status !== "ok") {
            document.getElementById('lbrynet_status').innerText = "Unknown"
        }
	})

    fetch(`https://odysee-chatter.com`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => {
        // Odysee Chatter Status
        if(res.statusText === "OK") {
            document.getElementById('odyseechatter_status').innerText = "OK"
        }
        else if(res.statusText !== "OK") {
            document.getElementById('odyseechatter_status').innerText = "Unknown"
        }
	})
}

function Reaction() {
    const fetch = require('node-fetch');
    fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + window.localStorage.getItem('claim_id') + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
        method: 'get'
    })
    .then(res => res.json())
    .then(json => {
		const stream_claim_id = json.data[0].claim_id;

        var data = {
            'auth_token': '2rWtnwCi2nMrurh7nJMZtmuG29aZ7FWQ',
            'claim_ids': `${stream_claim_id}`
        }
        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        function loop(formBody) {
            fetch(`https://api.odysee.com/reaction/list`, {
		        method: 'post',
	    	    headers: {
    			    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		        },
                body: formBody
	        })
	        .then(res => res.json())
	        .then(json => {
                document.getElementById('reaction_likes').innerText = json.data.others_reactions[stream_claim_id].like;
                document.getElementById('reaction_dislikes').innerText = json.data.others_reactions[stream_claim_id].dislike
	        })
        }
        loop(formBody)
            
        setInterval(function() {
            loop(formBody)
        },180000)
	})
}

function SubCount() {
    const fetch = require('node-fetch');

    function loop() {
        fetch(`https://api.odysee.com/subscription/sub_count?auth_token=2rWtnwCi2nMrurh7nJMZtmuG29aZ7FWQ&claim_id=${window.localStorage.getItem('claim_id')}`, {
		    method: 'get',
		    headers: {
			    'Content-Type': 'application/json'
		    }
	    })
	    .then(res => res.json())
	    .then(json => {
            document.getElementById('followers').innerText = json.data[0];
	    })
    }
    loop()
    
    setInterval(function() {
        loop()
    },180000)
}

function Viewers() {
    const fetch = require('node-fetch');
    const WS = require('ws');

    fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + window.localStorage.getItem('claim_id') + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
        method: 'get'
    })
    .then(res => res.json())
    .then(json => {
		const stream_claim_id = json.data[0].claim_id;

        ws = new WS(`wss://sockety.odysee.com/ws/commentron?id=${stream_claim_id}&category=${stream_claim_id}`);
    
        ws.addEventListener('message', function (event) {
            try {
                const commentron = JSON.parse(event.data);
                if(commentron.type === "viewers") {
                    const viewCount = commentron.data.connected;
                    document.getElementById('viewCount').innerText = viewCount-1; // -1 because Bot is counted as 1
                }
            }
            catch(err) {
                //console.log('JSON is not detected.');
            }
        })
    })
}

function StreamViews() {
    const fetch = require('node-fetch');
    fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + window.localStorage.getItem('claim_id') + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
        method: 'get'
    })
    .then(res => res.json())
    .then(json => {
		const stream_claim_id = json.data[0].claim_id;

        function loop(stream_claim_id) {
            fetch(`https://api.odysee.com/file/view_count?auth_token=2rWtnwCi2nMrurh7nJMZtmuG29aZ7FWQ&claim_id=${stream_claim_id}`, {
		        method: 'get',
		        headers: {
			        'Content-Type': 'application/json'
		        }
	        })
	        .then(res => res.json())
	        .then(json => {
                document.getElementById('streamViews').innerText = json.data[0];
	        })
        }
        loop(stream_claim_id)

        setInterval(function() {
            loop(stream_claim_id)
        },180000)
    })
}

function SuperChat() {
    const fetch = require('node-fetch');
    fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + window.localStorage.getItem('claim_id') + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
        method: 'get'
    })
    .then(res => res.json())
    .then(json => {
		const stream_claim_id = json.data[0].claim_id;

        function loop(stream_claim_id) {
            fetch(`https://comments.odysee.com/api/v2?m=comment.SuperChatList`, {
		        method: 'post',
		        headers: {
			        'Content-Type': 'application/json'
		        },
                body: `{"jsonrpc":"2.0","id":1,"method":"comment.SuperChatList","params":{"claim_id":"${stream_claim_id}"}}`
	        })
	        .then(res => res.json())
	        .then(json => {
                let currency_array = [];
                let support_amount_array = [];
                const superChat = json.result.items;
                superChat.forEach(superChat_items => {
                    currency_array.push(superChat_items.currency)
                    support_amount_array.push(superChat_items.support_amount)
                })

                var currency_array_sum = 0;
                for (var i = 0; i < parseInt(currency_array).length; i++) {
                    parseInt(currency_array) += parseInt(currency_array)[i]
                }

                var support_amount_sum = 0;
                for (var i = 0; i < support_amount_array.length; i++) {
                    support_amount_sum += support_amount_array[i]
                }

                document.getElementById('currency').innerText = parseInt(currency_array_sum);
                document.getElementById('support_amount').innerText = support_amount_sum;
	        })
        }
        loop(stream_claim_id)

        setInterval(function() {
            loop(stream_claim_id)
        },180000)
    })
}

function UpdateChat() {
    const fetch = require('node-fetch');
    document.getElementById('messageContainer').innerHTML = "";

    const fs = require('fs');
    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, 'utf8', function(err,data) {
        if(err) {
            Alert.ShowErrorMessage(err)
        }
        chatObject = JSON.parse(data);

        chatObject.messages = [];

        fetch(`https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22${window.localStorage.getItem('claim_id')}%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201`, {
            method: 'get',
            headers: {
			    'Content-Type': 'application/json'
		    }
        })
        .then(res => res.json())
        .then(stream => {
            fetch('https://comments.lbry.com/api', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{
                    "jsonrpc": "2.0",
                    "id": "null",
                    "method": "get_claim_comments",
                    "params": {
                        "claim_id": "${stream.data[0].claim_id}",
                        "page_size": 100,
                        "is_channel_signature_valid": true,
                        "visible": true
                    }
                }`
            })
            .then(res => res.json())
            .then(comments_data => {
                const comments = comments_data.result.items;
                comments.forEach(comment_data => {
                    const channel_id = comment_data.channel_id;
                    const channel_name = comment_data.channel_name;
                    const channel_url = comment_data.channel_url;
                    const stream_claim_id = comment_data.claim_id;
                    const comment = comment_data.comment;
                    const comment_id = comment_data.comment_id;
                    const currency = comment_data.currency;
                    const is_fiat = comment_data.is_fiat;
                    const is_hidden = comment_data.is_hidden;
                    const is_pinned = comment_data.is_pinned;
                    const signature = comment_data.signature
                    const signing_ts = comment_data.signing_ts;
                    const support_amount = comment_data.support_amount;
                    const timestamp = comment_data.timestamp;

                    chatObject.messages.push(
                        {
                            channel_id: channel_id,
                            channel_name: channel_name,
                            channel_url: channel_url,
                            stream_claim_id: stream_claim_id,
                            comment: comment,
                            comment_id: comment_id,
                            currency: currency,
                            is_fiat: is_fiat,
                            is_hidden: is_hidden,
                            is_pinned: is_pinned,
                            signature: signature,
                            signing_ts: signing_ts,
                            support_amount: support_amount,
                            timestamp: timestamp
                        }
                    );
                })

                chatObject.messages.reverse()

                json = JSON.stringify(chatObject, null, 4)

                // Save to file
                fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, json, function(err) {
                    if(err) {
                        swal({
                            title: "Error",
                            text: `Please screenshot this error and report it:\n\n${err}`,
                            icon: "error"
                        });
                    }
                })

                // Get Channel Information
                const body = { 
                    api_key: window.localStorage.getItem('api_key')
                }
                fetch(`https://www.odysee-chatter.com/api/getChannelInformation`, {
  		            method: 'POST',
  		            headers: { 'Content-Type': 'application/json' },
  		            body: JSON.stringify(body)
	            })
	            .then(res => res.json())
	            .then(channel => {
                    // Load to messageContainer
                    const streamer = channel.channel.items[0].name;
                    const messages = chatObject.messages;
                
                    const messageContainer = document.getElementById("messageContainer");
                
                    messages.forEach(message => {
                        const channel_id = message.channel_id;
                        const channel_name = message.channel_name;
                        const channel_url = message.channel_url;
                        const comment = message.comment;
                        const comment_id = message.comment_id;
                        const currency = message.currency;
                        const is_fiat = message.is_fiat;
                        const is_hidden = message.is_hidden;
                        const is_pinned = message.is_pinned;
                        const signature = message.signature;
                        const signing_ts = message.signing_ts;
                        const support_amount = message.support_amount;
                        const timestamp = message.timestamp;

                        var ts = require('user-timezone');
                        var timeFormat = 'h:mm:ss A';
			            var time = ts.datetime(timestamp, timeFormat);

                        const url = channel_url;
                        const url_odysee = url.split("lbry://")
                        const url_odysee_complete = `https://odysee.com/${url_odysee[1]}`;

				        const creator_tools_button_image = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon--MoreVertical" aria-hidden="true"><g><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></g></svg>';
                        const streamer_image = `<svg size="16" class="icon icon--BadgeStreamer" aria-hidden="true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15" height="15" viewBox="-1182 401 24 24" xml:space="preserve"><style type="text/css">.st0{fill:#FF5490}.st1{fill:#81BBB9}.st2{fill:#2E2A2F}.st3{fill:#FFFFFF}</style><path class="st0" d="M-1169.8,406.4c-4.3,0-7.8,3.5-7.8,7.8c0,0.4,0,0.8,0.1,1.1h1c-0.1-0.4-0.1-0.7-0.1-1.1c0-3.7,3-6.8,6.8-6.8 s6.8,3,6.8,6.8c0,0.4,0,0.8-0.1,1.1h1c0.1-0.4,0.1-0.7,0.1-1.1C-1162.1,409.9-1165.5,406.4-1169.8,406.4z"></path><path class="st0" d="M-1180,414.2c0-5.6,4.6-10.2,10.2-10.2c5.6,0,10.2,4.6,10.2,10.2c0,2.2-0.7,4.3-1.9,5.9l0.8,0.6 c1.3-1.8,2.1-4.1,2.1-6.5c0-6.2-5-11.2-11.2-11.2c-6.2,0-11.2,5-11.2,11.2c0,2.1,0.6,4.1,1.6,5.8l1-0.3 C-1179.4,418-1180,416.2-1180,414.2z"></path><path class="st1" d="M-1163.7,419.4"></path><path class="st1" d="M-1165.6,418.5c0-0.1,0-3.6,0-3.6c0-1.9-1-4.3-4.4-4.3s-4.4,2.4-4.4,4.3c0,0,0,3.6,0,3.6 c-1.4,0.2-1.8,0.7-1.8,0.7s2.2,2.7,6.2,2.7s6.2-2.7,6.2-2.7S-1164.2,418.7-1165.6,418.5z"></path><path class="st2" d="M-1169.2,418.5h-1.5c-1.7,0-3.1-0.6-3.1-2.2v-1.9c0-2.1,1.6-3,3.9-3s3.9,0.9,3.9,3v1.9 C-1166.1,417.8-1167.5,418.5-1169.2,418.5z"></path><path class="st3" d="M-1167.8,416.2c-0.2,0-0.4-0.2-0.4-0.4v-1.1c0-0.2,0-1-1.2-1c-0.2,0-0.4-0.2-0.4-0.4s0.2-0.4,0.4-0.4 c1.2,0,2,0.6,2,1.7v1.1C-1167.4,416.1-1167.6,416.2-1167.8,416.2z"></path></svg>`;

                        if(comment.startsWith("<stkr>")) {
                            const sticker = comment.replace("<stkr>", "").replace("<stkr>", "");
                            
                            if(channel_name === streamer){
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="streamer" href="${url_odysee_complete}">${streamer_image} ${channel_name}</a>: ${getStickerImage(sticker)}</div>`;
                            }
                            // is_moderator & is_streamer is not implemented in https://comments.lbry.com/api 
                            //else if(event.user == "moderator"){
                            //    message.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${event.time}</span><button class="menu__button" data-streamer-name="${event.channel_name}" data-streamer-id="${event.channel_id}" data-streamer-comment-id="${event.comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="moderator" href="${url_odysee_complete}">Moderator ${event.username}</a>: ${getStickerImage(sticker)}</div>`;
                            //}
                            else if(channel_name !== streamer) {
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="user" href="${url_odysee_complete}">${channel_name}</a>: ${getStickerImage(sticker)}</div>`;
                            }
                        }
                        else {
                            if(channel_name === streamer){
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="streamer" href="${url_odysee_complete}">${streamer_image} ${channel_name}</a>: ${comment}</div>`;
                            }
                            // is_moderator & is_streamer is not implemented in https://comments.lbry.com/api 
                            //else if(event.user == "moderator"){
                            //    message.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${event.time}</span><button class="menu__button" data-streamer-name="${event.channel_name}" data-streamer-id="${event.channel_id}" data-streamer-comment-id="${event.comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="moderator" href="${url_odysee_complete}">Moderator ${event.username}</a>: ${event.message}</div>`;
                            //}
                            else if(channel_name !== streamer) {
                                messageContainer.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${time}</span><button class="menu__button" data-streamer-name="${channel_name}" data-streamer-id="${channel_id}" data-streamer-comment-id="${comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="user" href="${url_odysee_complete}">${channel_name}</a>: ${comment}</div>`;
                            }
                        }

                        // Check if is there and remove
				        const tutorialMessage = document.getElementById("tutorial");
				        if(tutorialMessage) {
					        tutorialMessage.remove();
				        }
                    })
                })
            })
        })
    })
}

function Chat_Interacter() {
    const chat = document.getElementById("input-chat")
    const { Lbry } = require('lbry-sdk-nodejs/lib/sdk')

    Lbry.status()
    .then(status => {
        if(status.is_running === true) {
            // LBRY App or LBRYnet is active.
            chat.value = "Send message here.";
        }
    }).
    catch(e => {
        if(e.code === "ECONNREFUSED") {
            // LBRY App or LBRYnet is not active.
            chat.value = "SDK is not detected.";
            chat.style.pointerEvents = "none";
            document.getElementById('input-chat-send').style.pointerEvents = "none";
        }
    })
    
    setInterval(function() {
        Lbry.status()
        .then(status => {
            if(status.is_running === true) {
                // LBRY App or LBRYnet is active.
                chat.value = "Send message here.";
                chat.style.pointerEvents = "all";
                document.getElementById('input-chat-send').style.pointerEvents = "all";
            }
        }).
        catch(e => {
            if(e.code === "ECONNREFUSED") {
                // LBRY App or LBRYnet is not active.
                chat.value = "SDK is not detected.";
                chat.style.pointerEvents = "none";
                document.getElementById('input-chat-send').style.pointerEvents = "none";
            }
        })
    }, 10000)
}
function toHex(str) {
    let s = unescape(encodeURIComponent(str));
    let result = '';
    for (let i = 0; i < s.length; i++) {
      result += s.charCodeAt(i).toString(16).padStart(2, '0');
    }
  
    return result;
}
function SendMessageFromChat(chat) {
    if(chat.value.length >= 1) {
        const fetch = require('node-fetch')
        const { Lbry } = require('lbry-sdk-nodejs/lib/sdk')
        const body = { 
            api_key: window.localStorage.getItem('api_key')
        }
        fetch(`https://www.odysee-chatter.com/api/getChannelInformation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(channel => {
            fetch(`https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22${window.localStorage.getItem('claim_id')}%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201`, {
                method: 'get',
			    headers: {
				    'Content-Type': 'application/json'
			    },
            })
            .then(res => res.json())
            .then(stream => {
                Lbry.channel_sign({channel_id: window.localStorage.getItem('claim_id'), hexdata: toHex(chat.value)}) // Your Bot Channel ID
	            .catch((e) => {
		            console.log(e)
	            })
	            .then(signed => {
                    fetch(`https://comments.odysee.com/api/v2?m=comment.Create`, {
			            method: 'post',
			            headers: {
				            'Content-Type': 'application/json'
			            },
			            body: `{
				            "jsonrpc":"2.0",
				            "id":1,
				            "method":"comment.Create",
				            "params":{
					            "channel_id":"${window.localStorage.getItem('claim_id')}",
					            "channel_name":"${channel.channel.items[0].name}",
					            "claim_id":"${stream.data[0].claim_id}",
					            "comment":"${chat.value}",
					            "signature": "${signed.signature}",
					            "signing_ts": "${signed.signing_ts}"
				            }
			            }`
		            })
		            .then(res => res.json())
		            .then(res => {
			            if(res.result) {
                            chat.value = "";
                        }
		            })
                })
            })
        })
    }
    else {
        chat.value = "Message needs to be more than 1 character.";
    }
}