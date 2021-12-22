import { Map } from "./Map"
import { Shader } from "./Shader";
import { DefaultShader } from "./shaders/DefaultShader";

export class MapRenderer
{
	public readonly map: Map;

	private get shader() { return Shader.get(DefaultShader); }

	public constructor(map: Map)
	{
		this.map = map;
	}

	public render(gl: WebGL2RenderingContext)
	{
		this.shader.getAttribute("aVertexPosition");
	}
}
