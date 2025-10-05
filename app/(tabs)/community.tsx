
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, textStyles, commonStyles } from '@/styles/commonStyles';
import { Stack } from 'expo-router';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  community?: string;
}

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'feed' | 'communities' | 'events'>('feed');
  
  // Mock posts data
  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: 'Marco Rossi',
      content: 'Bellissima giornata per una passeggiata! 🌞 Chi si unisce?',
      timestamp: '2 ore fa',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      type: 'text',
    },
    {
      id: '2',
      author: 'Tech Community',
      content: 'Nuovo aggiornamento della nostra app! Ora con crittografia end-to-end migliorata 🔒',
      timestamp: '4 ore fa',
      likes: 156,
      comments: 42,
      shares: 28,
      isLiked: true,
      type: 'text',
      community: 'Tech',
    },
    {
      id: '3',
      author: 'Sofia Bianchi',
      content: 'Condivido questa foto del tramonto di ieri sera ✨',
      timestamp: '6 ore fa',
      likes: 89,
      comments: 15,
      shares: 7,
      isLiked: false,
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      author: 'Eventi Milano',
      content: 'Concerto jazz questo weekend al Parco Sempione! 🎵 Chi viene?',
      timestamp: '1 giorno fa',
      likes: 67,
      comments: 23,
      shares: 12,
      isLiked: true,
      type: 'text',
      community: 'Eventi',
    },
  ]);

  const renderPost = (post: Post) => (
    <View key={post.id} style={[commonStyles.card, styles.postCard]}>
      {/* Post Header */}
      <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 12 }]}>
        <View style={commonStyles.row}>
          <View style={[styles.authorAvatar, { backgroundColor: colors.primary }]}>
            <IconSymbol name="person.fill" size={20} color={colors.card} />
          </View>
          <View>
            <Text style={styles.authorName}>{post.author}</Text>
            {post.community && (
              <Text style={styles.communityName}>in {post.community}</Text>
            )}
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => console.log('Post options')}>
          <IconSymbol name="ellipsis" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{post.content}</Text>

      {/* Media */}
      {post.type === 'image' && post.mediaUrl && (
        <Image source={{ uri: post.mediaUrl }} style={styles.postImage} />
      )}

      {/* Post Actions */}
      <View style={[commonStyles.row, commonStyles.spaceBetween, { marginTop: 16 }]}>
        <TouchableOpacity
          style={commonStyles.row}
          onPress={() => console.log('Like post')}
        >
          <IconSymbol
            name={post.isLiked ? 'heart.fill' : 'heart'}
            size={20}
            color={post.isLiked ? colors.accent : colors.textSecondary}
          />
          <Text style={[styles.actionText, post.isLiked && { color: colors.accent }]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={commonStyles.row}
          onPress={() => console.log('Comment on post')}
        >
          <IconSymbol name="message" size={20} color={colors.textSecondary} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={commonStyles.row}
          onPress={() => console.log('Share post')}
        >
          <IconSymbol name="square.and.arrow.up" size={20} color={colors.textSecondary} />
          <Text style={styles.actionText}>{post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabButton = (tab: 'feed' | 'communities' | 'events', label: string, icon: string) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      <IconSymbol
        name={icon as any}
        size={20}
        color={activeTab === tab ? colors.primary : colors.textSecondary}
      />
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => console.log('Create post')}
      style={styles.headerButton}
    >
      <IconSymbol name="plus.circle" color={colors.primary} size={24} />
    </TouchableOpacity>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Community',
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
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {renderTabButton('feed', 'Feed', 'house')}
            {renderTabButton('communities', 'Community', 'person.3')}
            {renderTabButton('events', 'Eventi', 'calendar')}
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={[
              styles.contentContainer,
              Platform.OS !== 'ios' && styles.contentContainerWithTabBar
            ]}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === 'feed' && (
              <>
                {/* Create Post Prompt */}
                <TouchableOpacity
                  style={[commonStyles.card, styles.createPostCard]}
                  onPress={() => console.log('Create post')}
                >
                  <View style={commonStyles.row}>
                    <View style={[styles.authorAvatar, { backgroundColor: colors.secondary }]}>
                      <IconSymbol name="person.fill" size={20} color={colors.card} />
                    </View>
                    <Text style={styles.createPostText}>
                      Cosa stai pensando?
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Posts */}
                {posts.map(renderPost)}
              </>
            )}

            {activeTab === 'communities' && (
              <View style={[commonStyles.center, { paddingVertical: 40 }]}>
                <IconSymbol name="person.3" size={48} color={colors.textSecondary} />
                <Text style={[textStyles.h3, { marginTop: 16, textAlign: 'center' }]}>
                  Community
                </Text>
                <Text style={[textStyles.bodySecondary, { textAlign: 'center', marginTop: 8 }]}>
                  Unisciti a community tematiche per condividere interessi comuni
                </Text>
              </View>
            )}

            {activeTab === 'events' && (
              <View style={[commonStyles.center, { paddingVertical: 40 }]}>
                <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
                <Text style={[textStyles.h3, { marginTop: 16, textAlign: 'center' }]}>
                  Eventi
                </Text>
                <Text style={[textStyles.bodySecondary, { textAlign: 'center', marginTop: 8 }]}>
                  Scopri eventi nella tua zona e crea i tuoi
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  createPostCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  createPostText: {
    flex: 1,
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  postCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  communityName: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postContent: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  headerButton: {
    padding: 8,
  },
});
