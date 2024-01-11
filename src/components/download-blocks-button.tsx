"use client";

import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "./ui/button";
interface DownloadBlocksButtonProps extends HTMLAttributes<HTMLDivElement> {}

export const DownloadBlocksButton = ({
  className,
  ...props
}: DownloadBlocksButtonProps) => {
  const { currentBlocks } = useBlocks();
  const markdown = currentBlocks.map((block) => block.markdown).join("");

  return (
    <div className={cn(className)} {...props}>
      <Button variant={"ghost"} asChild>
        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(markdown)}`}
          download="README.md"
        >
          <DownloadIcon />
        </a>
      </Button>
    </div>
  );
};
