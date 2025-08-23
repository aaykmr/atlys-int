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
  ActionButtonContained,
} from "../styles/FeedStyles";

interface RichTextEditorProps {
  onPost: (
    content: string,
    emoji: string,
    attachments: string[],
    voiceRecording: string,
    cameraImage: string
  ) => void;
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
    const [attachments, setAttachments] = useState<string[]>([]);
    const [voiceRecording, setVoiceRecording] = useState<string>("");
    const [cameraImage, setCameraImage] = useState<string>("");
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
        onPost(
          content,
          selectedEmoji,
          attachments,
          voiceRecording,
          cameraImage
        );
        editorRef.current.innerHTML = "";
        setSelectedEmoji("😊");
        setListType("none");
        setShowCodeBlock(false);
        setAttachments([]);
        setVoiceRecording("");
        setCameraImage("");
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

    const handleAddAttachment = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,.pdf,.doc,.docx,.txt";
      input.multiple = true;

      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          const newAttachments = Array.from(files).map((file) => {
            if (file.type.startsWith("image/")) {
              return URL.createObjectURL(file);
            }
            return file.name;
          });
          setAttachments((prev) => [...prev, ...newAttachments]);
        }
      };

      input.click();
    };

    const handleVoiceInput = () => {
      if ("webkitSpeechRecognition" in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setVoiceRecording("Listening...");
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setVoiceRecording(transcript);

          // Insert the transcript into the editor
          if (editorRef.current) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              range.insertNode(document.createTextNode(transcript + " "));
            } else {
              editorRef.current.innerHTML += transcript + " ";
            }
          }
        };

        recognition.onerror = () => {
          setVoiceRecording("Voice input failed");
        };

        recognition.onend = () => {
          setTimeout(() => setVoiceRecording(""), 2000);
        };

        recognition.start();
      } else {
        alert("Voice input is not supported in this browser");
      }
    };

    const handleCamera = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "camera";

      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files[0]) {
          const imageUrl = URL.createObjectURL(files[0]);
          setCameraImage(imageUrl);

          // Insert the image into the editor
          if (editorRef.current) {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.borderRadius = "8px";
            img.style.margin = "8px 0";

            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              range.insertNode(img);
            } else {
              editorRef.current.appendChild(img);
            }
          }
        }
      };

      input.click();
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

          {/* Display attachments in editor */}
          {attachments.length > 0 && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
              }}
            >
              <h4
                style={{
                  margin: "0 0 0.75rem 0",
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
                      position: "relative",
                      padding: "0.5rem",
                      background: "white",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      border: "1px solid #dee2e6",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    {attachment.startsWith("blob:") ? (
                      <img
                        src={attachment}
                        alt="Attachment"
                        style={{
                          maxWidth: "80px",
                          maxHeight: "80px",
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span>📄 {attachment}</span>
                    )}
                    <button
                      onClick={() => {
                        setAttachments((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                      title="Remove attachment"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display voice recording in editor */}
          {voiceRecording && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                background: "#e3f2fd",
                borderRadius: "8px",
                border: "1px solid #bbdefb",
                position: "relative",
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
              <button
                onClick={() => setVoiceRecording("")}
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
                title="Remove voice recording"
              >
                ×
              </button>
            </div>
          )}

          {/* Display camera image in editor */}
          {cameraImage && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
                position: "relative",
              }}
            >
              <h4
                style={{
                  margin: "0 0 0.75rem 0",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                📷 Camera Photo
              </h4>
              <img
                src={cameraImage}
                alt="Camera photo"
                style={{
                  maxWidth: "200px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              />
              <button
                onClick={() => setCameraImage("")}
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
                title="Remove camera photo"
              >
                ×
              </button>
            </div>
          )}
        </EditorInput>

        <EditorActions>
          <ActionButtonContained
            title="Add attachment"
            onClick={handleAddAttachment}
          >
            <AddIcon fontSize="small" />
          </ActionButtonContained>
          <ActionButton title="Voice input" onClick={handleVoiceInput}>
            <MicIcon fontSize="small" />
            {voiceRecording && (
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#007bff",
                  marginLeft: "0.5rem",
                  fontStyle: "italic",
                }}
              >
                {voiceRecording}
              </span>
            )}
          </ActionButton>
          <ActionButton title="Camera" onClick={handleCamera}>
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
