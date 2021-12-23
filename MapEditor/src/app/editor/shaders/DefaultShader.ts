import { Shader } from "../Shader";

export class DefaultShader extends Shader<A, U>
{
	protected vertexSource(): string
	{
		return `
			precision highp float;

			attribute vec2 aVertexPosition;
			attribute vec2 aUVPosition;
		
			uniform vec2 uCanvasSize;
			uniform vec2 uPosition;
			uniform vec4 uColor;

			varying vec4 color;
			varying vec2 uvCoord;

			void main() {
				float x = (aVertexPosition.x + uPosition.x) / (uCanvasSize.x / 2.0);
				float y = (aVertexPosition.y + uPosition.y) / (uCanvasSize.y / 2.0);
				color = uColor;
				uvCoord = aUVPosition;
				gl_Position = vec4(x, y, 0.0, 1.0);
			}
		`;
	}

	protected fragmentSource(): string
	{
		return `
			precision highp float;
			
			uniform sampler2D uSampler;
			uniform float uRenderTexture;

			varying vec4 color;
			varying vec2 uvCoord;

			void main() {
				if(uRenderTexture == 0.0)
					gl_FragColor = color;
				else
					gl_FragColor = texture2D(uSampler, uvCoord);
			}
		`;
	}
}

type A = {
	aVertexPosition: "vec2";
	aUVPosition: "vec2";
};

type U = {
	uCanvasSize: "vec2";
	uPosition: "vec2";
	uColor: "vec4";
	uSampler: "sampler2D";
	uRenderTexture: "float";
};
