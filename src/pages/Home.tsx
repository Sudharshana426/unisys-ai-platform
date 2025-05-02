import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart2, 
  Calendar, 
  Code2, 
  BookOpen, 
  Github, 
  Trophy, 
  GraduationCap,
  FileText,
  Clock,
  CheckSquare,
  Award,
  Briefcase,
  Building2,
  Users,
  MessageSquare,
  Target
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: 'Dashboard',
      description: 'Track your learning progress and achievements',
      icon: BarChart2,
      path: '/dashboard'
    },
    {
      title: 'Calendar',
      description: 'Manage your schedule and deadlines',
      icon: Calendar,
      path: '/calendar'
    },
    {
      title: 'Coding',
      description: 'Practice coding and solve problems',
      icon: Code2,
      path: '/coding'
    },
    {
      title: 'Learning',
      description: 'Access learning resources and courses',
      icon: BookOpen,
      path: '/learning'
    },
    {
      title: 'GitHub',
      description: 'Manage your GitHub repositories',
      icon: Github,
      path: '/github'
    },
    {
      title: 'Achievements',
      description: 'Track your accomplishments',
      icon: Trophy,
      path: '/achievements'
    },
    {
      title: 'Academics',
      description: 'Manage your academic progress',
      icon: GraduationCap,
      path: '/academics'
    },
    {
      title: 'Resume',
      description: 'Build and manage your resume',
      icon: FileText,
      path: '/resume'
    },
    {
      title: 'SWOT',
      description: 'Analyze your strengths and weaknesses',
      icon: Target,
      path: '/swot'
    },
    {
      title: 'AI Guidance',
      description: 'Get AI-powered career guidance',
      icon: MessageSquare,
      path: '/ai-guidance'
    },
    {
      title: 'Pomodoro',
      description: 'Use the Pomodoro technique for focused work',
      icon: Clock,
      path: '/pomodoro'
    },
    {
      title: 'To-Do',
      description: 'Manage your tasks and projects',
      icon: CheckSquare,
      path: '/todo'
    },
    {
      title: 'Certifications',
      description: 'Track your certifications',
      icon: Award,
      path: '/certifications'
    },
    {
      title: 'Internships',
      description: 'Find and apply for internships',
      icon: Building2,
      path: '/internships'
    },
    {
      title: 'Interviews',
      description: 'Prepare for technical interviews',
      icon: Users,
      path: '/interviews'
    },
    {
      title: 'Jobs',
      description: 'Find job opportunities',
      icon: Briefcase,
      path: '/jobs'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">Welcome to Deep Learning Pathways</h1>
        <p className="text-muted-foreground">Your comprehensive platform for learning and career development</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link key={feature.path} to={feature.path}>
            <Card className="h-full hover:bg-accent transition-colors">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 