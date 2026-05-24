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
  church_freq: string;
  prayer_freq: string;
  bible_freq: string;
  intentions: string;

  // Preferences
  min_age_pref?: number;
  max_age_pref?: number;
  max_distance?: number;
  photos?: string[];
  is_verified?: boolean;

  created_at: string; // ISO String
  updated_at: string; // ISO String
}

export interface Match {
  id: string;
  user_id_1: string;
  user_id_2: string;
  status: 'active' | 'unmatched';
  created_at: string;
  updated_at: string;
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
