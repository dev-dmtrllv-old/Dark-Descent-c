import { Editor } from "app/editor/Editor";
import { observer } from "mobx-react";
import React from "react";
import { FlexBox, FlexItem, View } from "../views";

import "./styles/work-area.scss";

export const WorkArea = observer(({ }) =>
{
	const editor = Editor.get();

	React.useEffect(() => 
	{
		editor.canvasRenderer.onMount();
		return editor.canvasRenderer.onUnmount()
	}, []);

	return (
		<View className="work-area" position="absolute" fill theme="primary">
			<FlexBox position="absolute" dir="vertical" fill>
				<FlexItem base={28}>
					<View className="tabs" position="absolute" fill theme="tertiary">
						
					</View>
				</FlexItem>
				<FlexItem>
					<canvas ref={editor.canvasRenderer.canvasRef}/>
				</FlexItem>
			</FlexBox>
		</View>
	);
});
