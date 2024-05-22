import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/colors';

const FilterHeader = ({ onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backIcon}>
        <Icon1 name="arrowleft" size={30} color="#6495ed" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Filter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8b4513',
  }
});

export default FilterHeader;