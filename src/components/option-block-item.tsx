import { Block, useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
interface OptionBlockItemProps extends HTMLAttributes<HTMLDivElement> {
  block: Block;
}

export const OptionBlockItem = ({
  className,
  block: { slug, name },
  ...props
}: OptionBlockItemProps) => {
  const { onClickOptionBlock } = useBlocks();
  return (
    <div
      onClick={() => onClickOptionBlock(slug)}
      className={cn(className, "cursor-pointer")}
      {...props}
    >
      <div className="w-full py-3 px-2 bg-gray-50 text-sm rounded">{name}</div>
    </div>
  );
};
