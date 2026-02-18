import React from 'react';
import type { SectionContent, RedFlag, Tool, HierarchyItem, TierItem, Threat } from '../types';
import RedFlagCard from './RedFlagCard';

interface SectionContentRendererProps {
  contentItem: SectionContent;
}

const SectionContentRenderer: React.FC<SectionContentRendererProps> = ({ contentItem }) => {
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

export default SectionContentRenderer;
