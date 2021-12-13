import { UnityProject } from "app/editor/UnityProject";
import { Storage } from "app/Storage";
import { ipcRenderer } from "electron";
import { action, computed, observable } from "mobx";
import { InitializableStore } from "./Store";
import fs from "fs";
import path from "path";
import { RootStore } from "./RootStore";
import { DialogStore } from "./DialogStore";

const storage = new Storage("OpenDialog", {
	"recentProjects": "array",
});

export class OpenDialogStore extends InitializableStore
{
	@observable
	private _projects: UnityProject[] = [];

	@observable
	private _selected: number = 0;

	@observable
	private _showCreatePanel: boolean = false;

	protected init = () => 
	{
		this._projects = storage.get("recentProjects", []).map((data) => new UnityProject(data.name, data.path));
	}

	@computed
	public get projects() { return this._projects; }

	@computed
	public get hasProjects() { return this.projects.length !== 0; }

	@computed
	public get isCreatePanelShown() { return this._showCreatePanel; }

	@computed
	public get selectedProject(): UnityProject | null { return this.projects[this._selected] || null };

	public readonly openProject = async () =>
	{
		const info: DirInfo = await ipcRenderer.invoke("open-dir");
		if (!info.canceled)
		{
			const dir = info.filePaths[0];
			if (!this._projects.find(p => p.path === dir))
			{

				fs.readdir(dir, (err, files: string[]) => 
				{
					if (!files.includes("UnityEditor.UI.csproj"))
					{
						// SHOW ERROR
					}
					else
					{
						this.addProject(dir);
					}
				});
			}
		}
	}

	@action
	private addProject(dir: string)
	{
		this._projects = [...this.projects, new UnityProject(path.basename(dir), dir)];

		storage.update("recentProjects", (data) => 
		{
			if (!data)
				data = [];
			return this._projects;
		});

		// const store = RootStore.get(DialogStore);

		// store.setClosable(true);

	}

	@action
	public readonly selectProject = (id: number) => 
	{
		if (id !== this._selected)
		{
			this._selected = id;
			if (this._showCreatePanel)
				this.showCreateMapPanel(false);
		}
	};

	@action
	public readonly showCreateMapPanel = (val: boolean) => 
	{
		this._showCreatePanel = val;
		setTimeout(() =>  { RootStore.get(DialogStore).setTitle(val ? "Create Map" : "Open Map"); }, 350);
	};
}

type DirInfo = {
	canceled: boolean;
	filePaths: string[];
};
