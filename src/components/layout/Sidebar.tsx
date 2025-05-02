import React from 'react';
<<<<<<< HEAD
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Calendar,
  Code2,
  FileText,
  Github,
  GraduationCap,
  Home,
  Laptop2,
  LayoutDashboard,
  LightbulbIcon,
  Settings,
  Timer,
  Trophy,
  UserSquare2,
  Rocket
} from "lucide-react";
=======
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  Code, 
  Award, 
  BarChart2, 
  Calendar, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Settings,
  Clock,
  ListTodo,
  Activity,
  Layers
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Updated navigation items - combining Learning Resources, Achievements, and Certifications into LearningHub
const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Learning', path: '/learning', icon: BookOpen },
  { name: 'Learning Hub', path: '/learning-hub', icon: Layers }, // New combined page
  { name: 'Coding Platform', path: '/coding', icon: Code },
  { name: 'GitHub & Projects', path: '/github', icon: FileText },
  { name: 'Academic Records', path: '/academics', icon: GraduationCap },
  { name: 'Resume Builder', path: '/resume', icon: FileText },
  { name: 'SWOT Analysis', path: '/swot', icon: Activity },
  { name: 'Calendar & Tasks', path: '/calendar', icon: Calendar },
  { name: 'Internships', path: '/internships', icon: Briefcase },
  { name: 'AI Guidance', path: '/ai-guidance', icon: MessageSquare },
  { name: 'Mock Interviews', path: '/interviews', icon: MessageSquare },
  { name: 'Opportunities', path: '/opportunities', icon: BarChart2 },
  { name: 'Pomodoro Timer', path: '/pomodoro', icon: Clock },
  { name: 'To-Do List', path: '/todo', icon: ListTodo },
  { name: 'Settings', path: '/settings', icon: Settings }
];
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Code2, label: 'Coding Platform', path: '/coding' },
    { icon: BookOpen, label: 'Learning', path: '/learning' },
    { icon: Github, label: 'Github', path: '/github' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: GraduationCap, label: 'Academics', path: '/academics' },
    { icon: FileText, label: 'Resume', path: '/resume' },
    { icon: LightbulbIcon, label: 'SWOT', path: '/swot' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Laptop2, label: 'AI Guidance', path: '/ai-guidance' },
    { icon: Timer, label: 'Pomodoro', path: '/pomodoro' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: UserSquare2, label: 'Internships', path: '/internships' },
    { icon: Rocket, label: 'HackMatch', path: '/hackmatch' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-16 items-center border-b px-4">
          {!collapsed && (
            <h2 className="text-lg font-semibold">Deep Learning Pathways</h2>
          )}
        </div>

        <nav className="flex-1 space-y-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-4"
                )}
                onClick={() => navigate(item.path)}
              >
                <Icon className={cn(
                  "h-5 w-5",
                  collapsed ? "mr-0" : "mr-2"
                )} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
