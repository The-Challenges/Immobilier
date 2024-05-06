import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Message',
      message: 'You have a new message from John Doe',
      icon: 'email',
      time: '10:45 AM',
    },
    {
      id: 2,
      title: 'New Comment',
      message: 'Someone commented on your post',
      icon: 'comment',
      time: '11:00 AM',
    },
    {
      id: 3,
      title: 'New Like',
      message: 'Someone liked your post',
      icon: 'heart',
      time: '11:15 AM',
    },
    {
      id: 4,
      title: 'New Follower',
      message: 'You have a new follower',
      icon: 'account-plus',
      time: '11:30 AM',
    },
  ]);

  const handlePress = (item) => {
    console.log(`Notification ${item.id} pressed`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.notificationContainer}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#4CAF50" />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationPage;
