export interface Comment {
  id: string;
  postId: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

export interface Post {
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
  commentList?: Comment[];
  likedBy?: string[]; // Array of user IDs who liked the post
  attachments?: string[]; // Array of file URLs or names
  voiceRecording?: string; // Voice transcript
  cameraImage?: string; // Camera image URL
}

export interface CreatePostData {
  content: string;
  emoji: string;
  attachments?: string[];
  voiceRecording?: string;
  cameraImage?: string;
}
