import React from 'react';
import type { RedFlag } from '../types';

interface RedFlagCardProps {
  flag: RedFlag;
}

const RedFlagCard: React.FC<RedFlagCardProps> = ({ flag }) => (
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

export default RedFlagCard;
