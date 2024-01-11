"use client";

import data from "@/data/index";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
export type Block = {
  slug: string;
  name: string;
  markdown: string;
};

const _useBlocks = () => {
  const initialBlock = data["en"];
  const [currentBlocks, setCurrentBlocks] = useState<Block[]>([]);
  const [optionBlocks, setOptionBlocks] = useState<Block[]>(initialBlock);

  const [currentActive, setCurrentActive] = useState<Block | undefined>(
    undefined
  );

  useEffect(() => {
    if (!currentBlocks) return setCurrentActive(undefined);
    if (!currentActive) return;
    if (!currentBlocks.some((block) => block.slug === currentActive.slug)) {
      setCurrentActive(undefined);
    }
  }, [currentBlocks, currentActive]);

  const handleSeleteBlock = (slug: string) => {
    const block = currentBlocks.find((block) => block.slug === slug);
    if (!block) return setCurrentActive(undefined);
    setCurrentActive(block);
  };

  const handleAddBlock = (slug: string) => {
    const block = optionBlocks.find((block) => block.slug === slug);
    if (!block) return;
    setCurrentBlocks([...currentBlocks, block]);
    setCurrentActive(block);
    setOptionBlocks(optionBlocks.filter((block) => block.slug !== slug));
  };

  const handleBlockDelete = (slug: string) => {
    const blockIdx = currentBlocks.findIndex((block) => block.slug === slug);
    if (blockIdx === -1) return;
    const block = currentBlocks[blockIdx];
    console.log(block);
    setOptionBlocks([...optionBlocks, block]);
    setCurrentActive(blockIdx === 0 ? undefined : currentBlocks[blockIdx - 1]);
    const newBlocks = [...currentBlocks.filter((block) => block.slug !== slug)];
    console.log(newBlocks);
    setCurrentBlocks(newBlocks);
  };

  const handleBlockChange = (markdown: string) => {
    if (!currentActive) return;
    const newBlock = { ...currentActive, markdown };
    setCurrentBlocks(
      currentBlocks.map((block) =>
        block.slug === newBlock.slug ? newBlock : block
      )
    );
    setCurrentActive(newBlock);
  };

  const handleResetBlock = (slug: string) => {
    const block = currentBlocks.find((block) => block.slug === slug);
    const orignalnamMarkdown = initialBlock.find(
      (block) => block.slug === slug
    );
    if (!block || !orignalnamMarkdown) return;
    const newBlock = { ...orignalnamMarkdown };
    setCurrentBlocks((prev) =>
      prev.map((block) => (block.slug === newBlock.slug ? newBlock : block))
    );
    setCurrentActive(newBlock);
  };

  const handleResetSelectedBlocks = () => {
    setCurrentBlocks([]);
    setCurrentActive(undefined);
    setOptionBlocks(initialBlock);
  };

  return {
    currentBlocks,
    setCurrentBlocks,
    optionBlocks,
    setOptionBlocks,
    handleAddBlock,
    handleBlockDelete,
    handleSeleteBlock,
    currentActive,
    handleBlockChange,
    handleResetBlock,
    handleResetSelectedBlocks,
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
  _useBlocksLocalStorageSync(value);
  return (
    <BlocksContext.Provider value={value}>{children}</BlocksContext.Provider>
  );
};

export const _useBlocksLocalStorageSync = ({
  currentBlocks,
  setCurrentBlocks,
  setOptionBlocks,
  currentActive,
  handleSeleteBlock,
}: ReturnType<typeof _useBlocks>) => {
  const [initial, setInitial] = useState(true);
  const [localBlocks, setLocalBlocks] = useLocalStorage<Block[]>("blocks", []);
  const [localActive, setLocalActive] = useLocalStorage<Block | undefined>(
    "active_block",
    undefined
  );

  useEffect(() => {
    if (!initial) return;
    if (localBlocks) {
      setCurrentBlocks(localBlocks);
      setOptionBlocks((prev) => {
        return prev.filter(
          (block) => !localBlocks.some((b) => b.slug === block.slug)
        );
      });
    }
    if (localActive) {
      handleSeleteBlock(localActive.slug);
    }
    setInitial(false);
  }, [localBlocks, localActive, initial]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentBlocks.length === 0) return;
    setLocalBlocks(currentBlocks);
  }, [currentBlocks, setLocalBlocks]);

  useEffect(() => {
    if (!currentActive) return;
    setLocalActive(currentActive);
  }, [currentActive, setLocalActive]);
};
