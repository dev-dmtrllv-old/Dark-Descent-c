import { action, computed, makeAutoObservable, observable } from "mobx";
import { Texture } from "./Texture";
import { Vector2 } from "./Vector2";

export class MapTexture
{
	public readonly position: Vector2 = Vector2.zero;

	@observable
	private _texture: Texture;

	@computed
	public get texture() { return this._texture }

	@action
	public setTexture(texture: Texture) { this._texture = texture; }

	public constructor(texture: Texture)
	{
		this._texture = texture;
		makeAutoObservable(this);
	}
}
