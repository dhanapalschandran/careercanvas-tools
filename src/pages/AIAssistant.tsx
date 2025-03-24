
import React from 'react';
import Layout from '../components/layout/Layout';
import ConversationalInterface from '../components/ai/ConversationalInterface';
import { AlertCircle } from 'lucide-react';

const AIAssistant = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Learning Assistant</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Ask our AI assistant to find learning resources, courses, or certification paths tailored to your needs.
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 dark:bg-yellow-900/20 dark:border-yellow-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                Note: You'll need to add your OpenAI API key in the <code className="px-1 py-0.5 bg-yellow-100 dark:bg-yellow-800 rounded">openaiService.ts</code> file to use the AI assistant.
              </p>
            </div>
          </div>
        </div>
        
        <ConversationalInterface />
      </div>
    </Layout>
  );
};

export default AIAssistant;
