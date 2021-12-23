import { action, makeAutoObservable, observable } from "mobx";
import { Vector2 } from "./Vector2";

export class Platform
{
	@observable
	public position: Vector2 = Vector2.zero;

	@action	
	public setPosition(position: Vector2)
	{
		this.position = Vector2.clone(position);
	}

	public layerIndex: number = 0;
	
	public constructor()
	{
		makeAutoObservable(this);
	}

	public render()
	{

	}
}
