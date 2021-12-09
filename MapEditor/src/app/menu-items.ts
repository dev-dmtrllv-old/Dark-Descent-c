import { MenuItem, MENU_SEPERATOR } from "./stores/MenuBarStore";

export const MENU_ITEMS = [
	new MenuItem("File", [
		new MenuItem("New Map", () => console.log("New Map!"), []),
		MENU_SEPERATOR,
		new MenuItem("Open Map", []),
		new MenuItem("Open Recent Map", [
			new MenuItem("Test 123"),
			new MenuItem("Test 123"),
			new MenuItem("Test 123"),
		]),
		MENU_SEPERATOR,
		new MenuItem("Save Map", []),
		new MenuItem("Save Map As...", []),
	]),
	new MenuItem("Edit", []),
	new MenuItem("View", []),
	new MenuItem("Help", []),
];
