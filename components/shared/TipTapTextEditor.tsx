"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";


const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  const btn =
    "px-3 py-1.5 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition";

  const active = "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";

  return (
    <div className="border-b bg-gray-50 p-2 sticky top-0 z-10">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${btn} ${
            editor.isActive("heading", { level: 1 }) ? active : ""
          }`}
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${btn} ${
            editor.isActive("heading", { level: 2 }) ? active : ""
          }`}
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${btn} ${
            editor.isActive("heading", { level: 3 }) ? active : ""
          }`}
        >
          H3
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${btn} ${editor.isActive("paragraph") ? active : ""}`}
        >
          P
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btn} ${editor.isActive("bold") ? active : ""}`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btn} ${editor.isActive("italic") ? active : ""}`}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${btn} ${editor.isActive("strike") ? active : ""}`}
        >
          S
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${btn} ${editor.isActive("highlight") ? active : ""}`}
        >
          Highlight
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${btn} ${
            editor.isActive({ textAlign: "left" }) ? active : ""
          }`}
        >
          Left
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${btn} ${
            editor.isActive({ textAlign: "center" }) ? active : ""
          }`}
        >
          Center
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${btn} ${
            editor.isActive({ textAlign: "right" }) ? active : ""
          }`}
        >
          Right
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`${btn} ${
            editor.isActive({ textAlign: "justify" }) ? active : ""
          }`}
        >
          Justify
        </button>
      </div>
    </div>
  );
};


const TipTapTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],

    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};



export default TipTapTextEditor;
