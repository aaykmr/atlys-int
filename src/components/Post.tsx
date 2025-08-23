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
  PostInfo,
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
  attachments?: string[];
  voiceRecording?: string;
  cameraImage?: string;
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
  attachments = [],
  voiceRecording = "",
  cameraImage = "",
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
      const previousCount = likeCount;

      setIsLiked(result.liked);
      setLikeCount(result.likes);

      // Add animation class to the count number
      const countElement = document.querySelector(
        `[data-post-id="${id}"] .count-number`
      ) as HTMLElement;
      if (countElement) {
        const animationClass =
          result.likes > previousCount ? "countUp" : "countDown";
        countElement.style.animation = `${animationClass} 0.3s ease-in-out`;

        // Remove animation completes
        setTimeout(() => {
          if (countElement) {
            countElement.style.animation = "";
          }
        }, 300);
      }
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

  const handleDownloadAttachment = (attachment: string, index: number) => {
    if (attachment.startsWith("blob:")) {
      // For blob URLs (images), create a download link
      const link = document.createElement("a");
      link.href = attachment;
      link.download = `attachment-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For file names, try to find the actual file or show a message
      alert(
        `File: ${attachment}\n\nNote: This file was uploaded in a previous session and may not be available for download.`
      );
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
    <PostContainer isNew={isNew} data-post-id={id}>
      <PostInfo>
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

          {/* Display attachments */}
          {attachments && attachments.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                📎 Attachments ({attachments.length})
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "0.5rem",
                      background: "#f8f9fa",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      border: "1px solid #e9ecef",
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e9ecef";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8f9fa";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    onClick={() => handleDownloadAttachment(attachment, index)}
                    title="Click to download"
                  >
                    {attachment.startsWith("blob:") ? (
                      <div style={{ position: "relative" }}>
                        <img
                          src={attachment}
                          alt="Attachment"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            borderRadius: "4px",
                            display: "block",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "rgba(0,0,0,0.7)",
                            color: "white",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            opacity: 0,
                            transition: "opacity 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "0")
                          }
                        >
                          Download
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span>📄</span>
                        <span>{attachment}</span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "#007bff",
                            fontWeight: "bold",
                          }}
                        >
                          ↓
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display voice recording */}
          {voiceRecording && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                background: "#e3f2fd",
                borderRadius: "8px",
                border: "1px solid #bbdefb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>🎤</span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#1976d2",
                  }}
                >
                  Voice Recording
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#1565c0" }}>
                "{voiceRecording}"
              </p>
            </div>
          )}

          {/* Display camera image */}
          {cameraImage && (
            <div style={{ marginTop: "1rem" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                📷 Camera Photo
              </h4>
              <img
                src={cameraImage}
                alt=""
                style={{
                  maxWidth: "100%",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              />
            </div>
          )}
        </PostContent>
      </PostInfo>
      <PostActions>
        <PostActionButton
          onClick={handleLikeClick}
          aria-label={!isLiked ? "like" : "unlike"}
          style={{
            color: isLiked ? "#e74c3c" : "#666",
            fontWeight: isLiked ? "bold" : "normal",
          }}
        >
          {isLiked ? (
            <FavoriteIcon
              fontSize="small"
              style={{
                animation: "heartBeat 0.6s ease-in-out",
                transform: "scale(1.2)",
              }}
            />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
          <span className="count-number">{likeCount}</span>
        </PostActionButton>
        <PostActionButton onClick={handleCommentClick} aria-label={"comment"}>
          <CommentIcon fontSize="small" />
        </PostActionButton>
        <PostActionButton onClick={onShare} aria-label={"share"}>
          <IosShareIcon fontSize="small" />
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
