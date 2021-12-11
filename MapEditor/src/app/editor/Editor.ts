import { action, computed, makeAutoObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { CanvasRenderer } from "./CanvasRenderer";
import { Map } from "./Map"

export class Editor
{
	public static withStore<P extends {} = {}>(component: React.FC<P & { editor: Editor }>)
	{
		return (props: P) => React.createElement(observer(component), { ...props, editor: Editor._instance }); 
	}

	private static _instance = new Editor();

	public static get() { return this._instance; };

	@observable
	private _openMaps: Map[] = [];

	@observable
	private _activeMap: Map | null = null;

	public readonly canvasRenderer = new CanvasRenderer();

	private constructor()
	{
		this._activeMap = this._openMaps[0];
		makeAutoObservable(this);
	}

	@computed
	public get openMapNames() { return this._openMaps.map(m => m.name); }

	@computed
	public get activeMapName() { return this._activeMap?.name || ""; }

	@computed
	public get activeMap() { return this._activeMap; }

	public getMap(name: string): Map | null { return this._openMaps.find(m => m.name === name) || null; }

	public render()
	{
		if (this.activeMap)
		{
			this.activeMap?.renderer.render();
			this.canvasRenderer.render(this.activeMap);
		}
	}

	public addToOpenMaps(map: Map)
	{
		this._openMaps = [map, ...this._openMaps];
	}
}
