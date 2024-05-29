import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Function to refresh the token
const refreshToken = async () => {
    try {
        const response = await axios.post('http://192.168.104.29:4000/api/auth/refresh', {
            token: await AsyncStorage.getItem('refreshToken')
        });
        if (response.status === 200) {
            const newTokenData = response.data;
            await AsyncStorage.setItem('loginState', JSON.stringify({
                rawData: newTokenData,
                expires: new Date().getTime() + 24 * 60 * 60 * 1000 // assuming the token is valid for 24 hours
            }));
            return newTokenData;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
};

// Function to get user ID
export const getUserId = async () => {
    try {
        console.log('Retrieving user ID...');
        let userData = await AsyncStorage.getItem('loginState');
        userData = JSON.parse(userData);

        if (userData && userData.expires > new Date().getTime()) {
            console.log('User data retrieved:', userData);
            return userData.rawData.user.userId;
        } else {
            console.log('Token expired. Attempting to refresh token...');
            const newTokenData = await refreshToken();
            if (newTokenData) {
                return newTokenData.user.userId;
            } else {
                console.error('Failed to refresh token.');
                return null;
            }
        }
    } catch (error) {
        console.error('Failed to retrieve user data:', error);
        return null;
    }
};
