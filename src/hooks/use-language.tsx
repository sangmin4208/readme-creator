import { fallbackLng, languages } from "@/app/i18n/settings";
import { usePathname } from "next/navigation";

export const useLanguage = () => {
  const pathname = usePathname();
  const lng = pathname.split("/")[1];

  return languages.includes(lng) ? lng : fallbackLng;
};
