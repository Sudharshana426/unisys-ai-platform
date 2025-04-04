
import React from 'react';
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

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen shadow-md transform transition-all duration-300 ease-in-out bg-white",
        collapsed ? "w-16" : "w-64",
        "hidden md:block"
      )}
    >
      <div className="h-full px-3 py-4 flex flex-col overflow-hidden">
        <div className={cn(
          "flex items-center mb-6 pl-2", 
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-xl">DS</div>
          {!collapsed && <span className="text-xl font-semibold ml-2 gradient-heading">DeepSeek</span>}
        </div>

        <div className="flex flex-col space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <TooltipProvider key={item.path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center py-2 text-sm font-medium rounded-lg group",
                      collapsed ? "justify-center px-2" : "px-2",
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    title={collapsed ? item.name : ""}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                    {!collapsed && (
                      <span className="flex-1">{item.name}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {!collapsed && (
          <div className="pt-2">
            <div className="px-4 py-3 mt-4 rounded-lg bg-gradient-to-r from-brand-blue/10 to-brand-purple/10">
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-xs text-gray-500 mt-1">Ask your AI assistant or contact support</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
