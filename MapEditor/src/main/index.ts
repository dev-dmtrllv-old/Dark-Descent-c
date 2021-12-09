import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";

(process.env as any)["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;

let win: BrowserWindow;
let isReady = false;

app.whenReady().then(async () => 
{
	win = new BrowserWindow({
		title: "Dark Descent - Map Editor",
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.setMenu(null);

	await win.loadFile("./dist/app/index.html");
});

ipcMain.on("ready", (e, ...args) => 
{
	if (!isReady)
	{
		isReady = true;
		win.maximize();
		win.show();
		win.webContents.openDevTools();
		fs.watch("./dist/app/js", {  }, () => win.webContents.reload());
		fs.watch("./dist/app/css", {  }, () => win.webContents.reload());
		fs.watch("./dist/app/index.html", {  }, () => win.webContents.reload());
	}
});

app.on("quit", () => app.quit());
