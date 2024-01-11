"use client";

import { useTranslation } from "@/app/i18n/client";
import { useCopyBlocks } from "@/hooks/use-copy-blocks";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "./ui/button";
interface CopyBlocksButtonProps extends HTMLAttributes<HTMLDivElement> {}

export const CopyBlocksButton = ({
  className,
  ...props
}: CopyBlocksButtonProps) => {
  const { copyBlocks } = useCopyBlocks();
  const lng = useLanguage();
  const { t } = useTranslation(lng, "editor");
  return (
    <div className={cn(className)} {...props}>
      <Button
        variant={"ghost"}
        onClick={() => {
          copyBlocks();
        }}
        className="flex items-center gap-1"
      >
        <Copy size={16} />
        <span className="font-mono font-medium text-xs">{t("copy")}</span>
      </Button>
    </div>
  );
};
