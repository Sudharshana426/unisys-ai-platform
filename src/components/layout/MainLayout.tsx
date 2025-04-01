
import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AIAssistant } from '../ai/AIAssistant';
import { MobileNav } from './MobileNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
        <AIAssistant />
      </div>
    </div>
  );
};
