const LINKEDIN_CLIENT_ID = "86d60ogcej09hw";
const LINKEDIN_CLIENT_SECRET = "WPL_AP1.RW2kryfUv6WdzjFd.WZm37A==";
const REDIRECT_URI = "http://localhost:3000/linkedin/callback";

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profilePicture: string;
  summary: string;
  location: string;
  industry: string;
  email?: string;
  education?: Education[];
  positions?: Position[];
  skills?: Skill[];
  recommendations?: Recommendation[];
}

export interface Education {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: {
    year: number;
    month?: number;
  };
  endDate?: {
    year: number;
    month?: number;
  };
  activities?: string;
  description?: string;
}

export interface Position {
  id: string;
  title: string;
  companyName: string;
  location?: string;
  startDate: {
    year: number;
    month?: number;
  };
  endDate?: {
    year: number;
    month?: number;
  };
  description?: string;
  isCurrent: boolean;
}

export interface Skill {
  id: string;
  name: string;
  endorsementCount: number;
}

export interface Recommendation {
  id: string;
  recommender: {
    firstName: string;
    lastName: string;
    headline?: string;
  };
  recommendationText: string;
  relationship: string;
  date: string;
}

export const getLinkedInAuthUrl = () => {
  const scope = 'r_liteprofile r_emailaddress r_education_history r_work_history r_skills r_recommendations';
  const state = Math.random().toString(36).substring(7);
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&state=${state}`;
};

export const exchangeCodeForToken = async (code: string) => {
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  return response.json();
};

export const fetchLinkedInProfile = async (accessToken: string): Promise<LinkedInProfile> => {
  const [profileResponse, emailResponse, educationResponse, positionsResponse, skillsResponse, recommendationsResponse] = await Promise.all([
    fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }),
    fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }),
    fetch('https://api.linkedin.com/v2/education?q=member&projection=(elements*(id,timePeriod,degreeName,fieldOfStudy,schoolName,activities,description))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }),
    fetch('https://api.linkedin.com/v2/positions?q=member&projection=(elements*(id,title,companyName,location,timePeriod,description,isCurrent))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }),
    fetch('https://api.linkedin.com/v2/skills?q=member&projection=(elements*(id,name,endorsementCount))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }),
    fetch('https://api.linkedin.com/v2/recommendations?q=member&projection=(elements*(id,recommender,recommendationText,relationship,date))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }),
  ]);

  if (!profileResponse.ok) {
    throw new Error('Failed to fetch profile');
  }

  const profileData = await profileResponse.json();
  const emailData = await emailResponse.json();
  const educationData = await educationResponse.json();
  const positionsData = await positionsResponse.json();
  const skillsData = await skillsResponse.json();
  const recommendationsData = await recommendationsResponse.json();

  return {
    id: profileData.id,
    firstName: profileData.localizedFirstName,
    lastName: profileData.localizedLastName,
    headline: profileData.headline,
    profilePicture: profileData.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || '',
    summary: profileData.summary || '',
    location: profileData.location?.name || '',
    industry: profileData.industry || '',
    email: emailData.elements?.[0]?.['handle~']?.emailAddress,
    education: educationData.elements?.map((edu: any) => ({
      id: edu.id,
      schoolName: edu.schoolName,
      degree: edu.degreeName,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: edu.timePeriod.startDate,
      endDate: edu.timePeriod.endDate,
      activities: edu.activities,
      description: edu.description,
    })),
    positions: positionsData.elements?.map((pos: any) => ({
      id: pos.id,
      title: pos.title,
      companyName: pos.companyName,
      location: pos.location?.name,
      startDate: pos.timePeriod.startDate,
      endDate: pos.timePeriod.endDate,
      description: pos.description,
      isCurrent: pos.isCurrent,
    })),
    skills: skillsData.elements?.map((skill: any) => ({
      id: skill.id,
      name: skill.name,
      endorsementCount: skill.endorsementCount,
    })),
    recommendations: recommendationsData.elements?.map((rec: any) => ({
      id: rec.id,
      recommender: {
        firstName: rec.recommender.firstName,
        lastName: rec.recommender.lastName,
        headline: rec.recommender.headline,
      },
      recommendationText: rec.recommendationText,
      relationship: rec.relationship,
      date: rec.date,
    })),
  };
}; 