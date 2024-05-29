import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EditPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://192.168.104.29:4000/api/posts/${postId}`);
        const data = await response.json();
        if (response.ok) {
          setTitle(data.title);
          setContent(data.content);
        } else {
          setError(data.error || 'Failed to fetch post');
        }
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSave = async () => {
    try {
      console.log('Updating profile with userId:', userId);
      const response = await fetch(`http://192.168.103.4:4000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Post updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error || 'Failed to update post');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
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
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: '#4F8EF7',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditPostScreen;
