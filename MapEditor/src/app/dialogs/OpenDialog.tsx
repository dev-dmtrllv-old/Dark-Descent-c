import { DialogStore } from "app/stores/DialogStore";
import { OpenDialogStore } from "app/stores/OpenDialogStore";
import { useStore, useStores } from "app/stores/Store";
import { Button, FlexBox, FlexItem, View } from "app/views";
import React from "react";

import "./styles/open-dialog.scss";

const NoProjectFound = useStore(OpenDialogStore, ({ store }) => (
	<View className="not-found">
		<View className="text">No recent projects found!</View>
		<Button>Open Project</Button>
	</View>
));

const ProjectList = useStore(OpenDialogStore, ({ store }) =>
{
	return (
		<View>
			List
		</View>
	);
});

const OpenProjectPanel = useStore(OpenDialogStore, ({ store }) =>
{
	return (
		<View>
			
		</View>
	);
});

const OpenMapPanel = useStore(OpenDialogStore, ({ store }) =>
{
	if(!store.selectedProject)
		return (
			<h2 className="text">
				Select a project to choose a map!
			</h2>
		);

	return (
		<View>
			
		</View>
	);
});

export const OpenDialog = useStores({ dialog: DialogStore, openStore: OpenDialogStore }, ({ dialog, openStore }) =>
{
	return (
		<FlexBox fill position="absolute" id="open-map-dialog" dir="horizontal">
			<FlexItem base={280}>
				<FlexBox fill position="absolute" theme="secundary" dir="vertical" className="side-bar">
					<FlexItem base={64}>
						<View className="top-bar">
							<h3>Projects</h3>
						</View>
					</FlexItem>
					<FlexItem>
						<View className="list">
							{openStore.hasProjects ? <ProjectList /> : <NoProjectFound />}
						</View>
					</FlexItem>
				</FlexBox>
			</FlexItem>
			<FlexItem className="map-list">
				<OpenMapPanel />
			</FlexItem>
		</FlexBox>
	);
});
