export type ApiUser = {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'AGENT' | 'CLIENT';
};

export type ApiCase = {
  _id: string;
  caseNumber: string;
  caseType: string;
  plaintiff: { name: string };
  defendant: { name: string };
  client?: { name?: string; email?: string };
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  description?: string;
  createdAt?: string;
};

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    let message = 'Error de red';
    try {
      const data = await res.json();
      message = data.message || JSON.stringify(data);
    } catch {
      message = res.statusText;
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function apiLogin(email: string, password: string) {
  return request<{ accessToken: string; refreshToken: string; user: ApiUser }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRegister(fullName: string, email: string, password: string) {
  return request<{ id: string; fullName: string; email: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ fullName, email, password }),
  });
}

export async function apiMe(token: string) {
  return request<ApiUser>('/api/auth/me', { method: 'GET' }, token);
}

export async function apiListCases(token: string) {
  return request<{ data: ApiCase[] }>('/api/cases', { method: 'GET' }, token);
}

export async function apiCreateCase(payload: {
  plaintiffName: string;
  defendantName: string;
  client: string;
  caseType: string;
  caseNumber: string;
  priority: string;
  description?: string;
}, token: string) {
  return request<ApiCase>('/api/cases', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
}

export async function apiUpdateCase(id: string, payload: Partial<{
  plaintiffName: string;
  defendantName: string;
  client: string;
  caseType: string;
  caseNumber: string;
  priority: string;
  status: string;
  description: string;
}>, token: string) {
  return request<ApiCase>(`/api/cases/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }, token);
}
