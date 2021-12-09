import { FlexItem, View } from "app/views";
import React from "react";
import { PanelSlider } from "./PanelSlider";

import "./styles/side-bar.scss";

export const SideBar = () =>
{
	const [base, setBase] = React.useState(320);

	return (
		<FlexItem base={base}>
			<PanelSlider position="left" onChange={setBase} base={base} popBarier={15}/>
			<View position="absolute" fill theme="secundary">
				SideBar
			</View>
		</FlexItem>
	)
};
