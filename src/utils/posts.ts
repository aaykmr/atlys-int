import { Post, CreatePostData } from "../types/post";
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
  };

  posts.unshift(newPost); // Add to beginning of array
  savePosts(posts);

  return newPost;
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
