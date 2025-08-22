import React, { useEffect, useState } from "react";
import { Comment } from "../types/post";
import {
  getComments,
  createComment,
  toggleLike,
  hasUserLiked,
} from "../utils/posts";
import { getCurrentUser } from "../utils/auth";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import IosShareIcon from "@mui/icons-material/IosShare";

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
  CommentSection,
  CommentInput,
  CommentList,
  CommentItem,
  CommentContent,
  CommentUser,
  CommentText,
  CommentTime,
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
  isNew?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const Post: React.FC<PostProps> = ({
  id,
  user,
  content,
  emoji,
  timestamp,
  likes,
  comments,
  shares,
  isNew = false,
  onLike,
  onComment,
  onShare,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  // Debug log to see what content is being rendered
  useEffect(() => {
    console.log("Post content:", content);
  }, [content]);

  // Load comments when comment section is opened
  useEffect(() => {
    if (showComments) {
      setCommentList(getComments(id));
    }
  }, [showComments, id]);

  // Check if current user has liked the post
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setIsLiked(hasUserLiked(id, currentUser));
    }
  }, [id]);

  const handleLikeClick = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      if (onLike) onLike();
      return;
    }

    try {
      const result = toggleLike(id, currentUser);
      setIsLiked(result.liked);
      setLikeCount(result.likes);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentClick = () => {
    if (onComment) {
      onComment();
    }
    setShowComments(!showComments);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
      if (onComment) onComment();
      return;
    }

    try {
      const comment = createComment(id, newComment.trim(), currentUser);
      setCommentList([...commentList, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PostContainer isNew={isNew}>
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
        <PostActionButton
          onClick={handleLikeClick}
          style={{
            color: isLiked ? "#e74c3c" : "#666",
            fontWeight: isLiked ? "bold" : "normal",
          }}
        >
          <span>{isLiked ? "❤️" : "🤍"}</span>
          <span>{likeCount}</span>
        </PostActionButton>
        <PostActionButton onClick={handleCommentClick}>
          <span>💬</span>
          <span>{comments}</span>
        </PostActionButton>
        <PostActionButton onClick={onShare}>
          <span>📤</span>
          <span>{shares}</span>
        </PostActionButton>
      </PostActions>

      {showComments && (
        <CommentSection>
          <CommentInput>
            <UserAvatar>
              {getCurrentUser()?.username?.charAt(0).toUpperCase() || "U"}
            </UserAvatar>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                style={{
                  width: "100%",
                  minHeight: "60px",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  resize: "vertical",
                  fontFamily: "inherit",
                  fontSize: "0.9rem",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setShowComments(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "4px",
                    background: "#007bff",
                    color: "white",
                    cursor: newComment.trim() ? "pointer" : "not-allowed",
                    opacity: newComment.trim() ? 1 : 0.6,
                  }}
                >
                  Comment
                </button>
              </div>
            </div>
          </CommentInput>

          <CommentList>
            {commentList.map((comment) => (
              <CommentItem key={comment.id}>
                <UserAvatar>
                  {comment.user.avatar ? (
                    <img src={comment.user.avatar} alt={comment.user.name} />
                  ) : (
                    getInitials(comment.user.name)
                  )}
                </UserAvatar>
                <CommentContent>
                  <CommentUser>{comment.user.name}</CommentUser>
                  <CommentText>{comment.content}</CommentText>
                  <CommentTime>{comment.timestamp}</CommentTime>
                </CommentContent>
              </CommentItem>
            ))}
          </CommentList>
        </CommentSection>
      )}
    </PostContainer>
  );
};

export default Post;
