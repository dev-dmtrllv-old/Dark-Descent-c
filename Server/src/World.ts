import socketIO from "socket.io";
import express, { Express } from "express";
import http, { createServer } from "http";
import { Api, ApiType } from "./Api";

export class World
{
	public readonly app: Express;
	public readonly server: http.Server;
	public readonly io: socketIO.Server;
	public readonly host: string;
	public readonly port: number;
	public readonly channels: number;

	private isInitialized = false;
	private apiCache: { [key: string]: ApiType<Api> };

	public constructor(host: string, port: number, channels: number)
	{
		this.app = express();
		this.server = createServer(this.app);
		this.io = new socketIO.Server(this.server);
		this.host = host;
		this.port = port;
		this.channels = channels;
	}

	public async initialize()
	{
		if (!this.isInitialized)
			this.isInitialized = true;
	}

	public start()
	{
		this.app.listen(this.port, this.host, () => 
		{
			console.log(`Server listening on ${this.host} [port ${this.port} - ${this.port + this.channels}]`);
		});
	}
};
