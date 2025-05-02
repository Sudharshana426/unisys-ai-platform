import React, { useState, useEffect } from 'react';
import { getLinkedInAuthUrl, exchangeCodeForToken, fetchLinkedInProfile, LinkedInProfile } from '@/services/linkedinService';

const LinkedIn = () => {
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLinkedInLogin = () => {
    window.location.href = getLinkedInAuthUrl();
  };

  const fetchProfile = async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      const tokenData = await exchangeCodeForToken(code);
      const profileData = await fetchLinkedInProfile(tokenData.access_token);
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchProfile(code);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">LinkedIn Profile</h1>
      {!profile && !loading && (
        <div className="text-center">
          <button
            onClick={handleLinkedInLogin}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Connect with LinkedIn
          </button>
        </div>
      )}
      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      {profile && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            {profile.profilePicture && (
              <img
                src={profile.profilePicture}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-24 h-24 rounded-full object-cover mr-6"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-black">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">{profile.headline}</p>
              <p className="text-gray-500 text-sm mt-1">
                {profile.location} • {profile.industry}
              </p>
              {profile.email && (
                <p className="text-gray-500 text-sm mt-1">
                  {profile.email}
                </p>
              )}
            </div>
          </div>
          {profile.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-black">About</h3>
              <p className="text-gray-700">{profile.summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkedIn; 