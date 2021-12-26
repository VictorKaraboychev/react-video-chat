import { Stream, TrackInfo } from '../types/global';
import { SERVERS } from './rtc';
import { THEMES } from './style';

const DEFAULT = {
    theme: 'light' as keyof typeof THEMES,
    media: {
        video: false,
        audio: false,
    },
    peerConnection: new RTCPeerConnection(SERVERS),
    trackInfo: {} as TrackInfo,
    localStream: null as Stream,
    remoteStream: new MediaStream as Stream,
}

export const CONSTANTS = {

}

export default DEFAULT