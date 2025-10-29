
import React from 'react';
import { frameworkData } from './constants';
import type { Section, Part, RedFlag, Tool, HierarchyItem, TierItem, Threat, SectionContent } from './types';

const Header: React.FC = () => (
  <header className="text-center py-12 px-4 border-b border-cyan-300/20">
    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
      {frameworkData.title}
    </h1>
    <p className="mt-2 text-lg text-cyan-200/80">
      Version {frameworkData.version} (Codename: {frameworkData.codename})
    </p>
    <p className="mt-4 max-w-3xl mx-auto text-gray-400">{frameworkData.status}</p>
    <div className="mt-8 max-w-3xl mx-auto p-4 border border-blue-500/30 rounded-lg bg-gray-800/50">
        <p className="text-blue-200 italic">{frameworkData.corePrinciple}</p>
    </div>
  </header>
);

const RedFlagCard: React.FC<{ flag: RedFlag }> = ({ flag }) => (
  <div className="bg-gray-800/50 border border-red-500/30 rounded-lg p-6 transition-all duration-300 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/10 h-full flex flex-col">
    <h4 className="text-xl font-bold text-red-400 flex items-center">
      <span className="text-2xl mr-3">🚩</span> Red Flag: {flag.title}
    </h4>
    <div className="mt-4 space-y-3 text-gray-300 flex-grow">
      <p><strong className="text-gray-100 font-semibold">Pattern:</strong> {flag.pattern}</p>
      <p><strong className="text-red-300 font-semibold">Threat:</strong> {flag.threat}</p>
      {flag.truth && (
        <p className="mt-4 pt-4 border-t border-gray-700"><strong className="text-cyan-300 font-semibold">The Truth:</strong> {flag.truth}</p>
      )}
    </div>
  </div>
);

const SectionContentRenderer: React.FC<{ contentItem: SectionContent }> = ({ contentItem }) => {
  switch (contentItem.type) {
    case 'paragraph':
      return <p className="text-gray-300 leading-relaxed">{contentItem.data as string}</p>;
    case 'list':
      return (
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
          {(contentItem.data as string[]).map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'redFlags':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {(contentItem.data as RedFlag[]).map((flag, i) => <RedFlagCard key={i} flag={flag} />)}
        </div>
      );
    case 'hierarchy':
      return (
        <div className="space-y-3 mt-4">
            {(contentItem.data as HierarchyItem[]).map((item, i) => (
                <div key={i} className="flex items-start p-3 bg-gray-800/40 rounded-md">
                    <span className="font-mono text-cyan-400 bg-gray-700 px-2 py-1 rounded text-sm mr-4">{item.level}</span>
                    <div>
                        <strong className="text-gray-100">{item.title}:</strong>
                        <span className="text-gray-400 ml-2">{item.description}</span>
                    </div>
                </div>
            ))}
        </div>
      );
    case 'tiers':
      return (
         <div className="space-y-3 mt-4">
            {(contentItem.data as TierItem[]).map((item, i) => (
                <div key={i} className="flex items-start p-3 bg-gray-800/40 rounded-md border-l-4 border-cyan-500">
                    <span className="font-bold text-cyan-400 mr-4 w-16">{item.tier}:</span>
                    <div>
                        <strong className="text-gray-100">{item.title}</strong>
                        <p className="text-gray-400">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
      );
    case 'tools':
        return (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(contentItem.data as Tool[]).map((tool, i) => (
                    <div key={i} className="p-6 bg-gray-800/50 border border-blue-500/30 rounded-lg">
                        <h5 className="font-bold text-blue-300 text-lg">{tool.name}</h5>
                        {tool.description && <p className="mt-2 text-gray-300">{tool.description}</p>}
                        {tool.steps && tool.steps.length > 0 && (
                           <ul className="mt-3 space-y-1 text-gray-400 pl-5 list-decimal">
                                {tool.steps.map((step, j) => <li key={j}>{step}</li>)}
                           </ul>
                        )}
                        <p className="mt-4 text-sm text-blue-200/70 italic border-t border-blue-500/20 pt-3">{tool.purpose}</p>
                    </div>
                ))}
            </div>
        );
    case 'threats':
        return (
            <div className="mt-4 space-y-4">
                {(contentItem.data as Threat[]).map((threat, i) => (
                    <div key={i} className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                        <h5 className="font-bold text-yellow-300">{threat.title}</h5>
                        <p className="mt-1 text-yellow-200/80">{threat.description}</p>
                    </div>
                ))}
            </div>
        );
    case 'process':
        const process = contentItem.data as { name: string; steps: string[] };
        return (
            <div className="mt-4 p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg">
                <h5 className="font-bold text-cyan-300 text-lg">{process.name}</h5>
                <ol className="mt-3 space-y-2 text-gray-300 pl-5 list-decimal">
                    {process.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
            </div>
        );
    default:
      return null;
  }
};

const SectionCard: React.FC<{ section: Section }> = ({ section }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 md:p-8">
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

const PartComponent: React.FC<{ part: Part }> = ({ part }) => (
  <section id={part.id} className="py-12">
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
        <SectionCard key={i} section={section} />
      ))}
    </div>
  </section>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        {frameworkData.parts.map((part) => (
          <PartComponent key={part.id} part={part} />
        ))}
        <footer className="text-center py-10 mt-10 border-t border-gray-700">
            <p className="text-gray-500">Zoverions Framework v{frameworkData.version}.</p>
            <p className="text-gray-600 text-sm mt-1">This document is a disposable scaffold. Build your own.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;