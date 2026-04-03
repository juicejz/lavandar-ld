// frontend/src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: '/api/v1', // docker/Vite proxy will forward this to backend:8090
  timeout: 10000,
});

// ---- Client types ----

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  date_of_birth?: string | null;
  notes?: string | null;
}

export interface ClientCreate {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  date_of_birth?: string | null;
  notes?: string | null;
}

export interface ClientUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string | null;
  date_of_birth?: string | null;
  notes?: string | null;
}

// ---- Client API functions ----

export const clientApi = {
  async list(): Promise<Client[]> {
    const { data } = await api.get<Client[]>('/clients');
    return data;
  },

  async get(id: number): Promise<Client> {
    const { data } = await api.get<Client>(`/clients/${id}`);
    return data;
  },

  async create(payload: ClientCreate): Promise<Client> {
    const { data } = await api.post<Client>('/clients', payload);
    return data;
  },

  async update(id: number, payload: ClientUpdate): Promise<Client> {
    const { data } = await api.put<Client>(`/clients/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/clients/${id}`);
  },
};
