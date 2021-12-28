import { useRecoilState } from "recoil"
import { COLORS_BASE, THEMES } from '../config/style'
import { CustomAtom } from "../types/global"
import { deepCopy } from "../utility/functions"
import useRTC, { useSocket } from "../web/connection"
import atoms from "./atoms"

function usePersistentState<T>(atom: CustomAtom<T>): { value: T, set: (newValue: T, save?: boolean) => void, load: () => void } {
	const state = atom.state
	const [value, updateValue] = useRecoilState(state)

	const load = () => {
		const retrieved = localStorage.getItem(state.key)
		updateValue(retrieved ? JSON.parse(retrieved) : atom.default)
	}

	const set = (newValue: T, save = true) => {
		updateValue(newValue)
		if (save) localStorage.setItem(state.key, JSON.stringify(newValue))
	}

	return { value, set, load }
}

export const useLoad = () => {
	const { load: loadTheme } = useCustomState.theme()
	const { load: loadLocalStream } = useCustomState.localStream()
	const { load: loadRemoteStream } = useCustomState.remoteStream()
	const { load: loadRTC } = useRTC()

	const load = () => {
		loadTheme()

		loadRTC()

		loadLocalStream()
		loadRemoteStream()

		console.log("STATE LOADED")
	}

	const unload = () => {

		console.log("STATE UNLOADED")
	}

	return { load, unload }
}

const useCustomState = {
	theme: () => {
		const { value, set, load } = usePersistentState(atoms.theme)

		const COLORS = COLORS_BASE
		COLORS.theme = THEMES[value]

		return { COLORS, THEME: value, set, load }
	},
	media: () => {
		const [ value, set ] = useRecoilState(atoms.media.state)
		const { LOCAL_STREAM } = useCustomState.localStream()
		const { addTracks, removeTracks } = useRTC()

		const setVideo = (state: boolean) => {
			const video = LOCAL_STREAM?.getVideoTracks() || []
			state ? addTracks(video) : removeTracks(video)

			set({
				video: state,
				audio: value.audio
			})
		}

		const setAudio = (state: boolean) => {
			const audio = LOCAL_STREAM?.getAudioTracks() || []
			state ? addTracks(audio) : removeTracks(audio)

			set({
				video: value.video,
				audio: state
			})
		}

		return { MEDIA: value, setVideo, setAudio}
	},
	userId: () => {
		const [ value, set ] = useRecoilState(atoms.userId.state)
		const { onConnect } = useSocket()

		onConnect(set)

		return { USER_ID: value }
	},
	connection: () => {
		const [ value, set ] = useRecoilState(atoms.connection.state)
		return { CONNECTION: value, set}
	},
	localStream: () => {
		const [ value, set ] = useRecoilState(atoms.localStream.state)

		const load = async () => {
			set(await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(err => console.warn('MEDIA', err)) || null)
		}

		return { LOCAL_STREAM: value, load }
	},
	remoteStream: () => {
		const [ value, set ] = useRecoilState(atoms.remoteStream.state)
		const { onTrackAdded } = useRTC()

		const load = () => {
			onTrackAdded((track) => {
				const tempStreams = deepCopy(value)
				tempStreams?.addTrack(track)
				set(tempStreams)
			})
		}

		return { REMOTE_STREAM: value, set, load }
	},
}

export default useCustomState