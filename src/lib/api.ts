
import { supabase } from './supabase';
import { toast } from 'sonner';
import type { UserProgress, ModuleType, UserProfile } from './database';

// User Progress API functions
export const getUserProgress = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data as UserProgress[];
  } catch (error: any) {
    toast.error(`Error fetching progress: ${error.message}`);
    return [];
  }
};

export const updateUserProgress = async (
  userId: string,
  moduleId: string, 
  completed: boolean,
  score?: number
) => {
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        completed,
        score: score || null,
        last_activity: new Date().toISOString()
      });
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast.error(`Error updating progress: ${error.message}`);
    return false;
  }
};

// Modules API functions
export const getModules = async (category?: string) => {
  try {
    let query = supabase.from('modules').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data as ModuleType[];
  } catch (error: any) {
    toast.error(`Error fetching modules: ${error.message}`);
    return [];
  }
};

// User Profile API functions
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error;
    return data as UserProfile;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const createOrUpdateUserProfile = async (profile: Partial<UserProfile> & { user_id: string }) => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .upsert(profile);
      
    if (error) throw error;
    toast.success('Profile updated successfully');
    return true;
  } catch (error: any) {
    toast.error(`Error updating profile: ${error.message}`);
    return false;
  }
};
