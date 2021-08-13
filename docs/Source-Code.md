# Source Code

## Installation Without Building
Run the following commands:
1. npm run-script postinstall
2. See Dummy Config
3. npm start

If you encounter a EACCESS error then you will need to reopen your Coding program with Admin Rights.

## Dummy Config
You will encounter a missing config error, this will not be included but you can set it up by creating a Auth0 Application, then goto Settings and replace the dummy config with your Application information.  

Filename: 'config.json' |
<code>
{
    "authRequired": boolean,
    "auth0Logout": boolean,
    "secret": "string",
    "baseURL": "url",
    "clientID": "string",
    "issuerBaseURL": "url"
}
</code>

## Creating Executable
Run the following command:
1. npm run-script pack

## Resources Used
* [LBRY SDK](https://github.com/lbryio/lbry-sdk)
* [LBRY SDK API](https://lbry.tech/api/sdk)
* Odysee Chatter Bot API - Closed Source
* [LBRY-SDK-NodeJS](https://www.npmjs.com/package/lbry-sdk-nodejs)
* [Electron Boilerplate](https://github.com/sindresorhus/electron-boilerplate)
* [Auth0](https://auth0.com/universal-login)
* [LBRY ChainQuery](https://chainquery.lbry.com/api/)
* [Odysee Live API](https://api.live.odysee.com/v1/odysee/live/)
* Background supplied by [VladHZC](https://github.com/VladHZC)
* [Odysee Connection WS Code](https://github.com/tuxfoo/nodecg-odysee-bundles)
* [Sweet Alert](https://github.com/t4t5/sweetalert)
* [Digital Ocean]()