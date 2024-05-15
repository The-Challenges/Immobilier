import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, ActivityIndicator } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const [showReload, setShowReload] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowReload(true);
            setTimeout(() => {
                navigation.navigate('OnboardingScreen');
            }, 2000); 
        }, 5500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../images/img.jpg')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={[styles.title, styles.italic]}>Welcome to Immo</Text>
                    <Text style={[styles.subtitle, styles.italic]}>The best real estate agency that helps you sell or buy land or house</Text>
                    {showReload && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FFFFFF" />
                        </View>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 20,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,

    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    loadingContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '50%', 
    },
    italic: {
        fontStyle: 'italic',
    },
});

export default WelcomeScreen;
