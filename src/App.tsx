import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Calendar from '@/pages/Calendar';
import HackMatch from '@/pages/HackMatch';
import Jobs from '@/pages/Jobs';
import NotFound from '@/pages/NotFound';

import CodingPlatform from "./pages/CodingPlatform";
import Learning from "./pages/Learning";
import Github from "./pages/Github";
import Achievements from "./pages/Achievements";
import Academics from "./pages/Academics";
import Resume from "./pages/Resume";
import SWOT from "./pages/SWOT";
import AIGuidance from "./pages/AIGuidance";
import Pomodoro from "./pages/Pomodoro";
import TodoList from "./pages/TodoList";
import Internships from "./pages/Internships";
import MockInterviews from "./pages/MockInterviews";
import Opportunities from "./pages/Opportunities";
import Settings from "./pages/Settings";
import LearningHub from "./pages/LearningHub";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
<<<<<<< HEAD
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
                <Route path="/hackmatch" element={<ProtectedRoute><HackMatch /></ProtectedRoute>} />
                <Route path="/coding" element={
                  <ProtectedRoute><CodingPlatform /></ProtectedRoute>
                } />
                <Route path="/learning" element={
                  <ProtectedRoute><Learning /></ProtectedRoute>
                } />
                <Route path="/github" element={
                  <ProtectedRoute><Github /></ProtectedRoute>
                } />
                <Route path="/achievements" element={
                  <ProtectedRoute><Achievements /></ProtectedRoute>
                } />
                <Route path="/academics" element={
                  <ProtectedRoute><Academics /></ProtectedRoute>
                } />
                <Route path="/resume" element={
                  <ProtectedRoute><Resume /></ProtectedRoute>
                } />
                <Route path="/swot" element={
                  <ProtectedRoute><SWOT /></ProtectedRoute>
                } />
                <Route path="/ai-guidance" element={
                  <ProtectedRoute><AIGuidance /></ProtectedRoute>
                } />
                <Route path="/pomodoro" element={
                  <ProtectedRoute><Pomodoro /></ProtectedRoute>
                } />
                <Route path="/todo" element={
                  <ProtectedRoute><TodoList /></ProtectedRoute>
                } />
                <Route path="/certifications" element={
                  <ProtectedRoute><Certifications /></ProtectedRoute>
                } />
                <Route path="/interviews" element={
                  <ProtectedRoute><MockInterviews /></ProtectedRoute>
                } />
                <Route path="/opportunities" element={
                  <ProtectedRoute><Opportunities /></ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute><Settings /></ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toaster />
          </div>
=======
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

            <Route path="/learning" element={
              isLoggedIn ? 
              <MainLayout><Learning /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/github" element={
              isLoggedIn ? 
              <MainLayout><Github /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/achievements" element={
              isLoggedIn ? 
              <MainLayout><Achievements /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/academics" element={
              isLoggedIn ? 
              <MainLayout><Academics /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/resume" element={
              isLoggedIn ? 
              <MainLayout><Resume /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/swot" element={
              isLoggedIn ? 
              <MainLayout><SWOT /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/calendar" element={
              isLoggedIn ? 
              <MainLayout><Calendar /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/ai-guidance" element={
              isLoggedIn ? 
              <MainLayout><AIGuidance /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/pomodoro" element={
              isLoggedIn ? 
              <MainLayout><Pomodoro /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/todo" element={
              isLoggedIn ? 
              <MainLayout><TodoList /></MainLayout> : 
              <Navigate to="/login" replace />
            } />

            <Route path="/certifications" element={
              isLoggedIn ? 
              <MainLayout><Certifications /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/internships" element={
              isLoggedIn ? 
              <MainLayout><Internships /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/resources" element={
              isLoggedIn ? 
              <MainLayout><LearningResources /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/interviews" element={
              isLoggedIn ? 
              <MainLayout><MockInterviews /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/opportunities" element={
              isLoggedIn ? 
              <MainLayout><Opportunities /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/settings" element={
              isLoggedIn ? 
              <MainLayout><Settings /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            {/* New combined Learning Hub route */}
            <Route path="/learning-hub" element={
              isLoggedIn ? 
              <MainLayout><LearningHub /></MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
