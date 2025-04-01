
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
  Youtube, 
  Settings,
  Clock,
  ListTodo,
  Activity
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Learning', path: '/learning', icon: BookOpen },
  { name: 'Coding Platform', path: '/coding', icon: Code },
  { name: 'GitHub & Projects', path: '/github', icon: FileText },
  { name: 'Achievements', path: '/achievements', icon: Award },
  { name: 'Academic Records', path: '/academics', icon: GraduationCap },
  { name: 'Resume Builder', path: '/resume', icon: FileText },
  { name: 'SWOT Analysis', path: '/swot', icon: Activity },
  { name: 'Calendar & Tasks', path: '/calendar', icon: Calendar },
  { name: 'Certifications', path: '/certifications', icon: Award },
  { name: 'Internships', path: '/internships', icon: Briefcase },
  { name: 'AI Guidance', path: '/ai-guidance', icon: MessageSquare },
  { name: 'Learning Resources', path: '/resources', icon: Youtube },
  { name: 'Mock Interviews', path: '/interviews', icon: MessageSquare },
  { name: 'Opportunities', path: '/opportunities', icon: BarChart2 },
  { name: 'Pomodoro Timer', path: '/pomodoro', icon: Clock },
  { name: 'To-Do List', path: '/todo', icon: ListTodo },
  { name: 'Settings', path: '/settings', icon: Settings }
];

export const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 hidden md:block shadow-md transform transition-transform duration-150 ease-in-out bg-white">
      <div className="h-full px-3 py-4 flex flex-col">
        <div className="flex items-center mb-6 pl-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-xl">DS</div>
          <span className="text-xl font-semibold ml-2 gradient-heading">DeepSeek</span>
        </div>

        <div className="flex flex-col space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-lg",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="pt-2">
          <div className="px-4 py-3 mt-4 rounded-lg bg-gradient-to-r from-brand-blue/10 to-brand-purple/10">
            <p className="text-sm font-medium">Need help?</p>
            <p className="text-xs text-gray-500 mt-1">Ask your AI assistant or contact support</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
