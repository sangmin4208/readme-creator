"use client";

import { createContext, useContext, useState } from "react";

import data from "@/data/index";

export type Block = {
  slug: string;
  name: string;
  markdown: string;
};

const _useBlocks = () => {
  const initialBlock = data["en"];
  const [currentBlocks, setCurrentBlocks] = useState<Block[]>([]);
  const [optionBlocks, setOptionBlocks] = useState<Block[]>(initialBlock);

  const [currentActive, setCurrentActive] = useState<Block>();

  const onClickSelectBlock = (slug: string) => {
    const block = currentBlocks.find((block) => block.slug === slug);
    if (!block) return;
    setCurrentActive(block);
  };

  const onClickOptionBlock = (slug: string) => {
    const block = optionBlocks.find((block) => block.slug === slug);
    if (!block) return;
    setCurrentBlocks([...currentBlocks, block]);
    setOptionBlocks(optionBlocks.filter((block) => block.slug !== slug));
  };

  const onClickCurrentDelete = (slug: string) => {
    const block = currentBlocks.find((block) => block.slug === slug);
    if (!block) return;
    setOptionBlocks([...optionBlocks, block]);
    setCurrentBlocks(currentBlocks.filter((block) => block.slug !== slug));
  };

  const onActiveBlockChange = (markdown: string) => {
    if (!currentActive) return;
    const newBlock = { ...currentActive, markdown };
    setCurrentBlocks(
      currentBlocks.map((block) =>
        block.slug === newBlock.slug ? newBlock : block
      )
    );
  };

  return {
    currentBlocks,
    setCurrentBlocks,
    optionBlocks,
    setOptionBlocks,
    onClickOptionBlock,
    onClickCurrentDelete,
    onClickSelectBlock,
    currentActive,
    onActiveBlockChange,
  };
};

export const useBlocks = () => {
  const context = useContext(BlocksContext);
  if (context === undefined) {
    throw new Error("useBlocks must be used within a BlocksProvsluger");
  }
  return context;
};

interface BlocksContextType extends ReturnType<typeof _useBlocks> {}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined);

export const BlocksProvider = ({ children }: { children: JSX.Element }) => {
  const value = _useBlocks();
  return (
    <BlocksContext.Provider value={value}>{children}</BlocksContext.Provider>
  );
};
