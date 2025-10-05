
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/IconSymbol';
import GradientButton from '@/components/GradientButton';
import GradientCard from '@/components/GradientCard';
import AnimatedIcon from '@/components/AnimatedIcon';
import { colors, textStyles, commonStyles, gradients } from '@/styles/commonStyles';
import { Stack } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
  ZoomIn,
} from 'react-native-reanimated';

interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

export default function ProfileScreen() {
  const [stats] = useState<ProfileStats>({
    posts: 42,
    followers: 1234,
    following: 567,
  });

  const profileSections = [
    {
      title: 'Account',
      gradient: gradients.primary,
      items: [
        { icon: 'person.circle', label: 'Modifica Profilo', action: () => console.log('Edit profile') },
        { icon: 'key', label: 'Privacy e Sicurezza', action: () => console.log('Privacy settings') },
        { icon: 'bell', label: 'Notifiche', action: () => console.log('Notification settings') },
      ],
    },
    {
      title: 'Contenuti',
      gradient: gradients.secondary,
      items: [
        { icon: 'photo', label: 'Storie Archiviate', action: () => console.log('Archived stories') },
        { icon: 'bookmark', label: 'Salvati', action: () => console.log('Saved posts') },
        { icon: 'clock', label: 'Attività', action: () => console.log('Activity') },
      ],
    },
    {
      title: 'Business',
      gradient: gradients.accent,
      items: [
        { icon: 'briefcase', label: 'Account Business', action: () => console.log('Business account') },
        { icon: 'chart.bar', label: 'Statistiche', action: () => console.log('Analytics') },
        { icon: 'megaphone', label: 'Promuovi', action: () => console.log('Promote') },
      ],
    },
    {
      title: 'Supporto',
      gradient: gradients.forest,
      items: [
        { icon: 'questionmark.circle', label: 'Aiuto', action: () => console.log('Help') },
        { icon: 'info.circle', label: 'Informazioni', action: () => console.log('About') },
        { icon: 'exclamationmark.triangle', label: 'Segnala Problema', action: () => console.log('Report issue') },
      ],
    },
  ];

  const renderStatItem = (label: string, value: number, gradient: string[], index: number) => (
    <Animated.View
      key={label}
      entering={ZoomIn.delay(index * 100)}
      style={styles.statItem}
    >
      <TouchableOpacity onPress={() => console.log(`View ${label}`)}>
        <GradientCard
          gradient={gradient}
          style={styles.statCard}
        >
          <Text style={styles.statValue}>{value.toLocaleString()}</Text>
          <Text style={styles.statLabel}>{label}</Text>
        </GradientCard>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderSectionItem = (item: any, index: number) => (
    <Animated.View
      key={item.label}
      entering={SlideInRight.delay(index * 50)}
    >
      <TouchableOpacity
        style={styles.sectionItem}
        onPress={item.action}
      >
        <View style={commonStyles.row}>
          <View style={styles.sectionIconContainer}>
            <IconSymbol name={item.icon} size={20} color={colors.primary} />
          </View>
          <Text style={styles.sectionItemText}>{item.label}</Text>
        </View>
        <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
      {index < 2 && <View style={commonStyles.divider} />}
    </Animated.View>
  );

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert('Menu', 'Opzioni aggiuntive')}
      style={styles.headerButton}
    >
      <LinearGradient
        colors={gradients.primary}
        style={styles.headerButtonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <IconSymbol name="line.3.horizontal" color={colors.card} size={20} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Profilo',
            headerRight: renderHeaderRight,
            headerStyle: {
              backgroundColor: colors.card,
            },
            headerTitleStyle: {
              color: colors.text,
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
      )}
      
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <LinearGradient
          colors={[colors.background, colors.surface]}
          style={commonStyles.container}
        >
          <ScrollView
            contentContainerStyle={[
              styles.contentContainer,
              Platform.OS !== 'ios' && styles.contentContainerWithTabBar
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* Enhanced Profile Header */}
            <Animated.View entering={FadeInUp.delay(100)}>
              <GradientCard
                gradient={gradients.sky}
                style={styles.profileHeader}
              >
                <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
                  <View style={styles.avatarContainer}>
                    <LinearGradient
                      colors={gradients.sunset}
                      style={styles.avatar}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <IconSymbol name="person.fill" size={40} color={colors.card} />
                    </LinearGradient>
                    <TouchableOpacity
                      style={styles.editAvatarButton}
                      onPress={() => console.log('Change avatar')}
                    >
                      <LinearGradient
                        colors={gradients.accent}
                        style={styles.editAvatarGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <AnimatedIcon
                          name="camera.fill"
                          size={16}
                          color={colors.card}
                          animation="pulse"
                          duration={2000}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.profileInfo}>
                    <Text style={[textStyles.h2, { color: colors.card }]}>Mario Rossi</Text>
                    <Text style={[textStyles.body, { color: colors.card, opacity: 0.9 }]}>@mario.rossi</Text>
                    <Text style={[textStyles.body, { color: colors.card, marginTop: 8, opacity: 0.9 }]}>
                      Appassionato di tecnologia e innovazione 🚀
                      {'\n'}Milano, Italia 📍
                    </Text>
                  </View>
                </View>

                {/* Enhanced Stats */}
                <View style={styles.statsContainer}>
                  {renderStatItem('Post', stats.posts, gradients.primary, 0)}
                  {renderStatItem('Follower', stats.followers, gradients.secondary, 1)}
                  {renderStatItem('Seguiti', stats.following, gradients.accent, 2)}
                </View>

                {/* Enhanced Action Buttons */}
                <View style={styles.actionButtons}>
                  <GradientButton
                    title="Modifica Profilo"
                    onPress={() => console.log('Edit profile')}
                    gradient={[colors.card, colors.surface]}
                    style={styles.actionButton}
                    textStyle={{ color: colors.text }}
                  />
                  
                  <TouchableOpacity
                    style={styles.shareButton}
                    onPress={() => console.log('Share profile')}
                  >
                    <BlurView intensity={80} tint="light" style={styles.shareButtonBlur}>
                      <IconSymbol name="square.and.arrow.up" size={20} color={colors.card} />
                    </BlurView>
                  </TouchableOpacity>
                </View>
              </GradientCard>
            </Animated.View>

            {/* Enhanced Profile Sections */}
            {profileSections.map((section, sectionIndex) => (
              <Animated.View
                key={section.title}
                entering={FadeInDown.delay((sectionIndex + 1) * 150)}
              >
                <GradientCard
                  variant="solid"
                  gradient={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                  style={styles.sectionCard}
                >
                  <View style={styles.sectionHeader}>
                    <LinearGradient
                      colors={section.gradient}
                      style={styles.sectionTitleGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={[textStyles.h4, { color: colors.card, marginBottom: 0 }]}>
                        {section.title}
                      </Text>
                    </LinearGradient>
                  </View>
                  {section.items.map((item, itemIndex) => renderSectionItem(item, itemIndex))}
                </GradientCard>
              </Animated.View>
            ))}

            {/* Enhanced Logout Button */}
            <Animated.View entering={FadeInDown.delay(800)}>
              <TouchableOpacity
                style={styles.logoutContainer}
                onPress={() => Alert.alert('Logout', 'Sei sicuro di voler uscire?')}
              >
                <GradientCard
                  gradient={gradients.error}
                  style={styles.logoutButton}
                >
                  <AnimatedIcon
                    name="arrow.right.square"
                    size={24}
                    color={colors.card}
                    animation="bounce"
                    duration={2000}
                  />
                  <Text style={[textStyles.body, { color: colors.card, marginLeft: 12, fontWeight: '600' }]}>
                    Esci dall'account
                  </Text>
                </GradientCard>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editAvatarGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.card,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  profileInfo: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    gap: 12,
  },
  statItem: {
    flex: 1,
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.card,
  },
  statLabel: {
    fontSize: 12,
    color: colors.card,
    marginTop: 4,
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  shareButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  shareButtonBlur: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitleGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  sectionItemText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  logoutContainer: {
    marginTop: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headerButton: {
    padding: 4,
  },
  headerButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(99, 102, 241, 0.3)',
    elevation: 4,
  },
});
