import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { finalize, timeout } from 'rxjs';
import { ProjectService } from '../core/services/project.service';
import type { MyProject } from '../core/models';

@Component({
  selector: 'app-my-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './my-projects-page.component.html',
  styleUrl: './my-projects-page.component.css'
})
export class MyProjectsPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  projects: MyProject[] = [];
  loading = false;
  errorMessage = '';

  readonly form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    ciclo: ['DAM' as 'DAM' | 'ASIR', Validators.required],
    curso_academico: ['2025-2026', Validators.required],
    tecnologias: ['', Validators.required],
    repositorio_url: ['', Validators.required],
    demo_url: ['']
  });

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadMine();
  }

  loadMine(): void {
    this.errorMessage = '';

    this.projectService
      .getMyProjects()
      .pipe(timeout(8000))
      .subscribe({
        next: (response) => {
          this.projects = response.items;
        },
        error: () => {
          this.projects = [];
          this.errorMessage =
            'No se pudo cargar el listado. Revisa que el backend este activo e intentalo de nuevo.';
        }
      });
  }

  createProject(): void {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const input = this.form.getRawValue();

    this.projectService
      .createProject({
        titulo: input.titulo ?? '',
        descripcion: input.descripcion ?? '',
        ciclo: input.ciclo ?? 'DAM',
        curso_academico: input.curso_academico ?? '',
        tecnologias: input.tecnologias ?? '',
        repositorio_url: input.repositorio_url ?? '',
        demo_url: input.demo_url ?? null
      })
      .pipe(
        timeout(8000),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.form.patchValue({
            titulo: '',
            descripcion: '',
            tecnologias: '',
            repositorio_url: '',
            demo_url: ''
          });
          this.loadMine();
        },
        error: () => {
          this.errorMessage =
            'No se pudo crear el proyecto. Revisa la conexion con el backend e intentalo de nuevo.';
        }
      });
  }

  submitToReview(projectId: number): void {
    this.errorMessage = '';

    this.projectService
      .submitProject(projectId)
      .pipe(timeout(8000))
      .subscribe({
        next: () => this.loadMine(),
        error: () => {
          this.errorMessage =
            'No se pudo enviar a revision. Revisa la conexion con el backend e intentalo de nuevo.';
          this.loadMine();
        }
      });
  }
}
