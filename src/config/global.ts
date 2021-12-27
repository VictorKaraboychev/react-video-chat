import { SocketConnection, Stream, TrackInfo } from '../types/global';
import { SERVERS } from './connection';
import { THEMES } from './style';

const DEFAULT = {
    theme: 'light' as keyof typeof THEMES,
    media: {
        video: false,
        audio: false,
    },
    userId: '',
    peerConnection: new RTCPeerConnection(SERVERS),
    socket: null as SocketConnection,
    trackInfo: {} as TrackInfo,
    localStream: null as Stream,
    remoteStream: new MediaStream as Stream,
}

export const CONSTANTS = {

}

export default DEFAULT