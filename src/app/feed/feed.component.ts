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
    mostRecent: (a: Idea, b: Idea): number =>
      {
        return (b.createdAt.getTime() - a.createdAt.getTime());
    },
    mostControversial: (a: Idea, b: Idea) =>
      {
        // Ideas with 0 votes always come last
        if(a.upvotes + a.downvotes === 0 && b.upvotes + b.downvotes === 0){
          return 0;
        }
        if(a.upvotes + a.downvotes === 0){
          return 1;
        }
        if(b.upvotes + b.downvotes === 0){
          return -1;
        }

        // Ideas with a more unbalanced upvote/downvote ratio than 30/70 are considered less controversial than ones that don't
        if(a.upvotes / (a.upvotes + a.downvotes) < 0.30 && b.upvotes / (b.upvotes + b.downvotes) >= 0.30){
          return 1;
        }
        if(a.upvotes / (a.upvotes + a.downvotes) >= 0.30 && b.upvotes / (b.upvotes + b.downvotes) < 0.30){
          return -1;
        }

        // Seperate Ideas with a large difference in vote counts
        if(Math.floor(Math.log(a.upvotes + a.downvotes)) > Math.floor(Math.log(b.upvotes + b.downvotes))){
          return -1;
        }
        if(Math.floor(Math.log(b.upvotes + b.downvotes)) > Math.floor(Math.log(a.upvotes + a.downvotes))){
          return 1;
        }

        //Then finally sort ideas by controversialness
        return Math.abs(a.upvotes - a.downvotes) - Math.abs(b.upvotes - b.downvotes);
    },
    mostUnpopular: (a: Idea, b: Idea) =>
      {
        return (b.downvotes - b.upvotes) - (a.downvotes - a.upvotes)
    },
    mostPopular: (a: Idea, b: Idea) =>
      {
        return this.sortingCriteria.mostUnpopular(a,b) * -1;
    },
  }

  currentSortingFunction = this.sortingCriteria.mostRecent;

  currentPage = 1;
  currentPageIdeas: Idea[] = [];


  ngOnInit(){
    this.rest.getCurrentWeekIdeas().subscribe({
      next: (ideas) => {
        this.ideas = ideas;

        ideas.sort(this.currentSortingFunction);
        this.currentPageIdeas = ideas.slice(0, 10);
      }
    })
  }

  pageLeft(){
    if(this.currentPage > 1){
      this.currentPage = this.currentPage - 1;
      this.currentPageIdeas = this.ideas.slice((this.currentPage - 1) * 10, ((this.currentPage) * 10));
    }

  }

  pageRight(){
    if(this.currentPage < (Math.floor(this.ideas.length/10) + 1)){
      this.currentPage = this.currentPage + 1;
      this.currentPageIdeas = this.ideas.slice((this.currentPage - 1) * 10, ((this.currentPage) * 10));
    }

  }

  sortIdeas(sortingFunction: (a: Idea, b: Idea) => number){
    this.currentSortingFunction = sortingFunction;
    this.ideas.sort(this.currentSortingFunction);
    this.currentPageIdeas = this.ideas.slice((this.currentPage - 1) * 10, ((this.currentPage) * 10));
  }


}
