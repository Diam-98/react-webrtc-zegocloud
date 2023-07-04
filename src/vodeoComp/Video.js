import React, { useState, useEffect } from 'react';
import axiosClient from "../api/axiosClient";

const Video = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    useEffect(() => {
        // Récupérer la liste des utilisateurs depuis le backend Laravel
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axiosClient.get('/users').then(({data})=>{
            console.log(data)
            setUsers(data);
        }).catch((err)=>{
            console.log(err)
        });
    };

    const startCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setLocalStream(stream);

            const configuration = { iceServers: [{ urls: 'stun:stun.stunserver.org:3478' }] };
            const peerConnection = new RTCPeerConnection(configuration);

            stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

            peerConnection.ontrack = (event) => {
                setRemoteStream(event.streams[0]);
            };

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    // Envoyer le candidat ICE au backend Laravel pour l'envoyer à l'autre utilisateur
                    sendIceCandidate(event.candidate);
                }
            };

            // Créer une offre d'invitation à l'appel et l'envoyer à l'autre utilisateur
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            sendOffer(offer);
        } catch (error) {
            console.error('Erreur lors du démarrage de l\'appel :', error);
        }
    };

    const sendOffer = async (offer) => {
        axiosClient.post(`/user/${selectedUser.id}/offer`,
            {body: JSON.stringify({ offer })}
        ).then(({data})=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        });
    };

    const sendIceCandidate = async (candidate) => {
        axiosClient.post(`/user/${selectedUser.id}/ice-candidate`,
            {body: JSON.stringify({ candidate })}
        ).then(({data})=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        });
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    return (
        <div>
            <h1>Appel vidéo 2 à 2</h1>

            {selectedUser ? (
                <>
                    <h2>Appel avec {selectedUser.name}</h2>

                    {localStream && <video srcobject={localStream} autoPlay muted />}
                    {remoteStream && <video srcobject={remoteStream} autoPlay />}
                </>
            ) : (
                <>
                    <h2>Liste des utilisateurs</h2>

                    <ul>
                        {users.map((user) => (
                            <li key={user.id} onClick={() => handleUserSelect(user)}>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {selectedUser && (
                <button onClick={startCall} disabled={!!localStream}>
                    Démarrer l'appel
                </button>
            )}
        </div>
    );
};

export default Video;