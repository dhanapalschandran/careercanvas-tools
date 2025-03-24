
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  Loader2, 
  CornerDownLeft,
  Trash2,
  XCircle
} from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  isProcessing: boolean;
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  placeholder?: string;
  title?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isProcessing,
  onSendMessage,
  onClearChat,
  placeholder = "Type your question...",
  title = "AI Assistant"
}) => {
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-elevation-1 overflow-hidden">
      {/* Header */}
      <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="font-medium text-lg flex items-center gap-2">
          <Bot size={20} className="text-primary" />
          {title}
        </h2>
        <button 
          onClick={onClearChat}
          className="p-1.5 text-gray-500 hover:text-red-500 rounded-md
            hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          aria-label="Clear chat"
          title="Clear chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-2 px-4">
            <Bot size={48} className="text-primary/40" />
            <h3 className="text-lg font-medium">How can I help you today?</h3>
            <p className="max-w-md">
              Ask me about learning resources, courses, or certification paths. 
              I can find content based on topic, skill level, or time constraints.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[85%] rounded-lg p-3.5 
                ${message.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                }
              `}>
                <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                  {message.role === 'user' ? (
                    <>
                      <span>You</span>
                      <User size={12} />
                    </>
                  ) : (
                    <>
                      <Bot size={12} />
                      <span>Assistant</span>
                    </>
                  )}
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}
        {isProcessing && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg rounded-tl-none p-3.5 max-w-[85%]">
              <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                <Bot size={12} />
                <span>Assistant</span>
              </div>
              <Loader2 className="animate-spin-slow text-primary" size={20} />
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-800">
        <div className="relative flex items-end rounded-lg border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isProcessing}
            rows={1}
            className="flex-grow py-3 pl-4 pr-16 bg-transparent resize-none focus:outline-none max-h-32"
          />
          {input.trim() ? (
            <button
              type="submit"
              disabled={isProcessing}
              className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-md
                hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          ) : (
            <div className="absolute bottom-2 right-2 p-2 text-gray-400">
              <CornerDownLeft size={18} />
            </div>
          )}
        </div>
        <div className="mt-2 text-xs text-center text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
