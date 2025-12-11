import React from 'react';
import { GENIUS_MINDS_INFO } from '../constants';
import { BrainCircuit } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gold-100 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                <BrainCircuit size={32} />
            </div>
            <h1 className="text-3xl font-black text-gray-900">Genius Minds AI</h1>
        </div>
        
        <div className="prose prose-lg text-gray-600 leading-relaxed">
            <p className="text-xl font-medium text-gray-800 mb-6">
                Redefining DeFi with AI-driven liquidity models.
            </p>
            {GENIUS_MINDS_INFO.split('\n').map((line, i) => (
                <p key={i} className="mb-4">{line}</p>
            ))}
            
            <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Our Vision for DUCKS</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Create a sustainable circular economy on WorldChain.</li>
                <li>Implement bonding curves to reward early adoption while maintaining long-term stability.</li>
                <li>Utilize automated yield strategies via Morpho Blue integrations.</li>
                <li>Foster a community of educated Web3 users.</li>
            </ul>
        </div>
    </div>
  );
};