import apiClient from '../api/client';
import type { User, AuthResponse, ApiResponse } from '../types';

export class AuthService {
  /**
   * Register a new user
   * POST /auth/register
   */
  static async register(userData: Partial<User>): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
      if (response.data.error) throw new Error(response.data.error);
      return response.data.data!;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  }

  /**
   * Login an existing user
   * POST /auth/login
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
      if (response.data.error) throw new Error(response.data.error);
      return response.data.data!;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  }

  /**
   * Fetch current user profile (using the JWT cookie automatically)
   * GET /users/me
   */
  static async getMe(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    if (response.data.error) throw new Error(response.data.error);
    return response.data.data!;
  }
}
