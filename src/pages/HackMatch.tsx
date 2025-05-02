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

const sourceColors: Record<string, string> = {
  Devpost: 'bg-blue-700',
  HackerEarth: 'bg-orange-700',
  HackClub: 'bg-pink-700',
};

function getEventType(h: Hackathon): 'Online' | 'In-Person' | 'Hybrid' {
  const themes = h.themes.map(t => t.toLowerCase());
  if (themes.includes('online') || h.location.toLowerCase().includes('online')) return 'Online';
  if (themes.includes('hybrid') || h.location.toLowerCase().includes('hybrid')) return 'Hybrid';
  return 'In-Person';
}

function getBanner(h: Hackathon): string | undefined {
  return h.thumbnail || '';
}

const badgeColors: Record<string, string> = {
  'Online': 'bg-pink-600',
  'In-Person': 'bg-blue-600',
  'Hybrid': 'bg-yellow-500',
};

const HackMatch = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<typeof SORT_OPTIONS[number]['value']>('featured');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHackathons();
        setHackathons(data);
        setFilteredHackathons(sortHackathons(data, 'featured'));
      } catch (err) {
        setError('Failed to load hackathons.');
      } finally {
        setLoading(false);
      }
    };
    load();
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
        <h1 className="text-3xl font-bold gradient-heading">All Hackathons</h1>
        <p className="text-muted-foreground">Discover upcoming hackathons and competitions from Devpost, HackerEarth, and Hack Club.</p>
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredHackathons.map((h) => {
          const eventType = getEventType(h);
          const banner = getBanner(h);
          return (
            <a
              key={h.id}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow relative bg-gray-900"
              style={{ minHeight: 260 }}
            >
              {banner ? (
                <img
                  src={banner}
                  alt={h.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-700" />
              )}
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow ${badgeColors[eventType]}`}>{eventType}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow ${sourceColors[h.source]}`}>{h.source}</span>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="mb-2">
                  <div className="text-2xl font-bold text-white drop-shadow mb-1 truncate" style={{textShadow: '0 2px 8px #000, 0 1px 0 #000'}}>{h.title}</div>
                  {h.organization && (
                    <div className="text-sm text-white/90 font-medium mb-1 truncate" style={{textShadow: '0 1px 4px #000'}}>{h.organization}</div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {h.themes.slice(0, 3).map((theme, i) => (
                    <span key={i} className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm" style={{textShadow: '0 1px 4px #000'}}>
                      {theme}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {h.prize && <span className="bg-green-700/80 text-white text-xs px-2 py-0.5 rounded-full" style={{textShadow: '0 1px 4px #000'}}>Prize: {h.prize}</span>}
                  {h.registrations && <span className="bg-blue-700/80 text-white text-xs px-2 py-0.5 rounded-full" style={{textShadow: '0 1px 4px #000'}}>{h.registrations.toLocaleString()} Registered</span>}
                </div>
                <div className="flex flex-col gap-1 text-xs text-white/90" style={{textShadow: '0 1px 4px #000'}}>
                  <div><span className="font-semibold">Date:</span> {h.deadline || h.timeLeft}</div>
                  <div><span className="font-semibold">Location:</span> {h.location}</div>
                </div>
                {h.description && (
                  <div className="mt-2 text-xs text-white/80 line-clamp-2" style={{textShadow: '0 1px 4px #000'}}>{h.description}</div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HackMatch; 