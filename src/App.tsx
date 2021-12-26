import { useEffect } from "react";
import Controls from "./components/Controls";
import VideoContainer from "./components/video/VideoContainer";
import { StyleSheet } from "./types/global";
import useCustomState from "./state/state"
import { useLoad } from './state/state';

const App = () => {
	const { load, unload } = useLoad()
	const { COLORS } = useCustomState.theme()

    useEffect(() => {
        load()
        return unload
    }, [])

	const styles: StyleSheet = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			height: '100vh',
			boxSizing: 'border-box',
			backgroundColor: COLORS.theme.background.secondary,
		}
	}

	return (
		<div style={styles.container}>
			<VideoContainer/>
			<Controls/>
		</div>
	)
}

export default App
