
import React, { useState, useEffect } from 'react';
import ChatInterface, { Message } from '../ui/ChatInterface';
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from 'uuid';
import { generateChatResponse, ChatMessage } from '../../services/openaiService';
import { toast } from "sonner";

const ConversationalInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Convert our messages to the format expected by OpenAI
      const chatMessages: ChatMessage[] = [
        {
          role: "system",
          content: "You are a helpful learning assistant that helps users find learning resources, courses, and certification paths tailored to their needs. Be concise and specific in your responses."
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })) as ChatMessage[],
        { role: "user", content }
      ];
      
      const responseContent = await generateChatResponse(chatMessages);
      
      const botMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response from AI");
    } finally {
      setIsProcessing(false);
    }
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
