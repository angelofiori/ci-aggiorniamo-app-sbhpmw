
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Enhanced color palette with gradients and modern colors
  background: '#F8FAFC',        // Softer light gray
  backgroundDark: '#0F172A',    // Dark mode background
  text: '#1E293B',              // Darker, more readable text
  textSecondary: '#64748B',     // Better contrast secondary text
  textLight: '#94A3B8',         // Light text for subtle elements
  
  // Primary gradient colors
  primary: '#6366F1',           // Modern indigo
  primaryLight: '#818CF8',      // Light indigo
  primaryDark: '#4F46E5',       // Dark indigo
  
  // Secondary gradient colors
  secondary: '#06B6D4',         // Modern cyan
  secondaryLight: '#22D3EE',    // Light cyan
  secondaryDark: '#0891B2',     // Dark cyan
  
  // Accent colors
  accent: '#EC4899',            // Modern pink
  accentLight: '#F472B6',       // Light pink
  accentDark: '#DB2777',        // Dark pink
  
  // Success, warning, error with gradients
  success: '#10B981',           // Modern green
  successLight: '#34D399',      // Light green
  warning: '#F59E0B',           // Modern amber
  warningLight: '#FBBF24',      // Light amber
  error: '#EF4444',             // Modern red
  errorLight: '#F87171',        // Light red
  
  // Card and surface colors
  card: '#FFFFFF',              // Pure white
  cardDark: '#1E293B',          // Dark card
  surface: '#F1F5F9',           // Light surface
  surfaceDark: '#334155',       // Dark surface
  
  // Border and divider colors
  border: '#E2E8F0',            // Subtle border
  borderDark: '#475569',        // Dark border
  divider: '#CBD5E1',           // Divider color
  
  // Overlay colors
  overlay: 'rgba(15, 23, 42, 0.6)',     // Dark overlay
  overlayLight: 'rgba(248, 250, 252, 0.9)', // Light overlay
  
  // Glass effect colors
  glass: 'rgba(255, 255, 255, 0.1)',
  glassDark: 'rgba(0, 0, 0, 0.1)',
};

// Gradient definitions
export const gradients = {
  primary: [colors.primary, colors.primaryLight],
  primaryReverse: [colors.primaryLight, colors.primary],
  secondary: [colors.secondary, colors.secondaryLight],
  accent: [colors.accent, colors.accentLight],
  success: [colors.success, colors.successLight],
  warning: [colors.warning, colors.warningLight],
  error: [colors.error, colors.errorLight],
  sunset: ['#FF6B6B', '#FFE66D', '#4ECDC4'],
  ocean: ['#667eea', '#764ba2'],
  forest: ['#134E5E', '#71B280'],
  fire: ['#FF416C', '#FF4B2B'],
  sky: ['#74b9ff', '#0984e3'],
  purple: ['#A8EDEA', '#FED6E3'],
  dark: ['#2C3E50', '#4A6741'],
};

// Enhanced button styles with gradients
export const buttonStyles = StyleSheet.create({
  primary: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(99, 102, 241, 0.3)',
    elevation: 6,
  },
  secondary: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(6, 182, 212, 0.3)',
    elevation: 6,
  },
  accent: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(236, 72, 153, 0.3)',
    elevation: 6,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    backgroundColor: colors.glass,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  floating: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
});

// Enhanced text styles with better typography
export const textStyles = StyleSheet.create({
  h1: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  h3: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyLarge: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 26,
    fontWeight: '400',
  },
  bodySecondary: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    fontWeight: '400',
  },
  captionSmall: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
    letterSpacing: 0.5,
  },
  buttonOutline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});

// Enhanced common styles with modern design
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // Enhanced card styles
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardElevated: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginVertical: 12,
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
    elevation: 8,
  },
  cardGlass: {
    backgroundColor: colors.glass,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
  },
  
  // Layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerHorizontal: {
    alignItems: 'center',
  },
  centerVertical: {
    justifyContent: 'center',
  },
  
  // Enhanced shadows
  shadow: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  shadowLarge: {
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
    elevation: 8,
  },
  shadowSmall: {
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  
  // Dividers
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 16,
  },
  dividerThick: {
    height: 2,
    backgroundColor: colors.border,
    marginVertical: 20,
  },
  
  // Spacing utilities
  marginSmall: { margin: 8 },
  marginMedium: { margin: 16 },
  marginLarge: { margin: 24 },
  paddingSmall: { padding: 8 },
  paddingMedium: { padding: 16 },
  paddingLarge: { padding: 24 },
  
  // Border radius utilities
  rounded: { borderRadius: 8 },
  roundedMedium: { borderRadius: 12 },
  roundedLarge: { borderRadius: 16 },
  roundedXLarge: { borderRadius: 20 },
  roundedFull: { borderRadius: 9999 },
});

// Animation configurations
export const animations = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  timing: {
    duration: 300,
  },
  bounce: {
    damping: 10,
    stiffness: 100,
    mass: 1,
  },
};

// Spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius system
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};
