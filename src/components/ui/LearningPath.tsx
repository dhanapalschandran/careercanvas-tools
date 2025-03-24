
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  BookOpen,
  Video,
  FileText,
  Puzzle
} from 'lucide-react';

export interface LearningItem {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'quiz';
  duration: number; // in minutes
  completed: boolean;
  description: string;
  dueDate?: string;
}

interface LearningPathProps {
  items: LearningItem[];
  onItemClick: (item: LearningItem) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ items, onItemClick }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={18} />;
      case 'article':
        return <FileText size={18} />;
      case 'course':
        return <BookOpen size={18} />;
      case 'quiz':
        return <Puzzle size={18} />;
      default:
        return <BookOpen size={18} />;
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={`
            glass-panel p-4 hover-scale cursor-pointer
            ${item.completed ? 'border-l-4 border-l-green-500' : ''}
          `}
          onClick={() => toggleItem(item.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`
                p-2 rounded-full 
                ${item.completed 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                }
              `}>
                {item.completed ? <CheckCircle2 size={18} /> : getTypeIcon(item.type)}
              </div>
              
              <div>
                <h3 className={`font-medium ${item.completed ? 'text-green-700 dark:text-green-400' : ''}`}>
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="capitalize">{item.type}</span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> 
                    {formatDuration(item.duration)}
                  </span>
                  {item.dueDate && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span>Due {item.dueDate}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <ChevronRight 
              size={18} 
              className={`text-gray-400 transition-transform duration-300 ${
                expandedItem === item.id ? 'rotate-90' : ''
              }`} 
            />
          </div>
          
          {/* Expanded content */}
          {expandedItem === item.id && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-slide-in">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick(item);
                }}
                className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium
                  transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {item.completed ? 'Review Again' : 'Start Learning'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningPath;
