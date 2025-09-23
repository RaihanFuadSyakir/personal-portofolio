
// About.jsx
import { Badge } from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
export default function About({avatarUrl} : {avatarUrl : string | undefined}) {
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
              <Avatar >
                <AvatarImage
                src={avatarUrl} 
                className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-gray-200 dark:border-gray-700"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
                {/* Profile Content */}
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I&apos;m a developer passionate about building scalable and efficient software solutions. 
                I work across the full stack, with expertise in <span className="font-semibold">Frontend</span>, 
                <span className="font-semibold">Backend</span>, and <span className="font-semibold">DevOps</span> 
                practices, using modern frameworks and tools like <span className="font-semibold">React</span>, 
                <span className="font-semibold">Next.js</span>, <span className="font-semibold">Node.js</span>, 
                and cloud platforms.
              </p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>💻 Full-Stack Development (Frontend & Backend)</li>
                <li>⚙️ Backend & API Design</li>
                <li>🎨 Implement UI/UX to Frontend</li>
                <li>🚀 DevOps: CI/CD, Cloud Deployment, & Automation</li>
              </ul>
              <div className="mt-8">
                <a
                  href="#project"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Explore Projects
                </a>
              </div>
        </div>
        {/* Tech Stack Section */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🛠 Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {/* Full Stack */}
            <Badge variant="secondary">Laravel</Badge>
            <Badge variant="secondary">Next.js</Badge>

            {/* Backend */}
            <Badge variant="secondary">Go</Badge>
            <Badge variant="secondary">Express.js</Badge>
            <Badge variant="secondary">Java Spring Boot</Badge>
            <Badge variant="secondary">Flask</Badge>

            {/* Frontend */}
            <Badge variant="secondary">React (Vite)</Badge>
            <Badge variant="secondary">Vue</Badge>
            <Badge variant="secondary">Blade (PHP)</Badge>

            {/* UI Libraries */}
            <Badge variant="secondary">Material UI</Badge>
            <Badge variant="secondary">Shadcn</Badge>

            {/* Focus */}
            <Badge variant="outline">Mostly Full Stack with <span className="font-bold">Laravel</span> & <span className="font-bold">Next.js</span></Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
