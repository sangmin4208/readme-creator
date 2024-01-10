"use client";
import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { OptionBlockItem } from "./option-block-item";
interface OptionBlocks extends HTMLAttributes<HTMLDivElement> {}

export const OptionBlocks = ({ className, ...props }: OptionBlocks) => {
  const { optionBlocks } = useBlocks();
  return (
    <div className={cn("overflow-scroll", className)} {...props}>
      <div className="flex flex-col gap-2 mb-10">
        {optionBlocks.map((block) => (
          <OptionBlockItem key={block.slug} block={block} />
        ))}
      </div>
    </div>
  );
};
