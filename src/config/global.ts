import { SERVERS } from './rtc';
import { THEMES } from './style';

export type Stream = MediaStream | null
export type StyleSheet = {
    [key: string]: React.CSSProperties;
}

export const DEFAULT_VALUES = {
    theme: 'light' as keyof typeof THEMES,
    media: {
        video: false,
        audio: false,
    },
    peerConnection: new RTCPeerConnection(SERVERS),
    trackInfo: {} as { [name: string]: RTCRtpSender },
    localStream: null as Stream,
    remoteStream: new MediaStream as Stream,
}

export const CONSTANTS = {

}