export class UnityProject
{
	public readonly name: string;
	public readonly path: string;

	private _isLoaded: boolean = false;

	public isLoaded() { return this._isLoaded; }

	public constructor(name: string, path: string)
	{
		this.name = name;
		this.path = path;
	}

	public load()
	{
		if(!this._isLoaded)
		{
			
		}
	}
}
