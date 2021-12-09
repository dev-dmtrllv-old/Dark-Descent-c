import { FlexItem, View } from "app/views";
import React from "react";

import "./styles/side-bar.scss";

export const SideBar = () =>
{
	return (
		<FlexItem base={320}>
			<View position="absolute" fill theme="secundary">
				SideBar
			</View>
		</FlexItem>
	)
};
