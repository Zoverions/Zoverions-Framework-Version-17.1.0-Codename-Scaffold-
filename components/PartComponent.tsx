import React from 'react';
import type { Part } from '../types';
import SectionCard from './SectionCard';

interface PartComponentProps {
  part: Part;
}

const PartComponent: React.FC<PartComponentProps> = ({ part }) => (
  <section id={part.id} className="py-12 scroll-mt-24">
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
        {part.title}
      </h2>
      <p className="mt-3 max-w-2xl mx-auto text-gray-400">
        {part.description}
      </p>
    </div>
    <div className="space-y-8">
      {part.sections.map((section, i) => (
        <SectionCard key={i} section={section} id={`${part.id}-section-${i}`} />
      ))}
    </div>
  </section>
);

export default PartComponent;
