import React, { useState, useEffect } from 'react';
import { frameworkData } from '../constants';

const TableOfContents: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    frameworkData.parts.forEach((part) => {
      const partElem = document.getElementById(part.id);
      if (partElem) observer.observe(partElem);
      part.sections.forEach((_, index) => {
         const sectionId = `${part.id}-section-${index}`;
         const sectionElem = document.getElementById(sectionId);
         if (sectionElem) observer.observe(sectionElem);
      });
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)] custom-scrollbar pr-4">
      <h3 className="text-xl font-bold text-cyan-300 mb-4 sticky top-0 bg-gray-900 py-2 z-10">Contents</h3>
      <ul className="space-y-4 text-sm">
        {frameworkData.parts.map((part) => (
          <li key={part.id}>
            <a
              href={`#${part.id}`}
              onClick={(e) => handleClick(e, part.id)}
              className={`block hover:text-cyan-300 transition-colors ${activeId === part.id ? 'text-cyan-300 font-bold' : 'text-gray-400'}`}
            >
              {part.title}
            </a>
            {part.sections.length > 0 && (
              <ul className="ml-4 mt-2 space-y-2 border-l border-gray-700 pl-4">
                {part.sections.map((section, index) => {
                    const sectionId = `${part.id}-section-${index}`;
                    return (
                        <li key={index}>
                          <a
                            href={`#${sectionId}`}
                            onClick={(e) => handleClick(e, sectionId)}
                            className={`block hover:text-cyan-300 transition-colors ${activeId === sectionId ? 'text-cyan-300 font-bold' : 'text-gray-500'}`}
                          >
                            {section.title}
                          </a>
                        </li>
                    );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
