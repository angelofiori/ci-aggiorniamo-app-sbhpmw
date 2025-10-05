
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface AnimatedIconProps {
  name: string;
  size?: number;
  color: string;
  style?: ViewStyle;
  animation?: 'bounce' | 'pulse' | 'rotate' | 'scale' | 'none';
  duration?: number;
}

export default function AnimatedIcon({
  name,
  size = 24,
  color,
  style,
  animation = 'none',
  duration = 1000,
}: AnimatedIconProps) {
  const animationValue = useSharedValue(0);

  useEffect(() => {
    if (animation === 'none') return;

    switch (animation) {
      case 'bounce':
        animationValue.value = withRepeat(
          withSpring(1, { damping: 2, stiffness: 100 }),
          -1,
          true
        );
        break;
      case 'pulse':
        animationValue.value = withRepeat(
          withTiming(1, { duration }),
          -1,
          true
        );
        break;
      case 'rotate':
        animationValue.value = withRepeat(
          withTiming(1, { duration }),
          -1,
          false
        );
        break;
      case 'scale':
        animationValue.value = withRepeat(
          withTiming(1, { duration }),
          -1,
          true
        );
        break;
    }
  }, [animation, duration, animationValue]);

  const animatedStyle = useAnimatedStyle(() => {
    switch (animation) {
      case 'bounce':
        return {
          transform: [
            {
              translateY: interpolate(
                animationValue.value,
                [0, 1],
                [0, -10]
              ),
            },
          ],
        };
      case 'pulse':
        return {
          opacity: interpolate(
            animationValue.value,
            [0, 1],
            [0.5, 1]
          ),
        };
      case 'rotate':
        return {
          transform: [
            {
              rotate: `${interpolate(
                animationValue.value,
                [0, 1],
                [0, 360]
              )}deg`,
            },
          ],
        };
      case 'scale':
        return {
          transform: [
            {
              scale: interpolate(
                animationValue.value,
                [0, 1],
                [1, 1.2]
              ),
            },
          ],
        };
      default:
        return {};
    }
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      <IconSymbol name={name as any} size={size} color={color} />
    </Animated.View>
  );
}
