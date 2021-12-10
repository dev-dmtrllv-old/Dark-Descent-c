import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { OpenMapDialog } from "./dialogs/OpenMapDialog";
import { MENU_ITEMS } from "./menu-items";
import { DialogStore } from "./stores/DialogStore";
import { MenuBarStore } from "./stores/MenuBarStore";
import { RootStore } from "./stores/RootStore";
import { View } from "./views";

const exec = (callback: Function) => callback();

const Test = () => <View><h1>Test</h1></View>;

exec(async () => 
{
	const root = document.createElement("div");
	root.id = "root";

	document.body.appendChild(root);

	RootStore.init(MenuBarStore, MENU_ITEMS);
	RootStore.init(DialogStore, {
		open: true,
		component: OpenMapDialog,
		title: "Open Map",
		options: {
			closable: false
		},
		size: {
			max: {
				width: "920px",
				height: "720px"
			}
		}
	});

	try
	{
		ReactDOM.render(<App />, root);
	}
	catch (e)
	{
		console.error(e);
	}
});
