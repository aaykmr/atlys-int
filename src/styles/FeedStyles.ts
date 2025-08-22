import styled from "styled-components";

export const FeedContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  color: #333;
`;

export const FeedHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 1rem;
    color: #666;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: #0056b3;
  }
`;

export const FeedMain = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const AuthenticatedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const UnauthenticatedContent = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    color: #666;
  }
`;

// Rich Text Editor Styles
export const RichTextEditor = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const EditorToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
`;

export const ToolbarButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem;
  background: ${(props) => (props.active ? "#007bff" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.active ? "#0056b3" : "#f0f0f0")};
  }
`;

export const ToolbarSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
`;

export const ToolbarSpacer = styled.div`
  flex: 1;
`;

export const CharacterCount = styled.span`
  color: #666;
  font-size: 0.9rem;
  margin-right: 0.5rem;
`;

export const DeleteButton = styled.button`
  padding: 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #c82333;
  }
`;

export const EditorInput = styled.div`
  padding: 1rem;
  min-height: 120px;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  position: relative;
`;

export const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

export const EmojiPicker = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
  z-index: 1000;
  min-width: 120px;
`;

export const EmojiOption = styled.button<{ isSelected?: boolean }>`
  background: ${(props) => (props.isSelected ? "#e3f2fd" : "transparent")};
  border: 1px solid ${(props) => (props.isSelected ? "#2196f3" : "#ddd")};
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
    border-color: #2196f3;
  }
`;

export const TextInput = styled.div`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  line-height: 1.5;
  font-family: inherit;
  min-height: 80px;
  padding: 0;
  margin: 0;

  &:empty:before {
    content: "How are you feeling today?";
    color: #999;
  }

  /* Style for formatted content in editor */
  strong,
  b {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  code {
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 6px;
    font-family: "Courier New", "Monaco", "Consolas", monospace;
    font-size: 0.85em;
    border: 2px solid #e9ecef;
    color: #d63384;
    display: inline-block;
    margin: 0 3px;
    font-weight: 500;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  ul,
  ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.25rem 0;
  }

  /* Heading styles for editor */
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0.5rem 0;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.4rem 0;
    color: #444;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.3rem 0;
    color: #555;
  }

  p {
    margin: 0.5rem 0;
  }

  /* Quote styling */
  blockquote {
    border-left: 4px solid #007bff;
    margin: 0.5rem 0;
    padding-left: 1rem;
    font-style: italic;
    color: #666;
  }
`;

export const EditorActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
`;

export const ActionButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  &:hover {
    background: #f0f0f0;
    border-color: #007bff;
    color: #007bff;
  }
`;

export const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background: #0056b3;
  }
`;

// Post Styles
export const Post = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const UserInfoPost = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 1rem;
`;

export const PostTime = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

export const PostContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #333;
`;

export const PostEmoji = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const PostText = styled.div`
  margin: 0;
  flex: 1;
  line-height: 1.6;

  /* Style for formatted content */
  strong,
  b {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  code {
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 6px;
    font-family: "Courier New", "Monaco", "Consolas", monospace;
    font-size: 0.85em;
    border: 2px solid #e9ecef;
    color: #d63384;
    display: inline-block;
    margin: 0 3px;
    font-weight: 500;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  ul,
  ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.25rem 0;
  }

  /* Heading styles for posts */
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0.5rem 0;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.4rem 0;
    color: #444;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.3rem 0;
    color: #555;
  }

  p {
    margin: 0.5rem 0;
  }

  /* Quote styling */
  blockquote {
    border-left: 4px solid #007bff;
    margin: 0.5rem 0;
    padding-left: 1rem;
    font-style: italic;
    color: #666;
  }
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
`;

export const PostActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: #f0f0f0;
    color: #007bff;
  }
`;
