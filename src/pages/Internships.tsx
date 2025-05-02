import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ExternalLink, Loader2, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

interface Internship {
  id: string;
  title: string;
  company_name: string;
  company_logo?: string;
  location: string;
  url: string;
  posted_date: string;
  description?: string;
  remote?: boolean;
  employment_type?: string[];
}

const INTERNSHIPS_API_CONFIG = {
  url: 'https://internships-api.p.rapidapi.com/active-ats-7d',
  headers: {
    'x-rapidapi-host': 'internships-api.p.rapidapi.com',
    'x-rapidapi-key': 'cf1810e4a2msh1f40a6918f3774ep17bda9jsn819e92549d30'
  }
};

const InternshipsPage = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(INTERNSHIPS_API_CONFIG.url, {
          headers: INTERNSHIPS_API_CONFIG.headers
        });
        setInternships(response.data);
        setFilteredInternships(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch internships. Please try again later.');
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter(internship => {
      const matchesSearch = !searchQuery || 
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !locationFilter ||
        internship.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesLocation;
    });

    setFilteredInternships(filtered);
  }, [searchQuery, locationFilter, internships]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Internships</h1>
          <p className="text-muted-foreground">Find the perfect internship opportunity</p>
        </div>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                  <CardTitle className="text-lg">{internship.title}</CardTitle>
                  <CardDescription className="mt-1">{internship.company_name}</CardDescription>
                          </div>
                {internship.company_logo && (
                  <img
                    src={internship.company_logo}
                    alt={`${internship.company_name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                )}
                  </div>
                </CardHeader>
                <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {internship.location}
                    </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Posted {formatDistanceToNow(new Date(internship.posted_date))} ago
                    </div>
                {internship.remote && (
                  <Badge variant="secondary">Remote</Badge>
                )}
                  </div>
              {internship.description && (
                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                  {internship.description}
                </p>
              )}
                </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={internship.url} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">No internships found</h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search or filters to find more opportunities.
          </p>
                      </div>
      )}
    </div>
  );
};

export default InternshipsPage;
