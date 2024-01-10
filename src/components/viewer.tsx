"use client";

import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface ViwerProps extends HTMLAttributes<HTMLDivElement> {
  isRaw?: boolean;
}
export const Viewer = ({ className, isRaw, ...props }: ViwerProps) => {
  const { currentBlocks } = useBlocks();

  const markdown = currentBlocks.map((block) => block.markdown).join("");

  return (
    <div
      className={cn("h-full scrollbar-hide overflow-scroll", className)}
      {...props}
    >
      <article className="prose max-w-none">
        {isRaw && (
          <div className="mx-2">
            <pre>{markdown}</pre>
          </div>
        )}
        {!isRaw && (
          <div className="overflow-scroll">
            <Markdown
              components={{
                a: ({ ...props }) => {
                  return (
                    <a href={props.href} target="_blank" {...props}>
                      {props.children}
                    </a>
                  );
                },
              }}
              className={"px-4"}
              remarkPlugins={[remarkGfm]}
            >
              {markdown}
            </Markdown>
          </div>
        )}
      </article>
    </div>
  );
};
