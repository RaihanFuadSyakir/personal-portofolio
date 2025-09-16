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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGoToPageSection } from "@/components/custom-hook/UseGoToPage";
export default function Navbar() {
const router = useRouter();
const goToPageSection = useGoToPageSection();
useEffect(() => {
    setDefaultTheme();
    updateSection();
  }, []);
const [theme, setTheme] = useState<string| null>(null);
const [open, setOpen] = useState(false);
const setDefaultTheme = () => {
	const localTheme = localStorage.getItem("theme");
	let appliedTheme;
	if (localTheme) {
		setTheme(localTheme);
		appliedTheme = localTheme;
	} else {
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		setTheme(prefersDark ? "dark" : "light");
		appliedTheme = prefersDark ? "dark" : "light";
	}
	const root = document.documentElement;
	const isDark = appliedTheme === "dark";
	root.classList.toggle("dark", isDark);
}
const updateTheme = (checked: boolean) => {
	if(checked){
		setTheme("dark");
		localStorage.setItem("theme", "dark"); 
		document.documentElement.classList.add("dark");
	} else {
		setTheme("light");
		localStorage.setItem("theme", "light"); 
		document.documentElement.classList.remove("dark");
	}
}
const [section, setSection] = useState<string | null>(null);
const updateSection = () => {
    if (!window.location.hash) {
      router.push("#home");
    } 
    const sectionId = window.location.hash.substring(1);
    const sectionLocal = document.getElementById(sectionId);
    setSection(`#${sectionId}`);
    if (sectionLocal) {
	    // small timeout ensures DOM is ready
	    setTimeout(() => {
		    sectionLocal.scrollIntoView({ behavior: "smooth" });
	    }, 100);
    }
}
return (
	<div className="fixed top-0 left-0 w-full bg-deepsea-base shadow-md z-50">
	      <div className="flex items-center justify-between h-16 px-4">
		{/* Logo / Brand */}
		<div className="font-bold">My Profile</div>

		{/* --- Desktop Navbar --- */}
		<div className="hidden md:flex flex-1 items-center justify-center">
		  <NavigationMenu  onClick={goToPageSection}>
		    <NavigationMenuList className="flex gap-6">
		      <NavigationMenuItem>
			<NavigationMenuLink href="#home" active={section === "#home"}>Home</NavigationMenuLink>
		      </NavigationMenuItem>
		      <NavigationMenuItem>
			<NavigationMenuLink href="#about" active={section === "#about"}>About</NavigationMenuLink>
		      </NavigationMenuItem>
		      <NavigationMenuItem>
			<NavigationMenuLink href="#project" active={section === "#project"}>Project</NavigationMenuLink>
		      </NavigationMenuItem>
		    </NavigationMenuList>
		  </NavigationMenu>
		</div>

		{/* Right Controls */}
		<div className="hidden md:flex items-center space-x-2">
		  <Switch id="dark-mode" checked={theme === "dark"} onCheckedChange={updateTheme}/>
		  <Label htmlFor="dark-mode">Dark Mode</Label>
		</div>

		{/* --- Mobile Toggle Button --- */}
		<button
		  className="md:hidden p-2"
		  onClick={() => setOpen(!open)}
		>
		  ☰
		</button>
	      </div>

	      {/* --- Mobile Sidebar --- */}
	      <div
		className={`fixed top-0 left-0 h-full w-64 bg-deepsea-base shadow-lg transform transition-transform duration-300 z-40 ${
		  open ? "translate-x-0" : "-translate-x-full"
		}`}
	      >
		<div className="p-4 flex justify-between items-center border-b">
		  <span className="font-bold">Menu</span>
		  <button onClick={() => setOpen(false)}>✕</button>
		</div>
		<nav className="flex flex-col space-y-4 p-4" onClick={goToPageSection}>
		  <a href="#home" onClick={() => setOpen(false)}>Home</a>
		  <a href="#about" onClick={() => setOpen(false)}>About</a>
		  <a href="#project" onClick={() => setOpen(false)}>Project</a>
		  <div className="flex items-center space-x-2 pt-4 border-t">
		    <Switch id="dark-mode-mobile" checked={theme === "dark"} onCheckedChange={updateTheme}/>
		    <Label htmlFor="dark-mode-mobile">Dark Mode</Label>
		  </div>
		</nav>
	      </div>
	    </div>
)};
