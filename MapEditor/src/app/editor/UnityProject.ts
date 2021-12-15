import { RootStore } from "app/stores/RootStore";
import { SettingsStore } from "app/stores/SettingsStore";
import { Map } from "./Map";
import path from "path";
import fs from "fs";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { utils } from "utils";
import { Serializable, SerializedType } from "app/Serializable";

export type UnityProjectSettingsProps = {
	spriteDir: string;
	prefabDir: string;
	exportDir: string;
};

export class UnityProjectSettings
{
	private static readonly FILE_NAME = "map-editor-settings.json";

	private static readonly defaultSettings: UnityProjectSettingsProps = {
		prefabDir: "Prefabs",
		spriteDir: "Sprites",
		exportDir: "MapExports",
	};

	private readonly path: string;

	@observable
	private _settings: UnityProjectSettingsProps;

	public constructor(projectPath: string)
	{
		this.path = path.resolve(projectPath, UnityProjectSettings.FILE_NAME);
		if (!fs.existsSync(this.path))
		{
			this._settings = UnityProjectSettings.defaultSettings;
			this.updateAndSave(this._settings);
		}
		else
		{
			this._settings = JSON.parse(fs.readFileSync(this.path, "utf-8"));
			if (!utils.arrayEquals(Object.keys(this._settings), Object.keys(UnityProjectSettings.defaultSettings)))
			{
				this._settings = { ...UnityProjectSettings.defaultSettings, ...this._settings };
				this.updateAndSave(this._settings);
			}
		}
	}

	public update(settings: Partial<UnityProjectSettingsProps>)
	{
		if (!utils.objectEquals(this._settings, settings))
			this.updateAndSave(settings);
	}

	@action
	private updateAndSave(settings: Partial<UnityProjectSettingsProps>)
	{
		this._settings = { ...this._settings, ...settings };
		fs.writeFileSync(this.path, JSON.stringify(this._settings), "utf-8");
	}

	public get<K extends keyof UnityProjectSettingsProps>(key: K): UnityProjectSettingsProps[K]
	{
		return this._settings[key];
	}
}

export class UnityProject implements Serializable<SerializedUnityProjectData>
{
	public readonly name: string;
	public readonly path: string;

	private _isLoaded: boolean = false;

	public readonly settings: UnityProjectSettings;

	public isLoaded() { return this._isLoaded; }

	@observable
	private _maps: Map[] = [];

	@computed
	public get maps() { return [...this._maps]; }

	public constructor(name: string, projectPath: string)
	{
		this.name = name;
		this.path = projectPath;
		this.settings = new UnityProjectSettings(this.path);		

		const exportDir = this.settings.get("exportDir");

		if (!fs.existsSync(exportDir))
			fs.mkdirSync(exportDir, { recursive: true });
		else
			fs.readdirSync(exportDir).map(file => 
			{
				console.log(file);
			});
		
		makeAutoObservable(this);
	}

	public parse({ name, path }: SerializedType<SerializedUnityProjectData>)
	{
		return { name, path };
	}

	public serialize(): SerializedType<SerializedUnityProjectData>
	{
		return {
			name: this.name,
			path: this.path
		};
	}

	@action
	public readonly addMap = (name: string) =>
	{
		if (this._maps.find(m => m.name === name))
			throw new Error(`There is already a map with the name "${name}"!`);

		this._maps = [...this._maps, new Map(this, name)];
	}
}

type SerializedUnityProjectData = {
	name: string;
	path: string;
};
