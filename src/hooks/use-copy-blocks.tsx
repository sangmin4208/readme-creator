import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { useBlocks } from "./use-blocks";

export const useCopyBlocks = () => {
  const [value, copy] = useCopyToClipboard();
  const { currentBlocks } = useBlocks();

  const copyBlocks = async () => {
    const text = currentBlocks.map((block) => block.markdown).join("");
    await copy(text);
    toast.success("Copied to clipboard!");
  };

  return {
    copyBlocks,
  };
};
