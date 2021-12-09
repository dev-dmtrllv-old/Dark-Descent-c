import React from "react";
import { ipcRenderer } from "electron"
import { FlexBox, FlexItem, View } from "./views";
import { MenuBar } from "./components/MenuBar";
import { WorkArea } from "./components/WorkArea";
import { SideBar } from "./components/SideBar";
import { BottomPanel } from "./components/BottomPanel";

const App = ({ }) =>
{
	React.useEffect(() => 
	{
		ipcRenderer.send("ready");
	}, []);

	return (
		<View position="absolute" fill theme="primary">
			<FlexBox position="absolute" fill dir="vertical" >
				<FlexItem base={24}>
					<MenuBar />
				</FlexItem>
				<FlexItem>
					<FlexBox position="absolute" fill dir="horizontal">
						<FlexItem>
							<FlexBox position="absolute" fill dir="vertical" >
								<FlexItem>
									<View position="absolute" fill>
										<WorkArea />
									</View>
								</FlexItem>
								<BottomPanel />
							</FlexBox>
						</FlexItem>
						<SideBar />
					</FlexBox>
				</FlexItem>
			</FlexBox>
		</View>
	);
};

export default App;
