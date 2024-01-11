"use client";
import { useBlocks } from "@/hooks/use-blocks";
import { cn } from "@/lib/utils";
import { ListRestart } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "./ui/button";

import { useTranslation } from "@/app/i18n/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/hooks/use-language";

interface ResetSelectedBlocksButtonProps
  extends HTMLAttributes<HTMLDivElement> {}

export const ResetSelectedBlocksButton = ({
  className,
  ...props
}: ResetSelectedBlocksButtonProps) => {
  const { handleResetSelectedBlocks } = useBlocks();
  const lng = useLanguage();
  const { t } = useTranslation(lng, "editor");

  return (
    <div className={cn(className)} {...props}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"}>
            <ListRestart />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("resetSelectedBlocksTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("resetSelectedBlocksDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetSelectedBlocks}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
