import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { SERVER_URL } from "../config/connection";
import atoms from "../state/atoms"

const socket = io(SERVER_URL)

const useRTC = () => {
	const [ peerConnection ] = useRecoilState(atoms.peerConnection.state)
	const [ trackInfo ] = useRecoilState(atoms.trackInfo.state)

	const load = () => {
	}

	const addTracks = (tracks: MediaStreamTrack[]) => {-
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

	const onTrackAdded = (callback: (track: MediaStreamTrack) => void) => {
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

	return { PEER_CONNECTION: peerConnection, load, addTracks, removeTracks, addIceCandidate, onTrackAdded, onDataChannelReceived, onIceCandidateGenerated }
}

export const useSocket = () => {
	// const [ socket, set ] = useRecoilState(atoms.socket.state)

	const sendRoomId = (roomId?: string) => {
		socket.emit("room-id", roomId)
	}

	const sendIceCandidate = (iceCandidate: RTCIceCandidate) => {
		socket.emit("ice-candidate", iceCandidate.toJSON())
	}

	const onConnect = (callback: (clientId: string) => void) => {
		socket.on("client-id", callback)
	}
	
	const onDisconnect = (callback: () => void) => {
		socket.on("disconnect", callback)
	}
	
	const onRoomIdReceived = (callback: (roomId: string) => void ) => {
		socket.on("room-id", callback)
	}

	const onIceCandidateReceived = (callback: (iceCandidate: RTCIceCandidate) => void) => {
		socket.on("ice-candidate", (iceCandidateJSON: RTCIceCandidateInit) => {
			callback(new RTCIceCandidate(iceCandidateJSON))
		})
	}

	return { SOCKET: socket, sendRoomId, sendIceCandidate, onConnect, onDisconnect, onRoomIdReceived, onIceCandidateReceived }
}

export default useRTC