import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Trophy, 
  Rocket,
  Loader2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  Tag,
  Building2,
  Globe,
  Star,
  SlidersHorizontal
} from 'lucide-react';
import { 
  fetchHackathons, 
  filterHackathons, 
  sortHackathons, 
  generateProjectIdeas,
  findCompatibleTeammates,
  type Hackathon 
} from '@/services/hackathonService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Available themes for filtering
const AVAILABLE_THEMES = [
  'AI', 'Web3', 'Blockchain', 'Mobile', 'Web', 'Cloud', 'IoT', 'Cybersecurity',
  'Healthcare', 'Education', 'Fintech', 'Social Impact', 'AR/VR', 'Gaming', 'Climate'
];

// Available locations
const LOCATIONS = ['remote', 'in-person', 'hybrid'];

// Sort options
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'prize', label: 'Prize Amount' },
  { value: 'registration', label: 'Registration Count' }
] as const;

const HackMatch = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<typeof SORT_OPTIONS[number]['value']>('featured');

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        setLoading(true);
        const data = await fetchHackathons();
        setHackathons(data);
        setFilteredHackathons(sortHackathons(data, 'featured'));
      } catch (err) {
        setError('Failed to load hackathons. Please try again later.');
        console.error('Error loading hackathons:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHackathons();
  }, []);

  useEffect(() => {
    let filtered = [...hackathons];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(hackathon => 
        hackathon.title.toLowerCase().includes(query) ||
        hackathon.description.toLowerCase().includes(query) ||
        hackathon.themes.some(theme => theme.toLowerCase().includes(query))
      );
    }
    
    filtered = sortHackathons(filtered, sortOption);
    setFilteredHackathons(filtered);
  }, [hackathons, searchQuery, sortOption]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">Hackathons</h1>
        <p className="text-muted-foreground">Discover upcoming hackathons and competitions</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search hackathons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={sortOption} onValueChange={(value) => setSortOption(value as typeof sortOption)}>
          <SelectTrigger className="w-[180px]">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHackathons.map((hackathon) => (
          <Card key={hackathon.id} className={`flex flex-col ${hackathon.featured ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                {hackathon.thumbnail && (
                  <img 
                    src={hackathon.thumbnail} 
                    alt={hackathon.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="line-clamp-2 text-lg">{hackathon.title}</CardTitle>
                    {hackathon.featured && (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  {hackathon.organization && (
                    <CardDescription className="mt-1">
                      by {hackathon.organization}
                    </CardDescription>
                  )}
                </div>
                <Badge variant="outline">{hackathon.source}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {hackathon.timeLeft}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">
                    {hackathon.location}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Prize</div>
                  <div className="text-sm text-muted-foreground">
                    {hackathon.prize}
                  </div>
                </div>
                {hackathon.registrations && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {hackathon.registrations.toLocaleString()} registered
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {hackathon.themes.map((theme, i) => (
                    <Badge key={i} variant="secondary">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a 
                  href={hackathon.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  View Details
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HackMatch; 