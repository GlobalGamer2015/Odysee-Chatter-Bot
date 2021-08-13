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

function serverStatusCheck() {
    JavaScript:serverStatus()
    setTimeout(function() {
        JavaScript:serverStatus()
    }, 60000)
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
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value="${CommandName}">
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value="${CommandReply}">
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
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value="${CommandName}">
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value="${CommandReply}">
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
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value="${CommandName}">
                                    <br><label>Every &nbsp;</label><input class="Command" id="${CommandName}_Time" type="number" value="${CommandTimer}" min="1" max="999" style="width: 50px;"><label> &nbsp; minutes.</label>
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value="${CommandReply}">
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
                                    <br><label>Every &nbsp;</label><input class="Command" id="${CommandName}_Time" type="number" value="${CommandTimer}" min="1" max="999" style="width: 50px;"><label> &nbsp; minutes.</label>
                                    <br><label>Command: &nbsp; </label><input class="Command" id="${CommandName}_Name" type="text" value="${CommandName}">
                                    <br><label>Reply: &nbsp; </label><input class="Command" id="${CommandName}_Reply" type="text" value="${CommandReply}">
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

function readChatHistory() {
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
                var messages = chatData.messages;
                messages.forEach(function(data) {
                    const message = document.getElementById("messageContainer");
    
                    const url = data.channel_url;
                    const url_odysee = url.split("lbry://")
                    const url_odysee_complete = `https://odysee.com/${url_odysee[1]}`;

                    var ts = require('user-timezone');
                    var timeFormat = 'h:mm:ss A';
			        var time = ts.datetime(data.timestamp, timeFormat);
    
                    if(data.is_creator == true){
                          message.innerHTML +=    `<div id="comment"><span id="time">${time}</span> · <a id="streamer" href="${url_odysee_complete}">Streamer ${data.channel_name}</a>: ${data.comment}</div>`;
                    }
                    else if(data.is_moderator == true){
                        message.innerHTML += `<div id="comment"><span id="time">${time}</span> · <a id="moderator" href="${url_odysee_complete}">Moderator ${data.channel_name}</a>: ${data.comment}</div>`;
                    }
                    else{
                        message.innerHTML += `<div id="comment"><span id="time">${time}</span> · <a id="user" href="${url_odysee_complete}">${data.channel_name}</a>: ${data.comment}</div>`;
                    }
    
                    const tutorialMessage = document.getElementById("tutorial");
                    if(tutorialMessage) {
                        tutorialMessage.remove();
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

function version() {
    var appVersion = require("electron").remote.app.getVersion();
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