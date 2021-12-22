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
	localStream: atom({
		key: 'localStream',
		default: DEFAULT.localStream
	}),
	streams: atom({
		key: 'streams',
		default: DEFAULT.streams
	}),
}