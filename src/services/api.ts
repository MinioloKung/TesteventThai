import { 
  LoginResponse, 
  RegisterResponse, 
  UserListResponse, 
  UserUpdateRequest, 
  UserUpdateResponse,
  User
} from '../types';

const BASE_URL = 'https://reqres.in/api';

// ใส่ ReqRes API Key ของคุณที่นี่
const REQRES_API_KEY = 'pro_8411b2ebbe14550dc2f58edb230ddf46e66a706f22216dc0c1d35ae4754c7922';

function getHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };
  
  // ตรวจสอบว่าไม่ได้เป็นค่าว่าง
  if (REQRES_API_KEY && REQRES_API_KEY.trim() !== '') {
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

// สร้างชุดข้อมูลผู้ใช้ Mock 24 คน (8 คนต่อหน้า * 3 หน้า)
let mockUsers: User[] = [
  { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth', avatar: 'https://reqres.in/img/faces/1-image.jpg' },
  { id: 2, email: 'janet.weaver@reqres.in', first_name: 'Janet', last_name: 'Weaver', avatar: 'https://reqres.in/img/faces/2-image.jpg' },
  { id: 3, email: 'emma.wong@reqres.in', first_name: 'Emma', last_name: 'Wong', avatar: 'https://reqres.in/img/faces/3-image.jpg' },
  { id: 4, email: 'eve.holt@reqres.in', first_name: 'Eve', last_name: 'Holt', avatar: 'https://reqres.in/img/faces/4-image.jpg' },
  { id: 5, email: 'charles.morris@reqres.in', first_name: 'Charles', last_name: 'Morris', avatar: 'https://reqres.in/img/faces/5-image.jpg' },
  { id: 6, email: 'tracey.ramos@reqres.in', first_name: 'Tracey', last_name: 'Ramos', avatar: 'https://reqres.in/img/faces/6-image.jpg' },
  { id: 7, email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson', avatar: 'https://reqres.in/img/faces/7-image.jpg' },
  { id: 8, email: 'lindsay.ferguson@reqres.in', first_name: 'Lindsay', last_name: 'Ferguson', avatar: 'https://reqres.in/img/faces/8-image.jpg' },
  { id: 9, email: 'tobias.funke@reqres.in', first_name: 'Tobias', last_name: 'Funke', avatar: 'https://reqres.in/img/faces/9-image.jpg' },
  { id: 10, email: 'byron.fields@reqres.in', first_name: 'Byron', last_name: 'Fields', avatar: 'https://reqres.in/img/faces/10-image.jpg' },
  { id: 11, email: 'george.edwards@reqres.in', first_name: 'George', last_name: 'Edwards', avatar: 'https://reqres.in/img/faces/11-image.jpg' },
  { id: 12, email: 'rachel.howell@reqres.in', first_name: 'Rachel', last_name: 'Howell', avatar: 'https://reqres.in/img/faces/12-image.jpg' },
  // ผู้ใช้อีก 12 คนเพื่อให้ครบ 24 คน (หน้า 3)
  { id: 13, email: 'albert.einstein@reqres.in', first_name: 'Albert', last_name: 'Einstein', avatar: 'https://reqres.in/img/faces/1-image.jpg' },
  { id: 14, email: 'marie.curie@reqres.in', first_name: 'Marie', last_name: 'Curie', avatar: 'https://reqres.in/img/faces/2-image.jpg' },
  { id: 15, email: 'isaac.newton@reqres.in', first_name: 'Isaac', last_name: 'Newton', avatar: 'https://reqres.in/img/faces/3-image.jpg' },
  { id: 16, email: 'galileo.galilei@reqres.in', first_name: 'Galileo', last_name: 'Galilei', avatar: 'https://reqres.in/img/faces/4-image.jpg' },
  { id: 17, email: 'nikola.tesla@reqres.in', first_name: 'Nikola', last_name: 'Tesla', avatar: 'https://reqres.in/img/faces/5-image.jpg' },
  { id: 18, email: 'ada.lovelace@reqres.in', first_name: 'Ada', last_name: 'Lovelace', avatar: 'https://reqres.in/img/faces/6-image.jpg' },
  { id: 19, email: 'alan.turing@reqres.in', first_name: 'Alan', last_name: 'Turing', avatar: 'https://reqres.in/img/faces/7-image.jpg' },
  { id: 20, email: 'grace.hopper@reqres.in', first_name: 'Grace', last_name: 'Hopper', avatar: 'https://reqres.in/img/faces/8-image.jpg' },
  { id: 21, email: 'charles.darwin@reqres.in', first_name: 'Charles', last_name: 'Darwin', avatar: 'https://reqres.in/img/faces/9-image.jpg' },
  { id: 22, email: 'jane.goodall@reqres.in', first_name: 'Jane', last_name: 'Goodall', avatar: 'https://reqres.in/img/faces/10-image.jpg' },
  { id: 23, email: 'stephen.hawking@reqres.in', first_name: 'Stephen', last_name: 'Hawking', avatar: 'https://reqres.in/img/faces/11-image.jpg' },
  { id: 24, email: 'rosalind.franklin@reqres.in', first_name: 'Rosalind', last_name: 'Franklin', avatar: 'https://reqres.in/img/faces/12-image.jpg' }
];

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

  // Users Management (ปรับเปลี่ยนมาดึงจาก Mock Database เพื่อให้รองรับ 8 คนต่อหน้า และมี 3 หน้าตามรูป)
  async getUsers(page: number = 1): Promise<UserListResponse> {
    const perPage = 8;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedUsers = mockUsers.slice(startIndex, endIndex);

    // เลียนแบบ Network Latency เล็กน้อยเพื่อให้ UX ดูเป็นธรรมชาติ
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      page: page,
      per_page: perPage,
      total: mockUsers.length,
      total_pages: Math.ceil(mockUsers.length / perPage),
      data: paginatedUsers,
    };
  },

  async updateUser(id: number, data: UserUpdateRequest): Promise<UserUpdateResponse> {
    // ทำการแก้ไขข้อมูลใน local mock database
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      const [first_name, ...last_name_parts] = data.name.trim().split(/\s+/);
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        first_name: first_name || mockUsers[userIndex].first_name,
        last_name: last_name_parts.join(' ') || mockUsers[userIndex].last_name,
      };
    }

    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<UserUpdateResponse>(response);
  },

  async deleteUser(id: number): Promise<void> {
    // ลบผู้ใช้ใน local mock database
    mockUsers = mockUsers.filter(u => u.id !== id);

    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    if (response.status !== 204 && !response.ok) {
      throw new Error(`Failed to delete user with ID ${id}`);
    }
  }
};
