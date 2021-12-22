import { THEMES } from './style';

export type Stream = {
    video: MediaStreamTrack | null,
    audio: MediaStreamTrack | null
}
export type StyleSheet = {
    [key: string]: React.CSSProperties;
}

export const DEFAULT_VALUES = {
    theme: 'light' as keyof typeof THEMES,
    media: {
        video: false,
        audio: false,
    },
    localStream: {
        video: null, 
        audio: null
    } as Stream,
    streams: [] as Stream[],
}

export const CONSTANTS = {

}