import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

import { BlocksProvider } from "@/hooks/use-blocks";
import "../globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
  params: { lng },
}: {
  children: JSX.Element;
  params: {
    lng: string;
  };
}) {
  return (
    <html>
      <body
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Toaster />
        <BlocksProvider>{children}</BlocksProvider>
      </body>
    </html>
  );
}