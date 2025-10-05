
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
import { IconSymbol } from '@/components/IconSymbol';
import { colors, textStyles, commonStyles } from '@/styles/commonStyles';
import { Stack } from 'expo-router';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  avatar?: string;
}

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock chat data
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Marco Rossi',
      lastMessage: 'Ciao! Come stai?',
      timestamp: '14:30',
      unreadCount: 2,
      isGroup: false,
    },
    {
      id: '2',
      name: 'Gruppo Famiglia',
      lastMessage: 'Anna: Ci vediamo stasera?',
      timestamp: '13:45',
      unreadCount: 5,
      isGroup: true,
    },
    {
      id: '3',
      name: 'Lavoro Team',
      lastMessage: 'Luca: Il progetto è pronto',
      timestamp: '12:20',
      unreadCount: 0,
      isGroup: true,
    },
    {
      id: '4',
      name: 'Sofia Bianchi',
      lastMessage: 'Perfetto, grazie!',
      timestamp: '11:15',
      unreadCount: 0,
      isGroup: false,
    },
    {
      id: '5',
      name: 'Community Tech',
      lastMessage: 'Bot: Nuovo aggiornamento disponibile',
      timestamp: 'Ieri',
      unreadCount: 1,
      isGroup: true,
    },
  ]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = (chat: Chat) => (
    <TouchableOpacity
      key={chat.id}
      style={styles.chatItem}
      onPress={() => console.log('Open chat:', chat.name)}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: chat.isGroup ? colors.secondary : colors.primary }]}>
          <IconSymbol
            name={chat.isGroup ? 'person.3.fill' : 'person.fill'}
            size={24}
            color={colors.card}
          />
        </View>
        {chat.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.chatContent}>
        <View style={[commonStyles.row, commonStyles.spaceBetween]}>
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
  );

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => console.log('New chat')}
      style={styles.headerButton}
    >
      <IconSymbol name="plus.message" color={colors.primary} size={24} />
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
            },
          }}
        />
      )}
      
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.container}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
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
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={() => console.log('Stories')}>
              <View style={[styles.quickActionIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="camera.fill" size={20} color={colors.card} />
              </View>
              <Text style={styles.quickActionText}>Storie</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction} onPress={() => console.log('Groups')}>
              <View style={[styles.quickActionIcon, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="person.3.fill" size={20} color={colors.card} />
              </View>
              <Text style={styles.quickActionText}>Gruppi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction} onPress={() => console.log('Bots')}>
              <View style={[styles.quickActionIcon, { backgroundColor: colors.highlight }]}>
                <IconSymbol name="robot.fill" size={20} color={colors.card} />
              </View>
              <Text style={styles.quickActionText}>Bot</Text>
            </TouchableOpacity>
          </View>

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
              filteredChats.map(renderChatItem)
            ) : (
              <View style={[commonStyles.center, { paddingVertical: 40 }]}>
                <IconSymbol name="message" size={48} color={colors.textSecondary} />
                <Text style={[textStyles.bodySecondary, { marginTop: 16, textAlign: 'center' }]}>
                  {searchQuery ? 'Nessuna chat trovata' : 'Nessuna chat ancora'}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 24,
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
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
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
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
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
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
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  headerButton: {
    padding: 8,
  },
});
