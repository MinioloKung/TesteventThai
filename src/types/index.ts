export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface LoginResponse {
  token: string;
  error?: string;
}

export interface RegisterResponse {
  id: number;
  token: string;
  error?: string;
}

export interface UserUpdateRequest {
  name: string;
  job: string;
}

export interface UserUpdateResponse {
  name: string;
  job: string;
  updatedAt: string;
}

export interface UserCreateResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}
