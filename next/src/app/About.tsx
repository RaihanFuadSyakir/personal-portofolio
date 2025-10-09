// About.jsx
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Code2,
  Cpu,
  FolderOpen,
  Layers,
  Layout,
  Palette,
  Rocket,
  Server,
  Workflow,
  Wrench,
} from "lucide-react";
interface AboutProps {
  avatarUrl: string | undefined;
  name: string | undefined;
}
export default function About({ avatarUrl, name }: AboutProps) {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center bg-slate-200 dark:bg-gray-800 px-6 py-16 rounded-md"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
        </div>
        <div className="flex justify-center">
          <Avatar>
            <AvatarImage
              src={avatarUrl}
              className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-gray-200 dark:border-gray-700"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {/* Profile Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hi, I&apos;m{" "}
            <span className="text-blue-600 inline md:block">{name}</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
            I&apos;m a developer passionate about building scalable and
            efficient software solutions. I work across the full stack, with
            expertise in <span className="font-semibold">Frontend</span>,{" "}
            <span className="font-semibold">Backend</span>, and{" "}
            <span className="font-semibold">DevOps</span> practices, using
            modern frameworks and tools like{" "}
            <span className="font-semibold">React</span>,{""}
            <span className="font-semibold">Next.js</span>,{" "}
            <span className="font-semibold">Node.js</span>, and cloud platforms.
          </p>
        </div>
        <div className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-xl shadow-sm border border-slate-200/40 dark:border-slate-700/40">
          <ul className="space-y-4 text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span className="font-medium">
                Full-Stack Development (Frontend & Backend)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Server className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span className="font-medium">Backend & API Design</span>
            </li>
            <li className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span className="font-medium">Implement UI/UX to Frontend</span>
            </li>
            <li className="flex items-center gap-3">
              <Workflow className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span className="font-medium">
                DevOps: CI/CD, Cloud Deployment, & Automation
              </span>
            </li>
          </ul>

          <div className="mt-8">
            <a
              href="#project"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-200"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Explore Projects</span>
            </a>
          </div>
        </div>
        {/* Tech Stack Section */}
        <div className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200/40 dark:border-slate-700/40 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
            <Wrench className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            Tech Stack
          </h3>

          <div className="space-y-5">
            {/* === Full Stack === */}
            <div>
              <h4 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Layers className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                Full Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-cyan-900/40 dark:text-cyan-300">
                  Laravel
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-cyan-900/40 dark:text-cyan-300">
                  Next.js
                </Badge>
              </div>
            </div>

            {/* === Backend === */}
            <div>
              <h4 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Server className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                Backend
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                  Go
                </Badge>
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                  Express.js
                </Badge>
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                  Java Spring Boot
                </Badge>
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                  Flask
                </Badge>
              </div>
            </div>

            {/* === Frontend === */}
            <div>
              <h4 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Layout className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  React (Vite)
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Vue
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Blade (PHP)
                </Badge>
              </div>
            </div>

            {/* === UI Libraries === */}
            <div>
              <h4 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Palette className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                UI Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300">
                  Material UI
                </Badge>
                <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300">
                  Shadcn
                </Badge>
              </div>
            </div>
            {/* ETL & Automation */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Workflow className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  ETL & Automation
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                  Python
                </Badge>
                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                  Airflow
                </Badge>
                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                  Crontab
                </Badge>
              </div>
            </div>
{/* Deployment & DevOps */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
            <span className="font-medium text-gray-800 dark:text-gray-200">Deployment & DevOps</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Nginx</Badge>
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Reverse Proxy</Badge>
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Docker</Badge>
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Docker Compose</Badge>
          </div>
        </div>
            {/* === Focus === */}
            <div className="pt-2">
              <Badge
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm"
              >
                Mostly Full Stack with{" "}
                <span className="font-semibold text-blue-600 dark:text-cyan-400 mx-1">
                  Laravel
                </span>
                &
                <span className="font-semibold text-blue-600 dark:text-cyan-400 mx-1">
                  Next.js
                </span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
