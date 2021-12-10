import { Editor } from "app/editor/Editor";
import { observer } from "mobx-react";
import React from "react";
import { FlexBox, FlexItem, View } from "../views";

import "./styles/work-area.scss";

export const WorkArea = observer(({ }) =>
{
	const editor = Editor.get();
	
	return (
		<View className="work-area" position="absolute" fill theme="primary">
			<FlexBox position="absolute" dir="vertical" fill>
				<FlexItem base={28}>
					<View className="tabs" position="absolute" fill theme="tertiary">

					</View>
				</FlexItem>
				<FlexItem>
					<View position="absolute" fill>
						<canvas ref={editor.canvasRenderer.canvasRef} />
					</View>
				</FlexItem>
			</FlexBox>
		</View>
	);
});
