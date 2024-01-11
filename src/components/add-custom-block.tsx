"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBlocks } from "@/hooks/use-blocks";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

interface AddCustomBlockProps extends HTMLAttributes<HTMLDivElement> {}

export const AddCustomBlock = ({
  className,
  ...props
}: AddCustomBlockProps) => {
  const lng = useLanguage();
  const { t } = useTranslation(lng, "editor");
  const ref = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleAddCustomBlock } = useBlocks();
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    handleAddCustomBlock(data.name);
    ref.current?.click();
  };

  return (
    <div className={cn(className)} {...props}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="w-full">
            Custom Block
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Custom Block</DialogTitle>
            <DialogDescription className="text-xs">
              {t("customBlockModalDescription")}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter custom block name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <DialogFooter>
                <DialogClose asChild>
                  <Button ref={ref} type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit">Done</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
