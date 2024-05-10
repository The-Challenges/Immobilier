import io from 'socket.io-client';
import {API_AD}from '../../../config'

const socket = io(`${API_AD}`)

export const sendLandRequest = (senderId, receiverId) => {
    socket.emit('send_land_request', { senderId, receiverId });
};

export const sendHouseRequest = (senderId, receiverId) => {
    socket.emit('send_house_request', { senderId, receiverId });
};

export const respondToLandRequest = (requestId, response, responderId) => {
    socket.emit('respond_to_land_request', { requestId, response, responderId });
};

export const respondToHouseRequest = (requestId, response, responderId) => {
    socket.emit('respond_to_house_request', { requestId, response, responderId });
};

export default socket;
