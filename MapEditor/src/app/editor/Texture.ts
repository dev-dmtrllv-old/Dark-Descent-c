export class Texture
{
	private static readonly textures: { [path: string]: Texture } = {};

	public static get(path: string): Texture
	{
		let t = this.textures[path]
		if (!t)
		{
			t = new Texture(path);
			this.textures[path] = t;
		}
		return t;
	}

	public readonly path: string;
	public readonly img: HTMLImageElement = document.createElement("img");

	private _isLoaded: boolean = false;

	public get isLoaded() { return this._isLoaded; }

	private constructor(path: string)
	{
		this.path = path;
	}

	public load()
	{
		return new Promise<void>((resolve, reject) => 
		{

			if (!this._isLoaded)
			{
				this.img.onload = () =>
				{
					this._isLoaded = true;
					resolve();
				};
				this.img.onerror = reject;
				this.img.src = this.path;
			}
		});
	}
}
