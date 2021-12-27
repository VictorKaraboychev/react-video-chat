import { StyleSheet } from "../../types/global";
import useCustomState from "../../state/state"
import VideoElement from "./VideoElement";

const VideoContainer = () => {
	const { COLORS } = useCustomState.theme()
	const { REMOTE_STREAM } = useCustomState.remoteStream()

	const styles: StyleSheet = {
		container: {
			display: 'grid',
			gridTemplateColumns: '1fr '.repeat(Math.floor(Math.sqrt(REMOTE_STREAM?.getTracks().length || 0)) + 2),
			width: '100%',
			margin: 5,
		},
		item: {
			display: 'flex',
			backgroundColor: COLORS.accent.primary,
			margin: 5,
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: 40,
			fontWeight: 'bold',
			borderRadius: 25,
			aspectRatio: '16/9',
		}
	}
	
	return (
		<div style={styles.container}>
			{ REMOTE_STREAM ? REMOTE_STREAM.getTracks().map((track, i) => {
				return <VideoElement
					key={i}
					stream={track}
				/>
			}): null}
		</div>
	);
}

export default VideoContainer;