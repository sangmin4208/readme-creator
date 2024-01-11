"use client";
import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";
import { AddCustomBlock } from "./add-custom-block";
import { OptionBlockItem } from "./option-block-item";
import { Input } from "./ui/input";
interface OptionBlocks extends HTMLAttributes<HTMLDivElement> {}

export const OptionBlocks = ({ className, ...props }: OptionBlocks) => {
  const { optionBlocks } = useBlocks();
  const [value, setValue] = useState("");
  const [filteredOptionBlocks, setFilteredOptionBlocks] =
    useState(optionBlocks);

  useEffect(() => {
    if (value === "") setFilteredOptionBlocks(optionBlocks);
    setFilteredOptionBlocks(
      optionBlocks.filter((block) =>
        block.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("h-full", className)} {...props}>
      <AddCustomBlock />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search blocks..."
        className="w-full my-2"
      />
      <div className="mt-2 flex flex-col gap-2 mb-10 h-full overflow-scroll scrollbar-hide">
        {filteredOptionBlocks.map((block) => (
          <OptionBlockItem key={block.slug} block={block} />
        ))}
      </div>
    </div>
  );
};
