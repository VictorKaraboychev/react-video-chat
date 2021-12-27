import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { SERVER_URL } from "../config/connection";
import atoms from "../state/atoms"
import useCustomState from "../state/state";

const useRTC = () => {
	const [ peerConnection, setPeer ] = useRecoilState(atoms.peerConnection)
	const [ trackInfo, setTrackInfo ] = useRecoilState(atoms.trackInfo)

	const load = () => {
	}

	const addTracks = (tracks: MediaStreamTrack[]) => {
		tracks.forEach((track) => {
			trackInfo[track.id] = peerConnection.addTrack(track)
		})
	}

	const removeTracks = (tracks: MediaStreamTrack[]) => {
		tracks.forEach((track) => {
			peerConnection.removeTrack(trackInfo[track.id])
		})
	}

	const addIceCandidate = (iceCandidate: RTCIceCandidate) => {
		peerConnection.addIceCandidate(iceCandidate)
	}

	const onTrackReceived = (callback: (track: MediaStreamTrack) => void) => {
		peerConnection.ontrack = (event) => {
			event.streams[0].getTracks().forEach((track) => {
				callback(track)
			})
		}
	}

	const onDataChannelReceived = (callback: (stream: RTCDataChannel) => void) => {
		peerConnection.ondatachannel = (event) => {
			callback(event.channel)
		}
	}

	const onIceCandidateGenerated = (callback: (iceCandidate: RTCIceCandidate) => void) => {
		peerConnection.onicecandidate = (event) => {
			if (event.candidate) callback(event.candidate)
		}
	}

	return { PEER_CONNECTION: peerConnection, load, addTracks, removeTracks, addIceCandidate, onTrackReceived, onDataChannelReceived, onIceCandidateGenerated }
}

export const useSocket = () => {
	const [ socket, set ] = useRecoilState(atoms.socket)
	const { USER_ID } = useCustomState.userId()
	
	const load = () => {
		set(io(SERVER_URL))
	}

	const onConnect = (callback: () => void) => {
		socket?.on("connect", callback)
	}
	
	const onDisconnect = (callback: () => void) => {
		socket?.on("disconnect", callback)
	}
	
	const sendRoomRequest = () => {
		socket?.send("room-request", USER_ID)
	}

	const sendIceCandidate = () => {
		socket?.send("ice-candidate", USER_ID)
	}

	const onRoomIdReceived = (callback: () => string) => {
		socket?.emit("room-id", callback)
	}

	const onIceCandidateReceived = (callback: () => string) => {
		socket?.emit("ice-candidate", callback)
	}

	return { SOCKET: socket, load, sendRoomRequest, sendIceCandidate, onConnect, onDisconnect, onRoomIdReceived, onIceCandidateReceived }
}

export default useRTC