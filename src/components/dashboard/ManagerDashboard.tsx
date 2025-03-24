
import React, { useState } from 'react';
import SkillHeatmap, { HeatmapData } from '../ui/SkillHeatmap';
import ProgressRadar from '../ui/ProgressRadar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  UserCheck, 
  Award, 
  BarChart,
  AlertTriangle,
  School
} from 'lucide-react';

// Sample team data for the heatmap
const teamSkillsData: HeatmapData[] = [
  {
    id: '1',
    name: 'Jane Smith',
    skills: {
      'DevOps': 85,
      'Cloud': 78,
      'GenAI': 65,
      'Cybersecurity': 42,
      'Data Analytics': 90
    }
  },
  {
    id: '2',
    name: 'John Doe',
    skills: {
      'DevOps': 62,
      'Cloud': 90,
      'GenAI': 30,
      'Cybersecurity': 75,
      'Data Analytics': 45
    }
  },
  {
    id: '3',
    name: 'Sam Lee',
    skills: {
      'DevOps': 38,
      'Cloud': 58,
      'GenAI': 82,
      'Cybersecurity': 20,
      'Data Analytics': 76
    }
  },
  {
    id: '4',
    name: 'Tanya Chen',
    skills: {
      'DevOps': 72,
      'Cloud': 25,
      'GenAI': 85,
      'Cybersecurity': 80,
      'Data Analytics': 36
    }
  },
  {
    id: '5',
    name: 'Michael Ross',
    skills: {
      'DevOps': 91,
      'Cloud': 83,
      'GenAI': 42,
      'Cybersecurity': 60,
      'Data Analytics': 55
    }
  }
];

// Skills to display in the heatmap
const skills = ['DevOps', 'Cloud', 'GenAI', 'Cybersecurity', 'Data Analytics'];

// Team average skills for radar chart
const teamAverageData = [
  { subject: 'DevOps', score: 70, fullMark: 100 },
  { subject: 'Cloud', score: 67, fullMark: 100 },
  { subject: 'GenAI', score: 61, fullMark: 100 },
  { subject: 'Cybersecurity', score: 55, fullMark: 100 },
  { subject: 'Data Analytics', score: 60, fullMark: 100 }
];

// Team readiness metrics
const readinessData = [
  { skill: 'DevOps', readiness: 70, gap: 30, target: 100 },
  { skill: 'Cloud', readiness: 67, gap: 33, target: 100 },
  { skill: 'GenAI', readiness: 61, gap: 39, target: 100 },
  { skill: 'Cybersecurity', readiness: 55, gap: 45, target: 100 },
  { skill: 'Data Analytics', readiness: 60, gap: 40, target: 100 }
];

const ManagerDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Team Dashboard</h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} className="text-primary" />
            Team Skills Overview
          </CardTitle>
          <CardDescription>
            View your team's skill proficiency across key competency areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SkillHeatmap data={teamSkillsData} skills={skills} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart size={20} className="text-primary" />
              Team Readiness
            </CardTitle>
            <CardDescription>
              Overall readiness level of your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {readinessData.map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <span className="text-sm font-medium">{item.readiness}%</span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`absolute h-full ${
                        item.readiness >= 80 ? 'bg-green-500' :
                        item.readiness >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${item.readiness}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Gap: {item.gap}%</span>
                    <span>Target: {item.target}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Team Skills Profile
            </CardTitle>
            <CardDescription>
              Average skill level across your team
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProgressRadar data={teamAverageData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCheck size={18} className="text-primary" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Jane Smith</span>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                  +15% growth
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Michael Ross</span>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                  +12% growth
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle size={18} className="text-amber-500" />
              Skill Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="font-medium">GenAI</span>
                </div>
                <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">
                  3 team members
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Cybersecurity</span>
                </div>
                <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                  4 team members
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <School size={18} className="text-primary" />
              Recommended Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="font-medium mb-1">GenAI Fundamentals</div>
                <div className="text-sm text-gray-500">For 3 team members</div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="font-medium mb-1">Cybersecurity Essentials</div>
                <div className="text-sm text-gray-500">For 4 team members</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
