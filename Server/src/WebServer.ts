import express, { Request, Response, Express, NextFunction } from "express";
import { ChildProcess } from "child_process";
import { Api, ApiType } from "./Api";


export class WebServer
{
	public readonly app: Express;
	public readonly host: string;
	public readonly port: number;
	public readonly worlds: ReadonlyArray<ChildProcess>;

	private readonly apiCache: { [key: string]: ApiType<Api> } = {};

	public constructor(host: string, port: number, worlds: ChildProcess[])
	{
		this.app = express();
		this.host = host;
		this.port = port;
		this.worlds = worlds;
		this.init();
	}

	protected init()
	{
		this.app.all("/api/*", this.apiHandler.bind(this));
	}

	protected apiHandler(req: Request, res: Response, next: NextFunction)
	{
		let api = this.apiCache[req.url];
		if(!api)
		{
			const m = require("." + req.url);
			const classKey = Object.keys(m).find(key => m[key].prototype instanceof Api);
			if(!classKey)
			{
				next();
				return;
			}

			this.apiCache[req.url] = m[classKey] as any as ApiType<Api>;
		}
		const ctor = this.apiCache[req.url];
		(new ctor(req, res)).exec();
	}

	public start()
	{
		this.app.listen(this.port, this.host, () =>
		{
			console.log(`WebServer listening on http://${this.host}:${this.port}`);
		});
	}

}
