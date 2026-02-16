import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../api-base';
import type {
  MyProjectsResponse,
  PendingProjectsResponse,
  PublicProjectsResponse
} from '../models';

export type PublicFilters = {
  ciclo?: 'DAM' | 'ASIR' | '';
  curso_academico?: string;
  q?: string;
};

export type CreateProjectInput = {
  titulo: string;
  descripcion: string;
  ciclo: 'DAM' | 'ASIR';
  curso_academico: string;
  tecnologias: string;
  repositorio_url: string;
  demo_url?: string | null;
};

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private readonly http: HttpClient) {}

  getPublicProjects(filters: PublicFilters) {
    let params = new HttpParams();
    if (filters.ciclo) {
      params = params.set('ciclo', filters.ciclo);
    }
    if (filters.curso_academico?.trim()) {
      params = params.set('curso_academico', filters.curso_academico.trim());
    }
    if (filters.q?.trim()) {
      params = params.set('q', filters.q.trim());
    }

    return this.http.get<PublicProjectsResponse>(`${API_BASE_URL}/projects/public`, { params });
  }

  createProject(input: CreateProjectInput) {
    return this.http.post<{ id: number; message: string }>(`${API_BASE_URL}/projects`, input);
  }

  getMyProjects() {
    return this.http.get<MyProjectsResponse>(`${API_BASE_URL}/projects/mine`);
  }

  submitProject(id: number) {
    return this.http.patch<{ message: string }>(`${API_BASE_URL}/projects/${id}/submit`, {});
  }

  getPendingProjects() {
    return this.http.get<PendingProjectsResponse>(`${API_BASE_URL}/projects/pending`);
  }

  publishProject(id: number) {
    return this.http.patch<{ message: string }>(`${API_BASE_URL}/projects/${id}/publish`, {});
  }
}
