// src/services/socketService.js
import io from 'socket.io-client';
import { Alert, AsyncStorage } from 'react-native';

const SOCKET_URL = "http://172.20.10.11:4000"; // Your server URL

let socket;

export const initiateSocketConnection = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Fetch the token securely
    socket = io(SOCKET_URL, {
        autoConnect: false,
        query: {
            token: token // Use the fetched token
        }
    });
};

export const connectSocket = () => {
    if (!socket) {
        initiateSocketConnection(); // Make sure the socket is initialized
    }
    socket.connect();
};

export const disconnectSocket = () => {
    if (socket && socket.connected) {
        socket.disconnect();
    }
};

export const sendLandRequest = ({ userId, landId }) => {
    if (!socket.connected) {
        console.log("Socket not connected");
        connectSocket(); // Ensure socket is connected
    }
    socket.emit('send_land_request', { userId, landId });
};

socket.on('land_request_received', data => {
    Alert.alert('Success', `Request sent successfully to user ID ${data.receiverId}`);
});

socket.on('error', error => {
    Alert.alert('Error', error.message);
});

export const listenForResponses = (callback) => {
    socket.on('land_request_response', callback);
    socket.on('house_request_response', callback);


    return () => {
        socket.off('land_request_response', callback);
        socket.off('house_request_response', callback);
    };
};

export const respondToLandRequest = (requestId, response) => {
    socket.emit('respond_to_land_request', { requestId, response });
};
