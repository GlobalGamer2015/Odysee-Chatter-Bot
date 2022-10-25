const Sentry = require('@sentry/electron');
Sentry.init({ dsn: "https://32e566d62a3d46cdafa1a806df0e0f00@app.glitchtip.com/1987" });

function popupWindow(html) {
    const name = html.getAttribute('data-streamer-name');
    const id = html.getAttribute('data-streamer-id');
    const comment_id = html.getAttribute('data-streamer-comment-id');

    const { BrowserWindow } = require('@electron/remote')

    let popupWindow;
    
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
	else if(button == 'home') {
		window.location.href = 'http://localhost:4187/user';
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
    else if(button == 'connect') {
        window.location.href = 'http://localhost:4187/connect';
    }
    else if(button == 'livestreams') {
        window.location.href = 'http://localhost:4187/livestreams';
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

// Commenting out for now since its causing multiple issues.
/*const io = require("socket.io-client");
socket = io.connect("http://localhost:4187")
socket.on('addTip', (event) => {
    var comment=JSON.parse(event.event.data);
    addTip(comment)
})*/
function addTip(comment) {
	const channel_id = comment.data.comment.channel_id;
	const channel_name = comment.data.comment.channel_name;
	const channel_url = comment.data.comment.channel_url;
	const support_amount = comment.data.comment.support_amount;
    const currency = comment.data.comment.currency;

    const url = channel_url;
    const url_odysee = url.split("lbry://")
    const url_odysee_complete = `https://odysee.com/${url_odysee[1]}`;

    const { Lbry } = require('lbry-sdk-node/lbry');
    Lbry.claim_search({claim_id: channel_id})
	.catch((e) => {
		console.log(e)
	})
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
                const { Lbry } = require('lbry-sdk-nodejs/lib/sdk')

                const fs = require('fs');
                fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
                    if(err) {
                        swal({
                            title: "Error",
                            text: `Please screenshot this error and report it:\n\n${err}`,
                            icon: "error"
                        });
                    }
                    let user_data = JSON.parse(user);

                    Lbry.claim_search({claim_id: user_data.channel_claim_id})
				    .catch((e) => {
					    console.log(e)
				    })
                    
	                .then(channel => {
                        // Load to messageContainer
                        const streamer = channel.items[0].name;
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

                            Lbry.claim_search({claim_id: channel_id})
				            .catch((e) => {
					            console.log(e)
				            })
	                        .then(channel => {
                                const thumbnail = channel.items[0].value.thumbnail.url;
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
                                //  message.innerHTML += `<div id="comment" name="${comment_id}"><span id="time">${event.time}</span><button class="menu__button" data-streamer-name="${event.channel_name}" data-streamer-id="${event.channel_id}" data-streamer-comment-id="${event.comment_id}" onclick="popupWindowDatapasser(this)" type="button">${creator_tools_button_image}</button><a id="moderator" href="${url_odysee_complete}">Moderator ${event.username}</a>: ${getStickerImage(sticker)}</div>`;
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
    const appVersion = require('@electron/remote').app.getVersion();
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
}

function Reaction() {
    const fetch = require('node-fetch');
    const fs = require('fs');

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        let user_data = JSON.parse(user);

        fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + user_data.channel_claim_id + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
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
    })
}

function SubCount() {
    const fetch = require('node-fetch');
    document.getElementById('followers').innerText = window.localStorage.getItem('sub_count');
    const message = document.getElementById("messageContainer");

    function loop() {
        const fs = require('fs');

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
            let user_data = JSON.parse(user);
            fetch(`https://api.odysee.com/subscription/sub_count?auth_token=2rWtnwCi2nMrurh7nJMZtmuG29aZ7FWQ&claim_id=${user_data.channel_claim_id}`, {
		        method: 'get',
		        headers: {
			        'Content-Type': 'application/json'
		        }
	        })
	        .then(res => res.json())
	        .then(json => {
                if(json.data[0] !== window.localStorage.getItem('sub_count')) {
                    const subCount = json.data[0] - window.localStorage.getItem('sub_count');
                    if(subCount >= 1) {
                        if(subCount === 1) {
                            document.getElementById('followers').innerText = json.data[0];
                            window.localStorage.setItem('sub_count', json.data[0])
                            message.innerHTML += `<div id="comment"><a id="user">System</a>: You gained ${subCount} follower within the last 1 minute.</div>`;
                        }
                        else {
                            document.getElementById('followers').innerText = json.data[0];
                            window.localStorage.setItem('sub_count', json.data[0])
                            message.innerHTML += `<div id="comment"><a id="user">System</a>: You gained ${subCount} followers within the last 1 minute.</div>`;
                        }
                    }
                    /*else {
                        if(subCount === 0) {
                            // console.log('lost 1 follower or none')
                        }
                        else {
                            document.getElementById('followers').innerText = json.data[0];
                            window.localStorage.setItem('sub_count', json.data[0])
                            message.innerHTML += `<div id="comment"><a id="user">System</a>: You lost ${subCount} followers within the last 1 minute.</div>`;
                        }
                    }*/
                }
	        })
        })
    }
    
    setInterval(function() {
        loop()
    },60000)
}

function Viewers() {
    const WS = require('ws');
    const fs = require('fs');

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        let user_data = JSON.parse(user);

        ws = new WS(`wss://sockety.odysee.com/ws/commentron?id=${user_data.stream_claim_id}&category=${user_data.stream_claim_id}`);
    
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
    const fs = require('fs');

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        let user_data = JSON.parse(user);

		const stream_claim_id = user_data.stream_claim_id;

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
    const fs = require('fs');

    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        let user_data = JSON.parse(user);

		const stream_claim_id = user_data.stream_claim_id;

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

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
            let user_data = JSON.parse(user);
        
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
                        "claim_id": "${user_data.stream_claim_id}",
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
                const { Lbry } = require('lbry-sdk-nodejs/lib/sdk')
                Lbry.claim_search({claim_id: user_data.channel_claim_id})
				.catch((e) => {
					console.log(e)
				})
	            .then(channel => {
                    // Load to messageContainer
                    const streamer = channel.items[0].name;
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
            //chat.value = "Send message here.";
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
                //chat.value = "Send message here.";
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
        
        const fs = require('fs');

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
            let user_data = JSON.parse(user);

            Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(chat.value)})
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
					        "channel_id":"${user_data.channel_claim_id}",
					        "channel_name":"${user_data.channel_claim_name}",
					        "claim_id":"${user_data.stream_claim_id}",
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
    }
    else {
        chat.value = "Message needs to be more than 1 character.";
    }
}
function SaveUserData(el) {
    const fs = require('fs');
    const fetch = require('node-fetch')

    fetch(`https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22${el.ChannelClaimId.value}%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201`, {
        method: 'get',
		headers: {
			'Content-Type': 'application/json'
		},
    })
    .then(res => res.json())
    .then(stream => {
        let json = {
            channel_claim_name: el.ChannelClaimName.value,
            channel_normalized_name: el.ChannelNormalizedName.value,
            channel_claim_address: el.ChannelClaimAddress.value,
            channel_claim_id: el.ChannelClaimId.value,
            channel_claim_url: el.ChannelClaimUrl.value,

            stream_claim_title: stream.data[0].title,
            stream_claim_address: stream.data[0].claim_address,
            stream_claim_id: stream.data[0].claim_id,
        }
    
        fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, JSON.stringify(json), function(err) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }
        })
    })
}

/*

*/

// Livestream

function GetStreams() {
    const fetch = require('node-fetch');
    var activeStreams = [];
  
    fetch('https://api.odysee.live/livestream/all', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(api => api.json())
    .then(api => {
        if (api.success === true) {
            const data = api.data;
            data.forEach(function(claimId) {
                activeStreams.push(claimId);
            });

            activeStreams.forEach(function(claimId) {
                fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + claimId.ChannelClaimID + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(stream => stream.json())
                .then(stream => {
                    if(stream.data.length >= 1) {
                        // Channel information
                        const channel = claimId;
                        const timestamp = channel.Start;
                        const live = channel.Live;
                        const channel_name = channel.ActiveClaim.CanonicalURL.replace('lbry://@', '').split('#')[0];
                        const channelLink = channel.ActiveClaim.CanonicalURL.replace('lbry://@', 'https://odysee.com/@').split('#')[0];
                        const stream_url = channel.ActiveClaim.CanonicalURL.replace('lbry://@', 'https://odysee.com/@');
                        const viewCount = channel.ViewerCount;

                        function language_data(language) {
                            /*
                                Uses language data from https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
                            */
                            if(language == 'bo') { return 'Boro'; }
                            if(language == 'aa') { return 'Afar'; }
                            if(language == 'ab') { return 'Abkhazian'; }
                            if(language == 'af') { return 'Afrikaans'; }
                            if(language == 'ak') { return 'Akan'; }
                            if(language == 'als') { return 'Alemannic'; }
                            if(language == 'am') { return 'Amharic'; }
                            if(language == 'an') { return 'Aragonese'; }
                            if(language == 'ang') { return 'Angal'; }
                            if(language == 'ar') { return 'Arabic'; }
                            if(language == 'arc') { return 'Aramaic'; }
                            if(language == 'as') { return 'Assamese'; }
                            if(language == 'ast') { return 'Asturian'; }
                            if(language == 'av') { return 'Avar'; }
                            if(language == 'awa') { return 'Awadhi'; }
                            if(language == 'ay') { return 'Aymara'; }
                            if(language == 'az') { return 'Azerbaijani'; }
                            if(language == 'ba') { return 'Bashkir'; }
                            if(language == 'bar') { return 'Bavarian'; }
                            if(language == 'bat-smg') { return 'Samogitian'; }
                            if(language == 'bcl') { return 'Bikol'; }
                            if(language == 'be') { return 'Belarusian'; }
                            if(language == 'be-x-old') { return 'Belarusian (Taraškievica)'; }
                            if(language == 'bg') { return 'Bulgarian'; }
                            if(language == 'bh') { return 'Bihari'; }
                            if(language == 'bi') { return 'Bislama'; }
                            if(language == 'bm') { return 'Bambara'; }
                            if(language == 'bn') { return 'Bengali'; }
                            if(language == 'bo') { return 'Tibetan'; }
                            if(language == 'bpy') { return 'Bishnupriya Manipuri'; }
                            if(language == 'br') { return 'Breton'; }
                            if(language == 'bs') { return 'Bosnian'; }
                            if(language == 'bug') { return 'Buginese'; }
                            if(language == 'bxr') { return 'Buriat (Russia)'; }
                            if(language == 'ca') { return 'Catalan'; }
                            if(language == 'cdo') { return 'Min Dong Chinese'; }
                            if(language == 'ce') { return 'Chechen'; }
                            if(language == 'ceb') { return 'Cebuano'; }
                            if(language == 'ch') { return 'Chamorro'; }
                            if(language == 'cho') { return 'Choctaw'; }
                            if(language == 'chr') { return 'Cherokee'; }
                            if(language == 'chy') { return 'Cheyenne'; }
                            if(language == 'ckb') { return 'Kurdish (Sorani)'; }
                            if(language == 'co') { return 'Corsican'; }
                            if(language == 'cr') { return 'Cree'; }
                            if(language == 'cs') { return 'Czech'; }
                            if(language == 'csb') { return 'Kashubian'; }
                            if(language == 'cu') { return 'Old Church Slavonic / Old Bulgarian'; }
                            if(language == 'cv') { return 'Chuvash'; }
                            if(language == 'cy') { return 'Welsh'; }
                            if(language == 'da') { return 'Danish'; }
                            if(language == 'de') { return 'German'; }
                            if(language == 'diq') { return 'Dimli'; }
                            if(language == 'dsb') { return 'Lower Sorbian'; }
                            if(language == 'dv') { return 'Divehi'; }
                            if(language == 'dz') { return 'Dzongkha'; }
                            if(language == 'ee') { return 'Ewe'; }
                            if(language == 'el') { return 'Greek'; }
                            if(language == 'en') { return 'English'; }
                            if(language == 'eo') { return 'Esperanto'; }
                            if(language == 'es') { return 'Spanish'; }
                            if(language == 'et') { return 'Estonian'; }
                            if(language == 'eu') { return 'Basque'; }
                            if(language == 'ext') { return 'Extremaduran'; }
                            if(language == 'fa') { return 'Persian'; }
                            if(language == 'ff') { return 'Peul'; }
                            if(language == 'fi') { return 'Finnish'; }
                            if(language == 'fiu-vro') { return 'Võro'; }
                            if(language == 'fj') { return 'Fijian'; }
                            if(language == 'fo') { return 'Faroese'; }
                            if(language == 'fr') { return 'French'; }
                            if(language == 'frp') { return 'Arpitan / Franco-Provençal'; }
                            if(language == 'fur') { return 'Friulian'; }
                            if(language == 'fy') { return 'West Frisian'; }
                            if(language == 'ga') { return 'Irish'; }
                            if(language == 'gan') { return 'Gan Chinese'; }
                            if(language == 'gbm') { return 'Garhwali'; }
                            if(language == 'gd') { return 'Scottish Gaelic'; }
                            if(language == 'gil') { return 'Gilbertese'; }
                            if(language == 'gl') { return 'Galician'; }
                            if(language == 'gn') { return 'Guarani'; }
                            if(language == 'got') { return 'Gothic'; }
                            if(language == 'gu') { return 'Gujarati'; }
                            if(language == 'gv') { return 'Manx'; }
                            if(language == 'ha') { return 'Hausa'; }
                            if(language == 'hak') { return 'Hakka Chinese'; }
                            if(language == 'haw') { return 'Hawaiian'; }
                            if(language == 'he') { return 'Hebrew'; }
                            if(language == 'hi') { return 'Hindi'; }
                            if(language == 'ho') { return 'Hiri Motu'; }
                            if(language == 'hr') { return 'Croatian'; }
                            if(language == 'ht') { return 'Haitian'; }
                            if(language == 'hu') { return 'Hungarian'; }
                            if(language == 'hy') { return 'Armenian'; }
                            if(language == 'hz') { return 'Herero'; }
                            if(language == 'ia') { return 'Interlingua'; }
                            if(language == 'id') { return 'Indonesian'; }
                            if(language == 'ie') { return 'Interlingue'; }
                            if(language == 'ig') { return 'Igbo'; }
                            if(language == 'ii') { return 'Sichuan Yi'; }
                            if(language == 'ik') { return 'Inupiak'; }
                            if(language == 'inh') { return 'Ingush'; }
                            if(language == 'io') { return 'Ido'; }
                            if(language == 'is') { return 'Icelandic'; }
                            if(language == 'it') { return 'Italian'; }
                            if(language == 'iu') { return 'Inuktitut'; }
                            if(language == 'ja') { return 'Japanese'; }
                            if(language == 'jbo') { return 'Lojban'; }
                            if(language == 'jv') { return 'Javanese'; }
                            if(language == 'ka') { return 'Georgian'; }
                            if(language == 'kg') { return 'Kongo'; }
                            if(language == 'ki') { return 'Kikuyu'; }
                            if(language == 'kj') { return 'Kuanyama'; }
                            if(language == 'kk') { return 'Kazakh'; }
                            if(language == 'kl') { return 'Greenlandic'; }
                            if(language == 'km') { return 'Cambodian'; }
                            if(language == 'kn') { return 'Kannada'; }
                            if(language == 'khw') { return 'Khowar'; }
                            if(language == 'ko') { return 'Korean'; }
                            if(language == 'kr') { return 'Kanuri'; }
                            if(language == 'ks') { return 'Kashmiri'; }
                            if(language == 'ksh') { return 'Ripuarian'; }
                            if(language == 'ku') { return 'Kurdish (Kurmanji)'; }
                            if(language == 'kv') { return 'Komi'; }
                            if(language == 'kw') { return 'Cornish'; }
                            if(language == 'ky') { return 'Kirghiz'; }
                            if(language == 'la') { return 'Latin'; }
                            if(language == 'lad') { return 'Ladino / Judeo-Spanish'; }
                            if(language == 'lan') { return 'Lango'; }
                            if(language == 'lb') { return 'Luxembourgish'; }
                            if(language == 'lg') { return 'Ganda'; }
                            if(language == 'li') { return 'Limburgian'; }
                            if(language == 'lij') { return 'Ligurian'; }
                            if(language == 'lmo') { return 'Lombard'; }
                            if(language == 'ln') { return 'Lingala'; }
                            if(language == 'lo') { return 'Laotian'; }
                            if(language == 'lzz') { return 'Laz'; }
                            if(language == 'lt') { return 'Lithuanian'; }
                            if(language == 'lv') { return 'Latvian'; }
                            if(language == 'map-bms') { return 'Banyumasan'; }
                            if(language == 'mg') { return 'Malagasy'; }
                            if(language == 'man') { return 'Mandarin'; }
                            if(language == 'mh') { return 'Marshallese'; }
                            if(language == 'mi') { return 'Maori'; }
                            if(language == 'min') { return 'Minangkabau'; }
                            if(language == 'mk') { return 'Macedonian'; }
                            if(language == 'ml') { return 'Malayalam'; }
                            if(language == 'mn') { return 'Mongolian'; }
                            if(language == 'mo') { return 'Moldovan'; }
                            if(language == 'mr') { return 'Marathi'; }
                            if(language == 'mrh') { return 'Mara'; }
                            if(language == 'ms') { return 'Malay'; }
                            if(language == 'mt') { return 'Maltese'; }
                            if(language == 'mus') { return 'Creek / Muskogee'; }
                            if(language == 'mwl') { return 'Mirandese'; }
                            if(language == 'my') { return 'Burmese'; }
                            if(language == 'na') { return 'Nauruan'; }
                            if(language == 'nah') { return 'Nahuatl'; }
                            if(language == 'nap') { return 'Neapolitan'; }
                            if(language == 'nd') { return 'North Ndebele'; }
                            if(language == 'nds') { return 'Low German / Low Saxon'; }
                            if(language == 'nds-nl') { return 'Dutch Low Saxon'; }
                            if(language == 'ne') { return 'Nepali'; }
                            if(language == 'new') { return 'Newar'; }
                            if(language == 'ng') { return 'Ndonga'; }
                            if(language == 'nl') { return 'Dutch'; }
                            if(language == 'nn') { return 'Norwegian Nynorsk'; }
                            if(language == 'no') { return 'Norwegian'; }
                            if(language == 'nr') { return 'South Ndebele'; }
                            if(language == 'nso') { return 'Northern Sotho'; }
                            if(language == 'nrm') { return 'Norman'; }
                            if(language == 'nv') { return 'Navajo'; }
                            if(language == 'ny') { return 'Chichewa'; }
                            if(language == 'oc') { return 'Occitan'; }
                            if(language == 'oj') { return 'Ojibwa'; }
                            if(language == 'om') { return 'Oromo'; }
                            if(language == 'or') { return 'Oriya'; }
                            if(language == 'os') { return 'Ossetian / Ossetic'; }
                            if(language == 'pa') { return 'Panjabi / Punjabi'; }
                            if(language == 'pag') { return 'Pangasinan'; }
                            if(language == 'pam') { return 'Kapampangan'; }
                            if(language == 'pap') { return 'Papiamentu'; }
                            if(language == 'pdc') { return 'Pennsylvania German'; }
                            if(language == 'pi') { return 'Pali'; }
                            if(language == 'pih') { return 'Norfolk'; }
                            if(language == 'pl') { return 'Polish'; }
                            if(language == 'pms') { return 'Piedmontese'; }
                            if(language == 'ps') { return 'Pashto'; }
                            if(language == 'pt') { return 'Portuguese'; }
                            if(language == 'qu') { return 'Quechua'; }
                            if(language == 'rm') { return 'Raeto Romance'; }
                            if(language == 'rmy') { return 'Romani'; }
                            if(language == 'rn') { return 'Kirundi'; }
                            if(language == 'ro') { return 'Romanian'; }
                            if(language == 'roa-rup') { return 'Aromanian'; }
                            if(language == 'ru') { return 'Russian'; }
                            if(language == 'rw') { return 'Rwandi'; }
                            if(language == 'sa') { return 'Sanskrit'; }
                            if(language == 'sc') { return 'Sardinian'; }
                            if(language == 'scn') { return 'Sicilian'; }
                            if(language == 'sco') { return 'Scots'; }
                            if(language == 'sd') { return 'Sindhi'; }
                            if(language == 'se') { return 'Northern Sami'; }
                            if(language == 'sg') { return 'Sango'; }
                            if(language == 'sh') { return 'Serbo-Croatian'; }
                            if(language == 'si') { return 'Sinhalese'; }
                            if(language == 'simple') { return 'Simple English'; }
                            if(language == 'sk') { return 'Slovak'; }
                            if(language == 'sl') { return 'Slovenian'; }
                            if(language == 'sm') { return 'Samoan'; }
                            if(language == 'sn') { return 'Shona'; }
                            if(language == 'so') { return 'Somalia'; }
                            if(language == 'sq') { return 'Albanian'; }
                            if(language == 'sr') { return 'Serbian'; }
                            if(language == 'ss') { return 'Swati'; }
                            if(language == 'st') { return 'Southern Sotho'; }
                            if(language == 'su') { return 'Sundanese'; }
                            if(language == 'sv') { return 'Swedish'; }
                            if(language == 'sw') { return 'Swahili'; }
                            if(language == 'ta') { return 'Tamil'; }
                            if(language == 'te') { return 'Telugu'; }
                            if(language == 'tet') { return 'Tetum'; }
                            if(language == 'tg') { return 'Tajik'; }
                            if(language == 'th') { return 'Thai'; }
                            if(language == 'ti') { return 'Tigrinya'; }
                            if(language == 'tk') { return 'Turkmen'; }
                            if(language == 'tl') { return 'Tagalog'; }
                            if(language == 'tlh') { return 'Klingon'; }
                            if(language == 'tn') { return 'Tswana'; }
                            if(language == 'to') { return 'Tonga'; }
                            if(language == 'tpi') { return 'Tok Pisin'; }
                            if(language == 'tr') { return 'Turkish'; }
                            if(language == 'ts') { return 'Tsonga'; }
                            if(language == 'tt') { return 'Tatar'; }
                            if(language == 'tum') { return 'Tumbuka'; }
                            if(language == 'tw') { return 'Twi'; }
                            if(language == 'ty') { return 'Tahitian'; }
                            if(language == 'udm') { return 'Udmurt'; }
                            if(language == 'ug') { return 'Uyghur'; }
                            if(language == 'uk') { return 'Ukrainian'; }
                            if(language == 'ur') { return 'Urdu'; }
                            if(language == 'uz') { return 'Uzbek'; }
                            if(language == 'uz_AF') { return 'Uzbeki Afghanistan'; }
                            if(language == 've') { return 'Venda'; }
                            if(language == 'vi') { return 'Vietnamese'; }
                            if(language == 'vec') { return 'Venetian'; }
                            if(language == 'vls') { return 'West Flemish'; }
                            if(language == 'vo') { return 'Volapük'; }
                            if(language == 'wa') { return 'Walloon'; }
                            if(language == 'war') { return 'Waray / Samar-Leyte Visayan'; }
                            if(language == 'wo') { return 'Wolof'; }
                            if(language == 'xal') { return 'Kalmyk'; }
                            if(language == 'xh') { return 'Xhosa'; }
                            if(language == 'xmf') { return 'Megrelian'; }
                            if(language == 'yi') { return 'Yiddish'; }
                            if(language == 'yo') { return 'Yoruba'; }
                            if(language == 'za') { return 'Zhuang'; }
                            if(language == 'zh') { return 'Chinese'; }
                            if(language == 'zh-classical') { return 'Classical Chinese'; }
                            if(language == 'zh-min-nan') { return 'Minnan'; }
                            if(language == 'zh-yue') { return 'Cantonese'; }
                            if(language == 'zu') { return 'Zulu'; }
                            if(language == 'closed-zh-tw') { return 'Traditional Chinese'; }
                            if(language == 'nb') { return 'Norwegian Bokmål'; }
                            if(language == 'zh-tw') { return 'Traditional Chinese'; }
                            if(language == 'tokipona') { return 'Tokipona'; }
                            if(language == null) { return 'Null'; }
                            else { return language; }
                        }
                        function transaction_time_data(transaction_time) {
                            const unix_tt = transaction_time;
                            const milliseconds = unix_tt * 1000;
                            return `${Date(milliseconds)}`;
                        }
                        function is_cert_processed_data(is_cert_processed) {
                            if(is_cert_processed === 0) {
                                return 'False';
                            }
                            if(is_cert_processed === 1) {
                                return 'True';
                            }
                        }
                        function is_cert_valid_data(is_cert_valid) {
                            if(is_cert_valid === 0) {
                                return 'False';
                            }
                            if(is_cert_valid === 1) {
                                return 'True';
                            }
                        }
                        function created_at_data(created_at) {
                            const ca_new = new Date(created_at.split('Z')[0]);
                            return `${ca_new}`;
                        }
                        function is_filtered_data(is_filtered) {
                            if(is_filtered == 0) {
                                return 'False';
                            }
                            else if(is_filtered == 1) {
                                return 'True';
                            }
                        }
                        function is_nsfw_data(is_nsfw) {
                            if(is_nsfw == 0) {
                                return 'False';
                            }
                            else if(is_nsfw == 1) {
                                return 'True';
                            }
                        }
  
                        // Stream information
                        const audio_duration = stream.data[0].audio_duration; // Returns as null
                        const author = stream.data[0].author;
                        const bid_state = stream.data[0].bid_state;
                        const certificate = stream.data[0].certificate; // Returns as null
                        const city = stream.data[0].city; // Returns as null
                        const claim_address = stream.data[0].claim_address;
                        const claim_id = stream.data[0].claim_id;
                        const claim_id_list = stream.data[0].claim_id_list; // Returns as null
                        const claim_reference = stream.data[0].claim_reference; // Returns as null
                        const claim_type = stream.data[0].claim_type;
                        const code = stream.data[0].code; // Returns as null
                        const content_type = stream.data[0].content_type; // Returns as null
                        const country = stream.data[0].country; // Returns as null
                        const created_at = stream.data[0].created_at;
                        const description = stream.data[0].description;
                        const duration = stream.data[0].duration; // Returns as null
                        const effective_amount = stream.data[0].effective_amount;
                        const email = stream.data[0].email; // Returns as null
                        const fee = stream.data[0].fee;
                        const fee_address = stream.data[0].fee_address;
                        const fee_currency = stream.data[0].fee_currency; // Returns as null
                        const frame_height = stream.data[0].frame_height; // Returns as null
                        const frame_width = stream.data[0].frame_width; // Returns as null
                        const has_claim_list = stream.data[0].has_claim_list; // Returns as null
                        const height = stream.data[0].height;
                        const id = stream.data[0].id;
                        const is_cert_processed = stream.data[0].is_cert_processed;
                        const is_cert_valid = stream.data[0].is_cert_valid;
                        const is_filtered = stream.data[0].is_filtered;
                        const is_nsfw = stream.data[0].is_nsfw;
                        const language = stream.data[0].language;
                        const latitude = stream.data[0].latitude; // Returns as null
                        const license = stream.data[0].license;
                        const license_url = stream.data[0].license_url;
                        const list_type = stream.data[0].list_type; // Returns as null
                        const longitude = stream.data[0].longitude; // Returns as null
                        const modified_at = stream.data[0].modified_at;
                        const stream_name = stream.data[0].name;
                        const os = stream.data[0].os; // Returns as null
                        const preview = stream.data[0].preview;
                        const publisher_id = stream.data[0].publisher_id;
                        const publisher_sig = stream.data[0].publisher_sig;
                        const release_time = stream.data[0].release_time;
                        const sd_hash = stream.data[0].sd_hash; // Returns as null
                        const source_hash = stream.data[0].source_hash; // Returns as null
                        const source_media_type = stream.data[0].source_media_type; // Returns as null
                        const source_name = stream.data[0].source_name; // Returns as null
                        const source_size = stream.data[0].source_size; // Returns as null
                        const source_url = stream.data[0].source_url; // Returns as null
                        const state = stream.data[0].state; // Returns as null
                        const thumbnail_url = stream.data[0].thumbnail_url;
                        const title = stream.data[0].title;
                        const transaction_hash_id = stream.data[0].transaction_hash_id;
                        const transaction_hash_update = stream.data[0].transaction_hash_update;
                        const transaction_time = stream.data[0].transaction_time;
                        const type = stream.data[0].type;
                        const valid_at_height = stream.data[0].valid_at_height;
                        const version = stream.data[0].version;
                        const vout = stream.data[0].vout;
                        const vout_update = stream.data[0].vout_update;
                        const website_url = stream.data[0].website_url; // Returns as null

                        if(document.getElementById('loading')) {
                            document.getElementById('loading').remove()
                        }
                        if(document.getElementById(`stream_${claimId.ChannelClaimID}`)) {
                            // Do not add
                        }
                        else {
                            document.getElementById('streams').innerHTML += `
                            <div id="stream_${claimId.ChannelClaimID}" class="stream_container">
                                <div id="grid-container" class="grid-container">
                                    <div class="thumbnail" style="background-color: #241c30;">
                                        <a href="{data.stream_url}" target="_blank">
                                            <img class="thumbnail_image" src="${thumbnail_url}" onError="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Odyssey_logo_1.svg/220px-Odyssey_logo_1.svg.png';">
                                        </a>
                                    </div>
                                    <div class="information">
                                        <div id="information-data" class="information-data">
                                            <h3 style="margin-top:-5px;">Stream information</h3>
                                            <div class="led-red"></div>
                                            <br>
                                            <div>Title: ${title}</div>
                                            <div>Streamer: <a href='${channelLink}'>${channel_name}</a></div>
                                            <div>Stream: <a href='${stream_url}'>${stream_name}</a></div>
                                            <div>Language: ${language_data(language)}</div>
                                            <span id="moreText" style="display:none;">
                                                <div>Filtered: ${is_filtered_data(is_filtered)}</div>
                                                <div>NSFW: ${is_nsfw_data(is_nsfw)}</div>
                                                <div>Viewers: ${viewCount}</div>
                                                <div>Live: ${live}</div>
                                                <div>Canonical URL: <a href='${stream_url}'>${stream_url}</a></div>
                                                <div>Author: ${author}</div>
                                                <div>Bid State: ${bid_state}</div>
                                                <div>Claim Address: ${claim_address}</div>
                                                <div>Claim ID: ${claim_id}</div>
                                                <div>Created At: ${created_at_data(created_at)}</div>
                                                <div>Description: ${description}</div>
                                                <div>Effective Amount: ${effective_amount}</div>
                                                <div>Fee: ${fee}</div>
                                                <div>Height: ${height}</div>
                                                <div>Id: ${id}</div>
                                                <div>Is Cert Processed: ${is_cert_processed_data(is_cert_processed)}</div>
                                                <div>Is Cert Valid: ${is_cert_valid_data(is_cert_valid)}</div>
                                                <div>License: ${license}</div>
                                                <div>License URL: ${license_url}</div>
                                                <div>Modified At: ${modified_at}</div>
                                                <div>Publisher ID: ${publisher_id}</div>
                                                <div>Publisher Signature: ${publisher_sig}</div>
                                                <div>Release Time: ${release_time}</div>
                                                <div>Thumbnail URL: <a href='${thumbnail_url}'>${thumbnail_url}</a></div>
                                                <div>Transaction Hash ID: ${transaction_hash_id}</div>
                                                <div>Transaction Hash Update: ${transaction_hash_update}</div>
                                                <div>Transaction Time: ${transaction_time_data(transaction_time)}</div>
                                                <div>Type: ${type}</div>
                                                <div>Valid At Height: ${valid_at_height}</div>
                                                <div>Audio Duration: ${audio_duration}</div>
                                                <div>Certificate: ${certificate}</div>
                                                <div>City: ${city}</div>
                                                <div>Claim ID List: ${claim_id_list}</div>
                                                <div>Claim Reference: ${claim_reference}</div>
                                                <div>Claim Type: ${claim_type}</div>
                                                <div>Code: ${code}</div>
                                                <div>Content Type: ${content_type}</div>
                                                <div>Country: ${country}</div>
                                                <div>Duration: ${duration}</div>
                                                <div>E-Mail: ${email}</div>
                                                <div>Fee Address: ${fee_address}</div>
                                                <div>Fee Currency: ${fee_currency}</div>
                                                <div>Frame Height: ${frame_height}</div>
                                                <div>Frame Width: ${frame_width}</div>
                                                <div>Has Claim List: ${has_claim_list}</div>
                                                <div>Latitude: ${latitude}</div>
                                                <div>List Type: ${list_type}</div>
                                                <div>Longitude: ${longitude}</div>
                                                <div>OS: ${os}</div>
                                                <div>Preview: ${preview}</div>
                                                <div>SD Hash: ${sd_hash}</div>
                                                <div>Source Hash: ${source_hash}</div>
                                                <div>Source Media Type: ${source_media_type}</div>
                                                <div>Source Name: ${source_name}</div>
                                                <div>Source Size: ${source_size}</div>
                                                <div>Source URL: ${source_url}</div>
                                                <div>State: ${state}</div>
                                                <div>Timestamp: ${timestamp}</div>
                                                <div>Version: ${version}</div>
                                                <div>Vout: ${vout}</div>
                                                <div>Vout Update: ${vout_update}</div>
                                                <div>Website URL: ${website_url}</div>
                                            </span>
                                            <button onclick="showMore(this)" id="showMore">Show More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        }
                    }
                })
            })
        }
    })
}