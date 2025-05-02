import axios from 'axios';

// Define interfaces for API responses
interface DevpostHackathon {
  id: number;
  title: string;
  displayed_location: {
    icon: string;
    location: string;
  };
  url: string;
  thumbnail_url: string;
  submission_period_dates: string;
  time_left_to_submission: string;
  themes: Array<{
    id: number;
    name: string;
  }>;
  prize_amount: string;
  registrations_count: number;
  organization_name: string;
}

interface HackerEarthHackathon {
  title: string;
  description: string;
  url: string;
  date: string;
  end_date: string;
  time: string;
  end_time: string;
  cover_image: string;
  thumbnail: string;
  registrations_count?: number;
  prize?: {
    amount: string;
    currency: string;
  };
  themes?: string[];
}

// Define our normalized Hackathon interface
export interface Hackathon {
  id: string;
  title: string;
  description: string;
  url: string;
  deadline: string;
  timeLeft: string;
  location: string;
  prize: string;
  registrations?: number;
  organization?: string;
  thumbnail?: string;
  themes: string[];
  source: 'Devpost' | 'HackerEarth';
  featured?: boolean;
}

// Use CORS proxy to bypass CORS restrictions
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const DEVPOST_API = `${CORS_PROXY}https://devpost.com/api/hackathons?upcoming=true`;
const HACKEREARTH_API = `${CORS_PROXY}https://www.hackerearth.com/chrome-extension/events/`;

// Cache for API responses
const cache = new Map<string, { data: Hackathon[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to fetch hackathons from multiple sources
export async function fetchHackathons(): Promise<Hackathon[]> {
  try {
    // Check cache first
    const cachedData = cache.get('hackathons');
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    // Add headers to mimic browser request
    const headers = {
      'Origin': 'https://devpost.com',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };

    const [devpostRes, hackerEarthRes] = await Promise.all([
      axios.get(DEVPOST_API, { headers }),
      axios.get(HACKEREARTH_API, { headers })
    ]);

    const devpostHackathons = devpostRes.data.hackathons.map((h: DevpostHackathon) => ({
      id: h.id.toString(),
      title: h.title,
      description: `${h.organization_name} hackathon - ${h.time_left_to_submission}`,
      url: h.url,
      deadline: h.submission_period_dates.split(' - ')[1],
      timeLeft: h.time_left_to_submission,
      location: h.displayed_location.location,
      prize: h.prize_amount.replace(/[<].*?[>]/g, ''),
      registrations: h.registrations_count,
      organization: h.organization_name,
      thumbnail: h.thumbnail_url ? `https:${h.thumbnail_url}` : undefined,
      themes: h.themes.map(t => t.name),
      source: 'Devpost' as const,
      featured: h.registrations_count > 1000 // Mark popular hackathons as featured
    }));

    const hackerEarthHackathons = hackerEarthRes.data.response.map((h: HackerEarthHackathon) => ({
      id: `he-${h.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: h.title,
      description: h.description?.replace(/\\n/g, '') || '',
      url: h.url,
      deadline: h.end_date,
      timeLeft: `Ends ${new Date(h.end_date).toLocaleDateString()}`,
      location: 'Online',
      prize: h.prize?.amount ? `${h.prize.currency} ${h.prize.amount}` : 'Check website for details',
      registrations: h.registrations_count,
      thumbnail: h.thumbnail || h.cover_image,
      themes: h.themes || ['Hackathon'],
      source: 'HackerEarth' as const,
      featured: h.registrations_count ? h.registrations_count > 1000 : false
    }));

    const allHackathons = [...devpostHackathons, ...hackerEarthHackathons];
    
    // Sort by deadline and featured status
    const sortedHackathons = allHackathons.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    // Cache the results
    cache.set('hackathons', {
      data: sortedHackathons,
      timestamp: Date.now()
    });

    return sortedHackathons;

  } catch (error) {
    console.error('Error fetching hackathons:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
    }
    
    // Return cached data if available, even if expired
    const cachedData = cache.get('hackathons');
    if (cachedData) {
      console.log('Returning cached data due to error');
      return cachedData.data;
    }
    
    return [];
  }
}

// Function to filter hackathons
export const filterHackathons = (
  hackathons: Hackathon[],
  filters: {
    themes?: string[];
    location?: 'remote' | 'in-person' | 'hybrid';
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
  }
): Hackathon[] => {
  return hackathons.filter(hackathon => {
    if (filters.themes && filters.themes.length > 0) {
      const hasMatchingTheme = hackathon.themes.some(theme =>
        filters.themes!.some(filterTheme =>
          theme.toLowerCase().includes(filterTheme.toLowerCase())
        )
      );
      if (!hasMatchingTheme) return false;
    }

    if (filters.location && hackathon.location !== filters.location) {
      return false;
    }

    if (filters.difficulty && hackathon.difficulty !== filters.difficulty) {
      return false;
    }

    return true;
  });
};

// Function to sort hackathons
export const sortHackathons = (
  hackathons: Hackathon[],
  sortBy: 'deadline' | 'prize' | 'registration' | 'featured'
): Hackathon[] => {
  return [...hackathons].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'prize':
        const prizeA = parseInt(a.prize.replace(/[^0-9]/g, '')) || 0;
        const prizeB = parseInt(b.prize.replace(/[^0-9]/g, '')) || 0;
        return prizeB - prizeA;
      case 'registration':
        return (b.registrations || 0) - (a.registrations || 0);
      default:
        return 0;
    }
  });
};

// Function to generate project ideas
export const generateProjectIdeas = async (
  themes: string[],
  skills: string[]
): Promise<string[]> => {
  // Mock project ideas
  return [
    'AI-powered healthcare diagnosis system',
    'Blockchain-based supply chain tracking',
    'IoT environmental monitoring solution',
    'AR/VR educational platform',
    'Sustainable energy management app'
  ];
};

// Function to find compatible teammates
export const findCompatibleTeammates = (
  skills: string[],
  timezone: string,
  preferredThemes: string[]
): any[] => {
  // Mock teammate data
  return [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      skills: ['React', 'Node.js', 'Python'],
      interests: ['AI', 'Web3'],
      compatibility: 85
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      skills: ['Python', 'Machine Learning', 'AWS'],
      interests: ['AI', 'Healthcare'],
      compatibility: 75
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      skills: ['React', 'TypeScript', 'Blockchain'],
      interests: ['Web3', 'Blockchain'],
      compatibility: 90
    }
  ];
}; 