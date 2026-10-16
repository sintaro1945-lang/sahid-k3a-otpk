import { KictAllData } from '../types';

const API_BASE = '/api/kict';

export async function fetchAllData(): Promise<KictAllData> {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error('Failed to fetch KICT data');
  return res.json();
}

export async function fetchCollection<T>(collection: string): Promise<T[]> {
  const res = await fetch(`${API_BASE}/${collection}`);
  if (!res.ok) throw new Error(`Failed to fetch ${collection}`);
  return res.json();
}

export async function createItem<T>(collection: string, data: Partial<T>): Promise<T> {
  const res = await fetch(`${API_BASE}/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create item in ${collection}`);
  return res.json();
}

export async function updateItem<T>(collection: string, id: string, data: Partial<T>): Promise<T> {
  const res = await fetch(`${API_BASE}/${collection}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update item ${id} in ${collection}`);
  return res.json();
}

export async function deleteItem(collection: string, id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${collection}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete item ${id} in ${collection}`);
}
