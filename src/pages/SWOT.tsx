
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const SWOT = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">SWOT Analysis</h1>
          <p className="text-muted-foreground">Identify your Strengths, Weaknesses, Opportunities, and Threats</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate SWOT Using AI
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200 shadow-sm">
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <CardTitle className="text-green-700 dark:text-green-400">Strengths</CardTitle>
            <CardDescription>Internal positive attributes and resources</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-green-500 mt-1"></div>
                <div>
                  <p className="font-medium">Strong programming skills</p>
                  <p className="text-sm text-muted-foreground">Proficient in Python, JavaScript, and Java with proven project experience</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-green-500 mt-1"></div>
                <div>
                  <p className="font-medium">Problem-solving ability</p>
                  <p className="text-sm text-muted-foreground">Analytical thinking and creative approach to solving complex problems</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-green-500 mt-1"></div>
                <div>
                  <p className="font-medium">Teamwork and communication</p>
                  <p className="text-sm text-muted-foreground">Effective collaborator with experience working in diverse teams</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-green-500 mt-1"></div>
                <div>
                  <p className="font-medium">Academic excellence</p>
                  <p className="text-sm text-muted-foreground">High CGPA (8.92/10) and consistent academic performance</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Textarea placeholder="Add another strength..." className="min-h-[60px]" />
                <div className="mt-2 text-right">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Strength
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 shadow-sm">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="text-red-700 dark:text-red-400">Weaknesses</CardTitle>
            <CardDescription>Internal negative aspects that reduce competitive advantage</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-red-500 mt-1"></div>
                <div>
                  <p className="font-medium">Limited industry experience</p>
                  <p className="text-sm text-muted-foreground">Need more professional work experience in real-world environments</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-red-500 mt-1"></div>
                <div>
                  <p className="font-medium">Public speaking anxiety</p>
                  <p className="text-sm text-muted-foreground">Discomfort when presenting to large audiences or in formal settings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-red-500 mt-1"></div>
                <div>
                  <p className="font-medium">Time management</p>
                  <p className="text-sm text-muted-foreground">Occasional challenges with prioritization and meeting deadlines</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-red-500 mt-1"></div>
                <div>
                  <p className="font-medium">Database optimization skills</p>
                  <p className="text-sm text-muted-foreground">Need to improve advanced SQL and database performance tuning</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Textarea placeholder="Add another weakness..." className="min-h-[60px]" />
                <div className="mt-2 text-right">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Weakness
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-blue-700 dark:text-blue-400">Opportunities</CardTitle>
            <CardDescription>External factors that could positively impact growth</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-blue-500 mt-1"></div>
                <div>
                  <p className="font-medium">Internship programs</p>
                  <p className="text-sm text-muted-foreground">Apply for internships at tech companies to gain industry experience</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-blue-500 mt-1"></div>
                <div>
                  <p className="font-medium">Growing demand for AI/ML skills</p>
                  <p className="text-sm text-muted-foreground">Develop expertise in trending technologies with high market demand</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-blue-500 mt-1"></div>
                <div>
                  <p className="font-medium">Open source contributions</p>
                  <p className="text-sm text-muted-foreground">Build reputation by contributing to relevant open source projects</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-blue-500 mt-1"></div>
                <div>
                  <p className="font-medium">Hackathons and competitions</p>
                  <p className="text-sm text-muted-foreground">Participate in events to showcase skills and expand network</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Textarea placeholder="Add another opportunity..." className="min-h-[60px]" />
                <div className="mt-2 text-right">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Opportunity
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200 shadow-sm">
          <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
            <CardTitle className="text-amber-700 dark:text-amber-400">Threats</CardTitle>
            <CardDescription>External factors that could negatively impact growth</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-amber-500 mt-1"></div>
                <div>
                  <p className="font-medium">Competition in the job market</p>
                  <p className="text-sm text-muted-foreground">High number of qualified graduates competing for limited positions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-amber-500 mt-1"></div>
                <div>
                  <p className="font-medium">Rapidly changing technology</p>
                  <p className="text-sm text-muted-foreground">Risk of skills becoming outdated in fast-evolving tech landscape</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-amber-500 mt-1"></div>
                <div>
                  <p className="font-medium">Economy and job market fluctuations</p>
                  <p className="text-sm text-muted-foreground">Economic downturns affecting hiring and job security</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1 h-6 bg-amber-500 mt-1"></div>
                <div>
                  <p className="font-medium">Work-life balance challenges</p>
                  <p className="text-sm text-muted-foreground">Risk of burnout from demanding tech industry work culture</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Textarea placeholder="Add another threat..." className="min-h-[60px]" />
                <div className="mt-2 text-right">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Threat
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>AI-Powered Analysis & Recommendations</CardTitle>
          <CardDescription>Based on your SWOT analysis, here are personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Leverage your strengths</h3>
              <p className="text-sm">Your programming skills and problem-solving abilities make you a strong candidate for technical roles. Consider applying for positions that emphasize these skills, such as software development or data analysis roles.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Address weaknesses</h3>
              <p className="text-sm">To overcome your limited industry experience, seek internships or part-time roles while still in college. For public speaking anxiety, join clubs like Toastmasters or take communication courses.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Pursue opportunities</h3>
              <p className="text-sm">The growing demand for AI/ML skills aligns well with your technical background. Consider taking specialized courses in machine learning and applying for AI-focused internships to capitalize on this trend.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Mitigate threats</h3>
              <p className="text-sm">To stand out in the competitive job market, develop a unique portfolio showcasing your projects and skills. Stay current with technology trends by regularly learning new tools and frameworks.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <ArrowRight className="mr-2 h-4 w-4" />
            Get Detailed Action Plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SWOT;
