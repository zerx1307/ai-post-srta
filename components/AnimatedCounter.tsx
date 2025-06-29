import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  style?: any;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  duration = 1000,
  style,
  suffix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration });
  }, [value, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    const currentValue = interpolate(animatedValue.value, [0, value], [0, value]);
    return {
      text: currentValue.toFixed(decimals) + suffix,
    };
  });

  return (
    <Animated.Text style={[styles.text, style]}>
      {animatedValue.value.toFixed(decimals)}{suffix}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});