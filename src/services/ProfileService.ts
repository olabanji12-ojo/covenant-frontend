import apiClient from '../api/client';
import type { User, ApiResponse } from '../types';

export class ProfileService {
  /**
   * Update current user profile
   * PATCH /users/me
   */
  static async updateProfile(updateData: Partial<User>): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>('/users/me', updateData);
    if (response.data.error) throw new Error(response.data.error);
    return response.data.data!;
  }

  /**
   * Add photos to current user
   * POST /users/me/photos
   */
  static async addPhotos(photos: string[]): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/users/me/photos', { photos });
    if (response.data.error) throw new Error(response.data.error);
    return response.data.data!;
  }
}
