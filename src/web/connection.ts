import { useRecoilState } from "recoil";
import atoms from "../state/atoms"

const useRTC = () => {
	const [ peerConnection, setPeer ] = useRecoilState(atoms.peerConnection)
	const [ trackInfo, setTrackInfo ] = useRecoilState(atoms.trackInfo)

	const load = () => {
		peerConnection.ontrack
	}

	const addTracks = (tracks: MediaStreamTrack[]) => {
		tracks.forEach((track) => {
			trackInfo[track.id] = peerConnection.addTrack(track)
		})
	}

	const removeStream = (tracks: MediaStreamTrack[]) => {
		tracks.forEach((track) => {
			peerConnection.removeTrack(trackInfo[track.id])
		})	
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

	const onIceCandidateReceived = (callback: (iceCandidate: RTCIceCandidate) => void) => {
		peerConnection.onicecandidate = (event) => {
			if (event.candidate) callback(event.candidate)
		}
	}

	const addIceCandidate = (iceCandidate: RTCIceCandidate) => {
		peerConnection.addIceCandidate(iceCandidate)
	}

	return { PEER_CONNECTION: peerConnection, addStream: addTracks, removeStream, onTrackReceived, onDataChannelReceived, onIceCandidateReceived, addIceCandidate }
}

export default useRTC