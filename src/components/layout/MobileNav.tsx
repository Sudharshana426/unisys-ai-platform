
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ExternalLink, Menu, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
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
  { name: 'Dashboard', path: '/', icon: Home, externalUrl: null },
  { name: 'Learning', path: '/learning', icon: BookOpen, externalUrl: null },
  { name: 'Coding Platform', path: '/coding', icon: Code, externalUrl: null },
  { name: 'GitHub & Projects', path: '/github', icon: FileText, externalUrl: null },
  { name: 'Achievements', path: '/achievements', icon: Award, externalUrl: null },
  { name: 'Academic Records', path: '/academics', icon: GraduationCap, externalUrl: null },
  { name: 'Resume Builder', path: '/resume', icon: FileText, externalUrl: null },
  { name: 'SWOT Analysis', path: '/swot', icon: Activity, externalUrl: null },
  { name: 'Calendar & Tasks', path: '/calendar', icon: Calendar, externalUrl: null },
  { name: 'Certifications', path: '/certifications', icon: Award, externalUrl: null },
  { name: 'Internships', path: '/internships', icon: Briefcase, externalUrl: null },
  { name: 'AI Guidance', path: '/ai-guidance', icon: MessageSquare, externalUrl: null },
  { name: 'Learning Resources', path: '/resources', icon: Youtube, externalUrl: null },
  { name: 'Mock Interviews', path: '/interviews', icon: MessageSquare, externalUrl: null },
  { name: 'Opportunities', path: '/opportunities', icon: BarChart2, externalUrl: null },
  { name: 'Pomodoro Timer', path: '/pomodoro', icon: Clock, externalUrl: null },
  { name: 'To-Do List', path: '/todo', icon: ListTodo, externalUrl: null },
  { name: 'Settings', path: '/settings', icon: Settings, externalUrl: null }
];

export const MobileNav = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Successfully signed out');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="flex items-center mb-6 pl-2 pt-2">
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
                <span className="flex-1">{item.name}</span>
                {item.externalUrl && (
                  <ExternalLink className="h-4 w-4 opacity-70" />
                )}
              </Link>
            ))}
          </div>
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start" 
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </Button>
            
            <div className="px-4 py-3 mt-4 rounded-lg bg-gradient-to-r from-brand-blue/10 to-brand-purple/10">
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-xs text-gray-500 mt-1">Ask your AI assistant or contact support</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
