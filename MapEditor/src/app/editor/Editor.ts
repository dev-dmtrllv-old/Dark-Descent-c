import { action, computed, makeAutoObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { CanvasRenderer } from "./CanvasRenderer";
import { Map } from "./Map"
import { showOpenDialog } from "app/dialogs/OpenDialog";
import { Vector2 } from "./Vector2";
import { Texture } from "./Texture";

export class Editor
{
	public static readonly minZoom = 5;
	public static readonly maxZoom = 500;

	public static withStore<P extends {} = {}>(component: React.FC<P & { editor: Editor }>)
	{
		return (props: P) => React.createElement(observer(component), { ...props, editor: Editor._instance });
	}

	public onSelect = (index: number) => action((e: React.MouseEvent<Element, MouseEvent>) =>
	{
		if (this._openMaps[index] && (this._activeMap !== this._openMaps[index]))
			this._activeMap = this._openMaps[index];
	})

	public onClose = (index: number) => action((e: React.MouseEvent<Element, MouseEvent>) =>
	{
		if (index <= this._openMaps.length - 1)
		{
			if (this.closeOpenMap(this._openMaps[index]))
			{
				e.preventDefault();
				e.stopPropagation();
				showOpenDialog();
			}
		}
	});

	private static _instance = new Editor();

	public static get() { return this._instance; };

	@observable
	private _openMaps: Map[] = [];

	@observable
	private _activeMap: Map | null = null;

	@observable
	private _selectedTextureIndex: number = -1;

	private _mouseDownPos: Vector2 | null = null;
	private _mapStartOffset: Vector2 = Vector2.zero;
	private _zoomSensitivity: number = 3;

	@computed
	public get projectTextures(): Texture[] { return this.activeMap?.project.textures || []; }

	@computed
	public get selectedTextureIndex() { return this._selectedTextureIndex; }

	public readonly canvasRenderer = new CanvasRenderer();

	private constructor()
	{
		this._activeMap = this._openMaps[0];
		window.addEventListener("mousemove", this.onMouseMove);
		window.addEventListener("mouseup", this.onMouseUp);
		window.addEventListener("wheel", this.onMouseWheel);
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
		if (this._activeMap)
			this.canvasRenderer.render(this._activeMap);
		else
			this.canvasRenderer.clear();
	}

	@action
	private setActiveMap = (map: Map) => this._activeMap = map;

	@action
	public async addToOpenMaps(map: Map)
	{
		if (!this._openMaps.find(m => map === m))
		{
			this._openMaps = [...this._openMaps, map];
			if (!map.project.isLoaded)
				await map.project.load();
		}

		this.setActiveMap(map);
		this.render();
	}

	@action
	public closeOpenMap(map: Map)
	{
		const index = this._openMaps.indexOf(map);
		if (index > -1)
		{
			const maps = [...this._openMaps];
			maps.splice(index, 1);
			this._openMaps = maps;

			if (maps.length === 0)
				this._activeMap = null;

			this.selectTexture(-1);
			this.render();
			return true;
		}
	}

	public readonly onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => 
	{
		if(this._activeMap)
		{
			this._mouseDownPos = this.toCC(e);
			this._mapStartOffset = this._activeMap.offset;
		}	
	}

	public readonly onMouseMove = (e: MouseEvent) => 
	{
		if(this._mouseDownPos && this._activeMap)
		{
			const map = this._activeMap;
			const pos = this.toCC(e);
			map.offset = Vector2.add(this._mapStartOffset, Vector2.sub(this._mouseDownPos, pos));
			console.log(map.offset.serialize());
		}
	}
	
	public readonly onMouseUp = (e: MouseEvent) => 
	{
		if(this.selectedTextureIndex > -1)
		{
			console.log(this.projectTextures[this.selectedTextureIndex]);
		}
		this._mouseDownPos = null;
		this.selectTexture(-1);
	}
	
	public readonly onMouseWheel = (e: WheelEvent) => 
	{
		const pos = this.toCC(e);
	}

	// converts to canvas coordinates
	private toCC(e: { clientX: number, clientY: number })
	{
		const c = this.canvasRenderer.canvas!;
		const { x, y } = c.getBoundingClientRect();
		return new Vector2(e.clientX - x, e.clientY - y);
	}

	@action
	public readonly selectTexture = (i: number) =>
	{
		this._selectedTextureIndex = i;
	}
}
