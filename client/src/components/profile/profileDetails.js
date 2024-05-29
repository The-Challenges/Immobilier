import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from '../Authentification/storage'; // Import your storage module


const getUserId = async () => {
  try {
    const userData = await storage.load({ key: 'loginState' });
    return userData.user.userId;
  } catch (error) {
    console.error('Failed to retrieve user data:', error);
    return null;
  }
};

const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`http://192.168.11.234:4000/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    Alert.alert('Error', error.message || 'Failed to fetch user profile');
    return null;
  }
};

const checkVerificationStatus = async () => {
  try {
    const verificationStatus = await storage.load({ key: 'verificationStatus' });
    return verificationStatus.verified;
  } catch (error) {
    return false;
  }
};




const Action = ({ icon, title, onPress, iconColor = '#4F8EF7' }) => (
  <Pressable onPress={onPress} style={styles.action}>
    <View style={styles.actionContent}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor === '#FF0000' ? '#FFDDDD' : '#E0E0E0' }]}>
        <Feather name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </View>
    <Icon name={'chevron-right'} size={25} color={'#4F8EF7'} />
  </Pressable>
);

const UserProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const loadUserData = async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        const profileData = await fetchUserProfile(userId);
        if (profileData) {
          setUserData(profileData);
          const isVerified = await checkVerificationStatus();
          setVerified(isVerified);
        } else {
          setError('Failed to load user data.');
        }
      } else {
        setError('User ID is missing.');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F8EF7" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load user data.</Text>
      </View>
    );
  }
  const handleLogout = async () => {
    setLogoutLoading(true); // Start logout loading
    try {
      // Clear necessary storage items
      await storage.remove({ key: 'verificationStatus' });
      await storage.remove({ key: 'loginState' });

      // Introduce a delay before navigating
      setTimeout(() => {
        setLogoutLoading(false); // Stop logout loading
        console.log('Logout successful');
        navigation.navigate('Login');
      }, 2000); // Delay of 2 seconds
    } catch (error) {
      setLogoutLoading(false); // Stop logout loading on error
      console.error('Logout failed:', error);
      Alert.alert('Logout Failed', 'Could not log out. Please try again.');
    }
  };

  if (logoutLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F8EF7" />
        <Text style={styles.loadingText}>Logging out...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            {userData.Media && userData.Media.length > 0 ? (
              <Image source={{ uri: userData.Media[0].link }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>{userData.firstName}</Text>
              {verified && (
                <Icon name="verified" size={20} color="#4F8EF7" style={styles.verifiedIcon} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Feather name="phone" size={20} color="#4F8EF7" />
            <Text style={styles.detailText}>{userData.phoneNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Feather name="user" size={20} color="#4F8EF7" />
            <Text style={styles.detailText}>{userData.firstName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Feather name="mail" size={20} color="#4F8EF7" />
            <Text style={styles.detailText}>{userData.email}</Text>
          </View>
        </View>

        <View style={styles.actionList}>
          <Action title={'Edit Profile'} icon={'edit'} onPress={() => navigation.navigate('EditProfile', { userId: userData.id })} />
          <Action title={'Notification'} icon={'bell'} onPress={() => navigation.navigate('Notifications')} />
          <Action title={'Security'} icon={'lock'} onPress={() => { }} />
          <Action title={'Appearance'} icon={'eye'} onPress={() => { }} />
          <Action title={'Help'} icon={'help-circle'} onPress={() => { }} />
          <Action title={'Invite Friends'} icon={'user-plus'} onPress={() => { }} />
          <Action title={'Listings'} icon={'list'} onPress={() => navigation.navigate('apartement')} />
          <Action title={'Contact'} icon={'phone'} onPress={() => navigation.navigate('Contact')} />
          <Action title={'Requests Houses Received'} icon={'home'} onPress={() => navigation.navigate('Received')} />
          <Action title={'Requests Houses Sended'} icon={'home'} onPress={() => navigation.navigate('requeststatus')} />
          <Action title={'Requests Lands Received'} icon={'map'} onPress={() => navigation.navigate('requestreceivedlands')} />
          <Action title={'Requests Lands Sended'} icon={'map'} onPress={() => navigation.navigate('requeststatuslands')} />

        </View>

        <View style={styles.logoutContainer}>
        <Action title={'Logout'} icon={'log-out'} onPress={handleLogout} iconColor={'#FF0000'} />
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.plusButton} onPress={() => setAddModalVisible(true)}>
          <Feather name="plus" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
          <Feather name="edit" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setEditModalVisible(false);
              navigation.navigate('EditHouse');
            }}
          >
            <Text style={styles.textStyle}>Edit House</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setEditModalVisible(false);
              navigation.navigate('EditLand');
            }}
          >
            <Text style={styles.textStyle}>Edit Land</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setEditModalVisible(false)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setAddModalVisible(false);
              navigation.navigate('AddHouse');
            }}
          >
            <Text style={styles.textStyle}>Add House</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setAddModalVisible(false);
              navigation.navigate('AddLand');
            }}
          >
            <Text style={styles.textStyle}>Add Land</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setAddModalVisible(false)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4F8EF7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileTextContainer: {
    flex: 1,
    flexDirection: 'row', // Ensure the items are in a row
    alignItems: 'center', // Align items vertically in the center
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  verifiedIcon: {
    marginLeft: 5, // Adjust if more space is needed
    alignSelf: 'center', // Align the icon vertically with the text
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  actionList: {
    marginTop: 10,
  },
  action: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutContainer: {
    marginTop: 20,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F8EF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  editButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F8EF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default UserProfile;
