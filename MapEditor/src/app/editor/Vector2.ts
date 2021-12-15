import { Serializable, SerializedType } from "app/Serializable";
import { action, computed, makeAutoObservable, observable } from "mobx";

export class Vector2 implements Serializable<VectorData>
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

	@action
	public parse(data: SerializedType<VectorData>): VectorData
	{
		return data;
	}

	public serialize(): SerializedType<VectorData>
	{
		return {
			x: this.x,
			y: this.y
		};
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

type VectorData = {
	x: number;
	y: number;
}
