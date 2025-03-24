
import React, { useEffect, useRef } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis,
  ResponsiveContainer 
} from 'recharts';

interface SkillData {
  subject: string;
  score: number;
  fullMark: number;
}

interface ProgressRadarProps {
  data: SkillData[];
  colors?: {
    primary: string;
    grid: string;
    text: string;
  };
}

const ProgressRadar: React.FC<ProgressRadarProps> = ({ 
  data,
  colors = {
    primary: '#3b82f6',
    grid: '#e2e8f0',
    text: '#475569'
  }
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation on mount
    if (chartRef.current) {
      chartRef.current.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <div ref={chartRef} className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={colors.grid} strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: colors.text, fontSize: 12 }} 
          />
          <Radar
            name="Skills"
            dataKey="score"
            stroke={colors.primary}
            fill={colors.primary}
            fillOpacity={0.2}
            animationBegin={300}
            animationDuration={1000}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressRadar;
