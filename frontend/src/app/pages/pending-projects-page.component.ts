import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
  readonly projects = signal<PendingProject[]>([]);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending(): void {
    this.errorMessage.set('');

    this.projectService
      .getPendingProjects()
      .pipe(timeout(8000))
      .subscribe({
        next: (response) => {
          this.projects.set(response.items);
        },
        error: () => {
          this.projects.set([]);
          this.errorMessage.set(
            'No se pudo cargar pendientes. Revisa que el backend este activo e intentalo de nuevo.'
          );
        }
      });
  }

  publish(projectId: number): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    this.projectService
      .publishProject(projectId)
      .pipe(timeout(8000))
      .subscribe({
        next: () => {
          this.setSuccessMessage('Proyecto publicado correctamente.');
          this.loadPending();
        },
        error: () => {
          this.errorMessage.set(
            'No se pudo publicar el proyecto. Revisa la conexion con el backend e intentalo de nuevo.'
          );
          this.loadPending();
        }
      });
  }

  private setSuccessMessage(message: string): void {
    this.successMessage.set(message);
    setTimeout(() => this.successMessage.set(''), 3500);
  }
}
