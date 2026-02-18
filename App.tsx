import React, { useState } from 'react';
import { frameworkData } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import PartComponent from './components/PartComponent';
import TableOfContents from './components/TableOfContents';
import BackToTop from './components/BackToTop';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans relative">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Header />

          <div className="flex flex-col lg:flex-row gap-8 relative">
            {/* Mobile TOC Toggle */}
            <button
                className="lg:hidden fixed bottom-8 left-8 z-50 p-3 bg-gray-800 text-cyan-400 rounded-full shadow-lg border border-cyan-500/30"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle Table of Contents"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Sidebar / TOC */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-gray-900 border-r border-gray-800 p-6 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:bg-transparent lg:border-r-0 lg:w-1/4 lg:block
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
            `}>
                <div className="sticky top-8">
                   <div className="flex justify-between items-center lg:hidden mb-4">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                   </div>
                    <TableOfContents />
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 lg:w-3/4 min-w-0">
                {frameworkData.parts.map((part) => (
                <PartComponent key={part.id} part={part} />
                ))}
            </main>
        </div>

        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default App;
