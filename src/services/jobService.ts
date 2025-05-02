import axios from 'axios';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  url: string;
  postedDate: string;
  salary?: string;
  type?: string;
  experience?: string;
  skills: string[];
  source: 'Internship' | 'Job';
  featured?: boolean;
  remote?: boolean;
  description?: string;
  category?: string;
}

const RAPIDAPI_KEY = 'cf1810e4a2msh1f40a6918f3774ep17bda9jsn819e92549d30';
const BASE_URL = 'https://internships-api.p.rapidapi.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-rapidapi-host': 'internships-api.p.rapidapi.com',
    'x-rapidapi-key': RAPIDAPI_KEY,
  },
});

function transformJob(job: any, type: 'Internship' | 'Job'): Job {
  return {
    id: job.id || job._id || Math.random().toString(36).substr(2, 9),
    title: job.title,
    company: job.company_name || job.organization || 'Unknown Company',
    logo: job.company_logo || job.organization_logo,
    location: job.location || (job.locations_derived ? job.locations_derived[0] : 'Location not specified'),
    url: job.url || job.application_url,
    postedDate: job.posted_date || job.date_posted || new Date().toISOString(),
    salary: job.salary_raw ? JSON.stringify(job.salary_raw) : '',
    type,
    skills: job.skills || [],
    source: type,
    featured: false,
    remote: job.remote || job.remote_derived || false,
    category: job.category || '',
    description: job.description || '',
  };
}

export async function fetchInternships(): Promise<Job[]> {
  try {
    const res = await axiosInstance.get('/active-ats-7d');
    return (res.data || []).map((job: any) => transformJob(job, 'Internship'));
  } catch (error) {
    console.error('Error fetching internships:', error);
    return [];
  }
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await axiosInstance.get('/active-jb-7d');
    return (res.data || []).map((job: any) => transformJob(job, 'Job'));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Function to sort jobs
export const sortJobs = (
  jobs: Job[],
  sortBy: 'featured' | 'date' | 'salary' | 'company'
): Job[] => {
  return [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      case 'date':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case 'salary':
        const salaryA = parseInt(a.salary?.replace(/[^0-9]/g, '') || '0');
        const salaryB = parseInt(b.salary?.replace(/[^0-9]/g, '') || '0');
        return salaryB - salaryA;
      case 'company':
        return a.company.localeCompare(b.company);
      default:
        return 0;
    }
  });
}; 