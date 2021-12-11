import { action, computed, makeAutoObservable, observable } from "mobx";
import { Editor } from "./Editor";
import { MapRenderer } from "./MapRenderer";
import { UnityProject } from "./UnityProject";
import { Vector2 } from "./Vector2";

export class Map
{
	public readonly name: string;
	public readonly renderer: MapRenderer;
	public readonly project: UnityProject;
	
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

	public constructor(project: UnityProject, name: string)
	{
		this.project = project;
		this.name = name;
		this.renderer = new MapRenderer(this);
		makeAutoObservable(this);
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
