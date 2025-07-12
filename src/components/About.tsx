'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          I am a proactive data professional with strong skills in Python, SQL, BI tools like Power BI and Looker Studio, and modern ETL frameworks like Airflow and Kafka. I enjoy discovering actionable insights that drive business decisions and implementing data pipelines that ensure reliable, scalable analytics solutions.
        </p>
      </motion.div>
    </section>
  );
}
