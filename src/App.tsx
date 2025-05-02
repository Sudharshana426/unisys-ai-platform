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
import Certifications from "./pages/Certifications";
import Internships from "./pages/Internships";
import MockInterviews from "./pages/MockInterviews";
import Opportunities from "./pages/Opportunities";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
