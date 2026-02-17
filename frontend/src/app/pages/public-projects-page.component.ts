import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  catchError,
  debounceTime,
  finalize,
  merge,
  of,
  startWith,
  Subject,
  switchMap,
  timeout
} from 'rxjs';
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly submit$ = new Subject<void>();

  loading = false;
  errorMessage = '';
  projects: PublicProject[] = [];

  readonly form = this.fb.group({
    ciclo: ['' as '' | 'DAM' | 'ASIR'],
    curso_academico: [''],
    q: ['']
  });

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    merge(this.form.valueChanges.pipe(debounceTime(220)), this.submit$)
      .pipe(
        startWith(null),
        switchMap(() => {
          const raw = this.form.getRawValue();
          this.loading = true;
          this.errorMessage = '';

          return this.projectService
            .getPublicProjects({
              ciclo: raw.ciclo ?? '',
              curso_academico: raw.curso_academico ?? '',
              q: raw.q ?? ''
            })
            .pipe(
              timeout(8000),
              catchError(() => {
                this.errorMessage =
                  'No se pudo cargar el listado. Revisa que el backend este activo e intentalo de nuevo.';
                return of({
                  total: 0,
                  filters: { ciclo: null, curso_academico: null, q: null },
                  items: [] as PublicProject[]
                });
              }),
              finalize(() => {
                this.loading = false;
              })
            );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          this.projects = response.items;
        }
      });
  }

  submitFilters(): void {
    this.submit$.next();
  }

  clearFilters(): void {
    this.form.reset({
      ciclo: '',
      curso_academico: '',
      q: ''
    }, { emitEvent: false });
    this.submit$.next();
  }
}
