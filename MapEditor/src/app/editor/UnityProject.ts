import { RootStore } from "app/stores/RootStore";
import { SettingsStore } from "app/stores/SettingsStore";
import { Map } from "./Map";
import path from "path";
import fs from "fs";
import { makeAutoObservable, observable } from "mobx";

export class UnityProject
{
	public readonly name: string;
	public readonly path: string;
	public readonly exportPath: string;

	private _isLoaded: boolean = false;

	public isLoaded() { return this._isLoaded; }

	@observable
	private _maps: Map[] = [];

	public constructor(name: string, projectPath: string)
	{
		this.name = name;
		this.path = projectPath;
		this.exportPath = path.resolve(this.path, "Assets", RootStore.get(SettingsStore).exportFolder);
		
		if(!fs.existsSync(this.exportPath))
			fs.mkdirSync(this.exportPath, { recursive: true });
		else
			fs.readdirSync(this.exportPath).map(file => 
			{
				console.log(file);
			});
		makeAutoObservable(this);
		console.log(this);
	}

	public readonly addMap = (name: string) =>
	{
		if(this._maps.find(m => m.name === name))
			throw new Error(`There is already a map with the name "${name}"!`);
	
		this._maps = [...this._maps, new Map(this, name)];
	}
}
