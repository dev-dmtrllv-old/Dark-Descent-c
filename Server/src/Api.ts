
import { Request, Response } from "express";

export class Api
{
	public readonly exec = () => 
	{
		const method = this.req.method.toLowerCase();
		let data: any = undefined;
		
		if (method == "get")
		{

		}
		else
		{

		}

		const func = (this as any)[method];
		if (!func)
			this.res.json(null);
		else
			this.res.json(func(data));
	};

	protected req: Request;
	protected res: Response;

	public constructor(req: Request, res: Response)
	{
		this.req = req;
		this.res = res;
	}

	protected get?: (props?: any) => any;
	protected post?: (props?: any) => any;
	protected put?: (props?: any) => any;
	protected delete?: (props?: any) => any;
}

export type ApiType<T extends Api> = new (req: Request, res: Response) => T;
