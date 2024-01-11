import { useTranslation } from "@/app/i18n";
import { CopyBlocksButton } from "@/components/copy-blocks-button";
import { DownloadBlocksButton } from "@/components/download-blocks-button";
import { Editor } from "@/components/editor";
import { OptionBlocks } from "@/components/option-blocks";
import { ResetSelectedBlocksButton } from "@/components/reset-selected-blocks-button";
import { SelectedBlocks } from "@/components/selected-blocks";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Viewer } from "@/components/viewer";
import { ShapesIcon } from "lucide-react";
import Link from "next/link";

const Page = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = await useTranslation(lng, "editor");

  return (
    <div className="h-full">
      <nav className="flex justify-between items-center px-5 h-[70px] bg-slate-800 text-white text-2xl">
        <div>
          <Link className="flex gap-2 items-center hover:opacity-80" href="/">
            <ShapesIcon size={32} />
            <h1 className="text-2xl font-bold">README BUILDER</h1>
          </Link>
        </div>
        <div>
          <DownloadBlocksButton />
        </div>
      </nav>
      <main className="flex h-[calc(100%-70px)]">
        <div className="w-[320px] border border-b-0 border-l h-full ">
          <ResizablePanelGroup className="h-full" direction="vertical">
            <ResizablePanel minSize={10} className="p-2">
              <div className="flex justify-between">
                <h2 className="font-bold">{t("userSelected")}</h2>
                <ResetSelectedBlocksButton />
              </div>
              <SelectedBlocks className="h-full scrollbar-hide" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="px-2">
              <span className="text-gray-600 text-xs">
                {t("selectDestination")}
              </span>
              <OptionBlocks className="h-full scrollbar-hide mt-2" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel className="grow p-2">
            {/* Editor */}
            <h2 className="font-bold">{t("editor")}</h2>
            <Editor className="mt-8" />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="grow p-2 h-full">
            <Tabs defaultValue="preview" className="h-full">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
                  <TabsTrigger value="raw">{t("raw")}</TabsTrigger>
                </TabsList>
                <CopyBlocksButton />
              </div>

              <TabsContent className="h-full pb-10" value="preview">
                <Viewer />
              </TabsContent>
              <TabsContent className="h-full pb-10" value="raw">
                <Viewer isRaw />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Page;
