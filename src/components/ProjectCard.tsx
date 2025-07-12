'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ project }: { project: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {project.description.slice(0, 80)}...
      </p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sky-500 hover:underline"
      >
        {isOpen ? 'Show Less' : 'Read More'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            <p>{project.description}</p>

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 border border-sky-500 text-sky-500 rounded hover:bg-sky-50 dark:hover:bg-slate-800 transition"
              >
                View GitHub Repo
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
