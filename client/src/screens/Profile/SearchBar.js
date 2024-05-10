import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Search = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleValueChange = (value) => {
    switch (value) {
      // case 'house':
      //   navigation.navigate('Listings'); // Navigate to Listings screen for walking
      //   break;
      case 'apartment':
        navigation.navigate('Apartment'); // Navigate to Apartment for transit
        break;
      case 'land':
        navigation.navigate('Land'); // Navigate to Land for driving
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value=""
        onValueChange={handleValueChange} // Call handleValueChange on segment value change
        buttons={[
          // {
          //   value: 'house',
          //   label: 'House',
          // },
          {
            value: 'apartment',
            label: 'Apartment',
          },
          { value: 'land', label: 'Land' },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   
  },
});

export default Search;
