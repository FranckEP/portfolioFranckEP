"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectsData = [
 /* {
    id: 1,
    title: "Telco Operational Monitoring",
    category: "Data Engineering",
    description:
      "Simulated performance analysis in a telecom environment with Python, SQL, and Looker Studio to detect anomalies and improve response times.",
    repo: "https://github.com/FranckEP/Telco-Operational-Monitoring",
  },
  {
    id: 2,
    title: "Retail Sales Dashboard",
    category: "Dashboards",
    description:
      "Power BI dashboard analyzing Superstore sales to identify trends, top products, and regional performance for strategic decisions.",
    repo: "https://github.com/FranckEP/Retail-Sales-Dashboard",
  },
  {
    id: 3,
    title: "Customer Churn Prediction",
    category: "Data Analysis",
    description:
      "Logistic regression model predicting customer churn for telco data with scikit-learn and business recommendations.",
    repo: "https://github.com/FranckEP/Customer-Churn-Prediction",
  },*/
  {
    id: 4,
    title: "Data Source API Analyst",
    category: ["Data Analysis", "Data Engineering"],
    description:
      "Built a reusable Python module to extract and analyze data from the GitHub API, including authentication, repository searches, commit extraction, and data structuring for analysis.",
    repo: "https://github.com/FranckEP/Data-Source-API-Analyst",
  },
  {
    id: 5,
    title: "Banks Market Capitalization ETL",
    category: "Data Engineering",
    description:
      "Developed an ETL pipeline using Python to extract, transform, and load banks market capitalization data, demonstrating data engineering and financial data automation skills.",
    repo: "https://github.com/FranckEP/Banks-Market-Capitalization-ETL-Project",
  },
  {
    id: 6,
    title: "Data Cleaning & EDA – Retail Sales",
    category: "Data Analysis",
    description:
      "Performed data cleaning and exploratory data analysis (EDA) on online retail sales using Python. Identified null values, duplicate records, and generated visual insights for decision support.",
    repo: "https://github.com/FranckEP/Data-Cleaning-EDA-Online-Retail-Sales-Data",
  },
  {
    id: 7,
    title: "Reddit Trend Tracker – ETL to BigQuery & Looker",
    category: ["Data Engineering", "Dashboards"],
    description:
      "End-to-end ETL pipeline that extracts Reddit trends using Python, loads structured data into Google BigQuery, and visualizes insights in Looker Studio. Includes deduplication logic and automation.",
    repo: "https://github.com/FranckEP/Reddit-Trend-Tracker-ETL-Pipeline-to-Google-BigQuery-and-Looker-Studio",
  },
];

const categories = ["All", "Data Analysis", "Dashboards", "Data Engineering"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((project) =>
          Array.isArray(project.category)
            ? project.category.includes(selectedCategory)
            : project.category === selectedCategory
        );

  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? "bg-sky-500 text-white border-sky-500"
                  : "text-sky-500 border-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800"
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
