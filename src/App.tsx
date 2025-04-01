
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { useState, useEffect } from "react";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CodingPlatform from "./pages/CodingPlatform";
import NotFound from "./pages/NotFound";

// Import other pages as needed

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    // In a real app, you would check for a valid token in localStorage or cookies
    const checkLoginStatus = localStorage.getItem("isLoggedIn");
    if (checkLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // For demo purposes, we'll set user as logged in when they use the login page
  const handleSuccessfulLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={
                isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <Login onSuccessfulLogin={handleSuccessfulLogin} />
              } 
            />
            
            {/* Protected Routes */}
            <Route path="/" element={
              isLoggedIn ? 
              <MainLayout><Dashboard /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/coding" element={
              isLoggedIn ? 
              <MainLayout><CodingPlatform /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            {/* Additional routes would be added here with proper protected routing */}
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
