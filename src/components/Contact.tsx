'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-10">Contact</h2>

        <div className="flex justify-center gap-8 text-3xl">
          <a
            href="https://www.linkedin.com/in/franck02"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-800 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/FranckEP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            <FaGithub />
          </a>

          <a
            href="mailto:franck200402@gmail.com"
            className="text-red-600 hover:text-red-800 transition"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-400">
          Feel free to connect with me for opportunities, collaborations, or questions.
        </p>
      </motion.div>
    </section>
  );
}
