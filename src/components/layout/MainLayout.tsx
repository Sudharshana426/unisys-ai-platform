
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AIAssistant } from '../ai/AIAssistant';
import { MobileNav } from './MobileNav';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <TopBar />
        <div className="relative">
          <div 
            className="absolute -left-3 top-4 z-50 hidden md:block"
            onClick={toggleSidebar}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full bg-background shadow-md hover:bg-gray-100"
                  >
                    {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
        </div>
        <AIAssistant />
      </div>
    </div>
  );
};
