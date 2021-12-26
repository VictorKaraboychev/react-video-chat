import { atom } from 'recoil'
import { DEFAULT_VALUES as DEFAULT } from '../config/global'

export const atoms = {
	theme: atom({
		key: 'theme',
		default: DEFAULT.theme
	}),
	media: atom({
		key: 'media',
		default: DEFAULT.media
	}),
	peerConnection : atom({
		key: 'peerConnection',
		default: DEFAULT.peerConnection,
		dangerouslyAllowMutability: true
	}),
	trackInfo : atom({
		key: 'trackInfo',
		default: DEFAULT.trackInfo,
		dangerouslyAllowMutability: true
	}),
	localStream: atom({
		key: 'localStream',
		default: DEFAULT.localStream
	}),
	remoteStream: atom({
		key: 'remoteStream',
		default: DEFAULT.remoteStream
	}),
}