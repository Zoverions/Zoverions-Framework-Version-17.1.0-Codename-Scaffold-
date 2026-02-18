import React from 'react';
import { frameworkData } from '../constants';

const Footer: React.FC = () => (
    <footer className="text-center py-10 mt-10 border-t border-gray-700">
        <p className="text-gray-500">Zoverions Framework v{frameworkData.version}.</p>
        <p className="text-gray-600 text-sm mt-1">This document is a disposable scaffold. Build your own.</p>
    </footer>
);

export default Footer;
