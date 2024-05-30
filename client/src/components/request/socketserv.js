import io from "socket.io-client";
import { API_AD } from "../../../config";

export default socket = io("http://Lysanne.Walsh84@yahoo.com:4001")
// Listening to events
// socket.on('connect', () => {
//   console.log('connected to socket server');
// });

// socket.on('requestCreated', (request) => {
//   console.log('New Request:', request);
// });

// socket.on('requestUpdated', (data) => {
//   console.log('Request Updated:', data);
// });

// // Handle disconnection
// socket.on('disconnect', () => {
//   console.log('Disconnected from server');
// });