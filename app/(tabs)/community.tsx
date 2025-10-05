
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
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
  FadeInLeft,
  SlideInRight,
} from 'react-native-reanimated';

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
  
  // Mock posts data with enhanced content
  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: 'Marco Rossi',
      content: 'Bellissima giornata per una passeggiata! 🌞 Chi si unisce per esplorare il centro storico?',
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
      content: 'Nuovo aggiornamento della nostra app! Ora con crittografia end-to-end migliorata e interfaccia completamente rinnovata 🔒✨',
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
      content: 'Condivido questa foto del tramonto di ieri sera dal Duomo ✨ Milano non smette mai di stupire!',
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
      content: 'Concerto jazz questo weekend al Parco Sempione! 🎵 Musica dal vivo, food truck e tanto divertimento. Chi viene?',
      timestamp: '1 giorno fa',
      likes: 67,
      comments: 23,
      shares: 12,
      isLiked: true,
      type: 'text',
      community: 'Eventi',
    },
  ]);

  const renderPost = (post: Post, index: number) => (
    <Animated.View
      key={post.id}
      entering={FadeInUp.delay(index * 150)}
    >
      <GradientCard
        variant="solid"
        gradient={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
        style={styles.postCard}
      >
        {/* Post Header */}
        <View style={[commonStyles.rowSpaceBetween, { marginBottom: 12 }]}>
          <View style={commonStyles.row}>
            <LinearGradient
              colors={gradients.primary}
              style={styles.authorAvatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol name="person.fill" size={20} color={colors.card} />
            </LinearGradient>
            <View>
              <Text style={styles.authorName}>{post.author}</Text>
              {post.community && (
                <LinearGradient
                  colors={gradients.secondary}
                  style={styles.communityBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.communityName}>in {post.community}</Text>
                </LinearGradient>
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
          <View style={styles.mediaContainer}>
            <Image source={{ uri: post.mediaUrl }} style={styles.postImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.3)']}
              style={styles.imageOverlay}
            />
          </View>
        )}

        {/* Post Actions */}
        <View style={[commonStyles.rowSpaceBetween, { marginTop: 16 }]}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Like post')}
          >
            <LinearGradient
              colors={post.isLiked ? gradients.accent : ['transparent', 'transparent']}
              style={[styles.actionButtonGradient, !post.isLiked && styles.actionButtonOutline]}
            >
              <AnimatedIcon
                name={post.isLiked ? 'heart.fill' : 'heart'}
                size={18}
                color={post.isLiked ? colors.card : colors.textSecondary}
                animation={post.isLiked ? 'pulse' : 'none'}
                duration={1500}
              />
              <Text style={[styles.actionText, post.isLiked && { color: colors.card }]}>
                {post.likes}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Comment on post')}
          >
            <View style={[styles.actionButtonGradient, styles.actionButtonOutline]}>
              <IconSymbol name="message" size={18} color={colors.textSecondary} />
              <Text style={styles.actionText}>{post.comments}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Share post')}
          >
            <View style={[styles.actionButtonGradient, styles.actionButtonOutline]}>
              <IconSymbol name="square.and.arrow.up" size={18} color={colors.textSecondary} />
              <Text style={styles.actionText}>{post.shares}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </GradientCard>
    </Animated.View>
  );

  const renderTabButton = (tab: 'feed' | 'communities' | 'events', label: string, icon: string) => (
    <TouchableOpacity
      style={[styles.tabButton]}
      onPress={() => setActiveTab(tab)}
    >
      {activeTab === tab ? (
        <LinearGradient
          colors={gradients.primary}
          style={styles.activeTabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <IconSymbol name={icon as any} size={20} color={colors.card} />
          <Text style={[styles.tabText, styles.activeTabText]}>
            {label}
          </Text>
        </LinearGradient>
      ) : (
        <View style={styles.inactiveTab}>
          <IconSymbol name={icon as any} size={20} color={colors.textSecondary} />
          <Text style={styles.tabText}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => console.log('Create post')}
      style={styles.headerButton}
    >
      <LinearGradient
        colors={gradients.accent}
        style={styles.headerButtonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <AnimatedIcon
          name="plus.circle"
          color={colors.card}
          size={20}
          animation="rotate"
          duration={2000}
        />
      </LinearGradient>
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
          {/* Enhanced Tab Navigation */}
          <Animated.View 
            style={styles.tabContainer}
            entering={FadeInDown.delay(100)}
          >
            <BlurView intensity={80} tint="light" style={styles.tabBlur}>
              {renderTabButton('feed', 'Feed', 'house')}
              {renderTabButton('communities', 'Community', 'person.3')}
              {renderTabButton('events', 'Eventi', 'calendar')}
            </BlurView>
          </Animated.View>

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
                {/* Enhanced Create Post Prompt */}
                <Animated.View entering={FadeInDown.delay(200)}>
                  <TouchableOpacity
                    style={styles.createPostContainer}
                    onPress={() => console.log('Create post')}
                  >
                    <GradientCard
                      gradient={gradients.sky}
                      style={styles.createPostCard}
                    >
                      <View style={commonStyles.row}>
                        <LinearGradient
                          colors={gradients.accent}
                          style={styles.authorAvatar}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        >
                          <IconSymbol name="person.fill" size={20} color={colors.card} />
                        </LinearGradient>
                        <Text style={styles.createPostText}>
                          Cosa stai pensando? ✨
                        </Text>
                        <AnimatedIcon
                          name="sparkles"
                          size={20}
                          color={colors.card}
                          animation="pulse"
                          duration={2000}
                        />
                      </View>
                    </GradientCard>
                  </TouchableOpacity>
                </Animated.View>

                {/* Posts */}
                {posts.map((post, index) => renderPost(post, index))}
              </>
            )}

            {activeTab === 'communities' && (
              <Animated.View 
                style={[commonStyles.center, { paddingVertical: 40 }]}
                entering={SlideInRight.delay(300)}
              >
                <GradientCard
                  gradient={gradients.forest}
                  style={styles.emptyStateCard}
                >
                  <AnimatedIcon
                    name="person.3"
                    size={48}
                    color={colors.card}
                    animation="bounce"
                    duration={2000}
                  />
                  <Text style={[textStyles.h3, { color: colors.card, marginTop: 16, textAlign: 'center' }]}>
                    Community
                  </Text>
                  <Text style={[textStyles.body, { color: colors.card, textAlign: 'center', marginTop: 8, opacity: 0.9 }]}>
                    Unisciti a community tematiche per condividere interessi comuni
                  </Text>
                  <GradientButton
                    title="Esplora Community"
                    onPress={() => console.log('Explore communities')}
                    gradient={[colors.card, colors.surface]}
                    style={{ marginTop: 20 }}
                    textStyle={{ color: colors.text }}
                  />
                </GradientCard>
              </Animated.View>
            )}

            {activeTab === 'events' && (
              <Animated.View 
                style={[commonStyles.center, { paddingVertical: 40 }]}
                entering={SlideInRight.delay(300)}
              >
                <GradientCard
                  gradient={gradients.sunset}
                  style={styles.emptyStateCard}
                >
                  <AnimatedIcon
                    name="calendar"
                    size={48}
                    color={colors.card}
                    animation="pulse"
                    duration={2000}
                  />
                  <Text style={[textStyles.h3, { color: colors.card, marginTop: 16, textAlign: 'center' }]}>
                    Eventi
                  </Text>
                  <Text style={[textStyles.body, { color: colors.card, textAlign: 'center', marginTop: 8, opacity: 0.9 }]}>
                    Scopri eventi nella tua zona e crea i tuoi
                  </Text>
                  <GradientButton
                    title="Crea Evento"
                    onPress={() => console.log('Create event')}
                    gradient={[colors.card, colors.surface]}
                    style={{ marginTop: 20 }}
                    textStyle={{ color: colors.text }}
                  />
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
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabBlur: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
  },
  activeTabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.card,
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
  createPostContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  createPostCard: {
    marginBottom: 0,
  },
  createPostText: {
    flex: 1,
    fontSize: 16,
    color: colors.card,
    marginLeft: 12,
    fontWeight: '500',
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  communityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  communityName: {
    fontSize: 11,
    color: colors.card,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  mediaContainer: {
    position: 'relative',
    marginTop: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  actionButtonOutline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  actionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
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
    boxShadow: '0px 2px 8px rgba(236, 72, 153, 0.3)',
    elevation: 4,
  },
  emptyStateCard: {
    alignItems: 'center',
    paddingVertical: 40,
    marginHorizontal: 32,
  },
});
