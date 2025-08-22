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
import {
  FeedContainer,
  FeedMain,
  AuthenticatedContent,
  UnauthenticatedContent,
} from "../styles/FeedStyles";

const Feed: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPostId, setNewPostId] = useState<string | null>(null);
  const [pendingNewPost, setPendingNewPost] = useState<PostType | null>(null);
  const richTextEditorRef = useRef<RichTextEditorRef>(null);

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
      setPendingNewPost(newPost);
      setNewPostId(newPost.id);

      // Add the post to the array immediately
      setPosts([newPost, ...posts]);

      // Clear the animation state after animation completes
      setTimeout(() => {
        setNewPostId(null);
        setPendingNewPost(null);
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
              onLike={() => {
                if (!user) setShowAuthModal(true);
              }}
              onComment={() => {
                if (!user) setShowAuthModal(true);
              }}
              onShare={() => handleShare(post)}
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
