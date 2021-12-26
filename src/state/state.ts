import { RecoilState, useRecoilState } from "recoil"
import DEFAULT from '../config/global'
import { COLORS_BASE, THEMES } from '../config/style'
import useRTC from "../web/connection"
import atoms from "./atoms"

function usePersistentState<T>(atom: RecoilState<T>, defaultValue: T): { value: T, set: (newValue: T, save?: boolean) => void, load: () => Promise<void> } {
	const [value, updateValue] = useRecoilState(atom)

	const load = async () => {
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
	const { load: loadLocalStream } = useCustomState.localStream()


	const load = () => {
		loadTheme()
		loadLocalStream()
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
		const [ value, setMedia ] = useRecoilState(atoms.media)
		const { onTrackReceived } = useRTC()

		return { MEDIA: value, set: setMedia }
	},
	localStream: () => {
		const [ value, set ] = useRecoilState(atoms.localStream)

		const load = async () => {
			set(await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(err => console.warn('MEDIA', err)) || null)
		}

		return { LOCAL_STREAM: value, load }
	},
	streams: () => {
		const [ value, set ] = useRecoilState(atoms.remoteStream)
		const { onTrackReceived } = useRTC()

		const load = async () => {
			

			onTrackReceived((track) => {
				set(value?.addTrack(track) || null)
			})
		}

		return { STREAMS: value, set, load }
	},
}

export default useCustomState