
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  User, 
  MessageSquare, 
  ArrowRight,
  Monitor,
  Layers,
  Zap
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to associate dashboard as default page
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/associate');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl"
      >
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Learning<span className="text-gradient">Canvas</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
            An elegant platform for personalized learning journeys and team skill management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link 
            to="/associate" 
            className="glass-panel glass-panel-hover p-6 group"
          >
            <div className="mb-4 p-3 inline-block bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              Associate Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Track your learning progress, visualize skills, and follow personalized recommendations.
            </p>
            <div className="flex items-center font-medium text-primary">
              <span>View Dashboard</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link 
            to="/manager" 
            className="glass-panel glass-panel-hover p-6 group"
          >
            <div className="mb-4 p-3 inline-block bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              Manager Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              View team readiness, identify skill gaps, and manage resources effectively.
            </p>
            <div className="flex items-center font-medium text-primary">
              <span>View Dashboard</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link 
            to="/ai-assistant" 
            className="glass-panel glass-panel-hover p-6 group"
          >
            <div className="mb-4 p-3 inline-block bg-green-100 dark:bg-green-900/30 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              AI Assistant
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get personalized learning recommendations with our conversational AI interface.
            </p>
            <div className="flex items-center font-medium text-primary">
              <span>Try Assistant</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Redirecting to Associate Dashboard in a few seconds...
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
