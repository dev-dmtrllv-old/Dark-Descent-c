import { Serializable, SerializedType } from "app/Serializable";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { Editor } from "./Editor";
import { MapRenderer } from "./MapRenderer";
import { Platform } from "./Platform";
import { UnityProject } from "./UnityProject";
import { Vector2 } from "./Vector2";
import fs from "fs";
export class Map implements Serializable<SerializedMapData>
{
	public edit({ name, width, height }: { name: string, width: string, height: string })
	{
		this._size.setX(+width);
		this._size.setY(+height);

		if(name && (name !== this._name))
		{
			this._name = name;
			const p = this.project.renameMapFile(this, name);
			this._path = p;
		}

		fs.writeFileSync(this._path, JSON.stringify(this.serialize()), "utf-8");
	}

	private _name: string;
	public get name() { return this._name; }

	private _path: string;
	public get path() { return this._path; }
	
	public readonly renderer: MapRenderer;
	public readonly project: UnityProject;
	public readonly platforms: Platform[] = [];
	
	@observable
	private _size: Vector2 = new Vector2(640, 480);

	@computed
	public get size() { return this._size; }

	@action
	public setSize(size: Vector2) { this._size = size; }

	@observable
	private _isOpen: boolean = false;

	@computed
	public get isOpen() { return this._isOpen; }

	public constructor(project: UnityProject, name: string, path: string);
	public constructor(project: UnityProject, name: string, path: string, width: number, height: number);
	public constructor(project: UnityProject, name: string, path: string, width?: number, height?: number)
	{
		this.project = project;
		this._name = name;
		this._path = path;
		this.renderer = new MapRenderer(this);
		if(width && height)
			this._size = new Vector2(width, height);
		makeAutoObservable(this);
	}

	public parse(data: SerializedType<SerializedMapData>)
	{
		const size = new Vector2(data.size.x, data.size.y);
		this.setSize(size);
		return { name: data.name, size };
	}

	public serialize(): SerializedType<SerializedMapData>
	{
		return { name: this.name, size: this.size.serialize() };
	}

	@action
	public readonly open = () => 
	{
		if(!this._isOpen)
		{
			this._isOpen = true;
			Editor.get().addToOpenMaps(this);
		}
	}
}

type SerializedMapData = {
	name: string;
	size: Vector2;
};
