import React, { useState, useEffect } from "react";
import { getCurrentUser, setCurrentUser } from "../utils/auth";
import { User } from "../types/auth";
import { Post as PostType } from "../types/post";
import { getPosts, createPost, initializeDemoPosts } from "../utils/posts";
import AuthModal from "../components/AuthModal";
import RichTextEditor from "../components/RichTextEditor";
import Post from "../components/Post";
import {
  FeedContainer,
  FeedHeader,
  UserInfo,
  LogoutButton,
  FeedMain,
  AuthenticatedContent,
  UnauthenticatedContent,
} from "../styles/FeedStyles";

const Feed: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Initialize demo posts
    initializeDemoPosts();
    setPosts(getPosts());
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleCreatePost = (content: string, emoji: string) => {
    if (user) {
      const newPost = createPost({ content, emoji }, user);
      setPosts([newPost, ...posts]);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <FeedContainer>
      <FeedHeader>
        <h1>Welcome to Atlys</h1>
        <UserInfo>
          {user ? (
            <>
              <span>Hello, {user.email || user.username}!</span>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <LogoutButton onClick={() => setShowAuthModal(true)}>
              Login / Sign Up
            </LogoutButton>
          )}
        </UserInfo>
      </FeedHeader>

      <FeedMain>
        <AuthenticatedContent>
          <RichTextEditor onPost={handleCreatePost} />
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
              onLike={() => {
                if (!user) setShowAuthModal(true);
              }}
              onComment={() => {
                if (!user) setShowAuthModal(true);
              }}
              onShare={() => {
                if (!user) setShowAuthModal(true);
              }}
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
