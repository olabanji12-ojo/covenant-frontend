import apiClient from '../api/client';
import type { User, Match, ApiResponse } from '../types';

export class SwipeService {
  /**
   * Get Discovery Feed (Hybrid Filtering Algorithm)
   * GET /discover
   */
  static async getDiscoveryFeed(): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>('/discover');
    if (response.data.error) throw new Error(response.data.error);
    return response.data.data!;
  }

  /**
   * Swipe Right (Like)
   * POST /matches/{id}/like
   */
  static async likeUser(targetUserId: string): Promise<Match> {
    const response = await apiClient.post<ApiResponse<Match>>(`/matches/${targetUserId}/like`);
    if (response.data.error) throw new Error(response.data.error);
    return response.data.data!;
  }

  /**
   * Swipe Left (Pass)
   * POST /matches/{id}/pass
   */
  static async passUser(targetUserId: string): Promise<Match> {
    const response = await apiClient.post<ApiResponse<Match>>(`/matches/${targetUserId}/pass`);
    if (response.data.error) throw new Error(response.data.error);
    return response.data.data!;
  }
}
