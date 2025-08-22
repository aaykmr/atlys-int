import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  RichTextEditor as EditorContainer,
  EditorToolbar,
  ToolbarButton,
  ToolbarSelect,
  ToolbarSpacer,
  CharacterCount,
  DeleteButton,
  EditorInput,
  EmojiButton,
  EmojiPicker,
  EmojiOption,
  TextInput,
  EditorActions,
  ActionButton,
  SendButton,
} from "../styles/FeedStyles";

interface RichTextEditorProps {
  onPost: (content: string, emoji: string) => void;
}

export interface RichTextEditorRef {
  setContent: (content: string) => void;
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  ({ onPost }, ref) => {
    const [content, setContent] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("😊");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [listType, setListType] = useState<"none" | "ul" | "ol">("none");
    const [showCodeBlock, setShowCodeBlock] = useState(false);
    const [currentHeading, setCurrentHeading] = useState<string>("paragraph");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const emojis = ["😊", "😢", "👍", "💀", "🎉", "🔥", "❤️", "😎", "🤞", "👌"];

    // Expose setContent method to parent component
    useImperativeHandle(ref, () => ({
      setContent: (content: string) => {
        if (editorRef.current) {
          editorRef.current.innerHTML = content;
        }
      },
    }));

    const handleFormat = (format: string) => {
      const editor = editorRef.current;
      if (!editor) return;

      if (format === "code") {
        // Toggle code formatting
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const codeElement =
          range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
            ? (range.commonAncestorContainer as Element).closest("code")
            : range.commonAncestorContainer.parentElement?.closest("code");

        if (codeElement) {
          // Toggling off: Exit the code block by moving cursor right after it
          console.log("Exiting code block:", codeElement.textContent);

          const newRange = document.createRange();
          newRange.setStartAfter(codeElement); // Position right after the code element
          newRange.collapse(true); // Collapse to start (cursor position)

          selection.removeAllRanges();
          selection.addRange(newRange);

          // Insert a space for better UX
          document.execCommand("insertHTML", false, " ");

          editor.focus();
        } else {
          // Toggling on: Wrap the selected text in a <code> element
          const selectedText = range.toString();

          if (selectedText) {
            // Wrap selected text in <code> tags
            const codeElement = document.createElement("code");
            codeElement.textContent = selectedText;
            range.deleteContents();
            range.insertNode(codeElement);
          } else {
            // Insert code element at cursor
            const codeElement = document.createElement("code");
            codeElement.textContent = "code";
            range.insertNode(codeElement);
            // Select the inserted text
            const newRange = document.createRange();
            newRange.setStart(codeElement.firstChild!, 0);
            newRange.setEnd(codeElement.firstChild!, 4);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }

          editor.focus();
        }
      } else if (format === "quote") {
        // Insert double quotes with cursor between them
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
          // Wrap selected text in quotes
          const quotedText = `"${selectedText}"`;
          range.deleteContents();
          range.insertNode(document.createTextNode(quotedText));
        } else {
          // Insert quotes with cursor between them
          const quotes = document.createTextNode('""');
          range.insertNode(quotes);

          // Position cursor between the quotes
          const newRange = document.createRange();
          newRange.setStart(quotes, 1);
          newRange.collapse(true);

          selection.removeAllRanges();
          selection.addRange(newRange);
        }

        editor.focus();
      } else {
        document.execCommand(format, false);
      }

      editor.focus();
    };

    const handleList = (type: "ul" | "ol") => {
      const editor = editorRef.current;
      if (!editor) return;

      const command =
        type === "ul" ? "insertUnorderedList" : "insertOrderedList";
      document.execCommand(command, false);
      editor.focus();
    };

    const handleHeading = (headingType: string) => {
      const editor = editorRef.current;
      if (!editor) return;

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        if (headingType === "paragraph") {
          // Convert to paragraph
          document.execCommand("formatBlock", false, "p");
        } else {
          // Convert to heading
          document.execCommand("formatBlock", false, headingType);
        }

        setCurrentHeading(headingType);
        editor.focus();
      }
    };

    const handleSend = () => {
      if (editorRef.current && editorRef.current.innerHTML.trim()) {
        const content = editorRef.current.innerHTML;
        console.log("Sending HTML content:", content); // Debug log
        onPost(content, selectedEmoji);
        editorRef.current.innerHTML = "";
        setSelectedEmoji("😊");
        setListType("none");
        setShowCodeBlock(false);
      }
    };

    const handleClear = () => {
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
      setSelectedEmoji("😊");
      setListType("none");
      setShowCodeBlock(false);
      setCurrentHeading("paragraph");
    };

    const handleEmojiSelect = (emoji: string) => {
      setSelectedEmoji(emoji);
      setShowEmojiPicker(false);
    };

    // Close emoji picker when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          showEmojiPicker &&
          !(event.target as Element).closest(".emoji-picker-container")
        ) {
          setShowEmojiPicker(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showEmojiPicker]);

    const getCharacterCount = () => {
      if (editorRef.current) {
        return editorRef.current.textContent?.length || 0;
      }
      return 0;
    };

    const characterCount = getCharacterCount();
    const maxCharacters = 500;

    // Function to check if cursor is inside a code element
    const checkCodeState = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const codeElement =
          range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
            ? (range.commonAncestorContainer as Element).closest("code")
            : range.commonAncestorContainer.parentElement?.closest("code");

        setShowCodeBlock(!!codeElement);
      }
    };

    // Function to check current heading level
    const checkHeadingState = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const blockElement =
          range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
            ? (range.commonAncestorContainer as Element).closest(
                "h1, h2, h3, p"
              )
            : range.commonAncestorContainer.parentElement?.closest(
                "h1, h2, h3, p"
              );

        if (blockElement) {
          const tagName = blockElement.tagName.toLowerCase();
          setCurrentHeading(tagName === "p" ? "paragraph" : tagName);
        }
      }
    };

    return (
      <EditorContainer>
        <EditorToolbar>
          <ToolbarSelect
            value={currentHeading}
            onChange={(e) => handleHeading(e.target.value)}
          >
            <option value="paragraph">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </ToolbarSelect>

          <ToolbarButton
            active={isBold}
            onClick={() => {
              setIsBold(!isBold);
              handleFormat("bold");
            }}
          >
            <FormatBoldIcon fontSize="small" />
          </ToolbarButton>

          <ToolbarButton
            active={isItalic}
            onClick={() => {
              setIsItalic(!isItalic);
              handleFormat("italic");
            }}
          >
            <FormatItalicIcon fontSize="small" />
          </ToolbarButton>

          <ToolbarButton
            active={isUnderline}
            onClick={() => {
              setIsUnderline(!isUnderline);
              handleFormat("underline");
            }}
          >
            <FormatUnderlinedIcon fontSize="small" />
          </ToolbarButton>

          <ToolbarButton
            active={listType === "ul"}
            onClick={() => handleList("ul")}
          >
            <FormatListBulletedIcon fontSize="small" />
          </ToolbarButton>

          <ToolbarButton
            active={listType === "ol"}
            onClick={() => handleList("ol")}
          >
            <FormatListNumberedIcon fontSize="small" />
          </ToolbarButton>

          <ToolbarButton onClick={() => handleFormat("quote")}>
            <FormatQuoteIcon fontSize="small" />
          </ToolbarButton>

          <ToolbarButton
            active={showCodeBlock}
            onClick={() => {
              setShowCodeBlock(!showCodeBlock);
              handleFormat("code");
            }}
          >
            <CodeIcon fontSize="small" />
          </ToolbarButton>

          <ToolbarSpacer />

          <CharacterCount>
            {characterCount}/{maxCharacters}
          </CharacterCount>

          <DeleteButton onClick={handleClear}>
            <DeleteIcon fontSize="small" />
          </DeleteButton>
        </EditorToolbar>

        <EditorInput>
          <EmojiButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            {selectedEmoji}
          </EmojiButton>

          {showEmojiPicker && (
            <EmojiPicker className="emoji-picker-container">
              {emojis.map((emoji, index) => (
                <EmojiOption
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  isSelected={emoji === selectedEmoji}
                >
                  {emoji}
                </EmojiOption>
              ))}
            </EmojiPicker>
          )}

          <TextInput
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const target = e.target as HTMLDivElement;
              if (
                target.textContent &&
                target.textContent.length > maxCharacters
              ) {
                target.textContent = target.textContent.slice(0, maxCharacters);
              }
              checkCodeState();
              checkHeadingState();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              } else if (e.key === "Enter" && e.shiftKey) {
                // When Enter is pressed, reset to paragraph
                setTimeout(() => {
                  setCurrentHeading("paragraph");
                }, 0);
              }
              checkCodeState();
              checkHeadingState();
            }}
            onMouseUp={() => {
              checkCodeState();
              checkHeadingState();
            }}
            onKeyUp={() => {
              checkCodeState();
              checkHeadingState();
            }}
            style={{
              minHeight: "80px",
              outline: "none",
              border: "none",
              resize: "none",
              fontSize: "1rem",
              lineHeight: "1.5",
              fontFamily: "inherit",
              flex: 1,
            }}
          />
        </EditorInput>

        <EditorActions>
          <ActionButton title="Add attachment">
            <AddIcon fontSize="small" />
          </ActionButton>
          <ActionButton title="Voice input">
            <MicIcon fontSize="small" />
          </ActionButton>
          <ActionButton title="Camera">
            <VideocamIcon fontSize="small" />
          </ActionButton>

          <ToolbarSpacer />

          <SendButton onClick={() => handleSend()}>
            <SendIcon fontSize="small" />
          </SendButton>
        </EditorActions>
      </EditorContainer>
    );
  }
);

export default RichTextEditor;
