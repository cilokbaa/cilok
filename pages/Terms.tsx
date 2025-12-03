import React from 'react';
import { ScrollText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gray-100 text-gray-600 p-3 rounded-2xl">
            <ScrollText size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Terms of Service</h1>
        </div>

        <div className="prose prose-lg text-gray-600 leading-relaxed">
          <p className="mb-6">
            By accessing ScriptBinary, you agree to be bound by these terms of service, all applicable laws and regulations, 
            and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. License</h3>
          <p className="mb-6">
            Permission is granted to temporarily view the materials (information or software) on ScriptBinary's website for personal, 
            non-commercial transitory viewing only.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Limitations</h3>
          <p className="mb-6">
            In no event shall ScriptBinary be liable for any damages (including, without limitation, damages for loss of data or profit, 
            or due to business interruption) arising out of the use or inability to use the materials on ScriptBinary's website.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Accuracy of Materials</h3>
          <p className="mb-6">
            The materials appearing on ScriptBinary's website could include technical, typographical, or photographic errors. 
            ScriptBinary does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>
        </div>
      </div>
    </div>
  );
};