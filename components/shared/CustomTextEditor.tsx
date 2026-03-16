"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
// import QuillEditor from "./QuillEditor";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
});

interface CustomTextEditorProps {
  value: any;
  onChange: (e: any) => void;
  placeholder: string;
  className?: string;
  showEditor?: boolean;
  level: string;
  type?: string;
  isRequired?: boolean;
  readOnly?: boolean;
}

const CustomTextEditor = ({
  value = null,
  onChange,
  placeholder = "",
  className = "",
  showEditor = false,
  level,
  type = "text",
  isRequired = false,
  readOnly= false
}: CustomTextEditorProps) => {
    const [isInputTextEditor, setIsInputTextEditor] = useState(showEditor);

      const handleEditorChange = (content: string) => {
        onChange(content);
      };


  return (
    <div>
      <div className="space-y-2">
        <div className="w-full flex justify-between items-center gap-4">
          <Label>
            {level} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <div className="flex items-center gap-3">
            <Switch
              id="editor"
              checked={isInputTextEditor}
              onCheckedChange={(checked) => setIsInputTextEditor(checked)}
            />
            <Label htmlFor="editor">Text Editor</Label>
          </div>
        </div>
        {isInputTextEditor ? (
          <div>
            <QuillEditor
              value={value}
              onChange={handleEditorChange}
              placeholder="Start writing your content here..."
              readOnly={false}
            />
          </div>
        ) : (
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e?.target?.value);
            }}
            type={type}
          />
        )}
      </div>
    </div>
  );
};

export default CustomTextEditor;
