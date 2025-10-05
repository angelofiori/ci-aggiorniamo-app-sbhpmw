
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/IconSymbol';
import AnimatedIcon from '@/components/AnimatedIcon';
import { colors, gradients } from '@/styles/commonStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

export interface TabBarItem {
  route: string;
  label: string;
  icon: string;
  activeIcon?: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 25,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const activeIndex = tabs.findIndex(tab => pathname.includes(tab.route));
  const indicatorPosition = useSharedValue(activeIndex >= 0 ? activeIndex : 0);

  React.useEffect(() => {
    const newIndex = tabs.findIndex(tab => pathname.includes(tab.route));
    if (newIndex >= 0) {
      indicatorPosition.value = withSpring(newIndex, {
        damping: 15,
        stiffness: 150,
        mass: 1,
      });
    }
  }, [pathname, tabs, indicatorPosition]);

  const handleTabPress = (route: string, index: number) => {
    indicatorPosition.value = withSpring(index, {
      damping: 15,
      stiffness: 150,
      mass: 1,
    });
    router.push(route as any);
  };

  const indicatorStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
    const translateX = interpolate(
      indicatorPosition.value,
      [0, tabs.length - 1],
      [0, tabWidth * (tabs.length - 1)]
    );

    return {
      transform: [{ translateX }],
      width: tabWidth,
    };
  });

  return (
    <SafeAreaView style={[styles.container, { bottom: bottomMargin }]} edges={['bottom']}>
      <View style={[styles.tabBar, { width: containerWidth, borderRadius }]}>
        <BlurView intensity={80} tint="light" style={[styles.blur, { borderRadius }]}>
          {/* Animated Indicator */}
          <Animated.View style={[styles.indicator, indicatorStyle]}>
            <LinearGradient
              colors={gradients.primary}
              style={[styles.indicatorGradient, { borderRadius: borderRadius - 8 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>

          {/* Tab Items */}
          <View style={styles.tabsContainer}>
            {tabs.map((tab, index) => {
              const isActive = pathname.includes(tab.route);
              
              return (
                <TabItem
                  key={tab.route}
                  tab={tab}
                  index={index}
                  isActive={isActive}
                  onPress={handleTabPress}
                />
              );
            })}
          </View>
        </BlurView>

        {/* Enhanced Shadow */}
        <View style={styles.shadowContainer}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.1)', 'transparent']}
            style={[styles.shadow, { borderRadius }]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

interface TabItemProps {
  tab: TabBarItem;
  index: number;
  isActive: boolean;
  onPress: (route: string, index: number) => void;
}

function TabItem({ tab, index, isActive, onPress }: TabItemProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchableOpacity
      style={[styles.tab, animatedStyle]}
      onPress={() => onPress(tab.route, index)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <View style={styles.tabContent}>
        {isActive ? (
          <AnimatedIcon
            name={tab.activeIcon || tab.icon}
            size={24}
            color={colors.card}
            animation="bounce"
            duration={1500}
          />
        ) : (
          <IconSymbol
            name={tab.icon as any}
            size={24}
            color={isActive ? colors.card : colors.textSecondary}
          />
        )}
        
        <Text
          style={[
            styles.tabLabel,
            {
              color: isActive ? colors.card : colors.textSecondary,
              fontWeight: isActive ? '700' : '500',
            },
          ]}
        >
          {tab.label}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  tabBar: {
    position: 'relative',
    height: 70,
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.15)',
    elevation: 10,
  },
  blur: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  indicator: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    left: 8,
    zIndex: 1,
  },
  indicatorGradient: {
    flex: 1,
    boxShadow: '0px 4px 12px rgba(99, 102, 241, 0.3)',
    elevation: 6,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    textAlign: 'center',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  shadowContainer: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 20,
    zIndex: -1,
  },
  shadow: {
    flex: 1,
  },
});
