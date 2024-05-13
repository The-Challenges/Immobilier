import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { listenForLandRequests, respondToLandRequest } from '../socketserv';

const ReceiverRequestsScreen = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        listenForLandRequests((data) => {
            setRequests(prev => [...prev, data]);
        });
    }, []);

    const handleResponse = (requestId, accepted) => {
        respondToLandRequest(requestId, accepted ? 'accepted' : 'rejected');
        setRequests(requests.filter(request => request.requestId !== requestId));
    };

    return (
        <View style={styles.container}>
            {requests.length > 0 ? (
                requests.map((request, index) => (
                    <View key={index} style={styles.requestItem}>
                        <Text style={styles.requestText}>Request from User {request.senderId}</Text>
                        <View style={styles.buttonsContainer}>
                            <Button title="Accept" onPress={() => handleResponse(request.requestId, true)} />
                            <Button title="Reject" onPress={() => handleResponse(request.requestId, false)} />
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noRequests}>No pending requests.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    requestItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10
    },
    requestText: {
        fontSize: 16,
        color: '#333'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    noRequests: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20
    }
});

export default ReceiverRequestsScreen;
