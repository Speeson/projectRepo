import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    this.projectService.getMyProjects().subscribe({
      next: (response) => {
        this.projects = response.items;
      },
      error: () => {
        this.projects = [];
      }
    });
  }

  createProject(): void {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
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
      .subscribe({
        next: () => {
          this.loading = false;
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
          this.loading = false;
        }
      });
  }

  submitToReview(projectId: number): void {
    this.projectService.submitProject(projectId).subscribe({
      next: () => this.loadMine(),
      error: () => this.loadMine()
    });
  }
}
