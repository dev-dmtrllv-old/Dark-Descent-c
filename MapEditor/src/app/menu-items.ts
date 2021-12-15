import { MenuItem, MENU_SEPERATOR } from "./stores/MenuBarStore";
import { ipcRenderer } from "electron";
import { Editor } from "./editor/Editor";
import { RootStore } from "./stores/RootStore";
import { DialogStore } from "./stores/DialogStore";
import { OpenDialog } from "./dialogs/OpenDialog";

export const MENU_ITEMS = [
	new MenuItem("File", [
		new MenuItem("New Map", () => console.log("New Map!"), []),
		MENU_SEPERATOR,
		new MenuItem("Open Map", () => RootStore.get(DialogStore).open(OpenDialog,
			"Open Map", {
			max: {
				width: "920px",
				height: "720px"
			}
		}, { closable: Editor.get().openMapNames.length > 0 })),
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
	new MenuItem("View", [
		new MenuItem("Toggle Developer Window", () => ipcRenderer.send("toggle-dev-window")),
	]),
	new MenuItem("Help", []),
];
