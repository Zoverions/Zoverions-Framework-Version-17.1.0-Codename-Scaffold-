import React from 'react';
import type { Section } from '../types';
import SectionContentRenderer from './SectionContentRenderer';

interface SectionCardProps {
  section: Section;
  id?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, id }) => (
  <div id={id} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24">
    <h3 className="text-2xl font-bold text-cyan-300 border-b border-cyan-300/20 pb-3 mb-6">
      {section.title}
    </h3>
    <div className="space-y-6">
      {section.content.map((contentItem, i) => (
        <SectionContentRenderer key={i} contentItem={contentItem} />
      ))}
    </div>
  </div>
);

export default SectionCard;
