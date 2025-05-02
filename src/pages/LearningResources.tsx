import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, ExternalLink, Filter, Search, Video } from "lucide-react";

interface LearningResource {
  id: number;
  title: string;
  description: string;
  type: 'course' | 'video' | 'book' | 'tutorial';
  source: string;
  duration?: string;
  author?: string;
  rating: number;
  relevance: 'high' | 'medium' | 'low';
  skills: string[];
  url: string;
}

const LearningResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [relevanceFilter, setRelevanceFilter] = useState<string>('all');

  const resources: LearningResource[] = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "A comprehensive course covering the fundamentals of machine learning algorithms and their applications.",
      type: "course",
      source: "Coursera",
      duration: "8 weeks",
      rating: 4.8,
      relevance: "high",
      skills: ["Python", "Machine Learning", "Data Analysis"],
      url: "https://coursera.org/ml-course"
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master essential data structures and algorithms with practical examples and coding exercises.",
      type: "book",
      source: "O'Reilly Media",
      author: "Michael T. Goodrich",
      rating: 4.7,
      relevance: "high",
      skills: ["Algorithms", "Data Structures", "Problem Solving"],
      url: "https://oreilly.com/dsa-book"
    },
    {
      id: 3,
      title: "Understanding JavaScript Promises",
      description: "Learn about JavaScript promises, async/await, and modern asynchronous programming patterns.",
      type: "tutorial",
      source: "MDN Web Docs",
      duration: "45 minutes",
      rating: 4.5,
      relevance: "medium",
      skills: ["JavaScript", "Async Programming", "Web Development"],
      url: "https://developer.mozilla.org/promises"
    },
    {
      id: 4,
      title: "Building RESTful APIs with Node.js",
      description: "A practical guide to creating robust and scalable REST APIs using Node.js and Express.",
      type: "video",
      source: "YouTube",
      duration: "1.5 hours",
      rating: 4.9,
      relevance: "medium",
      skills: ["Node.js", "Express", "API Design"],
      url: "https://youtube.com/nodejs-api"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesRelevance = relevanceFilter === 'all' || resource.relevance === relevanceFilter;
    
    return matchesSearch && matchesType && matchesRelevance;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="book">Books</SelectItem>
            <SelectItem value="tutorial">Tutorials</SelectItem>
          </SelectContent>
        </Select>
        <Select value={relevanceFilter} onValueChange={setRelevanceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Relevance</SelectItem>
            <SelectItem value="high">High Relevance</SelectItem>
            <SelectItem value="medium">Medium Relevance</SelectItem>
            <SelectItem value="low">Low Relevance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription className="mt-1">{resource.source}</CardDescription>
                </div>
                {resource.relevance === "high" && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                    Highly Relevant
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                {resource.type === "course" && <BookOpen className="h-4 w-4 mr-2" />}
                {resource.type === "video" && <Video className="h-4 w-4 mr-2" />}
                <span className="capitalize">{resource.type}</span>
                {resource.duration && (
                  <>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {resource.duration}
                  </>
                )}
                {resource.author && (
                  <>
                    <span className="mx-2">•</span>
                    {resource.author}
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {resource.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Access Resource
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">No resources found</h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search or filters to find more resources.
          </p>
        </div>
      )}
    </div>
  );
};

export default LearningResources; 