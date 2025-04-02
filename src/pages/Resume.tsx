
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeEditor from '@/components/resume/ResumeEditor';
import { FileText, Rocket, BarChart } from "lucide-react";

const Resume = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">Resume Builder</h1>
        <p className="text-muted-foreground">Create, edit and export your professional resume</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Resume Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last updated</span>
                <span>Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format</span>
                <span>PDF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sections</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Style</span>
                <span>Professional</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Rocket className="h-5 w-5 mr-2" />
              ATS Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                A+
              </div>
              <div className="ml-4">
                <p className="text-sm">Your resume is optimized for ATS systems.</p>
                <p className="text-xs text-muted-foreground mt-1">Last scan: Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Resume Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">Completeness</span>
                  <span className="text-xs font-medium">85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">Keyword Optimization</span>
                  <span className="text-xs font-medium">90%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">Readability</span>
                  <span className="text-xs font-medium">95%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Resume Editor</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="ats">ATS Checker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <Card>
            <CardContent className="p-6">
              <ResumeEditor />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="py-12">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Resume Templates</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Choose from a variety of professional templates to make your resume stand out.
                  Coming soon in the next update!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ats">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="py-12">
                <Rocket className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">ATS Optimization Tool</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Analyze your resume against job descriptions to ensure it passes 
                  Applicant Tracking Systems. Coming soon in the next update!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resume;
