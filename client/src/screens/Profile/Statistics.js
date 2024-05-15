import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, Animated } from 'react-native';

const StatisticsComponent = () => {
    const dummySocialMediaData = {
        requests: 120,
        posts: 75,
        comments: 300,
        likes: 1500,
    };

    const maxValue = Math.max(...Object.values(dummySocialMediaData));

    // Animation for bar width
    const animatedWidths = Object.values(dummySocialMediaData).map(value => new Animated.Value(0));

    // Start animations on load
    React.useEffect(() => {
        const animations = animatedWidths.map((animatedWidth, index) => {
            return Animated.timing(animatedWidth, {
                toValue: (Object.values(dummySocialMediaData)[index] / maxValue) * 100,
                duration: 1000,
                useNativeDriver: false,
            });
        });
        Animated.stagger(100, animations).start();
    }, []);

    return (
        <ImageBackground source={require('../../images/img.jpg')} style={styles.backgroundImage} resizeMode="cover">
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile Insights</Text>
                    {Object.entries(dummySocialMediaData).map(([key, value], index) => (
                        <View key={key} style={styles.barContainer}>
                            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                            <Animated.View style={[styles.bar, { width: animatedWidths[index].interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }) }]}>
                                <Text style={styles.barText}>{value}</Text>
                            </Animated.View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4f9',
    },
    section: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.85,
    },
    sectionTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 18,
        color: '#333',
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        width: '30%',
        fontSize: 16,
        fontWeight: '500',
    },
    bar: {
        flex: 1,
        height: 30,
        backgroundColor: '#007AFF',
        borderRadius: 12.5,
        justifyContent: 'center',
        paddingHorizontal: 15,
        overflow: 'hidden',
    },
    barText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default StatisticsComponent;
