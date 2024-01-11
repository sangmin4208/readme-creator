"use client";
import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useMemo, useState } from "react";
import { AddCustomBlock } from "./add-custom-block";
import { OptionBlockItem } from "./option-block-item";
import { Input } from "./ui/input";
interface OptionBlocks extends HTMLAttributes<HTMLDivElement> {}

export const OptionBlocks = ({ className, ...props }: OptionBlocks) => {
  const { currentBlocks, initialBlocks } = useBlocks();
  const [value, setValue] = useState("");
  const optionBlocks = useMemo(() => {
    return initialBlocks.filter((block) => {
      if (currentBlocks.find((b) => b.slug === block.slug)) return false;
      return true;
    });
  }, [currentBlocks, initialBlocks]);

  const filteredOptionBlocks = useMemo(() => {
    if (!value) return optionBlocks;
    return optionBlocks.filter((block) => {
      if (block.name.toLowerCase().includes(value.toLowerCase())) return true;
      return false;
    });
  }, [value, optionBlocks]);

  return (
    <div className={cn("h-full", className)} {...props}>
      <AddCustomBlock />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search blocks..."
        className="w-full my-2"
      />
      <div className="mt-2 flex flex-col pb-[200px] gap-2 h-full overflow-scroll scrollbar-hide">
        {filteredOptionBlocks.map((block) => (
          <OptionBlockItem key={block.slug} block={block} />
        ))}
        {filteredOptionBlocks.length === 0 && (
          <div className="text-gray-400 text-2xl flex justify-center items-center h-full">
            No Blocks Found
          </div>
        )}
      </div>
    </div>
  );
};
