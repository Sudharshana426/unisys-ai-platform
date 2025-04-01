
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink, CheckCircle, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

// Dummy data for the coding platforms
const leetcodeData = {
  totalSolved: 230,
  totalProblems: 2300,
  easyCount: 120,
  easyTotal: 600,
  mediumCount: 80,
  mediumTotal: 1100,
  hardCount: 30,
  hardTotal: 600,
  recentSubmissions: [
    { id: 1, name: 'Two Sum', difficulty: 'Easy', status: 'Accepted', date: '2023-10-22' },
    { id: 2, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', status: 'Accepted', date: '2023-10-21' },
    { id: 3, name: 'Median of Two Sorted Arrays', difficulty: 'Hard', status: 'Wrong Answer', date: '2023-10-20' },
    { id: 4, name: 'Valid Parentheses', difficulty: 'Easy', status: 'Accepted', date: '2023-10-19' },
  ],
  contestRating: 1850,
  contestRank: '12,345',
  contestHistory: [1750, 1780, 1820, 1790, 1850]
};

const codechefData = {
  rating: 1925,
  stars: 5,
  globalRank: '8,342',
  countryRank: '422',
  problems: {
    solved: 112,
    total: 1000,
    beginner: 45,
    easy: 35,
    medium: 22,
    hard: 10
  },
  recentContests: [
    { id: 1, name: 'October Long Challenge', rank: 342, ratingChange: '+15', date: '2023-10-15' },
    { id: 2, name: 'September Cook-Off', rank: 421, ratingChange: '+8', date: '2023-09-25' },
    { id: 3, name: 'August Lunchtime', rank: 504, ratingChange: '-5', date: '2023-08-20' }
  ]
};

const codeforcesData = {
  handle: 'codeMaster42',
  rating: 1824,
  rank: 'Expert',
  maxRating: 1900,
  contribution: 12,
  friendsCount: 23,
  registrationDate: '2020-05-15',
  recentContests: [
    { id: 1, name: 'Codeforces Round #850', rank: 1245, ratingChange: '+12', date: '2023-10-10' },
    { id: 2, name: 'Educational Codeforces Round 155', rank: 962, ratingChange: '+25', date: '2023-09-30' },
    { id: 3, name: 'Codeforces Round #849', rank: 1352, ratingChange: '-8', date: '2023-09-15' }
  ],
  problemsSolved: 245
};

const hackerrankData = {
  badges: [
    { name: 'Problem Solving', level: 5, count: 45 },
    { name: 'SQL', level: 4, count: 30 },
    { name: 'Python', level: 5, count: 35 },
    { name: 'Java', level: 3, count: 25 },
  ],
  certifications: [
    { name: 'Problem Solving (Basic)', date: '2021-08-15' },
    { name: 'Python (Intermediate)', date: '2022-01-20' },
    { name: 'SQL (Advanced)', date: '2022-06-10' }
  ],
  allTimeRank: '34,521'
};

const interviewbitData = {
  score: 2500,
  rank: '4,325',
  streak: 15,
  problemsSolved: 125,
  badges: ["Early Adopter", "Problem Solver", "Contest Winner"],
  recentActivity: [
    { problem: "Nearest Smaller Element", points: 300, date: '2023-10-18' },
    { problem: "Max Sum Contiguous Subarray", points: 250, date: '2023-10-15' },
    { problem: "Palindrome String", points: 200, date: '2023-10-12' }
  ]
};

// Recommended problems based on user's performance
const recommendedProblems = [
  { id: 1, name: 'Maximum Subarray', platform: 'LeetCode', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 2, name: 'Detect Cycle in a Graph', platform: 'CodeChef', difficulty: 'Medium', topic: 'Graphs' },
  { id: 3, name: 'Word Break', platform: 'LeetCode', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 4, name: 'Range Sum Query', platform: 'Codeforces', difficulty: 'Easy', topic: 'Data Structures' }
];

export default function CodingPlatform() {
  return (
    <div className="container mx-auto pt-4 pb-16 md:ml-64">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-heading">Coding Platform Integration</h1>
        <p className="text-muted-foreground mt-1">Track your progress across multiple competitive coding platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">LeetCode</CardTitle>
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Problems Solved</span>
                  <span className="text-sm text-muted-foreground">{leetcodeData.totalSolved}/{leetcodeData.totalProblems}</span>
                </div>
                <Progress value={(leetcodeData.totalSolved / leetcodeData.totalProblems) * 100} className="bg-gray-200" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Easy</p>
                  <p className="text-sm font-medium">{leetcodeData.easyCount}/{leetcodeData.easyTotal}</p>
                  <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${(leetcodeData.easyCount / leetcodeData.easyTotal) * 100}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Medium</p>
                  <p className="text-sm font-medium">{leetcodeData.mediumCount}/{leetcodeData.mediumTotal}</p>
                  <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full" style={{ width: `${(leetcodeData.mediumCount / leetcodeData.mediumTotal) * 100}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Hard</p>
                  <p className="text-sm font-medium">{leetcodeData.hardCount}/{leetcodeData.hardTotal}</p>
                  <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: `${(leetcodeData.hardCount / leetcodeData.hardTotal) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between border-t pt-3 mt-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Contest Rating</p>
                  <p className="font-semibold">{leetcodeData.contestRating}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Global Rank</p>
                  <p className="font-semibold">{leetcodeData.contestRank}</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">CodeChef</CardTitle>
              <img src="https://cdn.codechef.com/sites/default/files/uploads/pictures/bdf71f9d7a2a43a8e52311dfcff769d0.png" alt="CodeChef" className="h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-2">
                <div className="text-center">
                  <div className="text-3xl font-bold">{codechefData.rating}</div>
                  <div className="text-yellow-500">
                    {'★'.repeat(codechefData.stars)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Global Rank</p>
                  <p className="font-semibold">{codechefData.globalRank}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Country Rank</p>
                  <p className="font-semibold">{codechefData.countryRank}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Problems Solved</span>
                  <span className="text-sm text-muted-foreground">{codechefData.problems.solved}/{codechefData.problems.total}</span>
                </div>
                <Progress value={(codechefData.problems.solved / codechefData.problems.total) * 100} className="bg-gray-200" />
              </div>
              
              <div className="border-t pt-3 mt-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Recent Contest</p>
                <p className="font-medium">{codechefData.recentContests[0].name}</p>
                <div className="flex justify-center items-center mt-1">
                  <Badge variant="outline">{`Rank: ${codechefData.recentContests[0].rank}`}</Badge>
                  <span className={`ml-2 text-sm ${codechefData.recentContests[0].ratingChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {codechefData.recentContests[0].ratingChange}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Codeforces</CardTitle>
              <img src="https://codeforces.org/s/0/favicon-96x96.png" alt="Codeforces" className="h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-3xl font-bold">{codeforcesData.rating}</div>
                  <div className="px-2 py-1 rounded text-xs text-white bg-blue-500">{codeforcesData.rank}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Max Rating: {codeforcesData.maxRating}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Solved</p>
                  <p className="font-semibold">{codeforcesData.problemsSolved}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Contrib.</p>
                  <p className="font-semibold">{codeforcesData.contribution}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Friends</p>
                  <p className="font-semibold">{codeforcesData.friendsCount}</p>
                </div>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <p className="text-xs text-muted-foreground mb-2">Recent Contests</p>
                <div className="space-y-2">
                  {codeforcesData.recentContests.slice(0, 2).map((contest) => (
                    <div key={contest.id} className="flex justify-between items-center">
                      <div className="text-sm truncate max-w-[140px]">{contest.name}</div>
                      <div className="flex items-center">
                        <span className="text-xs mr-2">#{contest.rank}</span>
                        <span className={`text-xs ${contest.ratingChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {contest.ratingChange}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contest Performance Analysis</CardTitle>
          <CardDescription>Your progress across all competitive coding platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="leetcode" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
              <TabsTrigger value="codechef">CodeChef</TabsTrigger>
              <TabsTrigger value="codeforces">Codeforces</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leetcode" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Contest Rating History</h3>
                  <div className="h-64 flex items-end justify-between">
                    {leetcodeData.contestHistory.map((rating, index) => (
                      <div key={index} className="relative w-[15%]">
                        <div
                          className="bg-gradient-to-t from-primary to-brand-purple rounded-t-md"
                          style={{ height: `${(rating - 1700) / 3}px` }}
                        ></div>
                        <span className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 text-xs">
                          {rating}
                        </span>
                        <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">
                          {`C${index + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Submissions</h3>
                  <div className="space-y-3">
                    {leetcodeData.recentSubmissions.map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-2 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{submission.name}</p>
                          <div className="flex items-center mt-1">
                            <Badge 
                              variant="outline" 
                              className={
                                submission.difficulty === 'Easy' ? 'text-green-500 border-green-200 bg-green-50' : 
                                submission.difficulty === 'Medium' ? 'text-yellow-500 border-yellow-200 bg-yellow-50' : 
                                'text-red-500 border-red-200 bg-red-50'
                              }
                            >
                              {submission.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">{submission.date}</span>
                          </div>
                        </div>
                        <div>
                          {submission.status === 'Accepted' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Topic-wise Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Arrays', 'Strings', 'Dynamic Programming', 'Trees', 'Graphs', 'Linked Lists', 'Sorting', 'Searching'].map((topic, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <p className="text-sm font-medium">{topic}</p>
                      <div className="flex items-end mt-2">
                        <Progress value={75 - (index * 5)} className="h-2" />
                        <span className="text-xs font-medium ml-2">{75 - (index * 5)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="codechef" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Rating Progress</h3>
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-48 h-48 rounded-full border-8 border-yellow-500 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{codechefData.rating}</div>
                        <div className="text-yellow-500 text-lg">
                          {'★'.repeat(codechefData.stars)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">5-Star Coder</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {['Beginner', 'Easy', 'Medium', 'Hard'].map((level, index) => {
                      let solved;
                      let total;
                      
                      if (level === 'Beginner') {
                        solved = codechefData.problems.beginner;
                        total = codechefData.problems.beginner * 2;
                      } else if (level === 'Easy') {
                        solved = codechefData.problems.easy;
                        total = codechefData.problems.easy * 2;
                      } else if (level === 'Medium') {
                        solved = codechefData.problems.medium;
                        total = codechefData.problems.medium * 3;
                      } else {
                        solved = codechefData.problems.hard;
                        total = codechefData.problems.hard * 2;
                      }
                      
                      return (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">{level}</p>
                            <p className="text-sm text-muted-foreground">{solved}/{total}</p>
                          </div>
                          <Progress value={(solved / total) * 100} className="mt-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Contests</h3>
                  <div className="space-y-4">
                    {codechefData.recentContests.map((contest) => (
                      <div key={contest.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{contest.name}</h4>
                          <Badge variant="outline">{contest.date}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Rank</p>
                            <p className="font-medium">#{contest.rank}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <p className="text-xs text-muted-foreground mr-2">Rating Change</p>
                            <span className={`font-medium ${contest.ratingChange.startsWith('+') ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                              {contest.ratingChange.startsWith('+') ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                              {contest.ratingChange}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="codeforces" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Overview</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-medium">{codeforcesData.handle}</p>
                        <p className="text-xs text-muted-foreground">Registered on {codeforcesData.registrationDate}</p>
                      </div>
                      <div className="flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                        {codeforcesData.rank}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="font-semibold">{codeforcesData.rating}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Max Rating</p>
                        <p className="font-semibold">{codeforcesData.maxRating}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Problems</p>
                        <p className="font-semibold">{codeforcesData.problemsSolved}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 text-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Contribution</p>
                        <p className="font-semibold">{codeforcesData.contribution}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Friends</p>
                        <p className="font-semibold">{codeforcesData.friendsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Contests</h3>
                  <div className="space-y-3">
                    {codeforcesData.recentContests.map((contest) => (
                      <div key={contest.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium truncate max-w-[180px]">{contest.name}</p>
                            <p className="text-xs text-muted-foreground">{contest.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">Rank #{contest.rank}</p>
                            <p className={`text-sm ${contest.ratingChange.startsWith('+') ? 'text-green-500' : 'text-red-500'} flex items-center justify-end`}>
                              {contest.ratingChange.startsWith('+') ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                              {contest.ratingChange}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>More Platforms</CardTitle>
            <CardDescription>Your other coding profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hackerrank">
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="hackerrank">HackerRank</TabsTrigger>
                <TabsTrigger value="interviewbit">InterviewBit</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hackerrank" className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {hackerrankData.badges.map((badge, index) => (
                    <div key={index} className="border rounded-lg p-2 text-center">
                      <p className="text-xs font-medium">{badge.name}</p>
                      <div className="flex justify-center text-yellow-500 my-1">
                        {'★'.repeat(badge.level)}
                      </div>
                      <p className="text-xs text-muted-foreground">{badge.count} points</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3">
                  <p className="font-medium mb-2">Certifications</p>
                  <div className="space-y-2">
                    {hackerrankData.certifications.map((cert, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <p className="text-sm">{cert.name}</p>
                        <Badge variant="outline">{cert.date}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm">All-Time Rank: <span className="font-medium">{hackerrankData.allTimeRank}</span></p>
                </div>
              </TabsContent>
              
              <TabsContent value="interviewbit" className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="text-2xl font-bold">{interviewbitData.score}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rank</p>
                    <p className="text-2xl font-bold">#{interviewbitData.rank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Problems</p>
                    <p className="text-2xl font-bold">{interviewbitData.problemsSolved}</p>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <p className="font-medium mb-2">Current Streak: {interviewbitData.streak} days</p>
                  <div className="flex flex-wrap gap-2">
                    {interviewbitData.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary">{badge}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <p className="font-medium mb-2">Recent Activity</p>
                  <div className="space-y-2">
                    {interviewbitData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <p className="text-sm">{activity.problem}</p>
                        <div className="flex items-center">
                          <span className="text-sm text-green-500 font-medium mr-2">+{activity.points}</span>
                          <span className="text-xs text-muted-foreground">{activity.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended Problems</CardTitle>
            <CardDescription>Based on your strengths and areas to improve</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedProblems.map((problem) => (
                <div key={problem.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{problem.name}</p>
                      <div className="flex items-center mt-1">
                        <Badge 
                          variant="outline" 
                          className={
                            problem.difficulty === 'Easy' ? 'text-green-500 border-green-200 bg-green-50' : 
                            problem.difficulty === 'Medium' ? 'text-yellow-500 border-yellow-200 bg-yellow-50' : 
                            'text-red-500 border-red-200 bg-red-50'
                          }
                        >
                          {problem.difficulty}
                        </Badge>
                        <span className="text-xs ml-2 bg-gray-100 px-2 py-0.5 rounded-full">{problem.topic}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-xs font-medium mr-3">{problem.platform}</div>
                      <Button size="sm" variant="outline" className="h-8 px-2">
                        <Code className="h-3.5 w-3.5 mr-1" />
                        Solve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="default" className="w-full mt-2">
                View More Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Coding Stats</CardTitle>
          <CardDescription>Overall performance analysis across all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Topic-wise Proficiency</h3>
              <div className="space-y-3">
                {['Data Structures', 'Dynamic Programming', 'Graphs', 'Greedy Algorithms', 'Search & Sort', 'String Manipulation'].map((topic, index) => {
                  const value = 90 - (index * 10);
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{topic}</span>
                        <span className="text-sm text-muted-foreground">{value}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-primary to-brand-purple" 
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Improvement Areas</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-medium">Tree-based Problems</h4>
                  <p className="text-sm text-muted-foreground mt-1">Your success rate on tree problems is 42%, below your average of 68%</p>
                  <div className="mt-3 flex justify-between items-center">
                    <Button size="sm" variant="outline">
                      Practice Trees
                    </Button>
                    <Badge variant="outline">20 recommended problems</Badge>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-medium">Advanced Dynamic Programming</h4>
                  <p className="text-sm text-muted-foreground mt-1">You solved 15 basic DP problems but struggled with advanced variations</p>
                  <div className="mt-3 flex justify-between items-center">
                    <Button size="sm" variant="outline">
                      Learn Advanced DP
                    </Button>
                    <Badge variant="outline">5 recommended videos</Badge>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-medium">Contest Time Management</h4>
                  <p className="text-sm text-muted-foreground mt-1">You often solve problems correctly but exceed optimal time limits</p>
                  <div className="mt-3 flex justify-between items-center">
                    <Button size="sm" variant="outline">
                      Practice Speed Coding
                    </Button>
                    <Badge variant="outline">8 timed challenges</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
