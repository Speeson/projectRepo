import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription, timeout } from 'rxjs';
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
export class PublicProjectsPageComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private loadSubscription: Subscription | null = null;
  private firstFilterClick = true;

  loading = false;
  errorMessage = '';
  projects: PublicProject[] = [];

  readonly form = this.fb.nonNullable.group({
    ciclo: '' as '' | 'DAM' | 'ASIR',
    curso_academico: '',
    q: ''
  });

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
    this.loadSubscription = null;
  }

  submitFilters(): void {
    this.load();

    if (this.firstFilterClick) {
      this.firstFilterClick = false;
      setTimeout(() => this.load(), 0);
    }
  }

  load(): void {
    const values = this.form.getRawValue();

    this.loading = true;
    this.errorMessage = '';
    this.loadSubscription?.unsubscribe();

    this.loadSubscription = this.projectService
      .getPublicProjects({
        ciclo: values.ciclo,
        curso_academico: values.curso_academico,
        q: values.q
      })
      .pipe(timeout(8000))
      .subscribe({
        next: (response) => {
          this.projects = response.items;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.projects = [];
          this.errorMessage =
            'No se pudo cargar el listado. Revisa que el backend este activo e intentalo de nuevo.';
          this.loading = false;
          this.cdr.detectChanges();
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
