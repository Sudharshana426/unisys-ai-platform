
export type UserProgress = {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  score: number | null;
  last_activity: string;
  created_at: string;
};

export type ModuleType = {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_time: number; // in minutes
  created_at: string;
};

export type UserProfile = {
  id: string;
  user_id: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  academic_year: number | null;
  major: string | null;
  created_at: string;
  updated_at: string;
};

// Helper function to check if a module is completed
export const isModuleCompleted = (
  moduleId: string,
  userProgress: UserProgress[] | undefined
): boolean => {
  if (!userProgress) return false;
  const progress = userProgress.find(p => p.module_id === moduleId);
  return progress ? progress.completed : false;
};

// Helper function to get user's score for a module
export const getModuleScore = (
  moduleId: string,
  userProgress: UserProgress[] | undefined
): number | null => {
  if (!userProgress) return null;
  const progress = userProgress.find(p => p.module_id === moduleId);
  return progress ? progress.score : null;
};
