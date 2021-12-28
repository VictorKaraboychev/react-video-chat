import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaMoon, FaSun, FaPhone, FaPhoneSlash } from 'react-icons/fa'
import { StyleSheet } from '../types/global';
import useCustomState from '../state/state';
import RoundedButton from './common/RoundedButton';
import VideoElement from './video/VideoElement';
import { useSocket } from '../web/connection';
import { useEffect, useState } from 'react';

const Controls = () => {
	const { COLORS, THEME, set: setTheme } = useCustomState.theme()
	const { MEDIA, setVideo, setAudio } = useCustomState.media()
	const { LOCAL_STREAM } = useCustomState.localStream()
	const { CONNECTION, set: setConnection } = useCustomState.connection()
	const { sendRoomId, onRoomIdReceived, onConnect } = useSocket()

	const [roomId, setRoomId] = useState('')

	useEffect(() => {
		onRoomIdReceived(id => {
			setRoomId(id)
			setConnection(true)
		})

		onConnect(id => {
			console.log('clientId:', id)
		})
	},[])

	const styles: StyleSheet = {
		container: {
			position: 'fixed',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'end',
			width: 500,
			bottom: 50,
			height: '5%',
		},
		mediaContainer: {
			display: 'flex',
		},
		local: {
			position: 'fixed',
			right: 50,
			bottom: 50,
			width: 300,
			borderRadius: 10
		},
		header: {
			position: 'fixed',
			left: 50,
			bottom: 50,
			color: COLORS.theme.text.primary,
			fontSize: 25,
			fontWeight: 'bold',
			alignItems: 'center',
		},
		input: {
			border: 0,
			borderRadius: 10,
			height: 30,
			width: 250,
			marginLeft: 10,
			backgroundColor: COLORS.theme.background.quaternary,
			color: COLORS.theme.text.secondary,
			fontSize: 25,
			fontStyle: 'italic',
			textAlign: 'center',
		}
	}
	
	return (
		<div style={styles.container}>
			<div style={styles.header}>
				Meeting Code:
				<input style={styles.input} type={"text"} maxLength={10} value={roomId} disabled={CONNECTION} onChange={(event) => {
					const value = event.target.value.trim()

					if (!/^[A-Za-z0-9]*$/.test(value)) {
						event.target.value = roomId
					} else if (value !== roomId) {
						setRoomId(value)
					}
				}}/>
			</div>
			<RoundedButton
				Icon={THEME == 'light' ? FaSun : FaMoon}
				radius={75}
				label={"Theme"}
				onPress={() => { 
					if (THEME == 'light') {
						setTheme('dark')
					} else {
						setTheme('light')
					}
				}}
			/>
			<RoundedButton
				Icon={CONNECTION ? FaPhoneSlash : FaPhone}
				radius={75}
				label={"Start Call"}
				onPress={() => {
					sendRoomId(roomId)
				}}
			/>
			<div style={styles.mediaContainer}>
				<RoundedButton
					Icon={MEDIA.audio ? FaMicrophone : FaMicrophoneSlash}
					radius={75}
					label={"Audio"}
					onPress={() => {
						setAudio(!MEDIA.audio)
					}}
				/>
				<RoundedButton
					Icon={MEDIA.video ? FaVideo : FaVideoSlash}
					radius={75}
					label={"Video"}
					onPress={() => {
						setVideo(!MEDIA.video)
					}}
				/>
			</div>
			<VideoElement
				style={styles.local}
				stream={MEDIA.video ? LOCAL_STREAM?.getVideoTracks()[0] || null: null}
				muted={!MEDIA.audio}
			/>
		</div>
	);
}

export default Controls;