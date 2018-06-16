/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */
import {app} from "electron";
/* eslint-disable */

// Set environment for development
process.env.NODE_ENV = "development";

// Install `electron-debug` with `devtron`
import * as electronDebug from "electron-debug";
electronDebug({showDevTools: true});

// Install `vue-devtools`
app.on("ready", () => {
    const installExtension = require("electron-devtools-installer");
    installExtension
        .default(installExtension.VUEJS_DEVTOOLS)
        .then(() => null)
        .catch((err: Error) => {
            console.log("Unable to install `vue-devtools`: \n", err);
        });
});

// Require `main` process to boot app
import "./index";
