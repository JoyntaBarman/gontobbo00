"use client";

import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import FileHandler from "@tiptap/extension-file-handler";
import Image from '@tiptap/extension-image'
import { uploadImage } from "@/lib/helper";
import Mathematics, {migrateMathStrings} from "@tiptap/extension-mathematics";
// import "@tiptap/extension-mathematics/style.css";


const MenuBar = ({editor}: any) => {
    if (!editor) return null;

    const btn =
        "px-3 py-1.5 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition";

    const active = "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";

    return (
        <div className="border-b bg-gray-50 p-2 sticky top-0 z-10">
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({level: 1}).run()
                    }
                    className={`${btn} ${
                        editor.isActive("heading", {level: 1}) ? active : ""
                    }`}
                >
                    H1
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({level: 2}).run()
                    }
                    className={`${btn} ${
                        editor.isActive("heading", {level: 2}) ? active : ""
                    }`}
                >
                    H2
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({level: 3}).run()
                    }
                    className={`${btn} ${
                        editor.isActive("heading", {level: 3}) ? active : ""
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
                        editor.isActive({textAlign: "left"}) ? active : ""
                    }`}
                >
                    Left
                </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={`${btn} ${
                        editor.isActive({textAlign: "center"}) ? active : ""
                    }`}
                >
                    Center
                </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={`${btn} ${
                        editor.isActive({textAlign: "right"}) ? active : ""
                    }`}
                >
                    Right
                </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    className={`${btn} ${
                        editor.isActive({textAlign: "justify"}) ? active : ""
                    }`}
                >
                    Justify
                </button>
                <button
                    onClick={() => {
                        const hasSelection = !editor.state.selection.empty

                        if (hasSelection) {
                            return editor.chain().setInlineMath().focus().run()
                        }

                        const latex = prompt('Enter inline math expression:', '')
                        return editor.chain().insertInlineMath({ latex }).focus().run()
                    }}
                    className={`${btn} ${
                        editor.isActive({textAlign: "justify"}) ? active : ""
                    }`}
                >
                    Inline math
                </button>
                <button
                    onClick={() => {
                        const hasSelection = !editor.state.selection.empty

                        if (hasSelection) {
                            return editor.chain().setBlockMath().focus().run()
                        }

                        const latex = prompt('Enter block math expression:', '')
                        return editor.chain().insertBlockMath({ latex }).focus().run()
                    }}
                    className={`${btn} ${
                        editor.isActive({textAlign: "justify"}) ? active : ""
                    }`}
                >
                    Block math
                </button>
                <button
                    onClick={() => {
                        const url = window.prompt('URL')

                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                        }
                    }}
                    className={`${btn} ${
                        editor.isActive({textAlign: "justify"}) ? active : ""
                    }`}
                >
                    Add Image
                </button>
            </div>
        </div>
    );
};

const LoadingImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      loading: {
        default: false,
        parseHTML: (element) => element.getAttribute("data-loading") === "true",
        renderHTML: (attributes) => ({
          "data-loading": attributes.loading ? "true" : undefined,
        }),
      },
    };
  },
});


const TipTapTextEditor = () => {
    // const editor = useEditor({
    //         extensions: [
    //             StarterKit,
    //             Image,
    //             TextAlign.configure({
    //                 types: ["heading", "paragraph"],
    //             }),
    //             FileHandler.configure({
    //                 allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    //                 onDrop: (currentEditor, files, pos) => {
    //                     console.log("File : ", files);
    //                     files.forEach(file => {
    //                         const fileReader = new FileReader()

    //                         fileReader.readAsDataURL(file)
    //                         console.log("fileReader : ", fileReader);
    //                         console.log("fileReader.result : ", fileReader.result);
    //                         fileReader.onload = () => {
    //                             currentEditor
    //                                 .chain()
    //                                 .insertContentAt(pos, {
    //                                     type: 'image',
    //                                     attrs: {
    //                                         // src: fileReader.result,
    //                                         src: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp',
    //                                     },
    //                                 })
    //                                 .focus()
    //                                 .run()
    //                         }
    //                     })
    //                 },
    //                 onPaste: (currentEditor, files, htmlContent) => {
    //                     files.forEach(file => {
    //                         if (htmlContent) {
    //                             // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
    //                             // you could extract the pasted file from this url string and upload it to a server for example
    //                             console.log(htmlContent) // eslint-disable-line no-console
    //                             return false
    //                         }

    //                         const fileReader = new FileReader()

    //                         fileReader.readAsDataURL(file)
    //                         fileReader.onload = () => {
    //                             currentEditor
    //                                 .chain()
    //                                 .insertContentAt(currentEditor.state.selection.anchor, {
    //                                     type: 'image',
    //                                     attrs: {
    //                                         src: fileReader.result,
    //                                     },
    //                                 })
    //                                 .focus()
    //                                 .run()
    //                         }
    //                     })
    //                 },
    //             }),
    //             Highlight,
    //         ],
    //         content: "<p>Hello World! 🌎️</p>",
    //         // Don't render immediately on the server to avoid SSR issues
    //         immediatelyRender:
    //             false,
    //     })
    // ;

     const editor = useEditor({
       extensions: [
           StarterKit.configure({
               codeBlock: false,
           }),
         LoadingImage, // or regular Image if you don't need loading state
         TextAlign.configure({
           types: ["heading", "paragraph"],
         }),
           // Image,
           // LoadingImage
         FileHandler.configure({
           allowedMimeTypes: [
             "image/png",
             "image/jpeg",
             "image/gif",
             "image/webp",
           ],

           onDrop: async (currentEditor, files, pos) => {
             // Handle dropped images
             for (const file of files) {
               try {
                console.log("Dropped file:", file);
                 // Upload to server
                 const { url : imageUrl } = await uploadImage(file);
                    // const imageUrl = await Promise.resolve(
                    //   "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
                    // ); // Temporary URL for preview

                 // Insert image after upload
                 currentEditor
                   .chain()
                   .insertContentAt(pos, {
                     type: "image",
                     attrs: { src: imageUrl },
                   })
                   .focus()
                   .run();
               } catch (error) {
                 console.error("Image upload failed:", error);
                 // Optionally show error notification to user
               }
             }
           },

           onPaste: async (currentEditor, files, htmlContent) => {
             // If there's HTML content with images, let other extensions handle it
             if (htmlContent) {
               return false;
             }

             // Handle pasted images
             for (const file of files) {
               try {
                 // Upload to server
                 const { url: imageUrl } = await uploadImage(file);

                 // Insert image at current cursor position
                 currentEditor
                   .chain()
                   .insertContentAt(currentEditor.state.selection.anchor, {
                     type: "image",
                     attrs: { src: imageUrl },
                   })
                   .focus()
                   .run();
               } catch (error) {
                 console.error("Image upload failed:", error);
               }
             }

             return true;
           },
         }),
         Highlight,
           Mathematics?.configure({
               inlineOptions: {
                   // optional options for the inline math node
               },
               blockOptions: {
                   // optional options for the block math node
               },
               katexOptions: {
                   // optional options for the KaTeX renderer
               },
           }),
       ],
         // onCreate: ({ editor: currentEditor }) => {
         //     migrateMathStrings(currentEditor)
         // },
       content: "<p>Hello World! 🌎️</p>",
       immediatelyRender: false,
     });


    if (!editor) {
        return null;
    }

    return (
        <>
            <MenuBar editor={editor}/>
            <EditorContent editor={editor}/>
        </>
    );
};


export default TipTapTextEditor;
