import { useCallback } from "react";
import { StyleSheet } from "../../config/global";
import { useCustomState } from "../../state/state"


const VideoElement = (props: { stream: MediaStream; muted?: boolean; }) => {
	const { COLORS } = useCustomState.theme()
	
	const refVideo = useCallback(
		(node: HTMLVideoElement) => {
		  if (node) node.srcObject = props.stream;
		},
		[props.stream],
	  );

	const style: StyleSheet = {
		video: {
			backgroundColor: COLORS.theme.background.secondary,
			width: '100%',
			borderRadius: 25
		},
	}
	
	return (
		<div>
			<video 
				ref={refVideo}
				style={style.video}
				muted={props.muted}
				autoPlay={true}
				controls={false}
			/>
		</div>
	);
}

export default VideoElement;