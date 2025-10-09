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
import {
  Sparkles,
  X,
  Menu,
  User,
  Home,
  FolderKanban,
  Moon,
  Sun,
} from "lucide-react";
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
    { href: "#home", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#project", label: "Projects", icon: FolderKanban },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-deepsea-base shadow-md z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          <User className="w-6 h-6 text-blue-500 dark:text-cyan-500 drop-shadow-[0_0_6px_rgba(14,165,233,0.6)]" />
          <span className="text-foreground">My Profile</span>
        </div>

        {/* --- Desktop Navbar --- */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu onClick={goToPageSection}>
            <NavigationMenuList className="flex gap-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = section === item.href;

                return (
                  <NavigationMenuItem key={item.href} className="group/item">
                    <NavigationMenuLink
                      href={item.href}
                      className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-300
                ${
                  isActive
                    ? "!text-blue-500 dark:!text-cyan-400 bg-white dark:bg-slate-800"
                    : "text-muted-foreground hover:text-blue-400 dark:hover:text-cyan-300"
                }`}
                    >
                      {/* icon */}
                      <Icon
                        className={`w-4 h-4 transition-all duration-200
                  ${
                    isActive
                      ? "text-blue-500 dark:text-cyan-400"
                      : "text-slate-500 dark:text-slate-400 group-hover/item:text-blue-400 dark:group-hover/item:text-cyan-300 group-hover/item:-translate-y-[1px]"
                  }`}
                      />

                      {/* label */}
                      <span className="transition-colors group-hover/item:text-blue-500 dark:group-hover/item:text-cyan-400">
                        {item.label}
                      </span>

                      {/* active underline */}
                      {isActive && (
                        <span className="absolute bottom-1 left-0 right-0 mx-auto h-[2px] w-6 bg-blue-400 dark:bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
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
          {/* dynamic icon */}
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-cyan-400 transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500 transition-transform duration-300 rotate-0 scale-100" />
          )}

          <Label
            htmlFor="dark-mode-mobile"
            className="text-sm text-muted-foreground select-none"
          >
            {theme === "light" ? "Light" : "Dark"} Mode
          </Label>
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
                  Navigation
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
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = section === item.href;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group/item flex items-center gap-3 relative transition-colors duration-200
              ${
                isActive
                  ? "text-blue-500 dark:text-cyan-400"
                  : "text-foreground hover:text-blue-400 dark:hover:text-cyan-300"
              }`}
                    >
                      {/* icon */}
                      <Icon
                        className={`w-5 h-5 transition-all duration-200 ${
                          isActive
                            ? "text-blue-500 dark:text-cyan-400"
                            : "text-slate-500 dark:text-slate-400 group-hover/item:text-blue-400 dark:group-hover/item:text-cyan-300 group-hover/item:-translate-y-[1px]"
                        }`}
                      />

                      {/* label */}
                      <span className="transition-colors group-hover/item:text-blue-500 dark:group-hover/item:text-cyan-400">
                        {item.label}
                      </span>

                      {/* active underline */}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 w-6 h-[2px] bg-blue-400 dark:bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                      )}
                    </a>
                  );
                })}

                {/* Theme switch */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  {/* Label + icons */}
                  <div className="flex items-center space-x-3">
                    {/* dynamic icon */}
                    {theme === "dark" ? (
                      <Moon className="w-5 h-5 text-cyan-400 transition-transform duration-300 rotate-0 scale-100" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500 transition-transform duration-300 rotate-0 scale-100" />
                    )}

                    <Label
                      htmlFor="dark-mode-mobile"
                      className="text-sm text-muted-foreground select-none"
                    >
                      {theme === "light" ? "Light" : "Dark"} Mode
                    </Label>
                  </div>

                  {/* switch */}
                  <Switch
                    id="dark-mode-mobile"
                    checked={theme === "dark"}
                    onCheckedChange={updateTheme}
                    className="transition-all"
                  />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
