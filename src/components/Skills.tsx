'use client';

import { motion } from 'framer-motion';
import { FaPython, FaDatabase, FaCloud, FaTable } from 'react-icons/fa';
import { SiTableau, SiGooglecloud, SiApacheairflow, SiApachespark } from 'react-icons/si';
import { BiBarChartAlt2 } from 'react-icons/bi';


export default function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Skills & Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Python */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaPython className="text-yellow-500" /> Python
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>Pandas, NumPy</li>
              <li>Matplotlib, Seaborn</li>
              <li>Scikit-learn, Web Scraping</li>
            </ul>
          </div>

          {/* SQL */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaDatabase className="text-red-600" /> SQL
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>PostgreSQL, MySQL</li>
              <li>Snowflake</li>
              <li>Data Modeling, DBA Foundations</li>
              <li>Google BigQuery</li>
            </ul>
          </div>

          {/* BI Tools */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BiBarChartAlt2 className="text-yellow-500" /> BI Tools
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>Power BI</li>
              <li>Looker Studio</li>
            </ul>
          </div>

          {/* Cloud */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <SiGooglecloud className="text-blue-500" /> Cloud
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>Google Cloud</li>
              <li>Azure</li>
              <li>Cloud SQL</li>
            </ul>
          </div>

          {/* Data Engineering */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <SiApacheairflow className="text-green-600" /> Data Engineering
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>Airflow</li>
              <li>Kafka</li>
              <li>Shell Scripting</li>
              <li>RAID</li>
            </ul>
          </div>

          {/* Others */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaTable className="text-gray-600" /> Others
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>Excel Advanced</li>
              <li>Git & GitHub</li>
              <li>API Integration</li>
              <li>React, Typescript, Next.js</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
