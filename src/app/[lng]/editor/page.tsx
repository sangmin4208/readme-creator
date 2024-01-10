import { useTranslation } from "@/app/i18n";
import { OptionBlocks } from "@/components/option-blocks";
import { SelectedBlocks } from "@/components/selected-blocks";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <nav className="flex justify-between p-5 bg-slate-800 text-white text-2xl">
        <div>
          <Link href="/">logo</Link>
        </div>
        <div>download</div>
      </nav>
      <BlocksProvider>
        <main className="flex h-full">
          <div className="w-[320px] border-l border">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel minSize={10} className="p-2">
                <h2 className="font-medium">{t("userSelected")}</h2>
                <SelectedBlocks className="mt-4 h-full scrollbar-hide" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={8} className="p-2">
                <span className="text-gray-600 text-xs">
                  {t("selectDestination")}
                </span>
                <OptionBlocks className="mt-4" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="grow p-2">
              <h2 className="font-medium">{t("editor")}</h2>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="grow p-2">
              <Tabs defaultValue="preview" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
                  <TabsTrigger value="raw">{t("raw")}</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value="raw">
                  Change your password here.
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
