import React from "react";
import { Editor } from "./Editor";
import { Map } from "./Map";

export class CanvasRenderer
{
	public readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

	public get canvas() { return this.canvasRef.current; }

	private _ctx: CanvasRenderingContext2D | null = null;

	public get ctx() { return this._ctx; }

	public constructor() { }

	public onMount()
	{
		if (this.canvas && this.canvas.parentElement)
		{
			this._ctx = this.canvas.getContext("2d");

			if (!this.ctx)
				throw ("Could not get 2D context!");

			this.resizeObserver.observe(this.canvas.parentElement);

			this.onResize();
		}
	}

	public onUnmount = () =>
	{
		console.log("unmount");
		this._ctx = null;
	}

	private onResize()
	{
		if(this.canvas && this.canvas.parentElement)
		{
			const editor = Editor.get();
			const p = this.canvas.parentElement;
			
			this.canvas.style.width = (this.canvas.width = p.clientWidth) + "px";
			this.canvas.style.height = (this.canvas.height = p.clientHeight) + "px";
			
			editor.render();
		}
	}

	private readonly resizeObserver = new ResizeObserver((entries, observer) => 
	{
		this.onResize();
	});

	public render(map: Map)
	{
		const ctx = this.ctx;
		
		if(this.canvas && ctx)
		{
			const { clientWidth, clientHeight } = this.canvas;
			ctx.clearRect(0, 0, clientWidth, clientHeight);
			ctx.drawImage(map.renderer.canvas, 0, 0);
		}
	}
}
