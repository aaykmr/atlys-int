import React, { useEffect } from "react";
import {
  Post as PostContainer,
  PostHeader,
  UserAvatar,
  UserInfoPost,
  UserName,
  PostTime,
  PostContent,
  PostEmoji,
  PostText,
  PostActions,
  PostActionButton,
} from "../styles/FeedStyles";

interface PostProps {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  emoji: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const Post: React.FC<PostProps> = ({
  user,
  content,
  emoji,
  timestamp,
  likes,
  comments,
  shares,
  onLike,
  onComment,
  onShare,
}) => {
  // Debug log to see what content is being rendered
  useEffect(() => {
    console.log("Post content:", content);
  }, [content]);
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PostContainer>
      <PostHeader>
        <UserAvatar>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            getInitials(user.name)
          )}
        </UserAvatar>
        <UserInfoPost>
          <UserName>{user.name}</UserName>
          <PostTime>{timestamp}</PostTime>
        </UserInfoPost>
      </PostHeader>

      <PostContent>
        <PostEmoji>{emoji}</PostEmoji>
        <PostText dangerouslySetInnerHTML={{ __html: content }} />
      </PostContent>

      <PostActions>
        <PostActionButton onClick={onLike}>
          <span>❤️</span>
          <span>{likes}</span>
        </PostActionButton>
        <PostActionButton onClick={onComment}>
          <span>💬</span>
          <span>{comments}</span>
        </PostActionButton>
        <PostActionButton onClick={onShare}>
          <span>📤</span>
          <span>{shares}</span>
        </PostActionButton>
      </PostActions>
    </PostContainer>
  );
};

export default Post;
