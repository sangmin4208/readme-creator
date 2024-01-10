"use client";

import { createContext, useContext, useState } from "react";

type Block = {
  slug: string;
  title: string;
};

const initialBlock: Block[] = [
  {
    slug: "title-and-description",
    title: "Title and Description",
  },

  {
    slug: "author",
    title: "Author",
  },
  {
    slug: "badges",
    title: "Badges",
  },
  {
    slug: "contributing",
    title: "Contributing",
  },
  {
    slug: "delployment",
    title: "Deployment",
  },
];

const _useBlocks = () => {
  const [currentBlocks, setCurrentBlocks] = useState<Block[]>([]);
  const [optionBlocks, setOptionBlocks] = useState<Block[]>(initialBlock);

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

  return {
    currentBlocks,
    setCurrentBlocks,
    optionBlocks,
    setOptionBlocks,
    onClickOptionBlock,
    onClickCurrentDelete,
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
