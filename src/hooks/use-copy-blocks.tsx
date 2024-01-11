import { useTranslation } from "@/app/i18n/client";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { useBlocks } from "./use-blocks";
import { useLanguage } from "./use-language";

export const useCopyBlocks = () => {
  const [value, copy] = useCopyToClipboard();
  const lng = useLanguage();
  const { t } = useTranslation(lng, "editor");
  const { currentBlocks } = useBlocks();

  const copyBlocks = async () => {
    const text = currentBlocks.map((block) => block.markdown).join("");
    await copy(text);
    toast.success(t("copySuccess"));
  };

  return {
    copyBlocks,
  };
};
