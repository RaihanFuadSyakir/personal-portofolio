"use client"
import {NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
export default function Navbar() {
const goToPageSection = (event: React.SyntheticEvent) => {
  const target = event.target as HTMLAnchorElement;
  const sectionId = target.getAttribute("href")?.substring(1);
  if (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
}
useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        // small timeout ensures DOM is ready
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);
	return (
	<div className="fixed top-0 left-0 w-full h-16 bg-deepsea-base flex items-center justify-center shadow-md z-50">
		<NavigationMenu onClick={goToPageSection}>
		  <NavigationMenuList className="flex gap-6">
		    <NavigationMenuItem>
			<NavigationMenuLink href="#home">Home</NavigationMenuLink>
		    </NavigationMenuItem>
		    <NavigationMenuItem>
		      <Button>
			<NavigationMenuLink href="#about">About</NavigationMenuLink>
		      </Button>
		    </NavigationMenuItem>
		    <NavigationMenuItem>
		      <Button>
			<NavigationMenuLink href="#project">Project</NavigationMenuLink>
		      </Button>
		    </NavigationMenuItem>
		  </NavigationMenuList>
		</NavigationMenu>
	</div>
)};
