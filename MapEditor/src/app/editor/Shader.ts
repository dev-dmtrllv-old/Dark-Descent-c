import { Editor } from "./Editor";

export abstract class Shader<A extends Attributes, U extends Attributes>
{
	private static readonly shaders: Shader<any, any>[] = [];

	public static get<T extends Shader<any, any>>(type: ShaderType<T>): T
	{
		let s = this.shaders.find(s => s.constructor === type);
		if (!s)
		{
			s = new type(Editor.get().canvasRenderer.gl);
			this.shaders.push(s);
		}
		return s as T;
	}

	public readonly gl: WebGLRenderingContext;
	public readonly shaderProgram: WebGLProgram;

	private _attributes: AttributeLocations<A>;
	private _uniforms: UniformLocations<U>;

	public getAttribute(key: keyof AttributeLocations<A>)
	{
		return this._attributes[key];
	}

	public getUniform(key: keyof UniformLocations<U>)
	{
		return this._uniforms[key];
	}

	public constructor(gl: WebGLRenderingContext)
	{
		this.gl = gl;
		this.shaderProgram = this.createProgram();
		const { attributes, uniforms } = this.getLocations();
		this._attributes = attributes as any;
		this._uniforms = uniforms as any;
		console.log(this._attributes, this._uniforms);
	}

	private loadShader(type: number, source: string)
	{
		const gl = this.gl;
		const shader = gl.createShader(type);
		if (shader)
		{
			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
			{
				const err = 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader);
				gl.deleteShader(shader);
				throw new Error(err);
			}
		}
		else
		{
			throw new Error("Could not create shader!");
		}

		return shader;
	}

	private createProgram(): WebGLProgram
	{
		const gl = this.gl;

		const vertexShader = this.loadShader(gl.VERTEX_SHADER, this.vertexSource());
		const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, this.fragmentSource());

		const shaderProgram = gl.createProgram();
		if (shaderProgram)
		{

			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);

			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
			{
				const err = 'Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram);
				gl.deleteProgram(shaderProgram);
				gl.deleteShader(vertexShader);
				gl.deleteShader(fragmentShader);
				throw new Error(err);
			}
		}
		else
		{
			gl.deleteShader(vertexShader);
			gl.deleteShader(fragmentShader);
			throw new Error("Could not create shader program");
		}

		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);

		return shaderProgram;
	}

	private getLocations(): LocationsGroup<A, U>
	{
		const s = this.vertexSource() + this.fragmentSource();
		
		const locations = {
			attributes: {},
			uniforms: {},
		} as LocationsGroup<A, U>;

		s.replace(/(\r|\n|\t)/g, "").split(";").forEach((str) => 
		{
			const [attributeType, type, name] = str.split(" ");
			if(attributeType === "attribute" && !locations.attributes[name])
			{
				locations.attributes[name as keyof A] = this.gl.getAttribLocation(this.shaderProgram, name);
			}
			else if(attributeType === "uniform" && !locations.uniforms[name])
			{
				console.log("get uniform", name);
				
				const uniformLoc = this.gl.getUniformLocation(this.shaderProgram, name);

				if(!uniformLoc)
					console.warn(`Could not get uniform location!`);
				else
					locations.uniforms[name as keyof U] = uniformLoc;
			}
		});

		return locations;
	}

	public readonly use = () =>
	{
		this.gl.useProgram(this.shaderProgram);
	}

	protected abstract vertexSource(): string;
	protected abstract fragmentSource(): string;
}

export type ShaderType<T extends Shader<any, any>> = new (gl: WebGLRenderingContext) => T;

export type ShaderAttrType = "float" | "bool" | "vec2" | "vec3" | "vec4" | "mat3" | "mat4";

export type Attributes = {
	[key: string]: ShaderAttrType;
};

type AttributeLocations<T extends Attributes> = {
	[K in keyof T]: number;
};

type UniformLocations<T extends Attributes> = {
	[K in keyof T]: WebGLUniformLocation;
};

type LocationsGroup<A extends Attributes, U extends Attributes> = {
	attributes: AttributeLocations<A>;
	uniforms: UniformLocations<U>;
};
