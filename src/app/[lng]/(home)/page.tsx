"use client";

import { useTranslation } from "@/app/i18n/client";
import { defaultNS, languages } from "@/app/i18n/settings";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

export default function Home({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = useTranslation(lng, defaultNS);
  const title = t("title");
  return (
    <div className="bg-gray-50 h-full">
      <div className="relative overflow-hidden">
        <div
          className={cn("flex flex-col items-center gap-4 mt-4", {
            "flex-col-reverse": lng === "ko",
          })}
        >
          <h2 className="text-5xl text-center">{title}</h2>
          <h2 className="text-5xl text-center text-green-500">README</h2>
        </div>
        <div className="flex gap-2 mt-8 justify-center items-center">
          <Trans i18nKey="languageSwitcher" t={t}>
            {{ lng }}
          </Trans>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <Globe />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lng) => (
                  <DropdownMenuItem key={lng} asChild>
                    <Link href={`/${lng}`} key={lng}>
                      {lng}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Button>
            <Link href="/editor">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
