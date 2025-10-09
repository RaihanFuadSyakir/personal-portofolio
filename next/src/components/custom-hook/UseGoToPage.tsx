
"use client";
import { useRouter } from "next/navigation";

export function useGoToPageSection(setSection?: (id: string) => void) {
  const router = useRouter();
  return (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const sectionId = target.getAttribute("href")?.substring(1);

    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const hash =`#${sectionId}`; 
        router.push(hash);
        section.scrollIntoView({ behavior: "smooth" });
        if(setSection)
          setSection(hash);
      }
    }
  };
}
