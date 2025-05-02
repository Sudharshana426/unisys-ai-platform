import axios from 'axios';

// API configuration
const INTERNSHIPS_API_CONFIG = {
  url: 'https://internships-api.p.rapidapi.com/active-ats-7d',
  headers: {
    'x-rapidapi-host': 'internships-api.p.rapidapi.com',
    'x-rapidapi-key': 'cf1810e4a2msh1f40a6918f3774ep17bda9jsn819e92549d30'
  }
};

// Sample data from LinkedIn
const SAMPLE_LINKEDIN_JOBS = [
  {
    id: "1540988728",
    title: "Senior Data Engineer",
    organization: "Jobot",
    organization_url: "https://www.linkedin.com/company/jobot",
    organization_logo: "https://media.licdn.com/dms/image/v2/D560BAQFBeHszXin1VA/company-logo_200_200/company-logo_200_200/0/1737157657968/jobot_logo?e=2147483647&v=beta&t=NicMQnujqzx01lzFeWUEoy_NEm1RqfjA_I0QlnQslR8",
    location_type: null,
    locations_derived: ["Houston, Texas, United States"],
    salary_raw: {
      currency: "USD",
      value: {
        minValue: 120000,
        maxValue: 150000,
        unitText: "YEAR"
      }
    },
    employment_type: ["FULL_TIME"],
    url: "https://www.linkedin.com/jobs/view/senior-data-engineer-at-jobot-4200390612",
    date_posted: "2025-04-06T13:04:12",
    remote_derived: false,
    seniority: "Mid-Senior level"
  },
  {
    id: "1540977084",
    title: "Healthcare Data Engineer",
    organization: "Jobot",
    organization_url: "https://www.linkedin.com/company/jobot",
    organization_logo: "https://media.licdn.com/dms/image/v2/D560BAQFBeHszXin1VA/company-logo_200_200/company-logo_200_200/0/1737157657968/jobot_logo?e=2147483647&v=beta&t=NicMQnujqzx01lzFeWUEoy_NEm1RqfjA_I0QlnQslR8",
    location_type: "TELECOMMUTE",
    locations_derived: ["Costa Mesa, California, United States"],
    salary_raw: {
      currency: "USD",
      value: {
        minValue: 110000,
        maxValue: 160000,
        unitText: "YEAR"
      }
    },
    employment_type: ["FULL_TIME"],
    url: "https://www.linkedin.com/jobs/view/healthcare-data-engineer-at-jobot-4200388738",
    date_posted: "2025-04-06T13:04:11",
    remote_derived: true,
    seniority: "Mid-Senior level"
  },
  {
    id: "1540532118",
    title: "Staff Data Engineer - Core Analytics",
    organization: "Datadog",
    organization_url: "https://www.linkedin.com/company/datadog",
    organization_logo: "https://media.licdn.com/dms/image/v2/C560BAQFLwWfI6v1OPA/company-logo_200_200/company-logo_200_200/0/1657564322231/datadog_logo?e=2147483647&v=beta&t=egaHbGzc5g_ZpFnvWE5u9jzbbTXY4odlbXI4AaCLQ9g",
    location_type: null,
    locations_derived: ["New York, United States"],
    salary_raw: {
      currency: "USD",
      value: {
        minValue: 234000,
        maxValue: 300000,
        unitText: "YEAR"
      }
    },
    employment_type: ["FULL_TIME"],
    url: "https://www.linkedin.com/jobs/view/staff-data-engineer-core-analytics-at-datadog-4162321096",
    date_posted: "2025-04-06T09:41:51",
    remote_derived: false,
    seniority: "Mid-Senior level"
  }
];

// Sample data from Upwork
const SAMPLE_UPWORK_JOBS = [
  {
    id: "1657708",
    title: "Editing YouTube video niche BUSINESS / ENTREPRENEUR - Contract to Hire",
    date_posted: "2025-04-06T14:01:30.156+00:00",
    locations_derived: ["United States"],
    salary_raw: null,
    url: "https://www.upwork.com/freelance-jobs/apply/Editing-YouTube-video-niche-BUSINESS-ENTREPRENEUR_~021908882759917756068/",
    category: "Video & Animation",
    category_group: "Design & Creative",
    client_company_industry: "Art & Design",
    description_text: "I'm looking for an experienced video editor...",
    project_budget_hourly_min: null,
    project_budget_hourly_max: null,
    project_budget_currency: "USD",
    client_country: "France"
  },
  {
    id: "1657664",
    title: "Lead Generation and Appointment Setting Specialist - Contract to Hire",
    date_posted: "2025-04-06T14:01:14.371+00:00",
    locations_derived: ["United States"],
    salary_raw: {
      currency: "USD",
      value: {
        unitText: "HOUR",
        minValue: 5,
        maxValue: 6
      }
    },
    url: "https://www.upwork.com/freelance-jobs/apply/Lead-Generation-and-Appointment-Setting-Specialist_~021908882693838454882/",
    category: "Lead Generation & Telemarketing",
    category_group: "Sales & Marketing",
    client_company_industry: "Sales & Marketing",
    description_text: "Looking for a proactive and detail-oriented Lead Generation Specialist...",
    project_budget_hourly_min: 5,
    project_budget_hourly_max: 6,
    project_budget_currency: "USD",
    client_country: "Canada"
  },
  {
    id: "1657676",
    title: "Create Ads for Facebook and Instagram",
    date_posted: "2025-04-06T14:01:12.236+00:00",
    locations_derived: ["United States"],
    salary_raw: {
      currency: "USD",
      value: {
        unitText: "HOUR",
        minValue: 8,
        maxValue: 25
      }
    },
    url: "https://www.upwork.com/freelance-jobs/apply/Create-Ads-for-Facebook-and-Instagram_~021908882684713057445/",
    category: "Digital Marketing",
    category_group: "Sales & Marketing",
    client_company_industry: "Tech & IT",
    description_text: "We are seeking a creative content creator...",
    project_budget_hourly_min: 8,
    project_budget_hourly_max: 25,
    project_budget_currency: "USD",
    client_country: "United States"
  }
];

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
  source: 'LinkedIn' | 'Upwork' | 'Internship';
  featured?: boolean;
  remote?: boolean;
  description?: string;
  category?: string;
}

// Cache for API responses
const cache = new Map<string, { data: Job[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function transformInternshipJob(job: any): Job {
  return {
    id: job.id || String(Math.random()),
    title: job.title,
    company: job.company_name || job.organization || 'Unknown Company',
    logo: job.company_logo || job.organization_logo,
    location: job.location || (job.locations_derived ? job.locations_derived[0] : 'Location not specified'),
    url: job.url || job.application_url,
    postedDate: job.posted_date || job.date_posted || new Date().toISOString(),
    type: 'Internship',
    skills: job.skills || [],
    source: 'Internship' as const,
    featured: false,
    remote: job.remote || job.remote_derived || false,
    category: 'Internship',
    description: job.description || ''
  };
}

function transformUpworkJob(job: any): Job {
  let salary = '';
  if (job.salary_raw?.value) {
    const { currency, value } = job.salary_raw;
    if (value.unitText === 'HOUR') {
      salary = `${currency} ${value.minValue}-${value.maxValue}/hr`;
    }
  } else if (job.project_budget_hourly_min && job.project_budget_hourly_max) {
    salary = `${job.project_budget_currency} ${job.project_budget_hourly_min}-${job.project_budget_hourly_max}/hr`;
  }

  return {
    id: job.id,
    title: job.title,
    company: job.client_company_industry || 'Unknown Company',
    location: job.locations_derived[0] || 'Remote',
    url: job.url,
    postedDate: job.date_posted,
    salary,
    type: job.category,
    skills: job.skills_additional || [],
    source: 'Upwork' as const,
    featured: false,
    remote: job.locations_derived.length > 5, // If job is available in many locations, likely remote
    description: job.description_text,
    category: job.category_group
  };
}

function transformLinkedInJob(job: any): Job {
  return {
    id: job.id,
    title: job.title,
    company: job.organization,
    logo: job.organization_logo,
    location: job.locations_derived[0],
    url: job.url,
    postedDate: job.date_posted,
    salary: job.salary_raw 
      ? `${job.salary_raw.currency} ${job.salary_raw.value.minValue}-${job.salary_raw.value.maxValue}`
      : undefined,
    type: job.employment_type?.[0],
    experience: job.seniority,
    skills: [],
    source: 'LinkedIn' as const,
    featured: job.salary_raw?.value.maxValue ? job.salary_raw.value.maxValue > 200000 : false,
    remote: job.remote_derived
  };
}

export async function fetchJobs(
  titleFilter: string = '',
  locationFilter: string = '',
  typeFilter: string = '',
  offset: number = 0
): Promise<Job[]> {
  try {
    // Check cache first
    const cacheKey = `jobs-${titleFilter}-${locationFilter}-${typeFilter}-${offset}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    // Fetch internships from the API
    let internshipJobs: Job[] = [];
    if (!typeFilter || typeFilter === 'internship') {
      try {
        const response = await axios.get(INTERNSHIPS_API_CONFIG.url, {
          headers: INTERNSHIPS_API_CONFIG.headers
        });
        internshipJobs = response.data.map(transformInternshipJob);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    }

    // Transform jobs from other sources
    const linkedInJobs = SAMPLE_LINKEDIN_JOBS.map(transformLinkedInJob);
    const upworkJobs = SAMPLE_UPWORK_JOBS.map(transformUpworkJob);

    // Combine and sort all jobs
    const allJobs = [...linkedInJobs, ...upworkJobs, ...internshipJobs].sort((a, b) => {
      // Sort by featured status first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then sort by posted date
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });

    // Apply filters if provided
    const filteredJobs = allJobs.filter(job => {
      const matchesTitle = !titleFilter || 
        job.title.toLowerCase().includes(titleFilter.toLowerCase()) ||
        job.description?.toLowerCase().includes(titleFilter.toLowerCase());
      
      const matchesLocation = !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesType = !typeFilter ||
        (typeFilter === 'internship' && job.source === 'Internship') ||
        (typeFilter === 'job' && job.source !== 'Internship');

      return matchesTitle && matchesLocation && matchesType;
    });

    // Cache the results
    cache.set(cacheKey, {
      data: filteredJobs,
      timestamp: Date.now()
    });

    return filteredJobs;

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