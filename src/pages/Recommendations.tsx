import React, { useState, useEffect } from 'react';

const YOUTUBE_API_KEY = "AIzaSyC5ExHyTQgZg4PpdSUj62B04knBS3pxFqg";
const NEWS_API_KEY = "15e14921c6394157b74ca593463a7f33";

async function fetchVideoDetails(videoIds) {
  if (!videoIds.length) return [];
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("YouTube API error");
  const data = await res.json();
  return data.items;
}

async function searchYoutubeVideos(query, maxResults = 8) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("YouTube API error");
  const data = await res.json();
  return data.items;
}

async function fetchChannelDetails(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("YouTube API error");
  const data = await res.json();
  return data.items[0]?.statistics?.subscriberCount || 0;
}

async function fetchNewsArticles(keyword) {
  if (!keyword) return [];
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${NEWS_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.articles || [];
}

function parseDuration(duration) {
  // ISO 8601 duration to seconds
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, h, m, s] = match.map(Number);
  return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
}

function scoreVideo(video, query, subscriberCount) {
  const viewCount = Number(video.statistics.viewCount) || 0;
  const likeCount = Number(video.statistics.likeCount) || 0;
  const dislikeCount = Number(video.statistics.dislikeCount) || 0;
  const title = video.snippet.title.toLowerCase();
  const description = video.snippet.description.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Keyword match score
  let keywordScore = 0;
  if (title.includes(queryLower)) keywordScore += 2;
  if (description.includes(queryLower)) keywordScore += 1;
  
  // View-to-subscriber ratio
  const subCount = Number(subscriberCount) || 1;
  const viewSubRatio = viewCount / subCount;
  
  // Like-to-dislike ratio
  const likeDislikeRatio = dislikeCount > 0 ? likeCount / dislikeCount : likeCount;
  
  // Final score (tweak weights as needed)
  return keywordScore * 10 + viewSubRatio * 5 + likeDislikeRatio;
}

const Recommendations = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [durationPref, setDurationPref] = useState('any'); // 'any' | 'short' | 'medium' | 'long'
  const [articles, setArticles] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  // Debounce news search
  useEffect(() => {
    if (!input) {
      setArticles([]);
      return;
    }
    setNewsLoading(true);
    const timeout = setTimeout(() => {
      fetchNewsArticles(input)
        .then(setArticles)
        .catch(() => setArticles([]))
        .finally(() => setNewsLoading(false));
    }, 500);
    return () => clearTimeout(timeout);
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
  };

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setVideos([]);
    searchYoutubeVideos(query, 16)
      .then(async (searchResults) => {
        const videoIds = searchResults.map(v => v.id.videoId).filter(Boolean);
        const details = await fetchVideoDetails(videoIds);
        // Fetch subscriber counts for each channel
        const channelIds = [...new Set(details.map(v => v.snippet.channelId))];
        const channelSubs = {};
        for (const channelId of channelIds) {
          channelSubs[channelId] = await fetchChannelDetails(channelId);
        }
        // Filter by duration preference
        let filtered = details.filter(v => {
          const seconds = parseDuration(v.contentDetails.duration);
          if (durationPref === 'short' && (seconds < 60 || seconds > 240)) return false;
          if (durationPref === 'medium' && (seconds < 240 || seconds > 1200)) return false;
          if (durationPref === 'long' && seconds < 1200) return false;
          return true;
        });
        // Score and sort videos
        let scored = filtered.map(v => ({
          ...v,
          score: scoreVideo(v, query, channelSubs[v.snippet.channelId])
        }));
        scored = scored.sort((a, b) => b.score - a.score);
        setVideos(scored);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [query, durationPref]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Personalized YouTube Recommendations</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter keywords..."
          className="border border-gray-300 rounded px-3 py-2 flex-1 text-black"
        />
        <select
          value={durationPref}
          onChange={e => setDurationPref(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-36 text-black"
        >
          <option value="any">Any Duration</option>
          <option value="short">Short (&lt; 4 min)</option>
          <option value="medium">Medium (4-20 min)</option>
          <option value="long">Long (&gt; 20 min)</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.slice(0, 10).map(video => (
          <div key={video.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="rounded mb-2 w-full h-40 object-cover" />
              <h3 className="text-lg font-semibold mb-1 text-black">{video.snippet.title}</h3>
            </a>
            <p className="text-black text-sm flex-1">{video.snippet.description.slice(0, 100)}...</p>
            <div className="text-xs text-gray-700 mt-2">Channel: {video.snippet.channelTitle}</div>
            <div className="text-xs text-gray-700">Views: {video.statistics.viewCount}</div>
            {video.statistics.likeCount && <div className="text-xs text-gray-700">Likes: {video.statistics.likeCount}</div>}
            <div className="text-xs text-gray-700">Subscribers: {video.score && Math.round((Number(video.statistics.viewCount) / (video.score/5 - (video.statistics.likeCount || 0))) || 0)}</div>
            <div className="text-xs text-gray-700">Score: {video.score && video.score.toFixed(2)}</div>
            <div className="text-xs text-gray-700">Duration: {video.contentDetails.duration.replace('PT','')}</div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-10 mb-4 text-black">Related News Articles</h2>
      {newsLoading && <div>Loading news...</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map(article => (
          <div key={article.url} className="bg-gray-100 rounded-lg shadow p-4 flex flex-col">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 mb-2">{article.title}</a>
            <p className="text-black text-sm flex-1 mb-2">{article.description}</p>
            <div className="text-xs text-gray-700 mt-2">Source: {article.source?.name}</div>
            <div className="text-xs text-gray-700">Published: {article.publishedAt?.slice(0, 10)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations; 