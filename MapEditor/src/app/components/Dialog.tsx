import { DialogStore } from "app/stores/DialogStore";
import { RootStore } from "app/stores/RootStore";
import { FlexBox, FlexItem, View } from "app/views";
import React from "react";
import { utils } from "utils";

import "./styles/dialog.scss";

const DialogCloseBtn: React.FC<DialogCloseBtnProps> = ({ onClick }) => (
	<View className="close-btn" position="absolute" onClick={() => onClick()}>
		<View position="absolute" center className="cross" />
	</View>
);

export const Dialog = RootStore.use(DialogStore, ({ store }) =>
{
	return (
		<View position="absolute" theme="custom" fill className={utils.react.getClassFromProps("dialog-wrapper", { open: store.isOpen })} onClick={() => store.close()}>
			<View position="absolute" theme="primary" center className="dialog" onClick={utils.react.stopMouseEvents} style={store.style}>
				<FlexBox dir="vertical" fill>
					<FlexItem className="top-bar" base={64}>
						<h1 className="title">
							{store.title}
						</h1>
						{store.options.closable && <DialogCloseBtn onClick={store.close} />}
					</FlexItem>
					<FlexItem className="body">
						{store.body}
					</FlexItem>
				</FlexBox>
			</View>
		</View>
	);
});

export type DialogProps = {

};

type DialogCloseBtnProps = {
	onClick: () => void;
};
