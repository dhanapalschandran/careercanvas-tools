
import React, { useState } from 'react';
import ProgressRadar from '../ui/ProgressRadar';
import LearningPath from '../ui/LearningPath';
import { LearningItem } from '../ui/LearningPath';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Zap, 
  AlertCircle 
} from 'lucide-react';

// Sample data for the radar chart
const skillsData = [
  { subject: 'Technical', score: 85, fullMark: 100 },
  { subject: 'Leadership', score: 65, fullMark: 100 },
  { subject: 'Communication', score: 78, fullMark: 100 },
  { subject: 'Problem Solving', score: 80, fullMark: 100 },
  { subject: 'Teamwork', score: 92, fullMark: 100 },
  { subject: 'Adaptability', score: 74, fullMark: 100 },
];

// Sample learning path items
const learningItems: LearningItem[] = [
  {
    id: '1',
    title: 'Introduction to GenAI Fundamentals',
    type: 'course',
    duration: 90,
    completed: true,
    description: 'Learn the fundamentals of Generative AI, including key concepts, architectures, and applications.',
    dueDate: 'Completed'
  },
  {
    id: '2',
    title: 'Prompt Engineering Best Practices',
    type: 'article',
    duration: 25,
    completed: true,
    description: 'Master the art of crafting effective prompts to get the best results from large language models.'
  },
  {
    id: '3',
    title: 'DevOps CI/CD Pipeline Workshop',
    type: 'video',
    duration: 45,
    completed: false,
    description: 'A hands-on workshop that walks through setting up a complete CI/CD pipeline using GitHub Actions.',
    dueDate: 'In 5 days'
  },
  {
    id: '4',
    title: 'Cloud Architecture Patterns',
    type: 'course',
    duration: 180,
    completed: false,
    description: 'Explore common patterns for designing scalable and resilient applications in the cloud.',
    dueDate: 'In 2 weeks'
  },
  {
    id: '5',
    title: 'DevOps Knowledge Assessment',
    type: 'quiz',
    duration: 30,
    completed: false,
    description: 'Test your knowledge on DevOps principles, tools, and methodologies.',
    dueDate: 'In 3 weeks'
  }
];

const AssociateDashboard = () => {
  const [activeItem, setActiveItem] = useState<LearningItem | null>(null);
  
  const handleItemClick = (item: LearningItem) => {
    setActiveItem(item);
    // In a real app, you would navigate to the content or open a modal
    console.log('Opening learning item:', item);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">Welcome, Jane</h1>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Your Learning Journey
              </CardTitle>
              <CardDescription>
                Your personalized learning path based on your skills and career goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>New recommendations available</AlertTitle>
                <AlertDescription>
                  We've added 3 new learning resources based on your recent progress.
                </AlertDescription>
              </Alert>
              
              <div className="mt-4">
                <LearningPath 
                  items={learningItems} 
                  onItemClick={handleItemClick} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} className="text-primary" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500">Completed</span>
                  <span className="font-medium">7 courses</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500">In Progress</span>
                  <span className="font-medium">3 courses</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500">Certifications</span>
                  <span className="font-medium">2 earned</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Points</span>
                  <span className="font-medium">1,240</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap size={20} className="text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                  <BookOpen size={18} className="mb-1" />
                  <span className="text-xs">Browse</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                  <Award size={18} className="mb-1" />
                  <span className="text-xs">Certify</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                  <TrendingUp size={18} className="mb-1" />
                  <span className="text-xs">Progress</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                  <User size={18} className="mb-1" />
                  <span className="text-xs">Profile</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Skills Progress
          </CardTitle>
          <CardDescription>
            Your current progress across different skill areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ProgressRadar data={skillsData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssociateDashboard;
