
import React, { useState, useEffect } from 'react';
import ChatInterface, { Message } from '../ui/ChatInterface';
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from 'uuid';

// Mock API response for demo purposes
const mockResponses: Record<string, string> = {
  'genai': `Here are some recommended GenAI courses under 1 hour:

1. **Introduction to Generative AI** - 45 min
   A beginner-friendly overview of generative AI concepts and applications.

2. **Prompt Engineering Essentials** - 30 min
   Learn how to craft effective prompts for large language models.

3. **GenAI Tools Overview** - 55 min
   A survey of popular generative AI tools and how to use them effectively.

Would you like more information about any of these courses?`,

  'devops': `Here are some recommended DevOps certifications:

1. **AWS DevOps Engineer Professional**
   Validates technical expertise in provisioning, operating, and managing distributed application systems on the AWS platform.

2. **Google Professional DevOps Engineer**
   Demonstrates your ability to implement continuous delivery pipelines and optimize service performance on Google Cloud.

3. **Microsoft Azure DevOps Solutions**
   Focuses on designing and implementing strategies for collaboration, code, infrastructure, and more on Azure.

4. **Docker Certified Associate**
   Validates your ability to configure, manage, and troubleshoot Docker containerized applications.

Would you like details on prerequisites or exam content for any of these certifications?`,

  'fallback': 'I can help you find learning resources, courses, or certification paths. Try asking about specific topics, skills, or time constraints you have.'
};

const ConversationalInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate API response
    setTimeout(() => {
      let responseContent = mockResponses.fallback;
      
      // Simple keyword matching for demo
      if (content.toLowerCase().includes('genai') || (content.toLowerCase().includes('course') && content.toLowerCase().includes('1'))) {
        responseContent = mockResponses.genai;
      } else if (content.toLowerCase().includes('devops') && content.toLowerCase().includes('certification')) {
        responseContent = mockResponses.devops;
      }
      
      const botMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleClearChat = () => {
    setMessages([]);
  };
  
  // Add welcome message on first load
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: 'Hello! I can help you find learning resources tailored to your needs. Try asking me something like:\n\n- "Show me a GenAI course under 1hr"\n- "Find me DevOps certifications"\n- "What are the best cloud computing courses for beginners?"',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className="h-full overflow-hidden">
        <ChatInterface
          messages={messages}
          isProcessing={isProcessing}
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
          title="Learning Assistant"
          placeholder="Ask about courses, certifications, or learning resources..."
        />
      </Card>
    </div>
  );
};

export default ConversationalInterface;
