import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const rooms = [
    { id: 1, name: 'Room 1' },
    { id: 2, name: 'Room 2' },
    // Add more rooms here
  ];

  const enterRoom = (roomId) => {
    navigation.navigate('chat', { roomId });
  };

  return (
    <View style={styles.container}>
      {rooms.map(room => (
        <TouchableOpacity key={room.id} style={styles.roomButton} onPress={() => enterRoom(room.id)}>
          <Text style={styles.roomButtonText}>{room.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomButton: {
    backgroundColor: '#e3e3e3',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  roomButtonText: {
    fontSize: 18,
  },
});

export default HomeScreen;