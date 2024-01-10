"use client";

import { Block, useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";
import { GripVertical, RefreshCcw, Trash } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { Button } from "./ui/button";
interface UserSelectedListProps extends HTMLAttributes<HTMLDivElement> {}

export const SelectedBlocks = ({
  className,
  ...props
}: UserSelectedListProps) => {
  const { currentBlocks, setCurrentBlocks, currentActive, onClickSelectBlock } =
    useBlocks();
  return (
    <div className={cn(className, "overflow-scroll")} {...props}>
      <AnimatePresence>
        <Reorder.Group values={currentBlocks} onReorder={setCurrentBlocks}>
          <div className="flex flex-col gap-1">
            {currentBlocks.map((block) => (
              <Item
                isActive={currentActive?.slug === block.slug}
                onClick={() => onClickSelectBlock(block.slug)}
                key={block.slug}
                block={block}
              />
            ))}
          </div>
        </Reorder.Group>
      </AnimatePresence>
    </div>
  );
};

function Item({
  block,
  isActive,
  onClick,
}: {
  block: Block;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const { onClickCurrentDelete } = useBlocks();
  const controls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item value={block} dragListener={false} dragControls={controls}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
        className={cn("flex items-center pr-2 justify-between cursor-pointer", {
          "bg-gray-50": isActive,
        })}
      >
        <div
          className={cn(
            "flex rounded items-start gap-1 py-2 my-1 cursor-pointer"
          )}
        >
          <div
            className={cn("hover:text-gray-500 text-gray-300", {
              "cursor-grab": !isDragging,
              "cursor-grabbing": isDragging,
            })}
            onPointerDown={(e) => {
              setIsDragging(true);
              controls.start(e, {
                snapToCursor: true,
              });
            }}
            onPointerUp={() => setIsDragging(false)}
          >
            <GripVertical />
          </div>
          <div className="text-sm line-clamp-1 basis-full select-none">
            {block.name}
          </div>
        </div>
        <div
          className={cn("flex items-center", {
            hidden: !isActive,
          })}
        >
          <Button
            variant="ghost"
            className="cursor-pointer w-fit py-2 px-1 h-fit"
            onClick={(e) => {
              onClickCurrentDelete(block.slug);
            }}
          >
            <RefreshCcw size={14} />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer w-fit py-2 px-1 h-fit"
            onClick={(e) => {
              onClickCurrentDelete(block.slug);
            }}
          >
            <Trash size={14} />
          </Button>
        </div>
      </div>
    </Reorder.Item>
  );
}
