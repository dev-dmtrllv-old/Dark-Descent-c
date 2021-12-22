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
		this.canvas.style.width = (this.canvas.width = this.map.size.x * this.map.project.pixelScale) + "px";
		this.canvas.style.height = (this.canvas.height = this.map.size.y * this.map.project.pixelScale) + "px";
		const ctx = this.canvas.getContext("2d", { willReadFrequently: true, alpha: true });
		if (!ctx)
			throw new Error();
		this.ctx = ctx;
		ctx.imageSmoothingEnabled = false;
	}

	public render()
	{
		const ctx = this.ctx;

		const width = this.map.size.x;
		const height = this.map.size.y;

		const ps = this.map.project.pixelScale;

		if (ctx)
		{
			ctx.save();
			ctx.clearRect(0, 0, width, height);

			if (this.map.project.textures[6])
				ctx.drawImage(this.map.project.textures[6].img, 0, 0);


			// for (let i = 0; i < 20;)
			// {
			// 	ctx.fillStyle = "red";
			// 	ctx.fillRect(i++, 0, 1, 1);
			// 	ctx.fillStyle = "black";
			// 	ctx.fillRect(i++, 0, 1, 1);
			// }


			ctx.restore();
		}

	}
}
