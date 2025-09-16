
"use client";
import { useRouter } from "next/navigation";

export function useGoToPageSection() {
  const router = useRouter();

  return (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const sectionId = target.getAttribute("href")?.substring(1);

    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        router.push(`#${sectionId}`);
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
}
