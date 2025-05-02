import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { MainLayout } from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Calendar from '@/pages/Calendar';
import HackMatch from '@/pages/HackMatch';
import Jobs from '@/pages/Jobs';
import NotFound from '@/pages/NotFound';
import CodingPlatform from "./pages/CodingPlatform";
import Learning from "./pages/Learning";
import Github from "./pages/Github";
import { Achievements } from "./pages/Achievements";
import Academics from "./pages/Academics";
import Resume from "./pages/Resume";
import SWOT from "./pages/SWOT";
import AIGuidance from "./pages/AIGuidance";
import Pomodoro from "./pages/Pomodoro";
import TodoList from "./pages/TodoList";
import { InternshipsPage } from "./pages/Internships";
import MockInterviews from "./pages/MockInterviews";
import Opportunities from "./pages/Opportunities";
import Settings from "./pages/Settings";
import LearningHub from "./pages/LearningHub";
import Certifications from "./pages/Certifications";
import Recommendations from './pages/Recommendations';
import LinkedIn from './pages/LinkedIn';

const AppRoutes = () => {
  const dummyLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <Routes>
      <Route path="/" element={
        <MainLayout onLogout={dummyLogout}>
          <Dashboard />
        </MainLayout>
      } />
      
      <Route path="/dashboard" element={
        <MainLayout onLogout={dummyLogout}>
          <Dashboard />
        </MainLayout>
      } />
      
      <Route path="/coding" element={
        <MainLayout onLogout={dummyLogout}>
          <CodingPlatform />
        </MainLayout>
      } />
      
      <Route path="/learning" element={
        <MainLayout onLogout={dummyLogout}>
          <Learning />
        </MainLayout>
      } />
      
      <Route path="/github" element={
        <MainLayout onLogout={dummyLogout}>
          <Github />
        </MainLayout>
      } />
      
      <Route path="/achievements" element={
        <MainLayout onLogout={dummyLogout}>
          <Achievements />
        </MainLayout>
      } />
      
      <Route path="/resume" element={
        <MainLayout onLogout={dummyLogout}>
          <Resume />
        </MainLayout>
      } />
      
      <Route path="/ai-guidance" element={
        <MainLayout onLogout={dummyLogout}>
          <AIGuidance />
        </MainLayout>
      } />
      
      <Route path="/todo" element={
        <MainLayout onLogout={dummyLogout}>
          <TodoList />
        </MainLayout>
      } />
      
      <Route path="/internships" element={
        <MainLayout onLogout={dummyLogout}>
          <InternshipsPage />
        </MainLayout>
      } />
      
      <Route path="/hackmatch" element={
        <MainLayout onLogout={dummyLogout}>
          <HackMatch />
        </MainLayout>
      } />
      
      <Route path="/opportunities" element={
        <MainLayout onLogout={dummyLogout}>
          <Opportunities />
        </MainLayout>
      } />
      
      <Route path="/learning-hub" element={
        <MainLayout onLogout={dummyLogout}>
          <LearningHub />
        </MainLayout>
      } />
      
      <Route path="/Recommendations" element={
        <MainLayout onLogout={dummyLogout}>
          <Recommendations />
        </MainLayout>
      } />
      
      <Route path="/linkedin" element={
        <MainLayout onLogout={dummyLogout}>
          <LinkedIn />
        </MainLayout>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <AppRoutes />
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
