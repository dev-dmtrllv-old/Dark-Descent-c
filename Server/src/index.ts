import { World } from "./World";

import config from "./server.config.json";

import { spawn, ChildProcess } from "child_process";
import { WebServer } from "./WebServer";

enum Command
{
	INIT = "init",
	INIT_DONE = "init_done",
	START = "start",
}

if (!process.argv.includes("process"))
{
	const processes: ChildProcess[] = [];

	let doneCounter = 0;

	const onInitDone = () => 
	{
		doneCounter++;
		if (doneCounter == config.worlds)
			processes.forEach(p => p.send(Command.START));
	};

	for (let i = 0; i < config.worlds; i++)
	{
		const p = spawn("node", ["dist/index.js", "process", config.host.toString(), (config.port + 1 + (config.channels * i)).toString(), config.channels.toString()], { stdio: ["inherit", "inherit", "inherit", "ipc"] });
		
		p.on("message", (msg) =>
		{
			switch (msg)
			{
				case Command.INIT_DONE:
					onInitDone();
					break;
			}
		});

		processes.push(p);
	}

	console.log("Initializing worlds...");
	processes.forEach(p => p.send(Command.INIT));

	const server = new WebServer(config.host, config.port, processes);
	server.start();
}
else
{
	if (!process.send)
		throw Error(`process.send is udefined!`);

	const [,,,host, port, channels] = process.argv;

	const world = new World(host, +port, +channels);

	process.on("message", async (msg) =>
	{
		switch (msg)
		{
			case Command.INIT:
				await world.initialize();
				process.send(Command.INIT_DONE);
				break;
			case Command.START:
				world.start();
				break;
		}
	});
}
