import { RecoilState, useRecoilState } from "recoil"
import { v4 as uuidv4 } from "uuid"
import DEFAULT from '../config/global'
import { COLORS_BASE, THEMES } from '../config/style'
import useRTC, { useSocket } from "../web/connection"
import atoms from "./atoms"

function usePersistentState<T>(atom: RecoilState<T>, defaultValue: T): { value: T, set: (newValue: T, save?: boolean) => void, load: () => void } {
	const [value, updateValue] = useRecoilState(atom)

	const load = () => {
		const retrieved = localStorage.getItem(atom.key)
		updateValue(retrieved ? JSON.parse(retrieved) : defaultValue)
	}

	const set = (newValue: T, save = true) => {
		updateValue(newValue)
		if (save) localStorage.setItem(atom.key, JSON.stringify(newValue))
	}

	return { value, set, load }
}

export const useLoad = () => {
	const { load: loadTheme } = useCustomState.theme()
	const { load: loadUserId } = useCustomState.userId()
	const { load: loadLocalStream } = useCustomState.localStream()
	const { load: loadRemoteStream } = useCustomState.remoteStream()
	const { load: loadRTC } = useRTC()
	const { load: loadSocket } = useSocket()

	const load = () => {
		loadUserId()
		loadTheme()

		loadRTC()
		loadSocket()

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
		const { value, set, load } = usePersistentState(atoms.theme, DEFAULT.theme)

		const COLORS = COLORS_BASE
		COLORS.theme = THEMES[value]

		return { COLORS, THEME: value, set, load }
	},
	media: () => {
		const [ value, set ] = useRecoilState(atoms.media)

		return { MEDIA: value, set }
	},
	userId: () => {
		const [ value, set ] = useRecoilState(atoms.userId)

		const load = () => {
			set(uuidv4())
		}

		return { USER_ID: value, load }
	},
	localStream: () => {
		const [ value, set ] = useRecoilState(atoms.localStream)

		const load = async () => {
			set(await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(err => console.warn('MEDIA', err)) || null)
		}

		return { LOCAL_STREAM: value, load }
	},
	remoteStream: () => {
		const [ value, set ] = useRecoilState(atoms.remoteStream)
		const { onTrackReceived } = useRTC()

		const load = () => {
			onTrackReceived((track) => {
				set(value?.addTrack(track) || null) // might need to be deep copied
			})
		}

		return { REMOTE_STREAM: value, set, load }
	},
}

export default useCustomState