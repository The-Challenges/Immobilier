import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <View style={styles.container}>
      <CheckBox
        value={checked}
        onValueChange={onChange}
        tintColors={{ true: '#1e90ff', false: '#ccc' }}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CustomCheckbox;
