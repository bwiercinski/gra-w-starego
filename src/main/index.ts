import {app, BrowserWindow} from "electron";
import {FrontendMessagesFacade} from "./engine/frontend-messages-facade";

new FrontendMessagesFacade().start();

let mainWindow: BrowserWindow | null;
const winURL =
    process.env.NODE_ENV === "development"
        ? `http://localhost:9080`
        : `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 800,
        minHeight: 500,
        minWidth: 600,
        useContentSize: true,
        width: 1300,
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL(winURL);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
