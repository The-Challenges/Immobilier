import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Tooltip from 'react-native-walkthrough-tooltip';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const AdvancedSlider = ({ label, values, onValuesChange, min, max, step, unit }) => {
  const [tooltipIndex, setTooltipIndex] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.rangeText}>
          {unit}{values[0]} - {unit}{values[1]}
        </Text>
      </View>
      <View style={styles.sliderWrapper}>
        <MultiSlider
          values={values}
          onValuesChange={onValuesChange}
          min={min}
          max={max}
          step={step}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
          snapped={true}
          selectedStyle={styles.selectedStyle}
          unselectedStyle={styles.unselectedStyle}
          containerStyle={styles.sliderContainer}
          trackStyle={styles.trackStyle}
          markerStyle={styles.markerStyle}
          customMarker={({ index, pressed }) => (
            <View style={styles.markerContainer}>
              {pressed && (
                <Tooltip
                  isVisible={tooltipIndex === index}
                  content={<Text style={styles.tooltipText}>{unit}{values[index]}</Text>}
                  placement="top"
                  onClose={() => setTooltipIndex(null)}
                  arrowSize={{ width: 16, height: 8 }}
                  backgroundColor="rgba(0, 0, 0, 0.5)"
                  tooltipStyle={styles.tooltip}
                  animated
                >
                  <Animated.View style={styles.animatedMarker}>
                    <Icon name="location-pin" size={28} color={COLORS.primary} onPress={() => setTooltipIndex(index)} />
                  </Animated.View>
                </Tooltip>
              )}
              <Animated.View style={styles.animatedMarker}>
                <Icon
                  name="location-pin"
                  size={28}
                  color={pressed ? COLORS.primary : COLORS.gray}
                  onPress={() => setTooltipIndex(index)}
                />
              </Animated.View>
            </View>
          )}
        />
      </View>
      <View style={styles.trackContainer}>
        {new Array(max - min).fill(null).map((_, index) => (
          <View
            key={index}
            style={[
              styles.trackSegment,
              {
                backgroundColor: values.includes(index + min) ? COLORS.primary : '#d3d3d3',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rangeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sliderWrapper: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  sliderContainer: {
    height: 40,
  },
  selectedStyle: {
    backgroundColor: COLORS.primary,
  },
  unselectedStyle: {
    backgroundColor: '#d3d3d3',
  },
  trackStyle: {
    height: 6,
  },
  markerStyle: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
  },
  tooltipText: {
    fontSize: 16,
    color: '#fff',
  },
  tooltip: {
    borderRadius: 8,
    padding: 8,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedMarker: {
    transform: [{ scale: 1 }],
  },
  trackContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackSegment: {
    flex: 1,
    height: 2,
    marginHorizontal: 1,
  },
});

export default AdvancedSlider;
