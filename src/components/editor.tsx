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
      {currentActive && (
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
      )}
      {!currentActive && (
        <div className="flex justify-center items-center h-full">
          <div className="text-gray-400 text-2xl">No Block Selected</div>
        </div>
      )}
    </div>
  );
};
