import { Shader } from "../Shader";

export class DefaultShader extends Shader<A, U>
{
	protected vertexSource(): string
	{
		return `
			attribute vec2 aVertexPosition;
		
			uniform vec2 uCanvasSize;

			void main() {
				float x = aVertexPosition.x / (uCanvasSize.x / 2.0);
				float y = aVertexPosition.y / (uCanvasSize.y / 2.0);
				gl_Position = vec4(x, y, 0.0, 1.0);
			}
		`;
	}

	protected fragmentSource(): string
	{
		return `
			void main() {
				gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
			}
		`;
	}
}

type A = {
	aVertexPosition: "vec2";
};

type U = {
	uCanvasSize: "vec2";
};
