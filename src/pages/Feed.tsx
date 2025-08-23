import React, { useState, useEffect, useRef } from "react";
import { getCurrentUser, setCurrentUser } from "../utils/auth";
import { User } from "../types/auth";
import { Post as PostType } from "../types/post";
import { getPosts, createPost, initializeDemoPosts } from "../utils/posts";
import AuthModal from "../components/AuthModal";
import RichTextEditor, {
  RichTextEditorRef,
} from "../components/RichTextEditor";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import {
  FeedContainer,
  FeedMain,
  AuthenticatedContent,
} from "../styles/FeedStyles";

const Feed: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPostId, setNewPostId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh trigger
  const richTextEditorRef = useRef<RichTextEditorRef>(null);
  const location = useLocation(); // Add location hook

  // Function to refresh the feed
  const refreshFeed = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Initialize demo posts
    initializeDemoPosts();
    setPosts(getPosts());
  }, [refreshKey]); // Add refreshKey as dependency

  // Listen for navigation changes to refresh feed when returning from auth pages
  useEffect(() => {
    if (location.pathname === "/") {
      const currentUser = getCurrentUser();
      if (currentUser !== user) {
        setUser(currentUser);
        refreshFeed();
      }
    }
  }, [location.pathname, user]);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    setShowAuthModal(true);
    refreshFeed(); // Refresh feed on logout
  };

  const handleAuthSuccess = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    refreshFeed(); // Refresh feed on successful login
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleCreatePost = (
    content: string,
    emoji: string,
    attachments: string[],
    voiceRecording: string,
    cameraImage: string
  ) => {
    if (user) {
      const newPost = createPost(
        { content, emoji, attachments, voiceRecording, cameraImage },
        user
      );
      setNewPostId(newPost.id);

      // Add the post to the array immediately
      setPosts([newPost, ...posts]);

      // Clear the animation state after animation completes
      setTimeout(() => {
        setNewPostId(null);
      }, 2500);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleShare = (post: PostType) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Format the shared content with original poster's name
    const sharedContent = `<strong>Shared from ${post.user.name}:</strong><br>${post.content}`;

    // Set the content in the rich text editor
    if (richTextEditorRef.current && richTextEditorRef.current.setContent) {
      richTextEditorRef.current.setContent(sharedContent);
    }
  };

  // Handler for post interactions that need refresh
  const handlePostInteraction = () => {
    refreshFeed(); // Refresh feed after post interactions
  };

  return (
    <FeedContainer>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowAuthModal(true)}
      />

      <FeedMain>
        <AuthenticatedContent>
          <RichTextEditor ref={richTextEditorRef} onPost={handleCreatePost} />
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              content={post.content}
              emoji={post.emoji}
              timestamp={post.timestamp}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              isNew={post.id === newPostId}
              attachments={post.attachments}
              voiceRecording={post.voiceRecording}
              cameraImage={post.cameraImage}
              onLike={() => {
                if (!user) {
                  setShowAuthModal(true);
                } else {
                  handlePostInteraction(); // Refresh after like
                }
              }}
              onComment={() => {
                if (!user) {
                  setShowAuthModal(true);
                } else {
                  handlePostInteraction(); // Refresh after comment
                }
              }}
              onShare={() => handleShare(post)}
              onCommentAdded={handlePostInteraction} // Refresh after comment is added
            />
          ))}
        </AuthenticatedContent>
      </FeedMain>

      <AuthModal
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
    </FeedContainer>
  );
};

export default Feed;
