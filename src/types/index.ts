// Layer 0: API Contracts
// These interfaces map 1:1 with the Go models in church-backend/models/

export interface User {
  id: string; // Maps to MongoDB ObjectID hex string
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: 'Male' | 'Female';
  interested_in: 'Male' | 'Female' | 'Everyone';

  // Faith Profile
  denomination: string;
  custom_church?: string;
  church_assembly?: string;
  church_freq: string;
  prayer_freq: string;
  bible_freq: string;
  intention: string;

  // Preferences
  min_age_pref?: number;
  max_age_pref?: number;
  max_distance?: number;
  preferred_denomination?: string;
  preferred_church_freq?: string;
  photos?: string[];
  is_verified?: boolean;
  bio?: string;
  profile_embedding?: number[];
  partner_pref_text?: string;
  partner_pref_embedding?: number[];

  // Scenario Matching & Badges
  scenario_answers?: Record<string, string>;
  unlocked_badges?: string[];

  // Genotype & Medical Profile
  genotype?: string;
  strict_genotype_filter?: boolean;

  // Dynamic Match Attributes
  match_score?: number;
  shared_badges?: string[];
  icebreaker_prompt?: string;
  genotype_status?: 'compatible' | 'incompatible' | 'unverified';
  genotype_warning?: string;

  // Guest account flag
  is_guest?: boolean;

  created_at: string; // ISO String
  updated_at: string; // ISO String
}

export interface ScenarioOption {
  id: string;
  text: string;
  badge_label: string;
}

export interface ScenarioQuestion {
  id: string;
  pillar: string;
  question: string;
  options: ScenarioOption[];
  is_onboard?: boolean;
}

export interface Match {
  id: string;
  users: string[];
  status: 'pending' | 'matched' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface MatchResponse {
  user: User;
  last_message: Message | null;
}

export interface Prayer {
  id: string;
  author_id: string;
  content: string;
  amen_count: number;
  amens_by: string[];
  created_at: string;
  author_name: string;
  author_photo: string;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  type?: 'text' | 'prayer';
  is_read: boolean;
  created_at: string;
}

// Common API Response wrapper for our utils.JSON() and utils.Error()
export interface ApiResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}

// Specific Response payload for the Login/Register endpoints
export interface AuthResponse {
  user: User;
  token: string;
}
