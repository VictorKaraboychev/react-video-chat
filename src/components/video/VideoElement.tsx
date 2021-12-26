import { FaMicrophoneSlash } from 'react-icons/fa'
import { useCallback } from "react";
import { StyleSheet } from "../../config/global";
import { useCustomState } from "../../state/state"

const VideoElement = (props: { style?: React.CSSProperties; stream: MediaStreamTrack | null; muted?: boolean; }) => {
	const { COLORS } = useCustomState.theme()
	
	const refVideo = useCallback(
		(node: HTMLVideoElement) => {
		  	if (node) node.srcObject = props.stream ? new MediaStream([props.stream]): null
		},
		[props.stream],
	);

	const styles: StyleSheet = {
		container: {
		},
		video: {
			backgroundColor: COLORS.theme.background.quaternary,
			borderRadius: props.style?.borderRadius || 25,
			width: props.style?.width,
			aspectRatio: '16/9',
			objectFit: 'cover',
		},
		icon: {
			position: 'absolute',
			color: COLORS.status.error,
			fontSize: 30,
			bottom: 15,
			right: 10,
		}
	}
	
	return (
		<div style={props.style}>
			<video 
				ref={refVideo}
				style={styles.video}
				autoPlay={true}
				controls={false}
			/>
			{ props.muted ? 
				<FaMicrophoneSlash
					style={styles.icon}
				/>
			: null}
		</div>
	);
}

export default VideoElement;