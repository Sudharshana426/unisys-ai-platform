import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Calendar, 
  Code2, 
  BookOpen, 
  Github, 
  Trophy, 
  GraduationCap,
  FileText,
  BarChart2,
  Clock,
  CheckSquare,
  Award,
  Briefcase,
  Building2,
  Users,
  MessageSquare,
  Target,
  Settings,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: BarChart2, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/coding', icon: Code2, label: 'Coding' },
    { path: '/learning', icon: BookOpen, label: 'Learning' },
    { path: '/github', icon: Github, label: 'GitHub' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/academics', icon: GraduationCap, label: 'Academics' },
    { path: '/resume', icon: FileText, label: 'Resume' },
    { path: '/swot', icon: Target, label: 'SWOT' },
    { path: '/ai-guidance', icon: MessageSquare, label: 'AI Guidance' },
    { path: '/pomodoro', icon: Clock, label: 'Pomodoro' },
    { path: '/todo', icon: CheckSquare, label: 'To-Do' },
    { path: '/certifications', icon: Award, label: 'Certifications' },
    { path: '/jobs', icon: Briefcase, label: 'Jobs' },
    { path: '/hackmatch', icon: Users, label: 'HackMatch' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed left-0 top-0 w-64 h-screen bg-background border-r">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Deep Learning Pathways</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {isAuthenticated && (
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 