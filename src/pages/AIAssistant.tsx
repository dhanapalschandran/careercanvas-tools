
import React from 'react';
import Layout from '../components/layout/Layout';
import ConversationalInterface from '../components/ai/ConversationalInterface';

const AIAssistant = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Learning Assistant</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Ask our AI assistant to find learning resources, courses, or certification paths tailored to your needs.
        </p>
        <ConversationalInterface />
      </div>
    </Layout>
  );
};

export default AIAssistant;
