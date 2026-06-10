import {
  LoginResponse,
  RegisterResponse,
  UserListResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  User,
} from '../types';

const BASE_URL = 'https://reqres.in/api';

const REQRES_API_KEY = 'pro_8411b2ebbe14550dc2f58edb230ddf46e66a706f22216dc0c1d35ae4754c7922';

function getHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };
  
  if (REQRES_API_KEY && REQRES_API_KEY.trim() !== '') {
    headers['x-api-key'] = REQRES_API_KEY;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data: unknown = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorData = data as { message?: string; error?: string };
    const errorMsg = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const apiService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    return handleResponse<LoginResponse>(response);
  },

  async register(email: string, password: string): Promise<RegisterResponse> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    return handleResponse<RegisterResponse>(response);
  },

  async getUsers(page: number = 1): Promise<UserListResponse> {
    const params = new URLSearchParams({
      page: String(page),
      per_page: '8',
    });

    const response = await fetch(`${BASE_URL}/users?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return handleResponse<UserListResponse>(response);
  },

  async getAllUsers(): Promise<User[]> {
    const firstPage = await this.getUsers(1);
    const remainingPages = Array.from(
      { length: Math.max(firstPage.total_pages - 1, 0) },
      (_, index) => this.getUsers(index + 2),
    );

    const remainingResponses = await Promise.all(remainingPages);

    return [
      ...firstPage.data,
      ...remainingResponses.flatMap((response) => response.data),
    ];
  },

  async updateUser(id: number, data: UserUpdateRequest): Promise<UserUpdateResponse> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse<UserUpdateResponse>(response);
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (response.status !== 204 && !response.ok) {
      throw new Error(`Failed to delete user with ID ${id}`);
    }
  },
};
