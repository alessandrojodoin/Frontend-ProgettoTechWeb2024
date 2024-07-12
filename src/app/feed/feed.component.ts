import { Component, inject } from '@angular/core';
import { IdeaPreviewComponent } from '../idea-preview/idea-preview.component';
import { RestBackendService } from '../_services/rest-backend.service';
import { Idea } from '../../types';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [IdeaPreviewComponent, RouterLink, RouterLinkActive],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  private rest = inject(RestBackendService);
  private router = inject(Router);
  ideas: Idea[] = [];


  ngOnInit(){
    this.rest.getIdeas().subscribe({
      next: (ideas) => {
        this.ideas = ideas;
      }
    })
  }


}
