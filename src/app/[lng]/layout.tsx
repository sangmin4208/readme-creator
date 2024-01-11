import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

import { BlocksProvider } from "@/hooks/use-blocks";
import "../globals.css";

export const metadata: Metadata = {
  title: "README EASY",
  description: "Build your README.md file with ease.",
};
export default function RootLayout({ children }: { children: JSX.Element }) {
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
