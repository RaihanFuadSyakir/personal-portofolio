
// About.jsx
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
            I'm a developer who enjoys creating meaningful digital experiences.
            My main focus is building responsive web apps with modern frameworks 
            like <span className="font-semibold">React</span>,{" "}
            <span className="font-semibold">Next.js</span>, and{" "}
            <span className="font-semibold">Laravel</span>.
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>💻 Full-Stack Development</li>
            <li>🎨 UI/UX Design Enthusiast</li>
            <li>🚀 Always Learning & Exploring</li>
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

      </div>
    </section>
  );
}
