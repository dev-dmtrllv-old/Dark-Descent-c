import { action, computed, makeAutoObservable, observable } from "mobx";

export class Vector2
{
	@observable
	private _x: number;

	@observable
	private _y: number;

	public constructor(x: number, y: number)
	{
		this._x = x;
		this._y = y;
		makeAutoObservable(this);
	}

	@computed
	public get x() { return this._x; }
	@computed
	public get y() { return this._y; }


	@action
	public setX(val: number) { this._x = val; }
	
	@action
	public setY(val: number) { this._y = val; }
}
