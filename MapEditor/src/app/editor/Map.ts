import { action, computed, makeAutoObservable, observable } from "mobx";
import { MapRenderer } from "./MapRenderer";
import { Vector2 } from "./Vector2";

export class Map
{
	public readonly name: string;
	public readonly renderer: MapRenderer;
	
	@observable
	private _size: Vector2 = new Vector2(640, 480);

	@computed
	public get size() { return this._size; }

	@action
	public setSize(size: Vector2) { this._size = size; }

	public constructor(name: string)
	{
		this.name = name;
		this.renderer = new MapRenderer(this);
		makeAutoObservable(this);
	}
}
