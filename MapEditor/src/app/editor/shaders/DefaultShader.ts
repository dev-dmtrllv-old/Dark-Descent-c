import { Shader } from "../Shader";

export class DefaultShader extends Shader<A, U>
{
	protected vertexSource(): string
	{
		return `
			attribute vec4 aVertexPosition;
		
			uniform mat4 uModelViewMatrix;
			uniform mat4 uProjectionMatrix;
		
			void main() {
				gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
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
	uModelViewMatrix: "mat4";
	uProjectionMatrix: "mat4";
};
