import { RecoilState } from "recoil"
import { Socket } from "socket.io-client"

export type Stream = MediaStream | null

export type TrackInfo = { 
	[trackId: string]: RTCRtpSender 
}

export type SocketConnection = Socket | null

export type StyleSheet = {
    [label: string]: React.CSSProperties;
}

export type CustomAtom<T> = { 
	state: RecoilState<T>, 
	default: T 
}
