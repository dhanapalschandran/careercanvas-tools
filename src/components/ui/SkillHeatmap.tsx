
import React, { useState } from 'react';

export interface HeatmapData {
  id: string;
  name: string;
  skills: {
    [key: string]: number; // Skill name -> score (0-100)
  };
}

interface SkillHeatmapProps {
  data: HeatmapData[];
  skills: string[];
}

const SkillHeatmap: React.FC<SkillHeatmapProps> = ({ data, skills }) => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Color mapping function
  const getColorForValue = (value: number): string => {
    if (value >= 80) return 'bg-green-500/90';
    if (value >= 60) return 'bg-green-300/80';
    if (value >= 40) return 'bg-yellow-300/80';
    if (value >= 20) return 'bg-orange-300/80';
    return 'bg-red-400/80';
  };

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[640px]">
        {/* Header Row */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <div className="w-44 flex-shrink-0 py-3 px-4 font-medium text-sm">
            Team Member
          </div>
          {skills.map(skill => (
            <div 
              key={skill} 
              className="flex-1 py-3 px-2 font-medium text-sm truncate text-center"
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {data.map(person => (
          <div 
            key={person.id} 
            className="flex border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
          >
            <div className="w-44 flex-shrink-0 py-3 px-4 font-medium">
              {person.name}
            </div>
            
            {skills.map(skill => {
              const value = person.skills[skill] || 0;
              const cellId = `${person.id}-${skill}`;
              const isHovered = hoveredCell === cellId;
              
              return (
                <div key={skill} className="flex-1 p-1 text-center">
                  <div 
                    className={`
                      relative h-10 rounded-md flex items-center justify-center
                      ${getColorForValue(value)}
                      ${isHovered ? 'ring-2 ring-primary/50 scale-105' : ''}
                      transition-all duration-200
                    `}
                    onMouseEnter={() => setHoveredCell(cellId)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    <span className="font-medium text-white text-shadow text-sm">
                      {value}%
                    </span>
                    
                    {isHovered && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                        bg-white dark:bg-gray-800 shadow-elevation-2 rounded-md py-1 px-2 z-10
                        text-xs whitespace-nowrap"
                      >
                        {person.name}: {skill} - {value}%
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillHeatmap;
