// "use client";

// import { useEffect, useRef, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import "@/css/custom-editor.css"
// import katex from "katex";

// interface QuillEditorProps {
//   value: string;
//   onChange: (value: any) => any;
//   readOnly: boolean;
//   placeholder: string;
// }

// const QuillEditor = ({
//   value = "",
//   onChange,
//   readOnly = false,
//   placeholder = "Write something...",
// }: QuillEditorProps) => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<Quill | null>(null);
//   const [editorId] = useState(
//     `quill-editor-${Math.random().toString(36).substring(2, 9)}`,
//   );

//   useEffect(() => {
//     const destroyQuill = () => {
//       if (quillRef.current) {
//         quillRef.current = null;
//       }
//       document
//         .querySelectorAll(".ql-toolbar")
//         .forEach((toolbar) => toolbar.remove());
//       if (editorRef.current) {
//         editorRef.current.innerHTML = "";
//         const editorElement = document.createElement("div");
//         editorElement.id = editorId;
//         editorRef.current.appendChild(editorElement);
//         return editorElement;
//       }
//       return null;
//     };

//     if(typeof window !== 'undefined') {
//       // @ts-ignore
//         window.katex = katex

//     const editorElement = destroyQuill();
//     if (!editorElement) return;

//     const modules = {
//       toolbar: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["bold", "italic", "underline", "strike", "formula"],

//       ],
//     };

//     const quill = new Quill(editorElement, {
//       theme: "snow",
//       modules,
//       placeholder,
//       readOnly,

//     });
//     quillRef.current = quill;

//     quill.on("text-change", () => {
//       if (onChange) {
//         onChange(quill.root.innerHTML);
//       }
//     });
//     }

//     return () => {
//       destroyQuill();
//     };
//   }, []);

//   return <div ref={editorRef} className="custom-editor-container"></div>;
// };

// export default QuillEditor;






// quill edito 2nd
"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import katex from "katex";
import { log } from "console";

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

const QuillEditor = ({
  // value = `<p>dsaaaas    <span class="ql-formula" data-value="e=mc^2">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>e</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">e=mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.4306em;"></span><span class="mord mathnormal">e</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8141em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span>﻿</span> </p><p><strong><em><u>sdafas</u></em></strong></p>`,
  value = '',
  onChange,
  readOnly = false,
  placeholder = "Write something...",
}: QuillEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const delta = {
    ops: [
      { insert: "dsaaaas " },
      { insert: { formula: "e=mc^2" } },
      { insert: "\n" },
      {
        attributes: { underline: true, italic: true, bold: true },
        insert: "sdafas",
      },
      { insert: "\n" },
    ],
  };

  useEffect(() => {
    if (!editorRef.current) return;
    if (quillRef.current) return; // ✅ prevent double initialization

    // attach katex to window for formula module
    // @ts-ignore
    window.katex = katex;

    const editorElement = document.createElement("div");
    editorRef.current.appendChild(editorElement);

    const quill = new Quill(editorElement, {
      theme: "snow",
      readOnly,
      placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          ["formula"], // ✅ formula button
        ],
      },
    });
  

    quillRef.current = quill;


    // Set initial value
    if (value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }

    // Handle change
    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      onChange?.(html);
    });

    return () => {
      quillRef.current = null;
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    };
  }, []);

  // ✅ Sync external value changes
  useEffect(() => {
    if (!quillRef.current) return;

    const quill = quillRef.current;
    if (value !== quill.root.innerHTML) {
      const selection = quill.getSelection();
      // quill.clipboard.dangerouslyPasteHTML(value || "");
      if (selection) quill.setSelection(selection);
    }
  }, [value]);

  const getLatexFormulas = () => {
    if (!quillRef.current) return [];

    const editor = quillRef.current.root;
    const formulaElements = editor.querySelectorAll(".ql-formula");

    return Array.from(formulaElements).map((el) =>
      el.getAttribute("data-value"),
    );
  };

  console.log("latex formula : ", getLatexFormulas());

  return <div ref={editorRef} />;
};

export default QuillEditor;
