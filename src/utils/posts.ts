import { Post, CreatePostData, Comment } from "../types/post";
import { User } from "../types/auth";

const POSTS_STORAGE_KEY = "posts";

// Get posts from localStorage
export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(POSTS_STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

// Save posts to localStorage
export const savePosts = (posts: Post[]): void => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
};

// Create a new post
export const createPost = (postData: CreatePostData, user: User): Post => {
  const posts = getPosts();

  const newPost: Post = {
    id: Date.now().toString(),
    user: {
      name: user.email || user.username || "Anonymous",
      avatar: undefined,
    },
    content: postData.content,
    emoji: postData.emoji,
    timestamp: getRelativeTime(new Date()),
    likes: 0,
    comments: 0,
    shares: 0,
    attachments: postData.attachments || [],
    voiceRecording: postData.voiceRecording || "",
    cameraImage: postData.cameraImage || "",
  };

  posts.unshift(newPost); // Add to beginning of array
  savePosts(posts);

  return newPost;
};

// Create a new comment
export const createComment = (
  postId: string,
  content: string,
  user: User
): Comment => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const newComment: Comment = {
    id: Date.now().toString(),
    postId,
    user: {
      name: user.email || user.username || "Anonymous",
      avatar: undefined,
    },
    content,
    timestamp: getRelativeTime(new Date()),
  };

  // Initialize commentList if it doesn't exist
  if (!post.commentList) {
    post.commentList = [];
  }

  post.commentList.push(newComment);
  post.comments = post.commentList.length;

  savePosts(posts);
  return newComment;
};

// Get comments for a post
export const getComments = (postId: string): Comment[] => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);
  return post?.commentList || [];
};

// Toggle like on a post
export const toggleLike = (
  postId: string,
  user: User
): { liked: boolean; likes: number } => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Initialize likedBy array if it doesn't exist
  if (!post.likedBy) {
    post.likedBy = [];
  }

  const userId = user.email || user.username || "anonymous";
  const isLiked = post.likedBy.includes(userId);

  if (isLiked) {
    // Unlike: remove user from likedBy array
    post.likedBy = post.likedBy.filter((id) => id !== userId);
    post.likes = Math.max(0, post.likes - 1);
  } else {
    // Like: add user to likedBy array
    post.likedBy.push(userId);
    post.likes = post.likes + 1;
  }

  savePosts(posts);
  return { liked: !isLiked, likes: post.likes };
};

// Check if a user has liked a post
export const hasUserLiked = (postId: string, user: User): boolean => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post || !post.likedBy) {
    return false;
  }

  const userId = user.email || user.username || "anonymous";
  return post.likedBy.includes(userId);
};

// Get relative time (e.g., "5 mins ago")
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return date.toLocaleDateString();
};

// Initialize with demo posts if none exist
export const initializeDemoPosts = (): void => {
  const posts = getPosts();

  if (posts.length === 0) {
    const demoPosts: Post[] = [
      {
        id: "1",
        user: {
          name: "Theresa Webb",
        },
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <strong>This is bold text</strong> and <em>this is italic text</em>. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        emoji: "😢",
        timestamp: "5 mins ago",
        likes: 12,
        comments: 3,
        shares: 1,
        likedBy: ["demo@example.com", "test@user.com"],
        commentList: [
          {
            id: "c1",
            postId: "1",
            user: { name: "John Doe" },
            content: "Great post! Thanks for sharing.",
            timestamp: "2 mins ago",
          },
          {
            id: "c2",
            postId: "1",
            user: { name: "Jane Smith" },
            content: "I completely agree with this.",
            timestamp: "1 min ago",
          },
          {
            id: "c3",
            postId: "1",
            user: { name: "Mike Johnson" },
            content: "Very insightful content!",
            timestamp: "Just now",
          },
        ],
      },
      {
        id: "2",
        user: {
          name: "John Doe",
        },
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <u>This is underlined text</u> and <code>this is code</code>. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        emoji: "👍",
        timestamp: "5 mins ago",
        likes: 8,
        comments: 2,
        shares: 0,
        likedBy: ["demo@example.com"],
        commentList: [
          {
            id: "c4",
            postId: "2",
            user: { name: "Alice Brown" },
            content: "Nice code example!",
            timestamp: "3 mins ago",
          },
          {
            id: "c5",
            postId: "2",
            user: { name: "Bob Wilson" },
            content: "This is very helpful.",
            timestamp: "1 min ago",
          },
        ],
      },
      {
        id: "3",
        user: {
          name: "Jane Doe",
        },
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <ul><li>This is a list item</li><li>Another list item</li></ul> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        emoji: "💀",
        timestamp: "5 mins ago",
        likes: 15,
        comments: 5,
        shares: 2,
      },
    ];

    savePosts(demoPosts);
  }
};
