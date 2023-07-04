import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const token = localStorage.getItem("ACCESS_TOKEN");
const socket = io('http://localhost:8000/', {
    Authorization: `${token}`,
}); // Remplacez l'URL par l'URL de votre serveur WebSocket

const VideoSocket = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [callLink, setCallLink] = useState('');

    useEffect(() => {
        // Connectez-vous au serveur WebSocket
        socket.connect();

        // Écoutez l'événement "users" pour obtenir la liste des utilisateurs disponibles
        socket.on('users', (data) => {
            setUsers(data);
        });

        // Écoutez l'événement "callLink" pour obtenir le lien de session
        socket.on('callLink', (link) => {
            setCallLink(link);
        });

        // Demandez la liste des utilisateurs disponibles au chargement de l'application
        socket.emit('getUsers');

        // Déconnectez-vous du serveur WebSocket lorsque le composant est démonté
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
    };

    const handleCall = () => {
        // Vérifiez si un utilisateur est sélectionné avant de démarrer l'appel
        if (selectedUser) {
            // Émettez l'événement "call" avec l'ID de l'utilisateur sélectionné
            socket.emit('call', selectedUser.id);
        }
    };

    return (
        <div>
            <h1>Appel vidéo</h1>
            <div>
                <h2>Liste des utilisateurs :</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} onClick={() => handleUserSelection(user)}>
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {selectedUser && (
                    <div>
                        <h2>Appeler {selectedUser.name}</h2>
                        <button onClick={handleCall}>Appeler</button>
                    </div>
                )}
            </div>
            <div>
                {callLink && (
                    <div>
                        <h2>Lien d'appel :</h2>
                        <a href={callLink}>{callLink}</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoSocket;
