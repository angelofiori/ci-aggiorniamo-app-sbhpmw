
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
import { IconSymbol } from '@/components/IconSymbol';
import { colors, textStyles, commonStyles } from '@/styles/commonStyles';
import { Stack } from 'expo-router';

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
      items: [
        { icon: 'person.circle', label: 'Modifica Profilo', action: () => console.log('Edit profile') },
        { icon: 'key', label: 'Privacy e Sicurezza', action: () => console.log('Privacy settings') },
        { icon: 'bell', label: 'Notifiche', action: () => console.log('Notification settings') },
      ],
    },
    {
      title: 'Contenuti',
      items: [
        { icon: 'photo', label: 'Storie Archiviate', action: () => console.log('Archived stories') },
        { icon: 'bookmark', label: 'Salvati', action: () => console.log('Saved posts') },
        { icon: 'clock', label: 'Attività', action: () => console.log('Activity') },
      ],
    },
    {
      title: 'Business',
      items: [
        { icon: 'briefcase', label: 'Account Business', action: () => console.log('Business account') },
        { icon: 'chart.bar', label: 'Statistiche', action: () => console.log('Analytics') },
        { icon: 'megaphone', label: 'Promuovi', action: () => console.log('Promote') },
      ],
    },
    {
      title: 'Supporto',
      items: [
        { icon: 'questionmark.circle', label: 'Aiuto', action: () => console.log('Help') },
        { icon: 'info.circle', label: 'Informazioni', action: () => console.log('About') },
        { icon: 'exclamationmark.triangle', label: 'Segnala Problema', action: () => console.log('Report issue') },
      ],
    },
  ];

  const renderStatItem = (label: string, value: number) => (
    <TouchableOpacity style={styles.statItem} onPress={() => console.log(`View ${label}`)}>
      <Text style={styles.statValue}>{value.toLocaleString()}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderSectionItem = (item: any) => (
    <TouchableOpacity
      key={item.label}
      style={styles.sectionItem}
      onPress={item.action}
    >
      <View style={commonStyles.row}>
        <IconSymbol name={item.icon} size={24} color={colors.textSecondary} />
        <Text style={styles.sectionItemText}>{item.label}</Text>
      </View>
      <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => Alert.alert('Menu', 'Opzioni aggiuntive')}
      style={styles.headerButton}
    >
      <IconSymbol name="line.3.horizontal" color={colors.primary} size={24} />
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
            },
          }}
        />
      )}
      
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <ScrollView
          style={commonStyles.container}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={[commonStyles.card, styles.profileHeader]}>
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="person.fill" size={40} color={colors.card} />
                </View>
                <TouchableOpacity
                  style={styles.editAvatarButton}
                  onPress={() => console.log('Change avatar')}
                >
                  <IconSymbol name="camera.fill" size={16} color={colors.card} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={textStyles.h2}>Mario Rossi</Text>
                <Text style={textStyles.bodySecondary}>@mario.rossi</Text>
                <Text style={[textStyles.body, { marginTop: 8 }]}>
                  Appassionato di tecnologia e innovazione 🚀
                  {'\n'}Milano, Italia 📍
                </Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              {renderStatItem('Post', stats.posts)}
              {renderStatItem('Follower', stats.followers)}
              {renderStatItem('Seguiti', stats.following)}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={() => console.log('Edit profile')}
              >
                <Text style={[textStyles.button, { color: colors.card }]}>
                  Modifica Profilo
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.outlineButton]}
                onPress={() => console.log('Share profile')}
              >
                <IconSymbol name="square.and.arrow.up" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Sections */}
          {profileSections.map((section, index) => (
            <View key={section.title} style={commonStyles.card}>
              <Text style={[textStyles.h3, { marginBottom: 16 }]}>
                {section.title}
              </Text>
              {section.items.map((item, itemIndex) => (
                <View key={item.label}>
                  {renderSectionItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={commonStyles.divider} />
                  )}
                </View>
              ))}
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={[commonStyles.card, styles.logoutButton]}
            onPress={() => Alert.alert('Logout', 'Sei sicuro di voler uscire?')}
          >
            <IconSymbol name="arrow.right.square" size={24} color={colors.error} />
            <Text style={[textStyles.body, { color: colors.error, marginLeft: 12 }]}>
              Esci
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.accent,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  profileInfo: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 0,
    paddingHorizontal: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  sectionItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  headerButton: {
    padding: 8,
  },
});
