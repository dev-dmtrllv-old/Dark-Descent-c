import { Map } from "./Map"

export class MapRenderer
{
	public readonly map: Map;
	public readonly canvas: OffscreenCanvas;
	private readonly ctx: OffscreenCanvasRenderingContext2D | null;

	public constructor(map: Map)
	{
		this.map = map;
		this.canvas = new OffscreenCanvas(this.map.size.x, this.map.size.y);
		const ctx = this.canvas.getContext("2d");
		if(!ctx)
			throw new Error();
		this.ctx = ctx;
	}

	public render(bitmapContext: ImageBitmapRenderingContext)
	{
		const bitmap = this.canvas.transferToImageBitmap();
		bitmapContext.transferFromImageBitmap(bitmap);
	}
}
