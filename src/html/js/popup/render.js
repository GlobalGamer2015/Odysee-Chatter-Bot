const Sentry = require('@sentry/electron');
Sentry.init({ dsn: "https://32e566d62a3d46cdafa1a806df0e0f00@app.glitchtip.com/1987" });

function toHex(str) {
    let s = unescape(encodeURIComponent(str));
    let result = '';
    for (let i = 0; i < s.length; i++) {
      result += s.charCodeAt(i).toString(16).padStart(2, '0');
    }
  
    return result;
}

function Interacter(tempData,sdk) {
    const { Lbry } = require('lbry-sdk-nodejs/lib/sdk')

    Lbry.status()
    .then(status => {
        if(status.is_running === true) {
            // LBRY App or LBRYnet is active.
            document.getElementById('app_status').innerText = "SDK detected.";

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
                .then(info => {
                    document.getElementById('thumbnail').src = `${info.items[0].value.thumbnail.url}`;
                    document.getElementById('interactor').innerText = `Interacting as ${info.items[0].name}`;
                    sdk['disabled'] = false;
                })
            })
        }
    }).
    catch(e => {
        if(e.code === "ECONNREFUSED") {
            // LBRY App or LBRYnet is not active.
            document.getElementById('app_status').innerText = "SDK is not detected.";
            document.getElementById('thumbnail').src = "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Odyssey_logo_1.svg/220px-Odyssey_logo_1.svg.png"
            document.getElementById('interactor').innerText = `Interacting as DISABLED`;

            sdk['disabled'] = true;
            
            document.getElementById('Option_Pin').style.pointerEvents = "none";
            document.getElementById('Option_UnPin').style.pointerEvents = "none";
            document.getElementById('Option_AddAsModerator').style.pointerEvents = "none";
            document.getElementById('Option_RemoveAsModerator').style.pointerEvents = "none";
            document.getElementById('Option_Remove').style.pointerEvents = "none";
            document.getElementById('Option_Block').style.pointerEvents = "none";
            document.getElementById('Option_TempBlock').style.pointerEvents = "none";
            document.getElementById('Option_UnBlock').style.pointerEvents = "none";
        }
    })
}

function Option_Pin(tempData,sdk) {
    // Done
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
            .then(info => {
                fetch('https://comments.lbry.com/api', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 5, "is_channel_signature_valid": true, "visible": true } }`
                })
                .then(res => res.json())
                .then(comments_data => {
                    const comments = comments_data.result.items;
                    comments.forEach(comment_data => {
                        const comment_id = comment_data.comment_id;
                        if(comment_id === tempData.comment_id) {
                            Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                            .then(signed => {
                                fetch(`https://comments.odysee.com/api/v2?m=comment.Pin`, {
		                            method: 'post',
		                            headers: {
			                            'Content-Type': 'application/json'
		                            },
                                    body: `{ "jsonrpc":"2.0", "id":1, "method":"comment.Pin", "params":{ "comment_id": "${comment_id}", "channel_id": "${user_data.channel_claim_id}", "channel_name": "${info.items[0].name}", "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" } }`
	                            })
                                .then(res => res.json())
                                .then(res => {
                                    const swal = require('sweetalert');
                                    if(res.result) {
                                        swal({
                                            title: "Success",
                                            text: "Comment has been pinned.",
                                            icon: "success"
                                        })
                                    }
                                    else {
                                        swal({
                                            title: "Error",
                                            text: `An error has occurred.\n${res.error.message}`,
                                            icon: "error"
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}

function Option_UnPin(tempData,sdk) {
    // Done
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
            .then(info => {
                fetch('https://comments.lbry.com/api', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 100, "is_channel_signature_valid": true, "visible": true } }`
                })
                .then(res => res.json())
                .then(comments_data => {
                    const comments = comments_data.result.items;
                    comments.forEach(comment_data => {
                        const comment_id = comment_data.comment_id;
                        if(comment_id === tempData.comment_id) {
                            Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                            .then(signed => {
                                fetch(`https://comments.odysee.com/api/v2?m=comment.Pin`, {
		                            method: 'post',
	    	                        headers: {
    			                        'Content-Type': 'application/json'
		                            },
                                    body: `{ "jsonrpc":"2.0", "id":1, "method":"comment.Pin", "params":{ "comment_id": "${comment_id}", "channel_id": "${user_data.channel_claim_id}", "channel_name": "${info.items[0].name}", "remove":true, "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" } }`
	                            })
                                .then(res => res.json())
                                .then(res => {
                                    const swal = require('sweetalert');
                                    if(res.result) {
                                        swal({
                                            title: "Success",
                                            text: "Comment has been unpinned.",
                                            icon: "success"
                                        })
                                    }
                                    else {
                                        swal({
                                            title: "Error",
                                            text: `An error has occurred.\n${res.error.message}`,
                                            icon: "error"
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}

function Option_AddAsModerator(tempData,sdk) {
    // not done
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
                
            fetch('https://comments.lbry.com/api', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 100, "is_channel_signature_valid": true, "visible": true } }`
            })
            .then(res => res.json())
            .then(comments_data => {
                const comments = comments_data.result.items;
                comments.forEach(comment_data => {
                    const comment_id = comment_data.comment_id;
                    if(comment_id === tempData.comment_id) {
                        Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                        .then(signed => {
                            fetch(`https://comments.odysee.com/api/v2?m=moderation.AddDelegate`, {
		                        method: 'post',
		                        headers: {
		                            'Content-Type': 'application/json'
	                            },
                                body: `{ "jsonrpc":"2.0", "id":1, "method":"moderation.AddDelegate", "params":{ "mod_channel_id":"${tempData.id}", "mod_channel_name":"${tempData.name}", "creator_channel_id":"${user_data.channel_claim_id}", "creator_channel_name":"${user_data.channel_claim_name}", "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" } }`
	                        })
                            .then(res => res.json())
                            .then(res => {
                                const swal = require('sweetalert');
                                if(res.result) {
                                    swal({
                                        title: "Success",
                                        text: `${tempData.name} has been added as a moderator.`,
                                        icon: "success"
                                    })
                                }
                                else {
                                    swal({
                                        title: "Error",
                                        text: `An error has occurred.\n${res.error.message}`,
                                        icon: "error"
                                    })
                                }
                            })
                        })
                    }
                })
            })
        })
    }
}

function Option_RemoveAsModerator(tempData,sdk) {
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
        
            fetch('https://comments.lbry.com/api', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 100, "is_channel_signature_valid": true, "visible": true } }`
            })
            .then(res => res.json())
            .then(comments_data => {
                const comments = comments_data.result.items;
                comments.forEach(comment_data => {
                    const comment_id = comment_data.comment_id;
                    if(comment_id === tempData.comment_id) {
                        Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                        .then(signed => {
                            fetch(`https://comments.odysee.com/api/v2?m=moderation.RemoveDelegate`, {
		                        method: 'post',
		                        headers: {
		                            'Content-Type': 'application/json'
	                            },
                                body: `{ "jsonrpc":"2.0", "id":1, "method":"moderation.RemoveDelegate", "params":{ "mod_channel_id":"${tempData.id}", "mod_channel_name":"${tempData.name}", "creator_channel_id":"${user_.channel_claim_id}", "creator_channel_name":"${user_data.channel_claim_name}", "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" } }`
	                        })
                            .then(res => res.json())
                            .then(res => {
                                const swal = require('sweetalert');
                                if(res.result) {
                                    swal({
                                        title: "Success",
                                        text: `${tempData.name} has been removed as a moderator.`,
                                        icon: "success"
                                    })
                                }
                                else {
                                    swal({
                                        title: "Error",
                                        text: `An error has occurred.\n${res.error.message}`,
                                        icon: "error"
                                    })
                                }
                            })
                        })
                    }
                })
            })
        })
    }
}

function Option_Remove(tempData,sdk) {
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
            
            fetch('https://comments.lbry.com/api', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 100, "is_channel_signature_valid": true, "visible": true } }`
            })
            .then(res => res.json())
            .then(comments_data => {
                const comments = comments_data.result.items;
                comments.forEach(comment_data => {
                    const comment_id = comment_data.comment_id;
                    if(comment_id === tempData.comment_id) {
                        Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                        .then(signed => {
                            fetch(`https://comments.odysee.com/api/v2?m=comment.Abandon`, {
		                        method: 'post',
		                        headers: {
		                            'Content-Type': 'application/json'
	                            },
                                body: `{ "jsonrpc":"2.0", "id":1, "method":"comment.Abandon", "params":{ "comment_id":"${comment_id}", "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" } }`
	                        })
                            .then(res => res.json())
                            .then(res => {
                                const swal = require('sweetalert');
                                if(res.result) {
                                    swal({
                                        title: "Success",
                                        text: "Comment has been removed.",
                                        icon: "success"
                                    })
                                    return removeComment(comment_id);
                                }
                                else {
                                    swal({
                                        title: "Error",
                                        text: `An error has occurred.\nError: ${res.error.message}`,
                                        icon: "error"
                                    })
                                }
                            })
                        })
                    }
                })
            })
        })
    }
}

function Option_Block_Perm(tempData,sdk) {
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
            .then(info => {
                fetch('https://comments.lbry.com/api', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 5, "is_channel_signature_valid": true, "visible": true } }`
                })
                .then(res => res.json())
                .then(comments_data => {
                    const comments = comments_data.result.items;
                    comments.forEach(comment_data => {
                        const comment_id = comment_data.comment_id;
                        if(comment_id === tempData.comment_id) {
                            Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                            .then(signed => {
                                fetch(`https://comments.odysee.com/api/v2?m=moderation.Block`, {
		                            method: 'post',
		                            headers: {
			                            'Content-Type': 'application/json'
		                            },
                                    body: `{ "jsonrpc":"2.0", "id":1, "method":"moderation.Block", "params":{ "mod_channel_id":"${user_data.channel_claim_id}", "mod_channel_name":"${info.items[0].name}", "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" "block_all":false, "blocked_channel_id":"${tempData.id}", "blocked_channel_name":"${tempData.name}" } }`
	                            })
                                .then(res => res.json())
                                .then(res => {
                                    const swal = require('sweetalert');
                                    if(res.result) {
                                        swal({
                                            title: "Success",
                                            text: `${tempData.name} has been banned.`,
                                            icon: "success"
                                        })
                                    }
                                    else {
                                        swal({
                                            title: "Error",
                                            text: `An error has occurred.\n${res.error.message}`,
                                            icon: "error"
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}

function Option_Block_Temp(tempData,sdk) {
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
            .then(info => {
                fetch('https://comments.lbry.com/api', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 100, "is_channel_signature_valid": true, "visible": true } }`
                })
                .then(res => res.json())
                .then(comments_data => {
                    const comments = comments_data.result.items;
                    comments.forEach(comment_data => {
                        const comment_id = comment_data.comment_id;
                        if(comment_id === tempData.comment_id) {
                            Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                            .then(signed => {
                                fetch(`https://comments.odysee.com/api/v2?m=moderation.Block`, {
		                            method: 'post',
		                            headers: {
			                            'Content-Type': 'application/json'
		                            },
                                    body: `{ "jsonrpc":"2.0", "id":1, "method":"moderation.Block", "params":{ "mod_channel_id":"${user_data.channel_claim_id}", "mod_channel_name":"${info.items[0].name}", "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" "block_all":false, "blocked_channel_id":"${tempData.id}", "blocked_channel_name":"${tempData.name}", "time_out":600 } }`
	                            })
                                .then(res => res.json())
                                .then(res => {
                                    const swal = require('sweetalert');
                                    if(res.result) {
                                        swal({
                                            title: "Success",
                                            text: `${tempData.name} has been temporarily banned.`,
                                            icon: "success"
                                        })
                                    }
                                    else {
                                        swal({
                                            title: "Error",
                                            text: `An error has occurred.\n${res.error.message}`,
                                            icon: "error"
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}

function Option_Block_Unban(tempData,sdk) {
    if(sdk.disabled === false) {
        const fetch = require('node-fetch');
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
            .then(info => {
                fetch('https://comments.lbry.com/api', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: `{ "jsonrpc": "2.0", "id": "null", "method": "get_claim_comments", "params": { "claim_id": "${user_data.stream_claim_id}", "page_size": 100, "is_channel_signature_valid": true, "visible": true } }`
                })
                .then(res => res.json())
                .then(comments_data => {
                    const comments = comments_data.result.items;
                    comments.forEach(comment_data => {
                        const comment_id = comment_data.comment_id;
                        if(comment_id === tempData.comment_id) {
                            Lbry.channel_sign({channel_id: user_data.channel_claim_id, hexdata: toHex(comment_id)})
                            .then(signed => {
                                fetch(`https://comments.odysee.com/api/v2?m=moderation.UnBlock`, {
		                            method: 'post',
		                            headers: {
			                            'Content-Type': 'application/json'
		                            },
                                    body: `{ "jsonrpc":"2.0", "id":1, "method":"moderation.UnBlock", "params":{ "mod_channel_id":"${user_data.channel_claim_id}", "mod_channel_name":"${info.items[0].name}", "signature": "${signed.signature}", "signing_ts": "${signed.signing_ts}" "global_un_block":false, "un_blocked_channel_id":"${tempData.id}", "un_blocked_channel_name":"${tempData.name}" } }`
	                            })
                                .then(res => res.json())
                                .then(res => {
                                    const swal = require('sweetalert');
                                    if(res.result) {
                                        swal({
                                            title: "Success",
                                            text: `${tempData.name} has been unbanned.`,
                                            icon: "success"
                                        })
                                    }
                                    else {
                                        swal({
                                            title: "Error",
                                            text: `An error has occurred.\n${res.error.message}`,
                                            icon: "error"
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}