import { atom } from 'recoil'
import DEFAULT from '../config/global'

const atoms = {
	theme: atom({
		key: 'theme',
		default: DEFAULT.theme
	}),
	media: atom({
		key: 'media',
		default: DEFAULT.media
	}),
	userId: atom({
		key: 'userId',
		default: DEFAULT.userId
	}),
	peerConnection : atom({
		key: 'peerConnection',
		default: DEFAULT.peerConnection,
		dangerouslyAllowMutability: true
	}),
	socket : atom({
		key: 'socket',
		default: DEFAULT.socket,
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

export default atoms