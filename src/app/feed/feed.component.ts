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
  sortingCriteria = {
    mostRecent: (a: Idea, b: Idea) =>
      {
        if(a.createdAt.getTime >= b.createdAt.getTime){
          return -1;
        }
        else{
          return 1
        }
      },
      mostControversial: (a: Idea, b: Idea) =>
        {
        },
  }

  private currentSortingFunction = this.sortingCriteria.mostRecent;

  currentPage = 1;
  currentPageIdeas: Idea[] = [];


  ngOnInit(){
    this.rest.getCurrentWeekIdeas().subscribe({
      next: (ideas) => {
        this.ideas = ideas;

        ideas.sort(this.currentSortingFunction);
        this.currentPageIdeas = ideas.slice(0, 9);
      }
    })
  }


}
