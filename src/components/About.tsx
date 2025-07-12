"use client";

import { motion } from "framer-motion";

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
          I’m a data professional passionate about transforming complex data
          into actionable strategies. With strong skills in Python, SQL, and
          cloud-based tools, I’ve built scalable ETL pipelines, interactive
          dashboards, and predictive models to drive business performance. I
          enjoy working at the intersection of data engineering and business
          intelligence — extracting insights from APIs, automating workflows,
          and delivering dashboards that help decision-makers act with
          confidence. My background includes end-to-end projects involving
          Looker Studio, Power BI, BigQuery, Airflow, and more. Beyond the
          tools, I care about impact: helping businesses understand their users,
          optimize operations, and make smarter decisions with clean,
          structured, and visualized data.
        </p>
      </motion.div>
    </section>
  );
}
