import axios from 'axios';

// Unified Hackathon type
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
  source: 'Devpost' | 'HackerEarth' | 'HackClub';
  featured?: boolean;
  status?: string;
}

// API endpoints (with CORS proxy for browser fetches)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const DEVPOST_API = `${CORS_PROXY}https://devpost.com/api/hackathons?upcoming=true`;
const HACKEREARTH_API = `${CORS_PROXY}https://www.hackerearth.com/chrome-extension/events/`;
const HACKCLUB_API = `${CORS_PROXY}https://hackathons.hackclub.com/api/events/upcoming`;

// Transform Devpost
function transformDevpostHackathon(h: any): Hackathon {
  return {
    id: `devpost-${h.id}`,
    title: h.title,
    description: `${h.organization_name || ''} hackathon - ${h.time_left_to_submission || ''}`,
    url: h.url,
    deadline: h.submission_period_dates?.split(' - ')[1] || '',
    timeLeft: h.time_left_to_submission || '',
    location: h.displayed_location?.location || 'Online',
    prize: h.prize_amount?.replace(/[<].*?[>]/g, '') || '',
    registrations: h.registrations_count,
    organization: h.organization_name,
    thumbnail: h.thumbnail_url ? `https:${h.thumbnail_url}` : undefined,
    themes: h.themes?.map((t: any) => t.name) || [],
    source: 'Devpost',
    featured: h.featured,
    status: h.open_state || 'upcoming',
  };
}

// Transform HackerEarth
function transformHackerEarthHackathon(h: any): Hackathon {
  return {
    id: `hackerearth-${h.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: h.title,
    description: h.description?.replace(/\\n/g, '') || '',
    url: h.url,
    deadline: h.end_date || '',
    timeLeft: h.end_date ? `Ends ${new Date(h.end_date).toLocaleDateString()}` : '',
    location: 'Online',
    prize: h.prize?.amount ? `${h.prize.currency} ${h.prize.amount}` : 'Check website for details',
    registrations: h.registrations_count,
    organization: undefined,
    thumbnail: h.thumbnail || h.cover_image,
    themes: h.themes || ['Hackathon'],
    source: 'HackerEarth',
    featured: h.registrations_count ? h.registrations_count > 1000 : false,
    status: h.status,
  };
}

// Transform Hack Club
function transformHackClubHackathon(h: any): Hackathon {
  return {
    id: `hackclub-${h.id || h.name}`,
    title: h.name,
    description: h.description || '',
    url: h.website,
    deadline: h.end,
    timeLeft: h.end ? `Ends ${new Date(h.end).toLocaleDateString()}` : '',
    location: h.location || 'Online',
    prize: h.prize || '',
    registrations: undefined,
    organization: h.organizer || '',
    thumbnail: h.banner,
    themes: h.tags || [],
    source: 'HackClub',
    featured: false,
    status: h.status,
  };
}

export async function fetchHackathons(): Promise<Hackathon[]> {
  try {
    const [devpostRes, hackerEarthRes, hackClubRes] = await Promise.all([
      axios.get(DEVPOST_API),
      axios.get(HACKEREARTH_API),
      axios.get(HACKCLUB_API),
    ]);
    const devpostHackathons = (devpostRes.data.hackathons || []).map(transformDevpostHackathon);
    const hackerEarthHackathons = (hackerEarthRes.data.response || []).map(transformHackerEarthHackathon);
    const hackClubHackathons = (hackClubRes.data || []).map(transformHackClubHackathon);
    return [...devpostHackathons, ...hackerEarthHackathons, ...hackClubHackathons];
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return [];
  }
}

// Function to filter hackathons
export const filterHackathons = (
  hackathons: Hackathon[],
  filters: {
    themes?: string[];
    location?: 'remote' | 'in-person' | 'hybrid';
    status?: 'upcoming' | 'ongoing' | 'ended';
    source?: 'Devpost' | 'HackerEarth' | 'HackClub';
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

    if (filters.location && hackathon.location.toLowerCase() !== filters.location.toLowerCase()) {
      return false;
    }

    if (filters.status && hackathon.status !== filters.status) {
      return false;
    }

    if (filters.source && hackathon.source !== filters.source) {
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
        const prizeA = parseFloat(a.prize.replace(/[^0-9.]/g, ''));
        const prizeB = parseFloat(b.prize.replace(/[^0-9.]/g, ''));
        return prizeB - prizeA;
      case 'registration':
        return (b.registrations || 0) - (a.registrations || 0);
      default:
        return 0;
    }
  });
};

// Function to generate project ideas based on hackathon themes
export const generateProjectIdeas = async (
  themes: string[],
  skills: string[]
): Promise<string[]> => {
  // This is a placeholder for AI-generated project ideas
  // In a real implementation, you would use an AI service
  return themes.map(theme => 
    `Project idea for ${theme}: A ${skills.join(', ')} based solution`
  );
};

// Function to find compatible teammates
export const findCompatibleTeammates = (
  skills: string[],
  timezone: string,
  preferredThemes: string[]
): any[] => {
  // This is a placeholder for teammate matching
  // In a real implementation, you would use a matching algorithm
  return [];
}; 