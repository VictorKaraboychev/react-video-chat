import { RecoilState, useRecoilState } from "recoil"
import { DEFAULT_VALUES as DEFAULT, Stream } from '../config/global'
import { COLORS_BASE, THEMES } from '../config/style'
import { useRTC } from "../web/connection"
import { atoms } from "./atoms"

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

export const useCustomState = {
	theme: () => {
		const { value, set, load } = usePersistentState(atoms.theme, DEFAULT.theme)

		const COLORS = COLORS_BASE
		COLORS.theme = THEMES[value]

		return { COLORS, THEME: value, set, load }
	},
	peerConnection: () => {
		const [ peerConnection, setPeer ] = useRecoilState(atoms.peerConnection)
		const [ trackInfo, setTrackInfo ] = useRecoilState(atoms.trackInfo)

		const load = () => {
			peerConnection.ontrack
		}

		const addTracks = (tracks: MediaStreamTrack[]) => {
			tracks.forEach((track) => {
				trackInfo[track.id] = peerConnection.addTrack(track)
			})
		}

		const removeStream = (tracks: MediaStreamTrack[]) => {
			tracks.forEach((track) => {
				peerConnection.removeTrack(trackInfo[track.id])
			})	
		}
	
		const onTrackReceived = (callback: (track: MediaStreamTrack) => void) => {
			peerConnection.ontrack = (event) => {
				event.streams[0].getTracks().forEach((track) => {
					callback(track)
				})
			}
		}
	
		const onDataChannelReceived = (callback: (stream: RTCDataChannel) => void) => {
			peerConnection.ondatachannel = (event) => {
				callback(event.channel)
			}
		}

		return { PEER_CONNECTION: peerConnection, addStream: addTracks, removeStream, onTrackReceived, onDataChannelReceived}
	},
	media: () => {
		const [ value, setMedia ] = useRecoilState(atoms.media)
		const { onTrackReceived } = useCustomState.peerConnection()

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
		const { onTrackReceived } = useCustomState.peerConnection()

		const load = async () => {
			

			onTrackReceived((track) => {
				set(value?.addTrack(track) || null)
			})
		}

		return { STREAMS: value, set, load }
	},
}
