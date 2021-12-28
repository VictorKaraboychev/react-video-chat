import { atom } from 'recoil'
import { SERVERS } from '../config/connection'
import { THEMES } from '../config/style'
import { CustomAtom, SocketConnection, Stream, TrackInfo } from '../types/global'

function customAtom<T>(label: string, def: T, mutability?: boolean): CustomAtom<T> {
	return {
		state: atom({
			key: label,
			default: def,
			dangerouslyAllowMutability: mutability || false
		}),
		default: def
	}
}

const atoms = {
    theme: customAtom('theme', 'light' as keyof typeof THEMES),
    media: customAtom('media', { video: false, audio: false }),
    userId: customAtom('userId', ''),
    connection: customAtom('connection', false),
    peerConnection: customAtom('peerConnection', new RTCPeerConnection(SERVERS), true),
    socket: customAtom('socket', null as SocketConnection),
    trackInfo: customAtom('trackInfo', {} as TrackInfo, true),
    localStream: customAtom('localStream', null as Stream),
    remoteStream: customAtom('remoteStream', new MediaStream as Stream),
}

export default atoms