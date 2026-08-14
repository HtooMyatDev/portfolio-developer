"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useEffect } from "react";

const lowlight = createLowlight(common);

type Props = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  language?: "english" | "burmese";
};

type ButtonProps = {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({ onClick, active, title, children }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-xs font-mono border transition-all ${
        active
          ? "bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)]"
          : "border-transparent hover:border-[var(--border)] hover:bg-[var(--card-bg)]"
      }`}
    >
      {children}
    </button>
  );
}

export default function TipTapEditor({ content, onChange, placeholder, language }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[var(--accent)] underline" },
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({
        placeholder: placeholder ?? (language === "burmese"
          ? "မြန်မာဘာသာဖြင့် ဤနေရာတွင် ရေးသားပါ..."
          : "Write your blog post content here..."),
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] max-h-[600px] overflow-y-auto p-4 focus:outline-none prose dark:prose-invert max-w-none prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-a:text-[var(--accent)] prose-blockquote:border-l-[var(--accent)] text-sm leading-7",
      },
    },
  });

  // Sync content when parent changes (for edit mode)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  return (
    <div
      className="border-2 border-[var(--border)] shadow-[2px_2px_0_0_var(--border)]"
      style={{ backgroundColor: "var(--card-bg)" }}
    >
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-1 p-2 border-b-2 border-[var(--border)]"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Text style */}
        <div className="flex items-center border-r border-[var(--border)] pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <s>S</s>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Inline Code"
          >
            {"</>"}
          </ToolbarButton>
        </div>

        {/* Headings */}
        <div className="flex items-center border-r border-[var(--border)] pr-2 mr-1">
          {([1, 2, 3] as const).map((level) => (
            <ToolbarButton
              key={level}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
              active={editor.isActive("heading", { level })}
              title={`Heading ${level}`}
            >
              H{level}
            </ToolbarButton>
          ))}
        </div>

        {/* Lists */}
        <div className="flex items-center border-r border-[var(--border)] pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            • List
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Ordered List"
          >
            1. List
          </ToolbarButton>
        </div>

        {/* Block elements */}
        <div className="flex items-center border-r border-[var(--border)] pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            ❝
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            {"{ }"}
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            ───
          </ToolbarButton>
        </div>

        {/* Media */}
        <div className="flex items-center">
          <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Link">
            🔗
          </ToolbarButton>
          <ToolbarButton onClick={addImage} title="Image">
            🖼️
          </ToolbarButton>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center ml-auto border-l border-[var(--border)] pl-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            ↩
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            ↪
          </ToolbarButton>
        </div>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
}
