import React from "react";
import { Editor } from "./Editor";

export class CanvasRenderer
{
	public readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

	public get canvas() { return this.canvasRef.current; }

	private _ctx: ImageBitmapRenderingContext | null = null;

	public get ctx() { return this._ctx; }

	public constructor() { }

	public onMount()
	{
		if (this.canvas && this.canvas.parentElement)
		{
			this._ctx = this.canvas.getContext("bitmaprenderer");

			if (!this.ctx)
				throw ("Could not get bitmaprenderer context!");

			this.resizeObserver.observe(this.canvas.parentElement);

			this.onResize();
		}
	}

	public onUnmount()
	{
		this._ctx = null;
	}

	private onResize()
	{
		if(this.canvas && this.canvas.parentElement)
		{
			const p = this.canvas.parentElement;
			
			this.canvas.style.width = (this.canvas.width = p.clientWidth) + "px";
			this.canvas.style.height = (this.canvas.height = p.clientHeight) + "px";
			
			Editor.get().render();
		}
	}

	private readonly resizeObserver = new ResizeObserver((entries, observer) => 
	{
		this.onResize();
	});
}
