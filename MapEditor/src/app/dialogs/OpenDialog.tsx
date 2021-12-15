import { DialogStore } from "app/stores/DialogStore";
import { OpenDialogStore } from "app/stores/OpenDialogStore";
import { useStore, useStores } from "app/stores/Store";
import { Button, FlexBox, FlexItem, Input, View } from "app/views";
import { Form } from "app/views/Form";
import { NumberInput } from "app/views/NumberInput";
import React from "react";
import { utils } from "utils";

import "./styles/open-dialog.scss";

const NoProjectFound = useStore(OpenDialogStore, ({ store }) => (
	<View className="not-found">
		<View className="text">No recent projects found!</View>
		<Button onClick={store.openProject}>Open Project</Button>
	</View>
));

const ProjectList = useStore(OpenDialogStore, ({ store }) =>
{
	return (
		<View className="projects-list">
			{store.projects.map((p, i) =>
			{
				const cn = utils.react.getClassFromProps("item", { selected: store.selectedProject === p });
				return (
					<View key={i} className={cn} onClick={() => store.selectProject(i)}>
						<View className="name">{p.name}</View>
						<View className="path">{p.path}</View>
					</View>
				);
			})}
		</View>
	);
});

const OpenMapPanel = useStore(OpenDialogStore, ({ store }) =>
{
	if (!store.selectedProject)
		return (
			<h2 className="text">
				Select a project to choose a map!
			</h2>
		);

	if (store.selectedProject.maps.length === 0)
		return (
			<View className="map-panel">
				<h2 className="text">
					Project {store.selectedProject.name} has no maps!
				</h2>
				<Button onClick={() => store.showCreateMapPanel(true)}>
					Create Map
				</Button>
			</View>
		);

	return (
		<View className="map-panel">
			{ }
		</View>
	);
});

const NewMapPanel = useStore(OpenDialogStore, ({ store }) => 
{
	return (
		<FlexBox fill position="absolute" theme="primary" dir="vertical" className="new-map-panel">
			<FlexItem base={64}>
				<View className="top-bar" position="absolute" fill>
					<Button onClick={() => store.showCreateMapPanel(false)}>
						Back
					</Button>
					<View className="title">
						Create Map
					</View>
				</View>
			</FlexItem>
			<FlexItem>
				<Form onSubmit={store.createMap} values={store.createInputValues} onChange={store.updateInputValues}>
					<Input name="name" placeholder="Map Name" />
					<View className="size-group" center="horizontal">
						<NumberInput name="width" min={0} />
						<View className="cross" />
						<NumberInput name="height" min={0} />
					</View>
					<View center="horizontal">
						<Button name="submit" type="submit">
							Create
						</Button>
					</View>
					<View className="create-map-errors">
						{store.createMapErrors.map((error, i) => (
							<View key={i}>
								{error}
							</View>
						))}
					</View>
				</Form>
			</FlexItem>
		</FlexBox >
	);
});

export const OpenDialog = useStores({ dialog: DialogStore, openStore: OpenDialogStore }, ({ dialog, openStore }) =>
{
	return (
		<FlexBox fill position="absolute" id="open-map-dialog" dir="horizontal">
			<FlexItem base={280}>
				<FlexBox fill position="absolute" theme="secundary" dir="vertical" className="side-bar">
					<FlexItem base={64}>
						<View className="top-bar" position="absolute" fill>
							<View position="absolute" center="vertical">
								<h3>Projects</h3>
							</View>
							<View className="add-btn" position="absolute" center="vertical" onClick={openStore.openProject}>
								<View />
							</View>
						</View>
					</FlexItem>
					<FlexItem>
						<View className="list">
							{openStore.hasProjects ? <ProjectList /> : <NoProjectFound />}
						</View>
					</FlexItem>
				</FlexBox>
			</FlexItem>
			<FlexItem className="body">
				<View className="slider" position="absolute" style={{ width: "200%", left: openStore.isCreatePanelShown ? "-100%" : "0%" }}>
					<OpenMapPanel />
					<NewMapPanel />
				</View>
			</FlexItem>
		</FlexBox>
	);
});
