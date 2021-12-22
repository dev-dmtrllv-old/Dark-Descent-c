import { FlexItem, View } from "app/views";
import React from "react";
import { PanelSlider } from "./PanelSlider";
import { Editor } from "app/editor/Editor";
import { utils } from "utils";
import path from "path";

import "./styles/bottom-panel.scss";

const TextureImg: React.FC<{ src: string, selected: boolean, onSelect: Function }> = ({ src, selected, onSelect }) =>
{
	return (
		<View className={utils.react.getClassFromProps("texture", { selected})} onMouseDown={() => onSelect()}>
			<View className="img" style={{backgroundImage: `url("${src}")`}} />
			<View className="name">{path.basename(src)}</View>
		</View>
	);
}

export const BottomPanel = Editor.withStore(({ editor }) =>
{
	const [base, setBase] = React.useState(320);

	return (
		<FlexItem base={base}>
			<PanelSlider position="top" onChange={setBase} base={base} popBarier={15} />
			<View fill className="bottom-panel" theme="secundary">
				{editor.projectTextures.map((t, i) => <TextureImg key={i} src={t.path} selected={editor.selectedTextureIndex === i} onSelect={() => editor.selectTexture(i)} />)}
			</View>
		</FlexItem>
	);
});
