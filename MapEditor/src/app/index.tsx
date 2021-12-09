import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MENU_ITEMS } from "./menu-items";
import { MenuBarStore } from "./stores/MenuBarStore";
import { RootStore } from "./stores/RootStore";

const exec = (callback: Function) => callback();

exec(async () => 
{
	const root = document.createElement("div");
	root.id = "root";

	document.body.appendChild(root);

	RootStore.init(MenuBarStore, MENU_ITEMS);

	try
	{
		ReactDOM.render(<App />, root);
	}
	catch (e)
	{
		console.error(e);
	}
});
