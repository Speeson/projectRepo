import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProjectService } from '../core/services/project.service';
import type { PublicProject } from '../core/models';

@Component({
  selector: 'app-public-projects-page',
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
  templateUrl: './public-projects-page.component.html',
  styleUrl: './public-projects-page.component.css'
})
export class PublicProjectsPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  loading = false;
  projects: PublicProject[] = [];

  readonly form = this.fb.group({
    ciclo: ['' as '' | 'DAM' | 'ASIR'],
    curso_academico: [''],
    q: ['']
  });

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    const raw = this.form.getRawValue();

    this.projectService
      .getPublicProjects({
        ciclo: raw.ciclo ?? '',
        curso_academico: raw.curso_academico ?? '',
        q: raw.q ?? ''
      })
      .subscribe({
        next: (response) => {
          this.projects = response.items;
          this.loading = false;
        },
        error: () => {
          this.projects = [];
          this.loading = false;
        }
      });
  }

  clearFilters(): void {
    this.form.reset({
      ciclo: '',
      curso_academico: '',
      q: ''
    });
    this.load();
  }
}
