import Image from "next/image";
import Home from "./Home";
import About from "./About";
import Project from "./Project";

export default function Page() {
  return (
  <div className="mt-16">
  	<Home/>
	<About/>
	<Project/>
  </div>
  );
}
