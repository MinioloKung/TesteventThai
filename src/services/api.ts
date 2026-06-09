import { 
  LoginResponse, 
  RegisterResponse, 
  UserListResponse, 
  UserUpdateRequest, 
  UserUpdateResponse 
} from '../types';

const BASE_URL = 'https://reqres.in/api';

// ใส่ ReqRes API Key ของคุณที่นี่
const REQRES_API_KEY = 'YOUR_API_KEY_HERE';

function getHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };
  
  if (REQRES_API_KEY && REQRES_API_KEY !== 'YOUR_API_KEY_HERE') {
    headers['x-api-key'] = REQRES_API_KEY;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || data.error || `HTTP error! status: ${response.status}`;
    throw new Error(errorMsg);
  }
  return data as T;
}

export const apiService = {
  // Authentication
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

  // Users Management
  async getUsers(page: number = 1): Promise<UserListResponse> {
    const response = await fetch(`${BASE_URL}/users?page=${page}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse<UserListResponse>(response);
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
  }
};
