import { useTranslation } from "@/app/i18n";
import { Editor } from "@/components/editor";
import { OptionBlocks } from "@/components/option-blocks";
import { SelectedBlocks } from "@/components/selected-blocks";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Viewer } from "@/components/viewer";
import { BlocksProvider } from "@/hooks/use-blocks";
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
          <Link href="/">logo</Link>
        </div>
        <div>download</div>
      </nav>
      <BlocksProvider>
        <main className="flex h-[calc(100%-70px)]">
          <div className="w-[320px] border border-b-0 border-l h-full ">
            <ResizablePanelGroup className="h-full" direction="vertical">
              <ResizablePanel minSize={10} className="p-2">
                <h2 className="font-bold">{t("userSelected")}</h2>
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
                <TabsList>
                  <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
                  <TabsTrigger value="raw">{t("raw")}</TabsTrigger>
                </TabsList>
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
      </BlocksProvider>
    </div>
  );
};

export default Page;
