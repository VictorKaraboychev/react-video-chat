import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaMoon, FaSun } from 'react-icons/fa'
import { StyleSheet } from '../types/global';
import useCustomState from '../state/state';
import RoundedButton from './utility/RoundedButton';
import VideoElement from './video/VideoElement';

const Controls = () => {
	const { COLORS, THEME, set: setTheme } = useCustomState.theme()
	const { MEDIA, set: setMedia } = useCustomState.media()
	const { LOCAL_STREAM } = useCustomState.localStream()

	const styles: StyleSheet = {
		container: {
			position: 'fixed',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: 250,
			bottom: 50,
			height: '5%',
		},
		local: {
			position: 'fixed',
			right: 50,
			bottom: 50,
			width: 300,
			borderRadius: 10
		}
	}
	
	return (
		<div style={styles.container}>
			<RoundedButton
				Icon={THEME == 'light' ? FaSun : FaMoon}
				radius={75}
				onPress={() => { 
					if (THEME == 'light') {
						setTheme('dark')
					} else {
						setTheme('light')
					}
				}}
			/>
			<RoundedButton
				Icon={MEDIA.audio ? FaMicrophone : FaMicrophoneSlash}
				radius={75}
				onPress={() => {
					setMedia({
						video: MEDIA.video,
						audio: !MEDIA.audio
					})
				}}
			/>
			<RoundedButton
				Icon={MEDIA.video ? FaVideo : FaVideoSlash}
				radius={75}
				onPress={() => {
					setMedia({
						video: !MEDIA.video,
						audio: MEDIA.audio
					})
				}}
			/>
			<VideoElement
				style={styles.local}
				stream={MEDIA.video ? LOCAL_STREAM?.getVideoTracks()[0] || null: null}
				muted={!MEDIA.audio}
			/>
		</div>
	);
}

export default Controls;