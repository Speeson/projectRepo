import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending(): void {
    this.projectService.getPendingProjects().subscribe({
      next: (response) => {
        this.projects = response.items;
      },
      error: () => {
        this.projects = [];
      }
    });
  }

  publish(projectId: number): void {
    this.projectService.publishProject(projectId).subscribe({
      next: () => this.loadPending(),
      error: () => this.loadPending()
    });
  }
}
