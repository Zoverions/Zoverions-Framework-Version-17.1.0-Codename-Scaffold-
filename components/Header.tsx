import React from 'react';
import { frameworkData } from '../constants';

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

export default Header;
