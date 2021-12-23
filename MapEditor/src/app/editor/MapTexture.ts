import { action, computed, makeAutoObservable, observable } from "mobx";
import { Texture } from "./Texture";
import { Vector2 } from "./Vector2";
import { Editor } from "./Editor";
import { utils } from "utils";

export class MapTexture
{
	@observable
	public position: Vector2 = Vector2.zero;

	public readonly glTexture: WebGLTexture;

	@action
	public setPosition(position: Vector2)
	{
		this.position = Vector2.clone(position);
	}

	@observable
	private _texture: Texture;

	@computed
	public get texture() { return this._texture }

	@action
	public setTexture(texture: Texture) { this._texture = texture; }

	public constructor(texture: Texture, position: Vector2 = Vector2.zero)
	{
		this._texture = texture;
		this.position = Vector2.clone(position);

		const gl = Editor.get().canvasRenderer.gl;

		const t = gl.createTexture();

		if (!t)
			throw new Error();

		gl.bindTexture(gl.TEXTURE_2D, t);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._texture.canvas);

		if (utils.math.isPowerOf2(texture.canvas.width) && utils.math.isPowerOf2(texture.canvas.width))
		{
			gl.generateMipmap(gl.TEXTURE_2D);
		} 
		else
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}

		this.glTexture = t;

		makeAutoObservable(this);
	}
}
