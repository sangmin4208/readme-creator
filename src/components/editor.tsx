"use client";

import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";

import MonacoEditor from "@monaco-editor/react";
import { HTMLAttributes } from "react";
interface EditorProps extends HTMLAttributes<HTMLDivElement> {}

export const Editor = ({ className, ...props }: EditorProps) => {
  const { currentActive, onActiveBlockChange } = useBlocks();

  return (
    <div className={cn("h-full", className)} {...props}>
      <MonacoEditor
        className="scrollbar-hide"
        options={{
          scrollbar: {
            horizontal: "hidden",
            vertical: "hidden",
          },
          wrappingIndent: "indent",
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
        }}
        defaultLanguage="markdown"
        value={currentActive?.markdown}
        onChange={(value) => {
          if (value) onActiveBlockChange(value);
        }}
      />
    </div>
  );
};
