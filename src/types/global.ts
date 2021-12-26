export type Stream = MediaStream | null

export type TrackInfo = { 
	[trackId: string]: RTCRtpSender 
}

export type StyleSheet = {
    [label: string]: React.CSSProperties;
}
