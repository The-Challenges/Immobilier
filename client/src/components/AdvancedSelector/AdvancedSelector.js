import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdvancedSelector = ({ label, options, selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedValue === option ? styles.selectedOption : styles.unselectedOption
            ]}
            onPress={() => onValueChange(option)}
          >
            <Icon name="king-bed" size={24} color={selectedValue === option ? '#fff' : '#333'} />
            <Text style={selectedValue === option ? styles.selectedText : styles.unselectedText}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#1e90ff',
  },
  unselectedOption: {
    backgroundColor: '#f0f0f0',
  },
  selectedText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#333',
    marginLeft: 5,
  },
});

export default AdvancedSelector;
