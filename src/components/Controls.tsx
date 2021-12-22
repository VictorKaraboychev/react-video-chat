import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaMoon, FaSun } from 'react-icons/fa'
import { StyleSheet } from '../config/global';
import { useCustomState } from '../state/state';
import RoundedButton from './utility/RoundedButton';

const Controls = () => {
	const { COLORS, THEME, set: setTheme } = useCustomState.theme()
	const { MEDIA, set: setMedia } = useCustomState.media()

	const styles: StyleSheet = {
		container: {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: 250,
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
		</div>
	);
}

export default Controls;