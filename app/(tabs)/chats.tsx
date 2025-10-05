
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
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
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeInDown,
  FadeInRight,
} from 'react-native-reanimated';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  avatar?: string;
  isOnline?: boolean;
}

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock chat data with enhanced properties
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Marco Rossi',
      lastMessage: 'Ciao! Come stai? 😊',
      timestamp: '14:30',
      unreadCount: 2,
      isGroup: false,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Gruppo Famiglia',
      lastMessage: 'Anna: Ci vediamo stasera? 🍕',
      timestamp: '13:45',
      unreadCount: 5,
      isGroup: true,
      isOnline: false,
    },
    {
      id: '3',
      name: 'Lavoro Team',
      lastMessage: 'Luca: Il progetto è pronto ✅',
      timestamp: '12:20',
      unreadCount: 0,
      isGroup: true,
      isOnline: true,
    },
    {
      id: '4',
      name: 'Sofia Bianchi',
      lastMessage: 'Perfetto, grazie! 💯',
      timestamp: '11:15',
      unreadCount: 0,
      isGroup: false,
      isOnline: true,
    },
    {
      id: '5',
      name: 'Community Tech',
      lastMessage: 'Bot: Nuovo aggiornamento disponibile 🚀',
      timestamp: 'Ieri',
      unreadCount: 1,
      isGroup: true,
      isOnline: false,
    },
  ]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = (chat: Chat, index: number) => (
    <Animated.View
      key={chat.id}
      entering={FadeInRight.delay(index * 100)}
    >
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => console.log('Open chat:', chat.name)}
      >
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={chat.isGroup ? gradients.secondary : gradients.primary}
            style={styles.avatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <IconSymbol
              name={chat.isGroup ? 'person.3.fill' : 'person.fill'}
              size={24}
              color={colors.card}
            />
          </LinearGradient>
          
          {/* Online indicator */}
          {chat.isOnline && (
            <View style={styles.onlineIndicator}>
              <AnimatedIcon
                name="circle.fill"
                size={12}
                color={colors.success}
                animation="pulse"
                duration={2000}
              />
            </View>
          )}
          
          {/* Unread badge */}
          {chat.unreadCount > 0 && (
            <LinearGradient
              colors={gradients.accent}
              style={styles.unreadBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.unreadText}>
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </Text>
            </LinearGradient>
          )}
        </View>
        
        <View style={styles.chatContent}>
          <View style={[commonStyles.rowSpaceBetween]}>
            <Text style={styles.chatName} numberOfLines={1}>
              {chat.name}
            </Text>
            <Text style={styles.timestamp}>{chat.timestamp}</Text>
          </View>
          <Text style={styles.lastMessage} numberOfLines={2}>
            {chat.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => console.log('New chat')}
      style={styles.headerButton}
    >
      <LinearGradient
        colors={gradients.primary}
        style={styles.headerButtonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <IconSymbol name="plus.message" color={colors.card} size={20} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Ci aggiorniamo!',
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
          {/* Enhanced Search Bar */}
          <Animated.View 
            style={styles.searchContainer}
            entering={FadeInDown.delay(100)}
          >
            <BlurView intensity={80} tint="light" style={styles.searchBar}>
              <AnimatedIcon
                name="magnifyingglass"
                size={20}
                color={colors.textSecondary}
                animation="pulse"
                duration={3000}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Cerca chat..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </BlurView>
          </Animated.View>

          {/* Enhanced Quick Actions */}
          <Animated.View 
            style={styles.quickActions}
            entering={FadeInDown.delay(200)}
          >
            <TouchableOpacity style={styles.quickAction} onPress={() => console.log('Stories')}>
              <LinearGradient
                colors={gradients.accent}
                style={styles.quickActionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <AnimatedIcon
                  name="camera.fill"
                  size={20}
                  color={colors.card}
                  animation="bounce"
                  duration={2000}
                />
              </LinearGradient>
              <Text style={styles.quickActionText}>Storie</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction} onPress={() => console.log('Groups')}>
              <LinearGradient
                colors={gradients.secondary}
                style={styles.quickActionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol name="person.3.fill" size={20} color={colors.card} />
              </LinearGradient>
              <Text style={styles.quickActionText}>Gruppi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction} onPress={() => console.log('Bots')}>
              <LinearGradient
                colors={gradients.purple}
                style={styles.quickActionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <AnimatedIcon
                  name="robot.fill"
                  size={20}
                  color={colors.card}
                  animation="rotate"
                  duration={3000}
                />
              </LinearGradient>
              <Text style={styles.quickActionText}>Bot</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Chat List */}
          <ScrollView
            style={styles.chatList}
            contentContainerStyle={[
              styles.chatListContent,
              Platform.OS !== 'ios' && styles.chatListContentWithTabBar
            ]}
            showsVerticalScrollIndicator={false}
          >
            {filteredChats.length > 0 ? (
              filteredChats.map((chat, index) => renderChatItem(chat, index))
            ) : (
              <Animated.View 
                style={[commonStyles.center, { paddingVertical: 40 }]}
                entering={FadeInDown.delay(300)}
              >
                <GradientCard
                  gradient={gradients.sky}
                  variant="glass"
                  style={styles.emptyStateCard}
                >
                  <AnimatedIcon
                    name="message"
                    size={48}
                    color={colors.card}
                    animation="bounce"
                    duration={2000}
                  />
                  <Text style={[textStyles.h3, { color: colors.card, marginTop: 16, textAlign: 'center' }]}>
                    {searchQuery ? 'Nessuna chat trovata' : 'Inizia a chattare!'}
                  </Text>
                  <Text style={[textStyles.body, { color: colors.card, textAlign: 'center', marginTop: 8, opacity: 0.8 }]}>
                    {searchQuery ? 'Prova con un altro termine' : 'Tocca + per iniziare una nuova conversazione'}
                  </Text>
                </GradientCard>
              </Animated.View>
            )}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 24,
    justifyContent: 'center',
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
  quickActionText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingVertical: 8,
  },
  chatListContentWithTabBar: {
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    gap: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 2,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    boxShadow: '0px 2px 8px rgba(236, 72, 153, 0.3)',
    elevation: 4,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.card,
  },
  chatContent: {
    flex: 1,
    gap: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
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
  emptyStateCard: {
    alignItems: 'center',
    paddingVertical: 40,
    marginHorizontal: 32,
  },
});
