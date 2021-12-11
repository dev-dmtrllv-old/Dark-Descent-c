import { Storage } from "app/Storage";
import { computed, observable } from "mobx";
import { InitializableStore } from "./Store";

const storage = new Storage("settings", {
	exportFolder: "string"
});

export class SettingsStore extends InitializableStore
{
	@observable
	private _exportFolder: string = ""; // The folder relative to the unity project Assets folder

	@computed
	public get exportFolder() { return this._exportFolder; }

	protected init = () => 
	{
		this._exportFolder = storage.get("exportFolder", "MapExports");
	}
}
