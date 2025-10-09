"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGoToPageSection } from "@/components/custom-hook/UseGoToPage";
import { Sparkles, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
  const router = useRouter();
  const [section, setSection] = useState<string | null>(null);
  const goToPageSection = useGoToPageSection(setSection);
  useEffect(() => {
    setDefaultTheme();
    updateSection();
  }, []);
  const [theme, setTheme] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const setDefaultTheme = () => {
    const localTheme = localStorage.getItem("theme");
    let appliedTheme;
    if (localTheme) {
      setTheme(localTheme);
      appliedTheme = localTheme;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      appliedTheme = prefersDark ? "dark" : "light";
    }
    const root = document.documentElement;
    const isDark = appliedTheme === "dark";
    root.classList.toggle("dark", isDark);
  };
  const updateTheme = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
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
  };
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#project", label: "Projects" },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-deepsea-base shadow-md z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Sparkles className="w-6 h-6 text-cyan-500 dark:text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
          <span className="text-foreground">My Profile</span>
        </div>

        {/* --- Desktop Navbar --- */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu onClick={goToPageSection}>
            <NavigationMenuList className="flex gap-8">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className={`relative transition-colors duration-300${
                      section === item.href
                        ? "!text-blue-500 focus:text-blue-500 rounded-md dark:text-cyan-400 dark:focus:text-cyan-400 bg-white focus:bg-white dark:bg-slate-800"
                        : "text-muted-foreground hover:text-blue-400 dark:hover:text-cyan-300"
                    }`}
                  >
                    {item.label}
                    {section === item.href && (
                      <span className="absolute-bottom-1 left-0 right-0 mx-auto h-[2px] w-6 bg-blue-400 dark:bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={theme === "dark"}
            onCheckedChange={updateTheme}
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>

        {/* --- Mobile Toggle Button --- */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>

        {/* --- Mobile Sidebar --- */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 z-50 shadow-lg border-r border-white/10
                       bg-white/70 dark:bg-[#0f172a]/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/50
                       dark:supports-[backdrop-filter]:bg-[#0f172a]/60"
            >
              {/* Header */}
              <div className="p-4 flex justify-between items-center border-b border-white/10">
                <span className="font-semibold text-lg text-foreground">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md hover:bg-muted transition"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="flex flex-col space-y-4 p-6 text-lg font-medium"
                onClick={goToPageSection}
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`transition-colors duration-200 relative
                    ${
                      section === item.href
                        ? "text-blue-500 dark:text-cyan-400"
                        : "text-foreground hover:text-blue-400 dark:hover:text-cyan-300"
                    }`}
                  >
                    {item.label}
                    {section === item.href && (
                      <span className="absolute -bottom-1 left-0 w-6 h-[2px] bg-blue-400 dark:bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    )}
                  </a>
                ))}

                {/* Theme switch */}
                <div className="flex items-center space-x-3 pt-6 border-t border-white/10">
                  <Switch
                    id="dark-mode-mobile"
                    checked={theme === "dark"}
                    onCheckedChange={updateTheme}
                  />
                  <Label
                    htmlFor="dark-mode-mobile"
                    className="text-sm text-muted-foreground"
                  >
                    Dark Mode
                  </Label>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
