import React, { useState, useEffect } from 'react';
import { fetchInternships, fetchJobs, sortJobs, type Job } from '@/services/jobService';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, Clock, ExternalLink, Briefcase } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const SORT_OPTIONS = [
  { value: 'date', label: 'Most Recent' },
  { value: 'salary', label: 'Highest Salary' },
  { value: 'company', label: 'Company Name' }
] as const;

const typeColors: Record<string, string> = {
  Internship: 'bg-blue-700',
  Job: 'bg-green-700',
};

export const InternshipsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [internships, jobs] = await Promise.all([
          fetchInternships(),
          fetchJobs(),
        ]);
        const allJobs = [...internships, ...jobs];
        setJobs(allJobs);
        setFilteredJobs(allJobs);
      } catch (err) {
        setError('Failed to fetch opportunities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    let filtered = jobs;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.skills?.some(skill => skill.toLowerCase().includes(query))
      );
    }
    if (locationFilter) {
      const location = locationFilter.toLowerCase();
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location)
      );
    }
    if (jobTypeFilter !== 'all') {
      filtered = filtered.filter(job =>
        jobTypeFilter === 'internship' ? job.source === 'Internship' : job.source === 'Job'
      );
    }
    filtered = sortJobs(filtered, sortBy as any);
    setFilteredJobs(filtered);
  }, [jobs, searchQuery, locationFilter, jobTypeFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">Jobs & Internships</h1>
        <p className="text-muted-foreground">Find your next opportunity</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Search jobs or internships..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Input
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="job">Full-time Jobs</SelectItem>
            <SelectItem value="internship">Internships</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <a
              key={job.id}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow relative bg-gray-900"
              style={{ minHeight: 220 }}
            >
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-700" />
              )}
              {/* Top badges */}
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow ${typeColors[job.source]}`}>{job.source}</span>
                {job.remote && <span className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow bg-purple-700">Remote</span>}
              </div>
              {/* Main content overlay */}
              <div className="relative z-10 flex flex-col justify-end h-full p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="mb-2">
                  <div className="text-2xl font-bold text-white drop-shadow mb-1 truncate" style={{textShadow: '0 2px 8px #000, 0 1px 0 #000'}}>{job.title}</div>
                  <div className="text-sm text-white/90 font-medium mb-1 truncate" style={{textShadow: '0 1px 4px #000'}}>{job.company}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.skills && job.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm" style={{textShadow: '0 1px 4px #000'}}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.salary && <span className="bg-green-700/80 text-white text-xs px-2 py-0.5 rounded-full" style={{textShadow: '0 1px 4px #000'}}>Salary: {job.salary}</span>}
                  <span className="bg-blue-700/80 text-white text-xs px-2 py-0.5 rounded-full" style={{textShadow: '0 1px 4px #000' }}>Posted {formatDistanceToNow(new Date(job.postedDate))} ago</span>
                </div>
                <div className="flex flex-col gap-1 text-xs text-white/90" style={{textShadow: '0 1px 4px #000'}}>
                  <div><span className="font-semibold">Location:</span> {job.location}</div>
                </div>
                {job.description && (
                  <div className="mt-2 text-xs text-white/80 line-clamp-2" style={{textShadow: '0 1px 4px #000'}}>{job.description}</div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">No jobs or internships found</h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search or filters to find more opportunities.
          </p>
        </div>
      )}
    </div>
  );
};
