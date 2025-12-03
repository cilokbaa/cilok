import React from 'react';
import { Lock } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent-100 text-accent-600 p-3 rounded-2xl">
            <Lock size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
        </div>

        <div className="prose prose-lg text-gray-600 leading-relaxed">
          <p className="mb-6">
            At ScriptBinary, we take your privacy seriously. This Privacy Policy document contains types of information that is collected 
            and recorded by ScriptBinary, and how we use it.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">No Personal Data Collection</h3>
          <p className="mb-6">
            We are committed to transparency. <strong>ScriptBinary does not collect, store, or share any personal information</strong> from our users. 
            You do not need to create an account or log in to use our public services.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Cookies and Web Beacons</h3>
          <p className="mb-6">
            Like any other website, ScriptBinary may uses 'cookies'. These cookies are used to store information including visitors' preferences, 
            and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience 
            by customizing our web page content based on visitors' browser type and/or other information.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Google Analytics</h3>
           <p className="mb-6">
            We may use Google Analytics to understand traffic trends. This uses anonymous data and does not track your personal identity.
          </p>
        </div>
      </div>
    </div>
  );
};