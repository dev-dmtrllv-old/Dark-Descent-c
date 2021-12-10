import { Map } from "./Map"

export class MapRenderer
{
	public readonly map: Map;
	public readonly canvas: HTMLCanvasElement;
	private readonly ctx: CanvasRenderingContext2D | null;

	public constructor(map: Map)
	{
		this.map = map;
		this.canvas = document.createElement("canvas");
		this.canvas.style.width = (this.canvas.width = this.map.size.x) + "px";
		this.canvas.style.height = (this.canvas.height = this.map.size.y) + "px";
		const ctx = this.canvas.getContext("2d", { willReadFrequently: true, alpha: true });
		if(!ctx)
			throw new Error();
		this.ctx = ctx;
		ctx.translate(0.5, 0.5);
		ctx.imageSmoothingEnabled = false;
	}

	public render()
	{
		this.ctx?.strokeRect(0, 0, 120, 120);
	}
}
