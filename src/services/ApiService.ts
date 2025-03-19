/// <reference types="vite/client" />

import { Video, FocusMetric, WatchSession, AppSettings, ApiResponse } from '../types';

class ApiService {
  private apiUrl: string;

  constructor() {
    // In a real app, this would come from environment variables
    this.apiUrl = import.meta.env?.VITE_API_URL || '/api';
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('auth_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers,
    });

    return response;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const status = response.status;
    
    if (status === 401) {
      // Handle unauthorized - could redirect to login or refresh token
      return { status, error: 'Authentication required' };
    }
    
    if (status === 403) {
      return { status, error: 'Permission denied' };
    }
    
    try {
      if (status >= 200 && status < 300) {
        const data = await response.json();
        return { status, data };
      } else {
        const errorData = await response.json();
        return { status, error: errorData.error || 'An error occurred' };
      }
    } catch (error) {
      return { 
        status, 
        error: 'Failed to process response' 
      };
    }
  }

  // Video-related API calls
  async getVideos(): Promise<ApiResponse<Video[]>> {
    const response = await this.fetchWithAuth('/videos');
    return this.handleResponse<Video[]>(response);
  }

  async getVideoById(id: string): Promise<ApiResponse<Video>> {
    const response = await this.fetchWithAuth(`/videos/${id}`);
    return this.handleResponse<Video>(response);
  }

  async createVideo(video: Omit<Video, 'id'>): Promise<ApiResponse<Video>> {
    const response = await this.fetchWithAuth('/videos', {
      method: 'POST',
      body: JSON.stringify(video),
    });
    return this.handleResponse<Video>(response);
  }

  async updateVideo(id: string, video: Partial<Video>): Promise<ApiResponse<Video>> {
    const response = await this.fetchWithAuth(`/videos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(video),
    });
    return this.handleResponse<Video>(response);
  }

  async deleteVideo(id: string): Promise<ApiResponse<void>> {
    const response = await this.fetchWithAuth(`/videos/${id}`, {
      method: 'DELETE',
    });
    return this.handleResponse<void>(response);
  }

  // Focus metrics API calls
  async getDailyMetrics(days: number = 30): Promise<ApiResponse<FocusMetric[]>> {
    const response = await this.fetchWithAuth(`/metrics/daily?days=${days}`);
    return this.handleResponse<FocusMetric[]>(response);
  }

  async getWatchSessions(limit: number = 50): Promise<ApiResponse<WatchSession[]>> {
    const response = await this.fetchWithAuth(`/metrics/sessions?limit=${limit}`);
    return this.handleResponse<WatchSession[]>(response);
  }

  async createWatchSession(session: Omit<WatchSession, 'id'>): Promise<ApiResponse<WatchSession>> {
    const response = await this.fetchWithAuth('/metrics/sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    });
    return this.handleResponse<WatchSession>(response);
  }

  async updateWatchSession(id: string, session: Partial<WatchSession>): Promise<ApiResponse<WatchSession>> {
    const response = await this.fetchWithAuth(`/metrics/sessions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(session),
    });
    return this.handleResponse<WatchSession>(response);
  }

  // User settings API calls
  async getUserSettings(): Promise<ApiResponse<AppSettings>> {
    const response = await this.fetchWithAuth('/settings');
    return this.handleResponse<AppSettings>(response);
  }

  async updateUserSettings(settings: Partial<AppSettings>): Promise<ApiResponse<AppSettings>> {
    const response = await this.fetchWithAuth('/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
    return this.handleResponse<AppSettings>(response);
  }
}

export default new ApiService(); 