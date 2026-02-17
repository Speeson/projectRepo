import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { timeout } from 'rxjs';
import { ProjectService } from '../core/services/project.service';
import type { PendingProject } from '../core/models';

@Component({
  selector: 'app-pending-projects-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pending-projects-page.component.html',
  styleUrl: './pending-projects-page.component.css'
})
export class PendingProjectsPageComponent implements OnInit {
  projects: PendingProject[] = [];
  errorMessage = '';

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending(): void {
    this.errorMessage = '';

    this.projectService
      .getPendingProjects()
      .pipe(timeout(8000))
      .subscribe({
        next: (response) => {
          this.projects = response.items;
        },
        error: () => {
          this.projects = [];
          this.errorMessage =
            'No se pudo cargar pendientes. Revisa que el backend este activo e intentalo de nuevo.';
        }
      });
  }

  publish(projectId: number): void {
    this.errorMessage = '';

    this.projectService
      .publishProject(projectId)
      .pipe(timeout(8000))
      .subscribe({
        next: () => this.loadPending(),
        error: () => {
          this.errorMessage =
            'No se pudo publicar el proyecto. Revisa la conexion con el backend e intentalo de nuevo.';
          this.loadPending();
        }
      });
  }
}
