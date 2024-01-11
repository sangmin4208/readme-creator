"use client";

import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";

import MonacoEditor from "@monaco-editor/react";
import { HTMLAttributes } from "react";
interface EditorProps extends HTMLAttributes<HTMLDivElement> {}

export const Editor = ({ className, ...props }: EditorProps) => {
  const { currentActive, handleBlockChange } = useBlocks();

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
            wordWrap: "on",
            minimap: {
              enabled: false,
            },
          }}
          defaultLanguage="markdown"
          value={currentActive.markdown.trimStart()}
          onChange={(value) => {
            if (value) handleBlockChange(value);
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
