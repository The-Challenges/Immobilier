import React , { useEffect }from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Two'); 
        }, 5500); 
    
        return () => clearTimeout(timer)
      }, [navigation]);
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../images/img.jpg')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.textView}>
          <Text style={styles.title}>Welcome to Immo</Text>
          <Text style={styles.subtitle}>The best real estate agency that helps you sell or buy land or house</Text>
        
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop : 0

  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',  
  },
  textView: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    padding: 20,
    width: '100%',  
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 10, 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 18, 
    textAlign: 'center',
    marginBottom: 20, 
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});

export default WelcomeScreen;
