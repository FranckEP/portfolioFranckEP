"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/profile.jpg"
          alt="Franck Echeverría Peñaloza"
          width={120}
          height={120}
          className="mx-auto rounded-full border-4 border-sky-500"
        />
        <h1 className="text-4xl font-bold mt-4">Franck Echeverría Peñaloza</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto">
          Data Analyst | BI Analyst | Data Engineer
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-xl mx-auto">
          I transform data into business value through analytics, automation, and storytelling.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#projects"
            className="bg-sky-500 text-white px-5 py-2 rounded-full hover:bg-sky-600 transition"
          >
            View Projects
          </a>
          <a
            href="\CurriculumFranckEP.pdf"
            className="border border-sky-500 text-sky-500 px-5 py-2 rounded-full hover:bg-sky-50 dark:hover:bg-slate-800 transition"
            download
          >
            Download CV
          </a>
        </div>
      </motion.div>

      {/* About Section */}
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
