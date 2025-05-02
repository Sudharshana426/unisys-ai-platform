import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
}

export const Header = ({ onLogout }: HeaderProps) => {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Deep Learning Pathways</h2>
        </div>
        {onLogout && (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}; 