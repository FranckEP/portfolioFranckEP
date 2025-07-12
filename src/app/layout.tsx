import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Franck Echeverría Peñaloza | Data & BI Portfolio',
  description: 'Data Analyst, BI Analyst, and Data Engineer Portfolio showcasing analytics, dashboards, and data engineering projects.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-slate-800 dark:bg-slate-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
