import { computed, makeAutoObservable, observable } from "mobx";
import { Map } from "./Map";
import { MapTexture } from "./MapTexture";
import { Platform } from "./Platform";

export class Layer
{
	public readonly map: Map;

	@observable
	private _platforms: Platform[] = [];

	@observable
	private _textures: MapTexture[] = [];

	@computed
	public get platforms() { return [...this._platforms]; }

	@computed
	public get textures() { return [...this._textures]; }

	public constructor(map: Map)
	{
		this.map = map;
		makeAutoObservable(this);
	}
}
