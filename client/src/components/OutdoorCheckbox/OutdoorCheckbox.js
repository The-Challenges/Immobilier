// OutdoorCheckbox.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OutdoorCheckbox = ({ label, checked, onChange, icon, color }) => {
  return (
    <TouchableOpacity onPress={() => onChange(!checked)} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
        {checked && <Icon name="check" size={20} color={color} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
  label: {
    fontSize: 16,
  },
});

export default OutdoorCheckbox;
