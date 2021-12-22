import { useEffect } from "react";
import Controls from "./components/Controls";
import VideoContainer from "./components/video/VideoContainer";
import { StyleSheet, Stream } from "./config/global";
import { useCustomState } from "./state/state"
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
			justifyContent: 'end',
			padding: 50,
			width: '100%',
			height: '100vh',
			boxSizing: 'border-box',
			backgroundColor: COLORS.theme.background.primary,
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
