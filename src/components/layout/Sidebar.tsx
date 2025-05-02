import React from 'react';
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
  Rocket,
  Video,
  Linkedin
} from "lucide-react";

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
    { icon: FileText, label: 'Resume', path: '/resume' },
    { icon: Laptop2, label: 'AI Guidance', path: '/ai-guidance' },
    { icon: UserSquare2, label: 'Internships', path: '/internships' },
    { icon: Rocket, label: 'HackMatch', path: '/hackmatch' },
    { icon: Video, label: 'Recommendations', path: '/Recommendations' },
    { icon: Linkedin, label: 'LinkedIn', path: '/linkedin' },
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
