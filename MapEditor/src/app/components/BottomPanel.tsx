import { FlexItem, View } from "app/views";
import React from "react";
import { PanelSlider } from "./PanelSlider";

import "./styles/bottom-panel.scss";

export const BottomPanel = () =>
{
	const [base, setBase] = React.useState(320);
	
	return (
		<FlexItem base={base}>
			<PanelSlider position="top" onChange={setBase} base={base} popBarier={15}/>
			<View fill className="bottom-panel" theme="secundary">
				Bottom Panel
			</View>
		</FlexItem>
	);
};
