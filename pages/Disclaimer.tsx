import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl">
            <AlertTriangle size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Disclaimer</h1>
        </div>

        <div className="prose prose-lg text-gray-600 leading-relaxed">
          <p className="mb-6">
            The scripts provided on ScriptBinary are for educational and testing purposes only. 
            We do not create these scripts, and we are not affiliated with Roblox Corporation or any of the game developers.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Use at Your Own Risk</h3>
          <p className="mb-6">
            Using third-party scripts in online games may violate the Terms of Service of the respective platforms (including Roblox). 
            This could lead to account suspension or banning. 
            <strong>ScriptBinary accepts no responsibility for any actions taken against your account</strong> as a result of using the scripts listed here.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Safety & Testing</h3>
          <p className="mb-6">
            While we strive to review every script for malicious code, we cannot guarantee 100% safety. 
            We recommend using these scripts on alternate accounts (alts) to ensure the safety of your main account. 
            Always exercise caution when downloading or executing code from the internet.
          </p>
        </div>
      </div>
    </div>
  );
};