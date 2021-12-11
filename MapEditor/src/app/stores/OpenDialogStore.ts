import { UnityProject } from "app/editor/UnityProject";
import { Storage } from "app/Storage";
import { computed, observable } from "mobx";
import { InitializableStore } from "./Store";

const storage = new Storage("OpenDialog", {
	"recentProjects": "array",
	"recentMaps": "array",
});

export class OpenDialogStore extends InitializableStore
{
	@observable
	private _projects: UnityProject[] = [];

	@observable
	private selected: number = 0;

	protected init = () => 
	{
		this._projects = storage.get("recentProjects") || [];
	}
	
	@computed
	public get projects() { return this._projects; }

	@computed
	public get hasProjects() { return this.projects.length !== 0; }

	@computed
	public get selectedProject(): UnityProject | null { return this.projects[this.selected] || null };
}
