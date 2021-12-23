import { Editor } from "./Editor";
import { GLBuffer } from "./GLBuffer";
import { Map } from "./Map"
import { Shader } from "./Shader";
import { DefaultShader } from "./shaders/DefaultShader";
import { Vector2 } from "./Vector2";
import { CanvasRenderer } from "./CanvasRenderer";

export class MapRenderer
{
	public readonly map: Map;
	
	private get shader() { return Shader.get(DefaultShader); }
	
	private _buffer: GLBuffer | null = null;

	public get buffer()
	{
		if (!this._buffer)
		{
			const w = this.map.size.x / 2;
			const h = this.map.size.y / 2;
			this._buffer = new GLBuffer(Editor.get().canvasRenderer.gl, [
				new Vector2(-w, h),
				new Vector2(w, h),
				new Vector2(-w, -h),
				new Vector2(w, -h),
			]);
		}
		return this._buffer as GLBuffer;
	}

	public constructor(map: Map)
	{
		this.map = map;
	}

	public render(canvasRenderer: CanvasRenderer)
	{
		const { gl, canvas } = canvasRenderer;

		this.buffer.use(gl);

		gl.vertexAttribPointer(this.shader.getAttribute("aVertexPosition"), 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.shader.getAttribute("aVertexPosition"));

		this.shader.use();

		gl.uniform2fv(this.shader.getUniform("uCanvasSize"), [canvas?.width || 0, canvas?.height || 0]);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		this.map.layers.forEach(layer => 
		{
			layer.textures.forEach(t => 
			{
				console.log(t);
			});
		});
	}
}
