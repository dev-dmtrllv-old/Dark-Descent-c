import { FlexItem, View } from "app/views";
import React from "react";

import "./styles/bottom-panel.scss";

export const BottomPanel = () =>
{
	return (
		<FlexItem base={320}>
			<View fill className="bottom-panel" theme="secundary">
				Bottom Panel
			</View>
		</FlexItem>
	);
};
