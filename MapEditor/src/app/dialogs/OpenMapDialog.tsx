import { dialogComponent } from "app/components/Dialog";
import { FlexBox, FlexItem, View } from "app/views";
import React from "react";

import "./styles/open-map-dialog.scss";

export const OpenMapDialog = dialogComponent(({ dialog }) =>
{
	return (
		<FlexBox fill position="absolute" id="open-map-dialog" dir="horizontal">
			<FlexItem base={280}>
				<View fill position="absolute" theme="secundary">
					Recent Maps
				</View>
			</FlexItem>
			<FlexItem>

			</FlexItem>
		</FlexBox>
	);
});
