import { StyleSheet } from "../../config/global";
import { useCustomState } from "../../state/state"
import VideoElement from "./VideoElement";


const VideoContainer = () => {
	const { COLORS } = useCustomState.theme()
	const { STREAMS } = useCustomState.streams()
	
	const style: StyleSheet = {
		container: {
			display: 'grid',

		},
	}
	
	return (
		<div style={style.container}>
			{ STREAMS ? STREAMS.map((stream, i) => {
				return <VideoElement
					key={i}
					stream={new MediaStream([stream.video as MediaStreamTrack])}
					muted={true}
				/>
			}): null}
		</div>
	);
}

export default VideoContainer;