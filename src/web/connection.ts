import { Stream } from "../config/global";



export const useRTC = () => {
	const peerConnection = new RTCPeerConnection(SERVERS)

	
	

	return { sendLocalStream: addStream, onTrackReceived }
}