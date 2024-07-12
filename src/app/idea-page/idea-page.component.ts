import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import { Idea } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend.service';

@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private rest = inject(RestBackendService)

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.rest.getIdea(id).subscribe({
      next: (idea) => {
        this.idea = idea;
      }
    })
  }

 idea: Idea = {
    id: 20,
    title: "Title",
    description: "Description",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date('December 17, 1995 03:24:00'),
    author: {
      username: "Test User"
    },
    comments: []
  };







}
