
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInRight,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

import { IconSymbol } from '@/components/IconSymbol';
import GradientCard from '@/components/GradientCard';
import GradientButton from '@/components/GradientButton';
import AnimatedIcon from '@/components/AnimatedIcon';
import { colors, textStyles, commonStyles, gradients, spacing } from '@/styles/commonStyles';

const { width: screenWidth } = Dimensions.get('window');

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'promo' | 'business' | 'update' | 'alert';
  timestamp: string;
  isRead: boolean;
  gradient: string[];
}

interface BusinessMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  gradient: string[];
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  gradient: string[];
}

export default function HomeScreen() {
  const theme = useTheme();
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const pulseAnimation = useSharedValue(1);

  // Sample data - in a real app, this would come from your backend/state management
  const tutorialSteps: TutorialStep[] = [
    {
      id: '1',
      title: 'Benvenuto in "Ci aggiorniamo!"',
      description: 'La tua nuova piattaforma di comunicazione completa che unisce chat, social e business.',
      icon: 'hand.wave',
      gradient: gradients.primary,
    },
    {
      id: '2',
      title: 'Chat Sicure',
      description: 'Messaggi crittografati end-to-end, chiamate vocali e video per comunicazioni private.',
      icon: 'message.circle',
      gradient: gradients.secondary,
    },
    {
      id: '3',
      title: 'Community & Social',
      description: 'Unisciti a gruppi, condividi contenuti e connettiti con persone che condividono i tuoi interessi.',
      icon: 'person.3',
      gradient: gradients.accent,
    },
    {
      id: '4',
      title: 'Area Business',
      description: 'Gestisci la tua attività, monitora le performance e raggiungi nuovi clienti.',
      icon: 'briefcase',
      gradient: gradients.success,
    },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      title: '🎉 Offerta Speciale Premium',
      message: 'Ottieni 3 mesi gratis del piano Premium! Accesso completo a bot avanzati e personalizzazioni.',
      type: 'promo',
      timestamp: '2 ore fa',
      isRead: false,
      gradient: gradients.fire,
    },
    {
      id: '2',
      title: '📈 Nuove Funzionalità Business',
      message: 'Scopri i nuovi strumenti di analytics e marketing per far crescere la tua attività.',
      type: 'business',
      timestamp: '1 giorno fa',
      isRead: false,
      gradient: gradients.ocean,
    },
    {
      id: '3',
      title: '🔒 Aggiornamento Sicurezza',
      message: 'Abbiamo migliorato la crittografia per garantire la massima sicurezza dei tuoi dati.',
      type: 'update',
      timestamp: '3 giorni fa',
      isRead: true,
      gradient: gradients.forest,
    },
  ];

  const businessMetrics: BusinessMetric[] = [
    {
      id: '1',
      label: 'Vendite Mensili',
      value: '€12,450',
      change: '+15.3%',
      isPositive: true,
      icon: 'chart.line.uptrend.xyaxis',
      gradient: gradients.success,
    },
    {
      id: '2',
      label: 'Nuovi Clienti',
      value: '247',
      change: '+8.7%',
      isPositive: true,
      icon: 'person.badge.plus',
      gradient: gradients.primary,
    },
    {
      id: '3',
      label: 'Engagement',
      value: '89.2%',
      change: '+2.1%',
      isPositive: true,
      icon: 'heart.circle',
      gradient: gradients.accent,
    },
    {
      id: '4',
      label: 'Conversioni',
      value: '34.8%',
      change: '-1.2%',
      isPositive: false,
      icon: 'target',
      gradient: gradients.warning,
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Nuova Chat',
      description: 'Inizia una conversazione',
      icon: 'plus.message',
      route: '/chats',
      gradient: gradients.primary,
    },
    {
      id: '2',
      title: 'Crea Post',
      description: 'Condividi un aggiornamento',
      icon: 'square.and.pencil',
      route: '/community',
      gradient: gradients.secondary,
    },
    {
      id: '3',
      title: 'Analytics',
      description: 'Visualizza statistiche',
      icon: 'chart.bar',
      route: '/profile',
      gradient: gradients.accent,
    },
    {
      id: '4',
      title: 'Impostazioni',
      description: 'Configura il tuo account',
      icon: 'gear',
      route: '/profile',
      gradient: gradients.forest,
    },
  ];

  useEffect(() => {
    // Pulse animation for notifications
    pulseAnimation.value = withRepeat(
      withTiming(1.1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedPulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  const nextTutorialStep = () => {
    if (currentTutorialStep < tutorialSteps.length - 1) {
      setCurrentTutorialStep(currentTutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const skipTutorial = () => {
    setShowTutorial(false);
  };

  const renderTutorialCard = () => {
    if (!showTutorial) return null;

    const step = tutorialSteps[currentTutorialStep];
    
    return (
      <Animated.View entering={FadeInDown.delay(200)} style={styles.tutorialContainer}>
        <GradientCard gradient={step.gradient} style={styles.tutorialCard}>
          <View style={styles.tutorialHeader}>
            <AnimatedIcon
              name={step.icon}
              size={40}
              color={colors.card}
              animation="bounce"
            />
            <Text style={[textStyles.h3, { color: colors.card }]}>
              {step.title}
            </Text>
          </View>
          
          <Text style={[textStyles.body, { color: colors.card, marginBottom: 20 }]}>
            {step.description}
          </Text>
          
          <View style={styles.tutorialProgress}>
            {tutorialSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentTutorialStep && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
          
          <View style={styles.tutorialActions}>
            <TouchableOpacity onPress={skipTutorial} style={styles.skipButton}>
              <Text style={[textStyles.button, { color: colors.card }]}>Salta</Text>
            </TouchableOpacity>
            
            <GradientButton
              title={currentTutorialStep === tutorialSteps.length - 1 ? 'Inizia' : 'Avanti'}
              onPress={nextTutorialStep}
              gradient={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)']}
              style={styles.nextButton}
            />
          </View>
        </GradientCard>
      </Animated.View>
    );
  };

  const renderNotifications = () => (
    <Animated.View entering={FadeInLeft.delay(400)} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={textStyles.h3}>Notifiche & Promozioni</Text>
        <Animated.View style={animatedPulseStyle}>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>
              {notifications.filter(n => !n.isRead).length}
            </Text>
          </View>
        </Animated.View>
      </View>
      
      {notifications.slice(0, 3).map((notification, index) => (
        <Animated.View
          key={notification.id}
          entering={FadeInRight.delay(500 + index * 100)}
        >
          <GradientCard
            gradient={notification.gradient}
            style={[styles.notificationCard, !notification.isRead && styles.unreadNotification]}
          >
            <View style={styles.notificationContent}>
              <Text style={[textStyles.h4, { color: colors.card }]}>
                {notification.title}
              </Text>
              <Text style={[textStyles.bodySecondary, { color: colors.card, opacity: 0.9 }]}>
                {notification.message}
              </Text>
              <Text style={[textStyles.captionSmall, { color: colors.card, opacity: 0.7, marginTop: 8 }]}>
                {notification.timestamp}
              </Text>
            </View>
            {!notification.isRead && (
              <View style={styles.unreadIndicator} />
            )}
          </GradientCard>
        </Animated.View>
      ))}
    </Animated.View>
  );

  const renderBusinessMetrics = () => (
    <Animated.View entering={FadeInUp.delay(600)} style={styles.section}>
      <Text style={textStyles.h3}>Panoramica Business</Text>
      
      <View style={styles.metricsGrid}>
        {businessMetrics.map((metric, index) => (
          <Animated.View
            key={metric.id}
            entering={ZoomIn.delay(700 + index * 100)}
            style={styles.metricCard}
          >
            <GradientCard gradient={metric.gradient} style={styles.metricContent}>
              <AnimatedIcon
                name={metric.icon}
                size={24}
                color={colors.card}
                animation="pulse"
              />
              <Text style={[textStyles.captionSmall, { color: colors.card, opacity: 0.8 }]}>
                {metric.label}
              </Text>
              <Text style={[textStyles.h4, { color: colors.card }]}>
                {metric.value}
              </Text>
              <Text style={[
                textStyles.captionSmall,
                { color: metric.isPositive ? '#4ADE80' : '#F87171' }
              ]}>
                {metric.change}
              </Text>
            </GradientCard>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );

  const renderAccountSummary = () => (
    <Animated.View entering={FadeInDown.delay(800)} style={styles.section}>
      <Text style={textStyles.h3}>Il Tuo Account</Text>
      
      <GradientCard gradient={gradients.purple} style={styles.accountCard}>
        <View style={styles.accountHeader}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={gradients.primary}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>MR</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.accountInfo}>
            <Text style={[textStyles.h4, { color: colors.card }]}>
              Mario Rossi
            </Text>
            <Text style={[textStyles.bodySecondary, { color: colors.card, opacity: 0.8 }]}>
              Piano Premium • Membro da Gen 2024
            </Text>
          </View>
        </View>
        
        <View style={styles.accountStats}>
          <View style={styles.statItem}>
            <Text style={[textStyles.h4, { color: colors.card }]}>156</Text>
            <Text style={[textStyles.captionSmall, { color: colors.card, opacity: 0.8 }]}>
              Connessioni
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[textStyles.h4, { color: colors.card }]}>89</Text>
            <Text style={[textStyles.captionSmall, { color: colors.card, opacity: 0.8 }]}>
              Post
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[textStyles.h4, { color: colors.card }]}>23</Text>
            <Text style={[textStyles.captionSmall, { color: colors.card, opacity: 0.8 }]}>
              Gruppi
            </Text>
          </View>
        </View>
      </GradientCard>
    </Animated.View>
  );

  const renderQuickActions = () => (
    <Animated.View entering={FadeInUp.delay(1000)} style={styles.section}>
      <Text style={textStyles.h3}>Azioni Rapide</Text>
      
      <View style={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <Animated.View
            key={action.id}
            entering={SlideInRight.delay(1100 + index * 100)}
            style={styles.actionCard}
          >
            <TouchableOpacity
              onPress={() => Alert.alert('Navigazione', `Vai a ${action.title}`)}
              activeOpacity={0.8}
            >
              <GradientCard gradient={action.gradient} style={styles.actionContent}>
                <AnimatedIcon
                  name={action.icon}
                  size={28}
                  color={colors.card}
                  animation="scale"
                />
                <Text style={[textStyles.h4, { color: colors.card, textAlign: 'center' }]}>
                  {action.title}
                </Text>
                <Text style={[
                  textStyles.captionSmall,
                  { color: colors.card, opacity: 0.8, textAlign: 'center' }
                ]}>
                  {action.description}
                </Text>
              </GradientCard>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert('Notifiche', 'Visualizza tutte le notifiche')}
      style={styles.headerButton}
    >
      <AnimatedIcon
        name="bell"
        size={24}
        color={theme.colors.primary}
        animation="bounce"
      />
      {notifications.filter(n => !n.isRead).length > 0 && (
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>
            {notifications.filter(n => !n.isRead).length}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Ci aggiorniamo!',
          headerRight: renderHeaderRight,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            ...textStyles.h3,
            color: theme.colors.text,
          },
        }}
      />
      
      <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderTutorialCard()}
          {renderNotifications()}
          {renderBusinessMetrics()}
          {renderAccountSummary()}
          {renderQuickActions()}
          
          {/* Bottom spacing for floating tab bar */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  
  // Tutorial styles
  tutorialContainer: {
    marginBottom: spacing.lg,
  },
  tutorialCard: {
    padding: spacing.lg,
  },
  tutorialHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tutorialProgress: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.card,
  },
  tutorialActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: spacing.sm,
  },
  nextButton: {
    paddingHorizontal: spacing.lg,
  },
  
  // Section styles
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  // Notification styles
  notificationCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: colors.card,
  },
  unreadIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ADE80',
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  notificationBadge: {
    backgroundColor: colors.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Metrics styles
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (screenWidth - spacing.md * 3) / 2,
    marginBottom: spacing.sm,
  },
  metricContent: {
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'space-between',
  },
  
  // Account styles
  accountCard: {
    padding: spacing.lg,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.card,
    fontSize: 20,
    fontWeight: '700',
  },
  accountInfo: {
    flex: 1,
  },
  accountStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  
  // Actions styles
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (screenWidth - spacing.md * 3) / 2,
    marginBottom: spacing.sm,
  },
  actionContent: {
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'space-between',
  },
  
  // Header styles
  headerButton: {
    padding: spacing.sm,
    position: 'relative',
  },
  headerBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBadgeText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '600',
  },
  
  // Bottom spacing
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 100 : 120,
  },
});
