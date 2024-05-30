import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserId } from '../../utils/authUtils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const { width } = Dimensions.get('screen');

const UserPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleDetails, setVisibleDetails] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = await getUserId();
        if (!userId) {
          throw new Error('User ID is null');
        }

        const response = await fetch(`http://192.168.11.234:4000/api/user/${userId}/posts`);
        const responseText = await response.text();

        try {
          const data = JSON.parse(responseText);
          if (response.ok) {
            setPosts(data);
          } else {
            console.error('Error fetching posts:', data);
            setError(data.error || 'Failed to fetch posts');
          }
        } catch (jsonError) {
          console.error('Failed to parse JSON response:', responseText);
          setError('Failed to parse response from server');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openImageViewer = (media, index) => {
    setCurrentMedia(media);
    setCurrentImageIndex(index);
    setIsModalVisible(true);
  };

  const renderOptionList = (title, options) => {
    if (!options || options.length === 0) {
      return null;
    }
    return (
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {options.map((option, index) => (
          <Text key={index} style={styles.optionText}>{option}</Text>
        ))}
      </View>
    );
  };

  const renderMedia = (media) => {
    if (!media || media.length === 0) {
      return null;
    }
    return (
      <ScrollView horizontal style={styles.mediaContainer}>
        {media.map((mediaItem, index) => (
          <TouchableOpacity key={index} onPress={() => openImageViewer(media, index)}>
            <Image source={{ uri: mediaItem.link }} style={styles.mediaImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.Media && item.Media[0]?.link ? item.Media[0].link : 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg' }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardType}>{item.propertyType || 'All types'}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating || '4.5'}</Text>
          </View>
          <TouchableOpacity
            style={[styles.favoriteButton, false && styles.favoriteButtonActive]}
          >
            <Icon name="favorite-border" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardPrice}>${item.price}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditPostScreen', { post: item })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleDetails((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
        >
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        {visibleDetails[item.id] && (
          <View>
            {renderOptionList('Climate Options', item.Climates?.map(opt => opt.options))}
            {renderOptionList('Indoor Options', item.Indoors?.map(opt => opt.options))}
            {renderOptionList('Outdoor Options', item.Outdoors?.map(opt => opt.options))}
            {renderOptionList('View Options', item.Views?.map(opt => opt.options))}
            {renderMedia(item.Media)}
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[...posts.houses, ...posts.lands]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        numColumns={2} // Set number of columns to 2
      />
      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: currentMedia[currentImageIndex]?.link }} style={styles.modalImage} />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setCurrentImageIndex((currentImageIndex - 1 + currentMedia.length) % currentMedia.length)}
            >
              <Text style={styles.modalButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setCurrentImageIndex((currentImageIndex + 1) % currentMedia.length)}
            >
              <Text style={styles.modalButtonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    width: (width - 40) / 2, // Adjust width for two columns
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 100, // Adjust height to make cards smaller
  },
  cardContent: {
    padding: 10,
  },
  cardType: {
    fontSize: 12, // Adjust font size
    color: '#888',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#FFD700',
    fontSize: 16,
  },
  favoriteButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  favoriteButtonActive: {
    backgroundColor: '#FFD700',
  },
  cardPrice: {
    fontSize: 14, // Adjust font size
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 14, // Adjust font size
    fontWeight: 'bold',
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8, // Adjust padding
    paddingHorizontal: 10, // Adjust padding
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12, // Adjust font size
  },
  optionContainer: {
    marginTop: 10,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    marginBottom: 3,
  },
  mediaContainer: {
    marginTop: 10,
  },
  mediaImage: {
    width: 80, // Adjust size to make images smaller
    height: 80, // Adjust size to make images smaller
    marginRight: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 20,
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default UserPostsScreen;
