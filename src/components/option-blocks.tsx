"use client";
import { Block, useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";
import { AddCustomBlock } from "./add-custom-block";
import { OptionBlockItem } from "./option-block-item";
import { Input } from "./ui/input";
interface OptionBlocks extends HTMLAttributes<HTMLDivElement> {}

export const OptionBlocks = ({ className, ...props }: OptionBlocks) => {
  const { currentBlocks, initialBlocks } = useBlocks();
  const [value, setValue] = useState("");
  const [optionBlocks, setOptionBlocks] = useState<Block[]>(initialBlocks);
  const [filteredOptionBlocks, setFilteredOptionBlocks] =
    useState<Block[]>(optionBlocks);

  console.log(optionBlocks.length);
  useEffect(() => {
    setOptionBlocks(
      initialBlocks.filter((block) => !currentBlocks.includes(block))
    );
  }, [currentBlocks, initialBlocks]);

  useEffect(() => {
    if (value === "") return setFilteredOptionBlocks(optionBlocks);
    setFilteredOptionBlocks(
      optionBlocks.filter((block) =>
        block.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value, optionBlocks]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("h-full", className)} {...props}>
      <AddCustomBlock />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search blocks..."
        className="w-full my-2"
      />
      <div className="mt-2 flex flex-col pb-[20] gap-2 h-full overflow-scroll scrollbar-hide">
        {filteredOptionBlocks.map((block) => (
          <OptionBlockItem key={block.slug} block={block} />
        ))}
      </div>
    </div>
  );
};
