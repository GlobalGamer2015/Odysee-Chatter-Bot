function ReadSettingsPage_Language() {
    const fs = require('fs');
    const process = require('process');

    fs.readFile("./data/languages.json", 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        const languages = JSON.parse(data);
        const languagesObject = languages.languages;

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }

            settingsObject = JSON.parse(data);

            languagesObject.forEach(function(language) {
                const language_option = document.createElement("option");
                const language_uppercase_name = language.name.charAt(0).toUpperCase();
                const language_split_name = language.name.split(language.name.charAt(0)).join("");

                language_option.text = `${language_uppercase_name}${language_split_name}`;
                language_option.value = language.name;
                document.getElementById('language').appendChild(language_option)

                if(language.name == settingsObject['language']) {
                    const string = language.string;
                    if(document.getElementById("navbar-commands") !== null) {
                        document.getElementById("navbar-commands").innerHTML = string.navbar_commands;
                    }
                    if(document.getElementById("navbar-chat") !== null) {
                        document.getElementById("navbar-chat").innerHTML = string.navbar_chat;
                    }
                    if(document.getElementById("navbar-odyseechatterbot") !== null) {
                        document.getElementById("navbar-odyseechatterbot").innerHTML = string.navbar_odyseechatterbot;
                    }
                    if(document.getElementById("navbar-settings") !== null) {
                        document.getElementById("navbar-settings").innerHTML = string.navbar_settings;
                    }
                    if(document.getElementById("navbar-lbc") !== null) {
                        document.getElementById("navbar-lbc").innerHTML = string.navbar_lbc;
                    }
                    if(document.getElementById("navbar-bmac") !== null) {
                        document.getElementById("navbar-bmac").innerHTML = string.navbar_bmac;
                    }
                    if(document.getElementById("navbar-logout") !== null) {
                        document.getElementById("navbar-logout").innerHTML = string.navbar_logout;
                    }
                    if(document.getElementById("h1-settings") !== null) {
                        document.getElementById("h1-settings").innerHTML = string.settings_page.h1_settings;
                    }
                    if(document.getElementById("label_tip_chat_announcement") !== null) {
                        document.getElementById("label_tip_chat_announcement").innerHTML = string.settings_page.label_tip_chat_announcement;
                    }
                    if(document.getElementById("tip_chat_announcement_disabled") !== null) {
                        document.getElementById("tip_chat_announcement_disabled").innerHTML = string.settings_page.tip_chat_announcement_disabled;
                    }
                    if(document.getElementById("tip_chat_announcement_enabled") !== null) {
                        document.getElementById("tip_chat_announcement_enabled").innerHTML = string.settings_page.tip_chat_announcement_enabled;
                    }
                    if(document.getElementById("label_tip_notification") !== null) {
                        document.getElementById("label_tip_notification").innerHTML = string.settings_page.label_tip_notification;
                    }
                    if(document.getElementById("tip_notification_disabled") !== null) {
                        document.getElementById("tip_notification_disabled").innerHTML = string.settings_page.tip_notification_disabled;
                    }
                    if(document.getElementById("tip_notification_enabled") !== null) {
                        document.getElementById("tip_notification_enabled").innerHTML = string.settings_page.tip_notification_enabled;
                    }
                    if(document.getElementById("label_fiat_notification_amount") !== null) {
                        document.getElementById("label_fiat_notification_amount").innerHTML = string.settings_page.label_fiat_notification_amount;
                    }
                    if(document.getElementById("label_lbc_notification_amount") !== null) {
                        document.getElementById("label_lbc_notification_amount").innerHTML = string.settings_page.label_lbc_notification_amount;
                    }
                    if(document.getElementById("label_language") !== null) {
                        document.getElementById("label_language").innerHTML = string.settings_page.label_language;
                    }
                    if(document.getElementById("button_submit") !== null) {
                        document.getElementById("button_submit").innerHTML = string.settings_page.button_submit;
                    }
                }
            })
        })
    })
}

function ReadChatPage_Language() {
    const fs = require('fs');
    const process = require('process');

    fs.readFile("./data/languages.json", 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        const languages = JSON.parse(data);
        const languagesObject = languages.languages;

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }

            settingsObject = JSON.parse(data);

            languagesObject.forEach(function(language) {
                if(language.name == settingsObject['language']) {
                    const string = language.string;
                    if(document.getElementById("navbar-commands") !== null) {
                        document.getElementById("navbar-commands").innerHTML = string.navbar_commands;
                    }
                    if(document.getElementById("navbar-chat") !== null) {
                        document.getElementById("navbar-chat").innerHTML = string.navbar_chat;
                    }
                    if(document.getElementById("navbar-odyseechatterbot") !== null) {
                        document.getElementById("navbar-odyseechatterbot").innerHTML = string.navbar_odyseechatterbot;
                    }
                    if(document.getElementById("navbar-settings") !== null) {
                        document.getElementById("navbar-settings").innerHTML = string.navbar_settings;
                    }
                    if(document.getElementById("navbar-lbc") !== null) {
                        document.getElementById("navbar-lbc").innerHTML = string.navbar_lbc;
                    }
                    if(document.getElementById("navbar-bmac") !== null) {
                        document.getElementById("navbar-bmac").innerHTML = string.navbar_bmac;
                    }
                    if(document.getElementById("navbar-logout") !== null) {
                        document.getElementById("navbar-logout").innerHTML = string.navbar_logout;
                    }
                }
            })
        })
    })
}

function ReadCommandsPage_Language() {
    const fs = require('fs');
    const process = require('process');

    fs.readFile("./data/languages.json", 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        const languages = JSON.parse(data);
        const languagesObject = languages.languages;

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }

            settingsObject = JSON.parse(data);

            languagesObject.forEach(function(language) {
                if(language.name == settingsObject['language']) {
                    const string = language.string;
                    if(document.getElementById("navbar-commands") !== null) {
                        document.getElementById("navbar-commands").innerHTML = string.navbar_commands;
                    }
                    if(document.getElementById("navbar-chat") !== null) {
                        document.getElementById("navbar-chat").innerHTML = string.navbar_chat;
                    }
                    if(document.getElementById("navbar-odyseechatterbot") !== null) {
                        document.getElementById("navbar-odyseechatterbot").innerHTML = string.navbar_odyseechatterbot;
                    }
                    if(document.getElementById("navbar-settings") !== null) {
                        document.getElementById("navbar-settings").innerHTML = string.navbar_settings;
                    }
                    if(document.getElementById("navbar-lbc") !== null) {
                        document.getElementById("navbar-lbc").innerHTML = string.navbar_lbc;
                    }
                    if(document.getElementById("navbar-bmac") !== null) {
                        document.getElementById("navbar-bmac").innerHTML = string.navbar_bmac;
                    }
                    if(document.getElementById("navbar-logout") !== null) {
                        document.getElementById("navbar-logout").innerHTML = string.navbar_logout;
                    }
                    if(document.getElementById("Command_Create") !== null) {
                        document.getElementById("Command_Create").innerHTML = string.commands_page.Command_Create;
                    }
                    if(document.getElementById("option-row_1") !== null) {
                        document.getElementById("option-row_1").innerHTML = string.commands_page.option_row_1;
                    }
                    if(document.getElementById("option-row_2") !== null) {
                        document.getElementById("option-row_2").innerHTML = string.commands_page.option_row_2;
                    }
                    if(document.getElementById("option-row_3") !== null) {
                        document.getElementById("option-row_3").innerHTML = string.commands_page.option_row_3;
                    }
                    if(document.getElementById("option-command") !== null) {
                        document.getElementById("option-command").innerHTML = string.commands_page.option_command;
                    }
                    if(document.getElementById("option-timer") !== null) {
                        document.getElementById("option-timer").innerHTML = string.commands_page.option_timer;
                    }
                    if(document.getElementById("Command_Remove") !== null) {
                        document.getElementById("Command_Remove").innerHTML = string.commands_page.Command_Remove;
                    }
                }
            })
        })
    })
}

function ReadMainPage_Language() {
    const fs = require('fs');
    const process = require('process');

    fs.readFile("./data/languages.json", 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        const languages = JSON.parse(data);
        const languagesObject = languages.languages;

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }

            settingsObject = JSON.parse(data);

            languagesObject.forEach(function(language) {
                if(language.name == settingsObject['language']) {
                    const string = language.string;
                    if(document.getElementById("navbar-commands") !== null) {
                        document.getElementById("navbar-commands").innerHTML = string.navbar_commands;
                    }
                    if(document.getElementById("navbar-chat") !== null) {
                        document.getElementById("navbar-chat").innerHTML = string.navbar_chat;
                    }
                    if(document.getElementById("navbar-odyseechatterbot") !== null) {
                        document.getElementById("navbar-odyseechatterbot").innerHTML = string.navbar_odyseechatterbot;
                    }
                    if(document.getElementById("navbar-settings") !== null) {
                        document.getElementById("navbar-settings").innerHTML = string.navbar_settings;
                    }
                    if(document.getElementById("navbar-lbc") !== null) {
                        document.getElementById("navbar-lbc").innerHTML = string.navbar_lbc;
                    }
                    if(document.getElementById("navbar-bmac") !== null) {
                        document.getElementById("navbar-bmac").innerHTML = string.navbar_bmac;
                    }
                    if(document.getElementById("navbar-logout") !== null) {
                        document.getElementById("navbar-logout").innerHTML = string.navbar_logout;
                    }
                    if(document.getElementById("h3-about") !== null) {
                        document.getElementById("h3-about").innerHTML = string.main_page.h3_about;
                    }
                    if(document.getElementById("label-version") !== null) {
                        document.getElementById("label-version").innerHTML = string.main_page.label_version;
                    }
                    if(document.getElementById("report-issues") !== null) {
                        document.getElementById("report-issues").innerHTML = string.main_page.report_issues;
                    }
                    if(document.getElementById("suggest-features") !== null) {
                        document.getElementById("suggest-features").innerHTML = string.main_page.suggest_features;
                    }
                    if(document.getElementById("h3-useful-resources") !== null) {
                        document.getElementById("h3-useful-resources").innerHTML = string.main_page.h3_useful_resources;
                    }
                    if(document.getElementById("livestream-settings") !== null) {
                        document.getElementById("livestream-settings").innerHTML = string.main_page.livestream_settings;
                    }
                }
            })
        })
    })
}

function ReadNoclaimidPage_Language() {
    const fs = require('fs');
    const process = require('process');

    fs.readFile("./data/languages.json", 'utf8', function(err,data) {
        if(err) {
            swal({
                title: "Error",
                text: `Please screenshot this error and report it:\n\n${err}`,
                icon: "error"
            });
        }
        const languages = JSON.parse(data);
        const languagesObject = languages.languages;

        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
            if(err) {
                swal({
                    title: "Error",
                    text: `Please screenshot this error and report it:\n\n${err}`,
                    icon: "error"
                });
            }

            settingsObject = JSON.parse(data);

            languagesObject.forEach(function(language) {
                if(language.name == settingsObject['language']) {
                    const string = language.string;
                    if(document.getElementById("navbar-odyseechatterbot") !== null) {
                        document.getElementById("navbar-odyseechatterbot").innerHTML = string.navbar_odyseechatterbot;
                    }
                    if(document.getElementById("navbar-logout") !== null) {
                        document.getElementById("navbar-logout").innerHTML = string.navbar_logout;
                    }
                    if(document.getElementById("label-email-address") !== null) {
                        document.getElementById("label-email-address").innerHTML = string.noclaimid_page.label_email_address;
                    }
                    if(document.getElementById("label-claim-id") !== null) {
                        document.getElementById("label-claim-id").innerHTML = string.noclaimid_page.label_claim_id;
                    }
                    if(document.getElementById("submit") !== null) {
                        document.getElementById("submit").innerHTML = string.noclaimid_page.submit;
                    }
                    if(document.getElementById("tos") !== null) {
                        document.getElementById("tos").innerHTML = string.noclaimid_page.tos;
                    }
                    if(document.getElementById("tos2") !== null) {
                        document.getElementById("tos2").innerHTML = string.noclaimid_page.tos2;
                    }
                }
            })
        })
    })
}